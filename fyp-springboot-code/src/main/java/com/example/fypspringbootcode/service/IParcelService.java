package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.entity.Parcel;
import com.baomidou.mybatisplus.extension.service.IService;
import com.google.gson.JsonArray;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-02
 */
public interface IParcelService extends IService<Parcel> {

    void addParcelsInfoInBatch(JsonArray ecommerceJsonData);

    ArrayList<Map<String, Object>> getParcelDataByCustomerId(Integer customerId);

    ArrayList<Map<String, Object>> getParcelsDataDeliveringToStationByStationId(Integer stationId);

    ArrayList<Map<String, Object>> getParcelsDataStoredInStationByStationId(Integer stationId);

    List<Parcel> getAllParcelsToBeCollected();

    List<Parcel> getAllParcelsToBeDelivered();

    Parcel getOneParcelFullInfo(Integer parcelId);

    void updateParcelShelfId(Integer parcelId, Integer shelfId);

    void resetParcelsShelfIdsOfOneStation(Integer stationId);

    void deleteAllParcelsData();

}
