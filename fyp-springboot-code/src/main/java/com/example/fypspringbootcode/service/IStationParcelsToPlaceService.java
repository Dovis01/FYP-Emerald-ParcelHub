package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.controller.dto.ParcelInfoDTO;
import com.example.fypspringbootcode.controller.request.ParcelsToPlaceRecordsRequest;
import com.example.fypspringbootcode.entity.StationParcelsToPlace;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-04-10
 */
public interface IStationParcelsToPlaceService extends IService<StationParcelsToPlace> {

    void addPlaceParcelsRecordsOfStation(ParcelsToPlaceRecordsRequest request, Integer stationManagerId, Integer stationId);

    List<ParcelInfoDTO> getPlaceParcelsRecordsOfStation(Integer stationManagerId, Integer stationId);

    List<Integer> getPlacedParcelIdsOfOneStation(Integer stationId);

    void deletePlaceParcelsRecordsOfStation(Integer stationManagerId, Integer stationId);

    void updatePlaceStatusOfParcel(Integer parcelId);

    void resetAllPlaceStatusOfOneStation(Integer stationId);

    void deleteAllPlaceParcelsRecords();

}
