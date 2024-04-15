package com.example.fypspringbootcode.service.impl;

import com.example.fypspringbootcode.controller.request.StoreParcelInfoRequest;
import com.example.fypspringbootcode.entity.ParcelStationShelf;
import com.example.fypspringbootcode.mapper.ParcelStationShelfMapper;
import com.example.fypspringbootcode.service.IParcelPickupCodeService;
import com.example.fypspringbootcode.service.IParcelService;
import com.example.fypspringbootcode.service.IParcelStationShelfService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.service.IStationParcelsToPlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author Shijin Zhang
 * @since 2024-03-03
 */
@Service
public class ParcelStationShelfServiceImpl extends ServiceImpl<ParcelStationShelfMapper, ParcelStationShelf> implements IParcelStationShelfService {

    @Autowired
    private IParcelPickupCodeService parcelPickupCodeService;

    @Autowired
    private IParcelService parcelService;

    @Autowired
    private IStationParcelsToPlaceService stationParcelsToPlaceService;

    @Transactional
    @Override
    public void placeParcelToParcelStationShelf(StoreParcelInfoRequest request, Integer parcelId, Integer stationId) {
        lambdaUpdate()
                .set(ParcelStationShelf::getMaxStorageParcelNumber, request.getMaxStorageParcelNumber()-1)
                .eq(ParcelStationShelf::getMainShelfSerialNumber, request.getMainShelfSerialNumber())
                .eq(ParcelStationShelf::getFloorSerialNumber, request.getFloorSerialNumber())
                .eq(ParcelStationShelf::getParcelStationId, stationId)
                .update();
        String pickupCode = stationId + "-" +
                request.getMainShelfSerialNumber() + "-" +
                request.getFloorSerialNumber() + "-" +
                request.getMaxStorageParcelNumber();
        Integer shelfId = lambdaQuery().eq(ParcelStationShelf::getParcelStationId, stationId)
                .eq(ParcelStationShelf::getMainShelfSerialNumber, request.getMainShelfSerialNumber())
                .eq(ParcelStationShelf::getFloorSerialNumber, request.getFloorSerialNumber())
                .one().getShelfId();
        parcelService.updateParcelShelfId(parcelId, shelfId);
        parcelPickupCodeService.addParcelPickupCode(pickupCode, parcelId);
        stationParcelsToPlaceService.updatePlaceStatusOfParcel(parcelId);
    }

    @Override
    public Map<Integer, Map<Integer, Integer>> getParcelStationShelfStorageData(Integer stationId) {
        List<ParcelStationShelf> stationShelvesDataList = lambdaQuery().eq(ParcelStationShelf::getParcelStationId, stationId).gt(ParcelStationShelf::getMaxStorageParcelNumber,0).list();

        return stationShelvesDataList.stream()
                .collect(Collectors.groupingBy(
                        ParcelStationShelf::getMainShelfSerialNumber,
                        Collectors.toMap(
                                ParcelStationShelf::getFloorSerialNumber,
                                ParcelStationShelf::getMaxStorageParcelNumber
                        )
                ));
    }

    @Transactional
    @Override
    public void resetOneParcelStationShelvesStorageData(Integer stationId) {
        List<Integer> parcelIds = stationParcelsToPlaceService.getPlacedParcelIdsOfOneStation(stationId);
        lambdaUpdate().set(ParcelStationShelf::getMaxStorageParcelNumber, 8).eq(ParcelStationShelf::getParcelStationId, stationId).update();
        parcelPickupCodeService.clearPickupCodesInBatchByParcelIds(parcelIds);
        parcelService.resetParcelsShelfIdsOfOneStation(stationId);
        stationParcelsToPlaceService.resetAllPlaceStatusOfOneStation(stationId);
    }

    @Override
    public void resetAllParcelStationShelfStorageData() {
        lambdaUpdate().set(ParcelStationShelf::getMaxStorageParcelNumber, 8).update();
    }
}
