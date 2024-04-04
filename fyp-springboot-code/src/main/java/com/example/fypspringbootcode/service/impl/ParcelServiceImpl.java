package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.example.fypspringbootcode.controller.dto.ParcelInfoDTO;
import com.example.fypspringbootcode.entity.*;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.*;
import com.example.fypspringbootcode.service.*;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.utils.FypProjectUtils;
import com.google.gson.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.example.fypspringbootcode.common.ErrorCodeList.*;

/**
 * @author Shijin Zhang
 * @since 2024-03-02
 */
@Service
@Slf4j
public class ParcelServiceImpl extends ServiceImpl<ParcelMapper, Parcel> implements IParcelService {

    @Autowired
    private IItemService itemService;

    @Autowired
    private IParcelTrackingCodeService parcelTrackingCodeService;

    @Autowired
    private IParcelHistoryStatusService parcelHistoryStatusService;

    @Autowired
    private IParcelStationService parcelStationService;

    @Autowired
    private ICourierService courierService;

    @Autowired
    private CourierCollectionRecordMapper courierCollectionRecordMapper;

    @Autowired
    private SenderMapper senderMapper;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private ItemMapper itemMapper;

    @Autowired
    private CustomerMapper customerMapper;

    @Autowired
    private ParcelStationMapper parcelStationMapper;

    @Autowired
    private ParcelStationShelfMapper parcelStationShelfMapper;

    @Autowired
    private ParcelTrackingCodeMapper parcelTrackingCodeMapper;

    @Autowired
    private ParcelHubCompanyMapper parcelHubCompanyMapper;

    @Autowired
    private StationManagerMapper stationManagerMapper;

    @Autowired
    private CompanyEmployeeMapper companyEmployeeMapper;

    @Override
    public void addParcelsInfoInBatch(JsonArray ecommerceJsonData) {

        for (JsonElement element : ecommerceJsonData) {

            JsonObject parcel = element.getAsJsonObject().get("parcel").getAsJsonObject();
            String senderName = element.getAsJsonObject().get("sender").getAsJsonObject().get("name").getAsString();
            String customerAddress = element.getAsJsonObject().get("customer").getAsJsonObject().get("address").getAsString();
            Integer emeraldCompanyId = element.getAsJsonObject().get("express_delivery_company").getAsJsonObject().get("hub_id").getAsInt();
            Integer parcelStationId = parcelStationService.allocateParcelStation(customerAddress);
            Integer senderId = FypProjectUtils.getEntityByCondition(Sender::getFullName, senderName, senderMapper).getSenderId();
            Integer orderId = element.getAsJsonObject().get("order_id").getAsInt();
            BigDecimal parcelWeight = parcel.get("weight").getAsBigDecimal();
            BigDecimal parcelLength = parcel.get("length").getAsBigDecimal();
            BigDecimal parcelWidth = parcel.get("width").getAsBigDecimal();
            BigDecimal parcelHeight = parcel.get("height").getAsBigDecimal();
            BigDecimal parcelVolume = parcelLength.multiply(parcelWidth).multiply(parcelHeight);
            JsonArray items = parcel.get("items").getAsJsonArray();

            Parcel newParcel = new Parcel();
            newParcel.setOrderId(orderId);
            newParcel.setSenderId(senderId);
            newParcel.setWeight(parcelWeight);
            newParcel.setVolume(parcelVolume);
            newParcel.setLength(parcelLength);
            newParcel.setWidth(parcelWidth);
            newParcel.setHeight(parcelHeight);
            newParcel.setStationId(parcelStationId);
            newParcel.setEmeraldCompanyId(emeraldCompanyId);

            try {
                save(newParcel);
            } catch (Exception e) {
                log.error("Fail to insert some parcel info data", e);
                throw new ServiceException(ERROR_CODE_500, "The internal system is error. Please try again.");
            }

            Integer parcelId = FypProjectUtils.getEntityByCondition(Parcel::getOrderId, orderId, baseMapper).getParcelId();
            itemService.addParcelItemsInfoInBatch(items, parcelId);
            parcelTrackingCodeService.addParcelTrackingCode(parcelId);
        }
    }

    @Override
    public ArrayList<Map<String, Object>> getParcelDataByCustomerId(Integer customerId) {
        List<Integer> orderIdList = orderMapper.selectObjs(new LambdaQueryWrapper<Order>().select(Order::getOrderId).eq(Order::getCustomerId, customerId));
        List<Parcel> parcelDataList;
        if (orderIdList == null || orderIdList.isEmpty()) {
            throw new ServiceException(ERROR_CODE_400, "This customer has no order.");
        } else {
            parcelDataList = list(new LambdaQueryWrapper<Parcel>().in(Parcel::getOrderId, orderIdList));
        }
        assert parcelDataList != null;
        ArrayList<String> jsonStringList = convertParcelInfoListToJsonString(parcelDataList);
        ArrayList<Map<String, Object>> jsonMapArray = new ArrayList<>();
        for (String data : jsonStringList) {
            JsonObject jsonObject = JsonParser.parseString(data).getAsJsonObject();
            Map<String, Object> map = FypProjectUtils.convertToMap(jsonObject);
            jsonMapArray.add(map);
        }
        return jsonMapArray;
    }

