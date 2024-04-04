package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.example.fypspringbootcode.entity.*;
import com.example.fypspringbootcode.entity.CourierDeliveryRecord;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.*;
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
 * @author Shijin Zhang
 * @since 2024-02-13
 */
@Service
@Slf4j
public class CourierDeliveryRecordServiceImpl extends ServiceImpl<CourierDeliveryRecordMapper, CourierDeliveryRecord> implements ICourierDeliveryRecordService {

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
    private ParcelStationMapper parcelStationMapper;

    @Autowired
    private StationManagerMapper stationManagerMapper;

    @Autowired
    private CompanyEmployeeMapper companyEmployeeMapper;

    private final Comparator<Courier> courierCapacityComparator = Comparator.comparingInt(Courier::getRemainingParcelsNumToDistribute).reversed();

    @Transactional
    @Override
    public List<CourierDeliveryRecord> getTodayDeliveryTasksById(Integer courierId) {
        if (!lambdaQuery().exists()) {
            // Allocate delivery tasks to couriers
            allocateCourierDeliveryTasks();
        }

        List<CourierDeliveryRecord> deliveryRecordsDTO = new ArrayList<>();
        List<CourierDeliveryRecord> courierDeliveryRecords = lambdaQuery().eq(CourierDeliveryRecord::getCourierId, courierId).list();
        for (CourierDeliveryRecord courierDeliveryRecord : courierDeliveryRecords) {
            Integer stationManagerEmployeeId = stationManagerMapper.selectOne(Wrappers.<StationManager>lambdaQuery().select(StationManager::getEmployeeId).eq(StationManager::getStationId, courierDeliveryRecord.getStationId())).getEmployeeId();
            courierDeliveryRecord.setParcelStationManager(companyEmployeeMapper.selectOne(Wrappers.<CompanyEmployee>lambdaQuery().select(CompanyEmployee::getFullName, CompanyEmployee::getPhoneNumber).eq(CompanyEmployee::getEmployeeId, stationManagerEmployeeId)));
            courierDeliveryRecord.setParcelStation(parcelStationMapper.selectById(courierDeliveryRecord.getStationId()));
            courierDeliveryRecord.setTruck(truckMapper.selectById(courierDeliveryRecord.getTruckId()));
            courierDeliveryRecord.setCourier(courierService.getOneCourierFullObjectInfo(courierDeliveryRecord.getCourierId()));
            courierDeliveryRecord.setParcel(parcelService.getOneParcelFullInfo(courierDeliveryRecord.getParcelId()));
            deliveryRecordsDTO.add(courierDeliveryRecord);
        }
        return deliveryRecordsDTO;
    }

    @Transactional
    @Override
    public void deleteAllDeliveryRecordsOfOneCourier(Integer courierId) {
        List<CourierDeliveryRecord> courierDeliveryRecords = lambdaQuery().eq(CourierDeliveryRecord::getCourierId, courierId).list();
        if(courierDeliveryRecords.isEmpty()) {
            throw new ServiceException(ERROR_CODE_400, "The courier has no delivery tasks. No assigned or finished tasks.");
        }
        courierService.resetOneCourier(courierId, courierDeliveryRecords.size());
        truckService.resetTruckStatus(courierDeliveryRecords.get(0).getTruckId());
        lambdaUpdate().eq(CourierDeliveryRecord::getCourierId, courierId).remove();
    }

    @Transactional
    @Override
    public void resetAllDeliveryRecords() {
        List<Integer> truckIds = list().stream().map(CourierDeliveryRecord::getTruckId).distinct().toList();
        parcelHistoryStatusService.resetParcelsToBeDelivered();
        truckService.resetTruckStatusInBatch(truckIds);
        courierService.resetSomeWorkTypeAllCouriers("Deliver Parcels");
        lambdaUpdate().remove();
    }

