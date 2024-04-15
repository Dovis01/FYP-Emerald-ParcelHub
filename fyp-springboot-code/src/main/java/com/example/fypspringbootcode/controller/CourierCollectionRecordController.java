package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.entity.CourierCollectionRecord;
import com.example.fypspringbootcode.service.ICourierCollectionRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-19
 */
@CrossOrigin
@RestController
@RequestMapping("/courierCollectionRecord")
public class CourierCollectionRecordController {

    @Autowired
    ICourierCollectionRecordService courierCollectionRecordService;

    @GetMapping("/v1/today-tasks/{courierId}")
    public Result getTodayCollectionTasksById(@PathVariable Integer courierId) {
        List<CourierCollectionRecord> courierTasks = courierCollectionRecordService.getTodayCollectionTasksById(courierId);
        return Result.success(courierTasks , "The today collection tasks of this courier has been found successfully.");
    }

    @DeleteMapping("/v1/finish-tasks/{courierId}")
    public Result deleteAllCollectionRecordsOfOneCourier(@PathVariable Integer courierId) {
        courierCollectionRecordService.deleteAllCollectionRecordsOfOneCourier(courierId);
        return Result.success("Delete all collection tasks of this courier successfully.");
    }

    @DeleteMapping("/v1/reset-all-tasks")
    public Result resetAllCollectionRecords() {
        courierCollectionRecordService.resetAllCollectionRecords();
        return Result.success("Reset all collection records successfully.");
    }

}