    @Override
    public List<Parcel> getAllParcelsToBeCollected() {
        List<Integer> parcelIdsToBeCollected = parcelHistoryStatusService.getParcelIdsByStatusInfo("To be collected");
        // select parcels by LEFT JOIN and sort by order date
        List<Parcel> parcels = baseMapper.getParcelsToBeCollectedSortedByOrderDate(parcelIdsToBeCollected);

        if (parcels.isEmpty()) {
            throw new ServiceException(ERROR_CODE_404, "No parcels to be collected, all parcels have been ToBeCollected.");
        }
        return parcels;
    }

    @Override
    public List<Parcel> getAllParcelsToBeDelivered() {
        List<Integer> parcelIdsToBeDelivered = parcelHistoryStatusService.getParcelIdsByStatusInfo("To be delivered");
        List<Integer> parcelIdsInParcelHub = parcelHistoryStatusService.getParcelIdsByStatusInfo("In parcel hub");

        // The two lists are empty, then throw exception
        if (parcelIdsToBeDelivered.isEmpty() && parcelIdsInParcelHub.isEmpty()) {
            throw new ServiceException(ERROR_CODE_404, "No parcels in parcel hub to be delivered.");
        }

        // Call the custom query method by LEFT JOIN and sort by order date
        List<Parcel> parcels = baseMapper.getParcelsToBeDeliveredSortedByOrderDate(parcelIdsToBeDelivered, parcelIdsInParcelHub);
        if (parcels.isEmpty()) {
            throw new ServiceException(ERROR_CODE_404, "No parcels to be delivered, all parcels have been ToBeDelivered.");
        }
        return parcels;
    }

    @Override
    public Parcel getOneParcelFullInfo(Integer parcelId) {
        Parcel parcel = getById(parcelId);
        parcel.setParcelTrackingCode(parcelTrackingCodeMapper.selectOne(Wrappers.<ParcelTrackingCode>lambdaQuery().eq(ParcelTrackingCode::getParcelId, parcelId)).getParcelTrackingCode());
        parcel.setItems(itemService.getItemsDataByParcelId(parcelId));
        return parcel;
    }

    @Override
    public void deleteAllParcelsData() {
        itemService.clearItemsData();
        parcelTrackingCodeService.clearParcelTrackingCode();
        remove(null);
    }

    private ArrayList<String> convertParcelInfoListToJsonString(List<Parcel> parcelDataList) {
        ArrayList<String> jsonStringList = new ArrayList<>();

        // Deserialize and serialize LocalDateTime
        Gson gson = new GsonBuilder()
                .registerTypeAdapter(LocalDateTime.class, (JsonSerializer<LocalDateTime>) (src, typeOfSrc, context) -> {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
                    return src == null ? null : context.serialize(src.format(formatter));
                })
                .registerTypeAdapter(LocalDateTime.class, (JsonDeserializer<LocalDateTime>) (json, typeOfT, context) -> {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
                    return json == null ? null : LocalDateTime.parse(json.getAsString(), formatter);
                })
                .create();

        for (Parcel data : parcelDataList) {
            ParcelInfoDTO parcelInfoDTO = new ParcelInfoDTO();
            // get parcel related info
            List<Item> items = itemMapper.selectList(new LambdaQueryWrapper<Item>().eq(Item::getParcelId, data.getParcelId()));
            String trackingCode = parcelTrackingCodeMapper.selectOne(new LambdaQueryWrapper<ParcelTrackingCode>().eq(ParcelTrackingCode::getParcelId, data.getParcelId())).getParcelTrackingCode();
            data.setItems(items);
            data.setParcelTrackingCode(trackingCode);
            parcelInfoDTO.setParcel(data);
            // get customer related info
            Customer customer = customerMapper.selectById(orderMapper.selectById(data.getOrderId()).getCustomerId());
            parcelInfoDTO.setCustomer(customer);
            // get sender related info
            parcelInfoDTO.setSender(senderMapper.selectById(data.getSenderId()));
            // get parcel history status related info
            parcelInfoDTO.setParcelHistoryStatusList(parcelHistoryStatusService.getParcelHistoryStatusListByParcelId(data.getParcelId()));
            // get parcel hub company related info
            parcelInfoDTO.setParcelHubCompany(parcelHubCompanyMapper.selectById(data.getEmeraldCompanyId()));
            // get courier related info
            parcelInfoDTO.setCourier(courierService.getOneCourierFullObjectInfo(courierCollectionRecordMapper.getCourierIdByParcelId(data.getParcelId())));
            // get parcel station related info
            parcelInfoDTO.setParcelStation(parcelStationMapper.selectById(data.getStationId()));
            // get parcel station shelf related info
            parcelInfoDTO.setParcelStationShelf(parcelStationShelfMapper.selectById(data.getShelfId()));
            // get parcel station manager related info
            Integer companyEmployeeId = stationManagerMapper.selectOne(Wrappers.<StationManager>lambdaQuery().select(StationManager::getEmployeeId).eq(StationManager::getStationId, data.getStationId())).getEmployeeId();
            parcelInfoDTO.setParcelStationManager(companyEmployeeMapper.selectById(companyEmployeeId));
            String jsonString = gson.toJson(parcelInfoDTO);
            jsonStringList.add(jsonString);
        }
        return jsonStringList;
    }
}