    private void allocateCourierDeliveryTasks() {
        /**
         * Core Algorithm:
         *  Create a priority queue for allocating delivery couriers based on their remaining capacity
         * */
        PriorityQueue<Courier> courierQueue = new PriorityQueue<>(courierCapacityComparator);

        // Load couriers and their current capacities
        List<Courier> availableCouriers = courierService.getSomeWorkTypeAllAvailableCouriers("Deliver Parcels");
        for (Courier courier : availableCouriers) {
            int assignedParcelsNum = countAssignedParcelsForCourier(courier.getCourierId());
            courier.setRemainingParcelsNumToDistribute(courier.getRemainingParcelsNumToDistribute() - assignedParcelsNum);
            courierQueue.add(courier);
        }

        // Fetch unassigned parcels in batches to be distributed to couriers
        List<Parcel> parcelsToBeDelivered = parcelService.getAllParcelsToBeDelivered();
        for (Parcel parcel : parcelsToBeDelivered) {
            if (courierQueue.isEmpty()) {
                // Handle the case where there are no couriers with remaining capacity
                break;
            }

            Courier assignedCourier = courierQueue.poll();

            // Assign the parcel to the courier and decrease the courier's remaining capacity
            insertCourierDeliveryRecord(assignedCourier.getCourierId(), parcel);
            assignedCourier.setRemainingParcelsNumToDistribute(assignedCourier.getRemainingParcelsNumToDistribute() - 1);

            // If the courier still has capacity, add them back to the queue
            if (assignedCourier.getRemainingParcelsNumToDistribute() > 0) {
                courierQueue.add(assignedCourier);
            }

            // Add the parcel status history and update courier info to the database
            parcelHistoryStatusService.addParcelHistoryStatusInfo(parcel.getParcelId(), "To be delivered");
            courierService.updateInfo(assignedCourier, assignedCourier.getCourierId());
        }

        LambdaQueryWrapper<CourierDeliveryRecord> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.select(CourierDeliveryRecord::getCourierId).groupBy(CourierDeliveryRecord::getCourierId);
        List<Integer> uniqueCourierIds = listObjs(queryWrapper, o -> (Integer) o);
        for (Integer courierId : uniqueCourierIds) {
            LambdaQueryWrapper<CourierDeliveryRecord> queryCourier = new LambdaQueryWrapper<>();
            queryCourier.select(CourierDeliveryRecord::getParcelId).eq(CourierDeliveryRecord::getCourierId, courierId);
            List<Integer> parcelIds = listObjs(queryCourier, o -> (Integer) o);
            Integer allocatedTruckId = truckService.allocateTruckIdToCourier(parcelIds);

            // Update the truck id for the courier
            LambdaUpdateWrapper<CourierDeliveryRecord> updateWrapper = new LambdaUpdateWrapper<>();
            updateWrapper.set(CourierDeliveryRecord::getTruckId, allocatedTruckId)
                    .eq(CourierDeliveryRecord::getCourierId, courierId);
            update(updateWrapper);
            // Update the truck id for the courier
            Courier courier = new Courier();
            courier.setTruckId(allocatedTruckId);
            courierService.updateInfo(courier, courierId);
        }
    }


    private Integer countAssignedParcelsForCourier(Integer courierId) {
        LambdaQueryWrapper<CourierDeliveryRecord> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(CourierDeliveryRecord::getCourierId, courierId);
        return Math.toIntExact(count(queryWrapper));
    }

    private void insertCourierDeliveryRecord(Integer courierId, Parcel parcel) {
        CourierDeliveryRecord courierDeliveryRecord = new CourierDeliveryRecord();
        courierDeliveryRecord.setCourierId(courierId);
        courierDeliveryRecord.setParcelId(parcel.getParcelId());
        courierDeliveryRecord.setStationId(parcel.getStationId());
        try {
            save(courierDeliveryRecord);
        } catch (Exception e) {
            log.error("Fail to insert the courier collection record", e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
    }
}
