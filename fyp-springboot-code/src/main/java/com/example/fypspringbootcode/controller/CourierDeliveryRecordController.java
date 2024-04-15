package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.entity.CourierDeliveryRecord;
import com.example.fypspringbootcode.service.ICourierDeliveryRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-13
 */
@CrossOrigin
@RestController
@RequestMapping("/courierDeliveryRecord")
public class CourierDeliveryRecordController {

    @Autowired
    ICourierDeliveryRecordService courierDeliveryRecordService;

    @GetMapping("/v1/today-tasks/{courierId}")
    public Result getTodayDeliveryTasksById(@PathVariable Integer courierId) {
        List<CourierDeliveryRecord> courierTasks = courierDeliveryRecordService.getTodayDeliveryTasksById(courierId);
        return Result.success(courierTasks , "The today delivery tasks of this courier has been found successfully.");
    }

    @DeleteMapping("/v1/finish-tasks/{courierId}")
    public Result deleteAllDeliveryRecordsOfOneCourier(@PathVariable Integer courierId) {
        courierDeliveryRecordService.deleteAllDeliveryRecordsOfOneCourier(courierId);
        return Result.success("Delete all delivery tasks of this courier successfully.");
    }

    @DeleteMapping("/v1/reset-all-tasks")
    public Result resetAllDeliveryRecords() {
        courierDeliveryRecordService.resetAllDeliveryRecords();
        return Result.success("Reset all delivery records successfully.");
    }

}
