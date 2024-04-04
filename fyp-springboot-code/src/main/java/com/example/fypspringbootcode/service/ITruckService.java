package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.entity.Truck;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-13
 */
public interface ITruckService extends IService<Truck> {

    Truck updateTruckInfo(Truck truck, Integer truckId);

    Integer allocateTruckIdToCourier(List<Integer> parcelIds);

    void disableTruck(Integer truckId);

    void resetTruckStatus(Integer truckId);

    void resetTruckStatusInBatch(List<Integer> truckIds);
}
