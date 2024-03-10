package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.entity.Truck;
import com.example.fypspringbootcode.service.ITruckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-13
 */
@CrossOrigin
@RestController
@RequestMapping("/truck")
public class TruckController {

    @Autowired
    ITruckService truckService;

    @PutMapping("/v1/update/{truckId}")
    public Result updateTruckInfo(@RequestBody Truck truck, @PathVariable Integer truckId) {
        Truck updatedTruck = truckService.updateTruckInfo(truck, truckId);
        return Result.success(updatedTruck, "The truck has been updated successfully");
    }

}
