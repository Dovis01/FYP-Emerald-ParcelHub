package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.fypspringbootcode.entity.ParcelStation;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.ParcelStationMapper;
import com.example.fypspringbootcode.service.IParcelStationService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

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
}
