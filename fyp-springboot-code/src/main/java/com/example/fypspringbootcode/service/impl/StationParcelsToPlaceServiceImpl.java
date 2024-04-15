package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.example.fypspringbootcode.controller.dto.ParcelInfoDTO;
import com.example.fypspringbootcode.controller.request.ParcelsToPlaceRecordsRequest;
import com.example.fypspringbootcode.entity.*;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.*;
import com.example.fypspringbootcode.service.ICourierService;
import com.example.fypspringbootcode.service.IStationParcelsToPlaceService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_400;
import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_500;
import static java.util.Optional.ofNullable;

/**
 * @author Shijin Zhang
 * @since 2024-04-10
 */
@Service
public class StationParcelsToPlaceServiceImpl extends ServiceImpl<StationParcelsToPlaceMapper, StationParcelsToPlace> implements IStationParcelsToPlaceService {

    @Autowired
    private ParcelMapper parcelMapper;

    @Autowired
    private TruckMapper truckMapper;

    @Autowired
    private ICourierService courierService;

    @Autowired
    private CourierDeliveryRecordMapper courierDeliveryRecordMapper;

    @Autowired
    private ParcelTrackingCodeMapper parcelTrackingCodeMapper;

    @Autowired
    private ParcelPickupCodeMapper parcelPickupCodeMapper;

    @Override
    public void addPlaceParcelsRecordsOfStation(ParcelsToPlaceRecordsRequest request, Integer stationManagerId, Integer stationId) {
        if (stationManagerId == null || stationId == null) {
            throw new ServiceException(ERROR_CODE_400, "The station manager id or station id is null.");
        }
        List<StationParcelsToPlace> stationParcelsToPlaceList = new ArrayList<>();
        for (Integer parcelId : request.getParcelIds()) {
            StationParcelsToPlace stationParcelsToPlace = new StationParcelsToPlace();
            stationParcelsToPlace.setStationId(stationId);
            stationParcelsToPlace.setParcelId(parcelId);
            stationParcelsToPlace.setStationManagerId(stationManagerId);
            stationParcelsToPlaceList.add(stationParcelsToPlace);
        }
        try {
            saveBatch(stationParcelsToPlaceList);
        } catch (Exception e) {
            throw new ServiceException(ERROR_CODE_400, "Maybe some parcels have been received. Please check.");
        }
    }

    @Override
    public List<ParcelInfoDTO> getPlaceParcelsRecordsOfStation(Integer stationManagerId, Integer stationId) {
        List<ParcelInfoDTO> parcelInfoDTOList = new ArrayList<>();
        List<Integer> parcelIds = listObjs(Wrappers.<StationParcelsToPlace>lambdaQuery().select(StationParcelsToPlace::getParcelId).eq(StationParcelsToPlace::getStationManagerId, stationManagerId).eq(StationParcelsToPlace::getStationId, stationId).eq(StationParcelsToPlace::getPlaceStatus,false), o -> (Integer) o);
        if (parcelIds.isEmpty()) {
            return parcelInfoDTOList;
        }
        for(Integer parcelId : parcelIds) {
            ParcelInfoDTO parcelInfoDTO = new ParcelInfoDTO();
            Parcel parcel = parcelMapper.selectById(parcelId);
            // get parcel related info
            String trackingCode = parcelTrackingCodeMapper.selectOne(new LambdaQueryWrapper<ParcelTrackingCode>().eq(ParcelTrackingCode::getParcelId, parcelId)).getParcelTrackingCode();
            Optional<ParcelPickupCode> pickupCodeObj = ofNullable(parcelPickupCodeMapper.selectOne(new LambdaQueryWrapper<ParcelPickupCode>().eq(ParcelPickupCode::getParcelId, parcelId)));
            parcel.setParcelTrackingCode(trackingCode);
            parcel.setParcelPickupCode(pickupCodeObj.map(ParcelPickupCode::getPickupCode).orElse(null));
            parcelInfoDTO.setParcel(parcel);
            Courier courier = courierService.getOneCourierFullObjectInfo(courierDeliveryRecordMapper.getCourierIdByParcelId(parcelId));
            parcelInfoDTO.setTruckInfo(truckMapper.selectById(courier.getTruckId()));
            parcelInfoDTO.setCourier(courier);
            parcelInfoDTOList.add(parcelInfoDTO);
        }

        return parcelInfoDTOList;
    }

    @Override
    public List<Integer> getPlacedParcelIdsOfOneStation(Integer stationId) {
        return listObjs(Wrappers.<StationParcelsToPlace>lambdaQuery().select(StationParcelsToPlace::getParcelId).eq(StationParcelsToPlace::getStationId, stationId).eq(StationParcelsToPlace::getPlaceStatus,true), o -> (Integer) o);
    }

    @Override
    public void deletePlaceParcelsRecordsOfStation(Integer stationManagerId, Integer stationId) {
        try {
            lambdaUpdate().eq(StationParcelsToPlace::getStationManagerId, stationManagerId).eq(StationParcelsToPlace::getStationId, stationId).remove();
        } catch (Exception e) {
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
    }

    @Override
    public void updatePlaceStatusOfParcel(Integer parcelId) {
        try {
            lambdaUpdate().set(StationParcelsToPlace::getPlaceStatus, true).eq(StationParcelsToPlace::getParcelId, parcelId).update();
        } catch (Exception e) {
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
    }

    @Override
    public void resetAllPlaceStatusOfOneStation(Integer stationId) {
        try {
            lambdaUpdate().set(StationParcelsToPlace::getPlaceStatus, false).eq(StationParcelsToPlace::getStationId, stationId).update();
        } catch (Exception e) {
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
    }

    @Override
    public void deleteAllPlaceParcelsRecords() {
        lambdaUpdate().remove();
    }
}
