package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.example.fypspringbootcode.entity.Courier;
import com.example.fypspringbootcode.entity.CourierCollectionRecord;
import com.example.fypspringbootcode.entity.Parcel;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.CourierCollectionRecordMapper;
import com.example.fypspringbootcode.mapper.SenderMapper;
import com.example.fypspringbootcode.mapper.TruckMapper;
import com.example.fypspringbootcode.service.*;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_400;
import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_500;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-19
 */
@Service
@Slf4j
public class CourierCollectionRecordServiceImpl extends ServiceImpl<CourierCollectionRecordMapper, CourierCollectionRecord> implements ICourierCollectionRecordService {

    @Autowired
    private IParcelService parcelService;

    @Autowired
    private IParcelHistoryStatusService parcelHistoryStatusService;

    @Autowired
    private ICourierService courierService;

    @Autowired
    private ITruckService truckService;

    @Autowired
    private TruckMapper truckMapper;

    @Autowired
    private SenderMapper senderMapper;

    private final Comparator<Courier> courierCapacityComparator = Comparator.comparingInt(Courier::getRemainingParcelsNumToDistribute).reversed();

    @Transactional
    @Override
    public List<CourierCollectionRecord> getTodayCollectionTasksById(Integer courierId) {
        if(!lambdaQuery().exists()){
            // Allocate collection tasks to couriers
            allocateCourierCollectionTasks();
        }

        List<CourierCollectionRecord> collectionRecordsDTO = new ArrayList<>();
        List<CourierCollectionRecord> courierCollectionRecords = lambdaQuery().eq(CourierCollectionRecord::getCourierId, courierId).list();
        for (CourierCollectionRecord courierCollectionRecord : courierCollectionRecords) {
            courierCollectionRecord.setSender(senderMapper.selectById(courierCollectionRecord.getSenderId()));
            courierCollectionRecord.setTruck(truckMapper.selectById(courierCollectionRecord.getTruckId()));
            courierCollectionRecord.setCourier(courierService.getOneCourierFullObjectInfo(courierCollectionRecord.getCourierId()));
            courierCollectionRecord.setParcel(parcelService.getOneParcelFullInfo(courierCollectionRecord.getParcelId()));
            collectionRecordsDTO.add(courierCollectionRecord);
        }
        return collectionRecordsDTO;
    }

    @Transactional
    @Override
    public void deleteAllCollectionRecordsOfOneCourier(Integer courierId) {
        List<CourierCollectionRecord> courierCollectionRecords = lambdaQuery().eq(CourierCollectionRecord::getCourierId, courierId).list();
        if(courierCollectionRecords.isEmpty()){
            throw new ServiceException(ERROR_CODE_400, "The courier has no collection tasks. No assigned or finished tasks.");
        }
        courierService.resetOneCourier(courierId, courierCollectionRecords.size());
        truckService.resetTruckStatus(courierCollectionRecords.get(0).getTruckId());
        lambdaUpdate().eq(CourierCollectionRecord::getCourierId, courierId).remove();
    }

    @Transactional
    @Override
    public void resetAllCollectionRecords() {
        List<Integer> truckIds = list().stream().map(CourierCollectionRecord::getTruckId).distinct().toList();
        parcelHistoryStatusService.resetParcelsToBeCollected();
        truckService.resetTruckStatusInBatch(truckIds);
        courierService.resetSomeWorkTypeAllCouriers("Collect Parcels");
        lambdaUpdate().remove();
    }

    private void allocateCourierCollectionTasks() {
        /**
         * Core Algorithm:
         *  Create a priority queue for allocating collection couriers based on their remaining capacity
         * */
        PriorityQueue<Courier> courierQueue = new PriorityQueue<>(courierCapacityComparator);

        // Load couriers and their current capacities
        List<Courier> availableCouriers = courierService.getSomeWorkTypeAllAvailableCouriers("Collect Parcels");
        for (Courier courier : availableCouriers) {
            int assignedParcelsNum = countAssignedParcelsForCourier(courier.getCourierId());
            courier.setRemainingParcelsNumToDistribute(courier.getRemainingParcelsNumToDistribute() - assignedParcelsNum);
            courierQueue.add(courier);
        }

        // Fetch unassigned parcels in batches to be distributed to couriers
        List<Parcel> parcelsToBeCollected = parcelService.getAllParcelsToBeCollected();
        for (Parcel parcel : parcelsToBeCollected) {
            if (courierQueue.isEmpty()) {
                // Handle the case where there are no couriers with remaining capacity
                break;
            }

            Courier assignedCourier = courierQueue.poll();

            // Assign the parcel to the courier and decrease the courier's remaining capacity
            insertCourierCollectionRecord(assignedCourier.getCourierId(), parcel);
            assignedCourier.setRemainingParcelsNumToDistribute(assignedCourier.getRemainingParcelsNumToDistribute() - 1);

            // If the courier still has capacity, add them back to the queue
            if (assignedCourier.getRemainingParcelsNumToDistribute() > 0) {
                courierQueue.add(assignedCourier);
            }

            // Add the parcel status history and update courier info to the database
            parcelHistoryStatusService.addParcelHistoryStatusInfo(parcel.getParcelId(), "To be collected");
            courierService.updateInfo(assignedCourier, assignedCourier.getCourierId());
        }

        LambdaQueryWrapper<CourierCollectionRecord> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.select(CourierCollectionRecord::getCourierId).groupBy(CourierCollectionRecord::getCourierId);
        List<Integer> uniqueCourierIds = listObjs(queryWrapper, o -> (Integer) o);
        for (Integer courierId : uniqueCourierIds) {
            LambdaQueryWrapper<CourierCollectionRecord> queryCourier = new LambdaQueryWrapper<>();
            queryCourier.select(CourierCollectionRecord::getParcelId).eq(CourierCollectionRecord::getCourierId, courierId);
            List<Integer> parcelIds = listObjs(queryCourier, o -> (Integer) o);
            Integer allocatedTruckId = truckService.allocateTruckIdToCourier(parcelIds);

            // Update the truck id for the courier
            LambdaUpdateWrapper<CourierCollectionRecord> updateWrapper = new LambdaUpdateWrapper<>();
            updateWrapper.set(CourierCollectionRecord::getTruckId, allocatedTruckId)
                    .eq(CourierCollectionRecord::getCourierId, courierId);
            update(updateWrapper);
            // Update the truck id for the courier
            Courier courier = new Courier();
            courier.setTruckId(allocatedTruckId);
            courierService.updateInfo(courier, courierId);
        }
    }


    private Integer countAssignedParcelsForCourier(Integer courierId) {
        LambdaQueryWrapper<CourierCollectionRecord> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(CourierCollectionRecord::getCourierId, courierId);
        return Math.toIntExact(count(queryWrapper));
    }

    private void insertCourierCollectionRecord(Integer courierId, Parcel parcel) {
        CourierCollectionRecord courierCollectionRecord = new CourierCollectionRecord();
        courierCollectionRecord.setCourierId(courierId);
        courierCollectionRecord.setParcelId(parcel.getParcelId());
        courierCollectionRecord.setSenderId(parcel.getSenderId());
        try {
            save(courierCollectionRecord);
        } catch (Exception e) {
            log.error("Fail to insert the courier collection record", e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
    }
}
