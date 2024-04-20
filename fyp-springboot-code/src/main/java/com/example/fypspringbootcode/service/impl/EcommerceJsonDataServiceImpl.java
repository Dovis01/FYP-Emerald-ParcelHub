package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.fypspringbootcode.entity.EcommerceJsonData;
import com.example.fypspringbootcode.entity.EcommerceWebsite;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.EcommerceJsonDataMapper;
import com.example.fypspringbootcode.service.*;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.utils.FypProjectUtils;
import com.google.gson.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.example.fypspringbootcode.common.ErrorCodeList.*;

/**
 * @author Shijin Zhang
 * @since 2024-02-23
 */
@Service
@Slf4j
public class EcommerceJsonDataServiceImpl extends ServiceImpl<EcommerceJsonDataMapper, EcommerceJsonData> implements IEcommerceJsonDataService {

    @Autowired
    private IEcommerceWebsiteService ecommerceWebsiteService;

    @Autowired
    private IPastStatisticsService pastStatisticsService;

    @Autowired
    private ICourierCollectionRecordService courierCollectionRecordService;

    @Autowired
    private ICourierDeliveryRecordService courierDeliveryRecordService;

    @Autowired
    private IStationParcelsToPlaceService stationParcelsToPlaceService;

    @Autowired
    private IParcelStationShelfService parcelStationShelfService;

    @Autowired
    private ICustomerService customerService;

    @Autowired
    private ISenderService senderService;

    @Autowired
    private IOrderService orderService;

    @Autowired
    private IParcelService parcelService;

    @Transactional
    @Override
    public void addEcommerceJsonData(EcommerceJsonData ecommerceJsonData) {
        JsonElement jsonElement = JsonParser.parseString(ecommerceJsonData.getJsonData());
        if (jsonElement.isJsonArray()) {
            JsonArray jsonArray = jsonElement.getAsJsonArray();
            List<EcommerceJsonData> dataList = new ArrayList<>();
            for (JsonElement element : jsonArray) {
                EcommerceJsonData data = new EcommerceJsonData();
                Integer eWebsiteId = handleEcommerceWebsiteInData(element);
                data.setJsonData(element.toString());
                data.setEcommerceWebsiteId(eWebsiteId);
                dataList.add(data);
            }
            try {
                saveBatch(dataList);
            } catch (Exception e) {
                log.error("Fail to insert json simulation data in batch", e);
                throw new ServiceException(ERROR_CODE_500, "The internal system is error. Please try again.");
            }
            customerService.addOrderCustomersInfoInBatch(jsonArray);
            senderService.addOrderSendersInfoInBatch(jsonArray);
            orderService.addOrdersInfoInBatch(jsonArray);
            parcelService.addParcelsInfoInBatch(jsonArray);
        } else {
            throw new ServiceException(ERROR_CODE_400, "The json data is not a json array, please check it again");
        }
    }

    public ArrayList<Map<String, Object>> getAllEcommerceJsonDataAsArray() {
        List<EcommerceJsonData> ecommerceJsonDataList = list();
        ArrayList<Map<String, Object>> jsonMapArray = new ArrayList<>();
        for (EcommerceJsonData data : ecommerceJsonDataList) {
            JsonObject jsonObject = JsonParser.parseString(data.getJsonData()).getAsJsonObject();
            JsonElement idElement = new JsonPrimitive(data.getEcommerceJsonDataId());
            jsonObject.add("ecommerce_json_data_id", idElement);
            Map<String, Object> map = FypProjectUtils.convertToMap(jsonObject);
            jsonMapArray.add(map);
        }
        return jsonMapArray;
    }

