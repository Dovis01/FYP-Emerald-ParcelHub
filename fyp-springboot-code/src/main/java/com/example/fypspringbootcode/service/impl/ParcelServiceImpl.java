package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.fypspringbootcode.controller.dto.ParcelInfoDTO;
import com.example.fypspringbootcode.entity.*;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.*;
import com.example.fypspringbootcode.service.IItemService;
import com.example.fypspringbootcode.service.IParcelService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.service.IParcelStationService;
import com.example.fypspringbootcode.service.IParcelTrackingCodeService;
import com.example.fypspringbootcode.utils.FypProjectUtils;
import com.google.gson.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_400;
import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_500;

/**
 * @author Shijin Zhang
 * @since 2024-03-02
 */
@Service
public class ParcelServiceImpl extends ServiceImpl<ParcelMapper, Parcel> implements IParcelService {

    @Autowired
    private IItemService itemService;

    @Autowired
    private IParcelTrackingCodeService parcelTrackingCodeService;

    @Autowired
    private IParcelStationService parcelStationService;

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

    @Override
    public void addParcelsInfoInBatch(JsonArray ecommerceJsonData) {

        for (JsonElement element : ecommerceJsonData) {

            JsonObject parcel = element.getAsJsonObject().get("parcel").getAsJsonObject();
            String senderName = element.getAsJsonObject().get("sender").getAsJsonObject().get("name").getAsString();
            String customerAddress = element.getAsJsonObject().get("customer").getAsJsonObject().get("address").getAsString();
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
            // get parcel station related info
            parcelInfoDTO.setParcelStation(parcelStationMapper.selectById(data.getStationId()));
            // get parcel station shelf related info
            parcelInfoDTO.setParcelStationShelf(parcelStationShelfMapper.selectById(data.getShelfId()));
            String jsonString = gson.toJson(parcelInfoDTO);
            jsonStringList.add(jsonString);
        }
        return jsonStringList;
    }
}
