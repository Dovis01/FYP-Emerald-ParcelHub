package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.service.IParcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-02
 */
@CrossOrigin
@RestController
@RequestMapping("/parcel")
public class ParcelController {

    @Autowired
    IParcelService parcelService;

    @GetMapping("/v1/part-data/customer/{customerId}")
    public Result getParcelDataOfSomeCustomer(@PathVariable Integer customerId) {
        ArrayList<Map<String, Object>> parcelDataOfCustomer = parcelService.getParcelDataByCustomerId(customerId);
        return Result.success(parcelDataOfCustomer, "Get parcels data of this customer successfully");
    }

    @GetMapping("/v1/part-data/parcel-station/delivering/{stationId}")
    public Result getDeliveringParcelsDataOfParcelStation(@PathVariable Integer stationId) {
        ArrayList<Map<String, Object>> parcelDataOfStation = parcelService.getParcelsDataDeliveringToStationByStationId(stationId);
        return Result.success(parcelDataOfStation, "Get delivering parcels data of this parcel station successfully");
    }

    @GetMapping("/v1/part-data/parcel-station/stored/{stationId}")
    public Result getStoredParcelsDataOfParcelStation(@PathVariable Integer stationId) {
        ArrayList<Map<String, Object>> parcelDataOfStation = parcelService.getParcelsDataStoredInStationByStationId(stationId);
        return Result.success(parcelDataOfStation, "Get stored parcels data of this parcel station successfully");
    }

}
