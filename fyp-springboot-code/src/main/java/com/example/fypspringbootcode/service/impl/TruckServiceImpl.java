package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.fypspringbootcode.entity.Parcel;
import com.example.fypspringbootcode.entity.Truck;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.ParcelMapper;
import com.example.fypspringbootcode.mapper.TruckMapper;
import com.example.fypspringbootcode.service.ITruckService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
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

    @Autowired
    private ParcelMapper parcelMapper;

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
    public Integer allocateTruckIdToCourier(List<Integer> parcelIds) {
        List<Parcel> parcels = parcelMapper.selectBatchIds(parcelIds);

        // Sort parcels by volume in descending order to pack larger parcels first
        parcels.sort(Comparator.comparing(Parcel::getVolume).reversed());

        List<Truck> availableTrucks = list(new LambdaQueryWrapper<Truck>()
                .eq(Truck::getTruckStatus, true) // Select only available trucks
                .orderByAsc(Truck::getVolume)); // We start with the smallest truck

        for (Truck truck : availableTrucks) {
            if (canAccommodateParcels(parcels, truck)) {
                disableTruck(truck.getTruckId());
                return truck.getTruckId();
            }
        }

        throw new ServiceException(ERROR_CODE_404, "No available truck can accommodate the parcels.");
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

    @Override
    public void resetTruckStatus(Integer truckId) {
        if(truckId == null){
            return;
        }
        Truck truck = new Truck();
        truck.setTruckId(truckId);
        truck.setTruckStatus(true);
        boolean isUpdated;
        try {
            isUpdated = updateById(truck);
        } catch (Exception e) {
            log.error("The mybatis has failed to reset the truck {}", truckId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (!isUpdated) {
            throw new ServiceException(ERROR_CODE_404, "The truck id provided is wrong, find no matched one to reset truck");
        }
    }

    @Override
    public void resetTruckStatusInBatch(List<Integer> truckIds) {
        if(truckIds.isEmpty()){
            return;
        }
        boolean isUpdated;
        try {
            isUpdated = lambdaUpdate().set(Truck::getTruckStatus, true).in(Truck::getTruckId, truckIds).update();
        } catch (Exception e) {
            log.error("The mybatis has failed to reset all trucks", e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (!isUpdated) {
            throw new ServiceException(ERROR_CODE_404, "No truck is available to reset");
        }
    }


    /**
     * Core Algorithm:
     *  Knapsack Problem: Consider the truck as a knapsack and the parcels as items, including the length, width, height, weight and volume constraints.
     *  Helper method to check if the truck can accommodate the parcels
     * */
    private boolean canAccommodateParcels(List<Parcel> parcels, Truck truck) {
        BigDecimal totalHeight = BigDecimal.ZERO; // 总高度
        BigDecimal currentLayerArea = BigDecimal.ZERO;
        BigDecimal truckArea = truck.getStorageAreaLength().multiply(truck.getStorageAreaWidth());

        for (Parcel parcel : parcels) {
            BigDecimal parcelArea = parcel.getLength().multiply(parcel.getWidth());

            // Check if the parcel's dimensions are smaller than the truck's dimensions
            boolean isParcelSizeAcceptable = parcel.getLength().compareTo(truck.getStorageAreaLength()) <= 0
                    && parcel.getWidth().compareTo(truck.getStorageAreaWidth()) <= 0;

            // Check if the parcel can be placed in the current layer
            if (currentLayerArea.add(parcelArea).compareTo(truckArea) <= 0 && isParcelSizeAcceptable) {
                currentLayerArea = currentLayerArea.add(parcelArea);
            } else {
                // Start a new layer if the parcel's size is acceptable
                if (isParcelSizeAcceptable) {
                    currentLayerArea = parcelArea; // Reset the layer area for the new layer
                    totalHeight = totalHeight.add(parcel.getHeight()); // Accumulate the total height with the current parcel's height
                    if (totalHeight.compareTo(truck.getStorageAreaHeight()) > 0) {
                        return false; // Cannot stack any more layers
                    }
                } else {
                    return false; // Parcel's dimensions are not acceptable
                }
            }

            // Add the initial height by the first parcel since it wasn't added above
            if (totalHeight.equals(BigDecimal.ZERO)) {
                totalHeight = totalHeight.add(parcel.getHeight());
                if (totalHeight.compareTo(truck.getStorageAreaHeight()) > 0) {
                    return false;
                }
            }

            // Check weight separately
            if (parcel.getWeight().compareTo(truck.getMaxWeight()) > 0) {
                return false; // Truck cannot carry the weight
            }
        }
        return true; // Truck can accommodate the parcels
    }
}
