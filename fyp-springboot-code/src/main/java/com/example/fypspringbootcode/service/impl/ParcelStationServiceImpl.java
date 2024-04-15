package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.fypspringbootcode.entity.ParcelStation;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.ParcelStationMapper;
import com.example.fypspringbootcode.service.IParcelStationService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_400;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-14
 */
@Service
public class ParcelStationServiceImpl extends ServiceImpl<ParcelStationMapper, ParcelStation> implements IParcelStationService {

    @Override
    public Integer allocateParcelStation(String customerAddress) {
        String communityName = customerAddress.split(",")[1].trim();
        LambdaQueryWrapper<ParcelStation> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.like(ParcelStation::getAddress, communityName);
        ParcelStation parcelStation = getOneOpt(queryWrapper).orElseThrow(() -> new ServiceException(ERROR_CODE_400, "No parcel station found for the customer address"));
        return parcelStation.getStationId();
    }

    @Override
    public Integer allocateParcelStationToManager(String workCity) {
        LambdaQueryWrapper<ParcelStation> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(ParcelStation::getCity, workCity)
                .eq(ParcelStation::getStationAssignManagerStatus, true);

        List<ParcelStation> parcelStations = list(queryWrapper);

        if (!parcelStations.isEmpty()) {
            parcelStations.get(0).setStationAssignManagerStatus(false);
            updateById(parcelStations.get(0));
            return parcelStations.get(0).getStationId();
        } else {
            LambdaQueryWrapper<ParcelStation> fallbackQueryWrapper = new LambdaQueryWrapper<>();
            fallbackQueryWrapper.ne(ParcelStation::getCity, workCity)
                    .eq(ParcelStation::getStationAssignManagerStatus, true);

            List<ParcelStation> fallbackParcelStations = list(fallbackQueryWrapper);

            if (!fallbackParcelStations.isEmpty()) {
                fallbackParcelStations.get(0).setStationAssignManagerStatus(false);
                updateById(fallbackParcelStations.get(0));
                return fallbackParcelStations.get(0).getStationId();
            }
        }

        return null;
    }

    @Override
    public void resetParcelStationAssignmentStatus(Integer stationId) {
        lambdaUpdate().eq(ParcelStation::getStationId, stationId)
                .set(ParcelStation::getStationAssignManagerStatus, true)
                .update();
    }
}
