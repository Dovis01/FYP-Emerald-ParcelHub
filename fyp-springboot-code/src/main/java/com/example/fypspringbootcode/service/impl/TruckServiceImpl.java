package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.fypspringbootcode.entity.Truck;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.TruckMapper;
import com.example.fypspringbootcode.service.ITruckService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.fypspringbootcode.common.ErrorCodeList.*;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-13
 */
@Service
@Slf4j
public class TruckServiceImpl extends ServiceImpl<TruckMapper, Truck> implements ITruckService {

    @Override
    public Truck updateTruckInfo(Truck truck, Integer truckId) {
        truck.setTruckId(truckId);

        // Update the record
        boolean isUpdated;
        try {
            isUpdated = updateById(truck);
        } catch (Exception e) {
            log.error("The mybatis has failed to update the truck {}", truckId, e);
            throw new ServiceException(ERROR_CODE_400, "The truck info provided to update is null, please check it again");
        }
        if (!isUpdated) {
            throw new ServiceException(ERROR_CODE_404, "The truck id provided is wrong, find no matched one to update truck info");
        }

        // Return the updated record
        Truck updatedTruck;
        try {
            updatedTruck = getById(truckId);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the updated truck {}", truckId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (updatedTruck == null) {
            throw new ServiceException(ERROR_CODE_404, "The truck id provided is wrong, find no matched updated truck to get");
        }
        return updatedTruck;
    }

    @Override
    public Integer allocateTruckIdToCourier() {
        LambdaQueryWrapper<Truck> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.select(Truck::getTruckId).eq(Truck::getTruckStatus, true);
        List<Integer> availableTruckIds;
        try {
            availableTruckIds = listObjs(queryWrapper, o -> (Integer) o);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the trucks", e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if(availableTruckIds.isEmpty()){
            return null;
        }else {
            return availableTruckIds.get(0);
        }
    }

    @Override
    public void disableTruck(Integer truckId) {
        if(truckId == null){
           return;
        }
        Truck truck = new Truck();
        truck.setTruckId(truckId);
        truck.setTruckStatus(false);
        boolean isUpdated;
        try {
            isUpdated = updateById(truck);
        } catch (Exception e) {
            log.error("The mybatis has failed to disable the truck {}", truckId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (!isUpdated) {
            throw new ServiceException(ERROR_CODE_404, "The truck id provided is wrong, find no matched one to disable truck");
        }
    }
}