    @Override
    public EcommerceJsonData getOneEcommerceJsonDataById(Integer ecommerceJsonDataId) {
        EcommerceJsonData ecommerceJsonData;
        try {
            ecommerceJsonData = getById(ecommerceJsonDataId);
        } catch (Exception e) {
            log.error("The mybatis has failed to get the ecommerce json data with id {}", ecommerceJsonDataId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (ecommerceJsonData == null) {
            throw new ServiceException(ERROR_CODE_400, "The ecommerce json data with id " + ecommerceJsonDataId + " is not found, please check it again");
        }
        return ecommerceJsonData;
    }

    @Transactional
    @Override
    public void deleteAllEcommerceJsonData() {
        courierCollectionRecordService.resetAllCollectionRecords();
        courierDeliveryRecordService.resetAllDeliveryRecords();
        stationParcelsToPlaceService.deleteAllPlaceParcelsRecords();
        parcelService.deleteAllParcelsData();
        orderService.deleteAllOrdersData();
        customerService.deleteOrderCustomerRecordsFromJsonDataInBatch();
        senderService.deleteAllSendersData();
        try {
            remove(null);
        } catch (Exception e) {
            log.error("The mybatis has failed to delete all the ecommerce json data", e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        ecommerceWebsiteService.deleteAllEcommerceWebsite();
        pastStatisticsService.deleteAllPastStatistics();
        parcelStationShelfService.resetAllParcelStationShelfStorageData();
    }

    @Override
    public void deleteOneEcommerceJsonDataById(Integer ecommerceJsonDataId) {
        Integer ecommerceWebsiteId = getOneEcommerceJsonDataById(ecommerceJsonDataId).getEcommerceWebsiteId();

        // Delete the ecommerce json data
        try {
            removeById(ecommerceJsonDataId);
        } catch (Exception e) {
            log.error("The mybatis has failed to delete the ecommerce json data with id {}", ecommerceJsonDataId, e);
            throw new ServiceException(ERROR_CODE_400, "The ecommerce json data with id " + ecommerceJsonDataId + " is not found, please check it again");
        }

        // Check if the ecommerce website id is found in the table
        LambdaQueryWrapper<EcommerceJsonData> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(EcommerceJsonData::getEcommerceWebsiteId, ecommerceWebsiteId);
        List<EcommerceJsonData> ecommerceJsonDataList;
        try {
            ecommerceJsonDataList = list(queryWrapper);
        } catch (Exception e) {
            log.error("The mybatis has failed to get the ecommerce json data with ecommerce website id {}", ecommerceWebsiteId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }

        // If the ecommerce website id is not found in the table, delete the ecommerce website
        if (ecommerceJsonDataList.isEmpty()) {
            ecommerceWebsiteService.deleteEcommerceWebsiteById(ecommerceWebsiteId);
        }
    }

    @Transactional
    @Override
    public void deleteMultipleEcommerceJsonDataById(Integer[] ecommerceJsonDataIds) {
        if (ecommerceJsonDataIds.length == 0) {
            throw new ServiceException(ERROR_CODE_400, "The ecommerce json data ids to delete is empty, please check it again");
        }
        for (Integer ecommerceJsonDataId : ecommerceJsonDataIds) {
            deleteOneEcommerceJsonDataById(ecommerceJsonDataId);
        }
    }

    private Integer handleEcommerceWebsiteInData(JsonElement jsonElement) {
        JsonObject ecommercePlatform = jsonElement.getAsJsonObject().get("e_commerce_platform").getAsJsonObject();
        String website_url = ecommercePlatform.get("website_url").getAsString();
        String name = ecommercePlatform.get("name").getAsString();
        if (!ecommerceWebsiteService.isEcommerceWebsiteExist(name)) {
            EcommerceWebsite ecommerceWebsite = new EcommerceWebsite();
            ecommerceWebsite.setWebsiteName(name);
            ecommerceWebsite.setUrl(website_url);
            ecommerceWebsiteService.addEcommerceWebsite(ecommerceWebsite);
        }
        return ecommerceWebsiteService.getEcommerceWebsiteByName(name).getEcommerceWebsiteId();
    }
}
