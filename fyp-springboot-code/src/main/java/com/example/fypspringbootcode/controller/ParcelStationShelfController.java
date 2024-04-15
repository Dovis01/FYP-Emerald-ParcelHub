package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.controller.request.StoreParcelInfoRequest;
import com.example.fypspringbootcode.service.IParcelStationShelfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-03
 */
@CrossOrigin
@RestController
@RequestMapping("/parcelStationShelf")
public class ParcelStationShelfController {

    @Autowired
    IParcelStationShelfService parcelStationShelfService;

    @PostMapping("/v1/place-parcel/{parcelId}/{stationId}")
    public Result placeParcelToParcelStationShelf(@RequestBody StoreParcelInfoRequest request, @PathVariable Integer parcelId, @PathVariable Integer stationId) {
        parcelStationShelfService.placeParcelToParcelStationShelf(request, parcelId, stationId);
        return Result.success("Place parcel to corresponding parcel station shelf successfully");
    }

    @GetMapping("/v1/shelves-storage-data/{stationId}")
    public Result getParcelStationShelfStorageData(@PathVariable Integer stationId) {
        Map<Integer, Map<Integer, Integer>> storageData = parcelStationShelfService.getParcelStationShelfStorageData(stationId);
        return Result.success(storageData, "Get parcel station shelves storage data successfully");
    }

    @PutMapping("/v1/reset-shelves-storage-data/{stationId}")
    public Result resetOneParcelStationShelvesStorageData(@PathVariable Integer stationId) {
        parcelStationShelfService.resetOneParcelStationShelvesStorageData(stationId);
        return Result.success("Reset all shelves storage data of this station successfully");
    }

}
