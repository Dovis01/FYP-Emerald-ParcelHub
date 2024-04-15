package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.controller.request.StoreParcelInfoRequest;
import com.example.fypspringbootcode.entity.ParcelStationShelf;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.Map;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-03
 */
public interface IParcelStationShelfService extends IService<ParcelStationShelf> {

    void placeParcelToParcelStationShelf(StoreParcelInfoRequest request, Integer parcelId, Integer stationId);

    Map<Integer, Map<Integer, Integer>> getParcelStationShelfStorageData(Integer stationId);

    void resetOneParcelStationShelvesStorageData(Integer stationId);

    void resetAllParcelStationShelfStorageData();

}
