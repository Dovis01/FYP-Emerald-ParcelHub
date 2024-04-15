package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.controller.dto.ParcelInfoDTO;
import com.example.fypspringbootcode.controller.request.ParcelsToPlaceRecordsRequest;
import com.example.fypspringbootcode.service.IStationParcelsToPlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Shijin Zhang
 * @since 2024-04-10
 */
@CrossOrigin
@RestController
@RequestMapping("/stationParcelsToPlace")
public class StationParcelsToPlaceController {

    @Autowired
    IStationParcelsToPlaceService iStationParcelsToPlaceService;

    @PostMapping("/v1/place-parcels-records/{stationManagerId}/{stationId}")
    public Result addPlaceParcelsRecordsOfStation(@RequestBody ParcelsToPlaceRecordsRequest request, @PathVariable Integer stationManagerId, @PathVariable Integer stationId) {
        iStationParcelsToPlaceService.addPlaceParcelsRecordsOfStation(request, stationManagerId, stationId);
        return Result.success("Add place parcels records of this station successfully");
    }

    @GetMapping("/v1/search/place-parcels-records/{stationManagerId}/{stationId}")
    public Result getPlaceParcelsRecordsOfStation(@PathVariable Integer stationManagerId, @PathVariable Integer stationId) {
        List<ParcelInfoDTO> parcelsRecords = iStationParcelsToPlaceService.getPlaceParcelsRecordsOfStation(stationManagerId, stationId);
        return Result.success(parcelsRecords, "Get place parcels records of this station successfully");
    }

    @DeleteMapping("/v1/remove/place-parcels-records/{stationManagerId}/{stationId}")
    public Result deletePlaceParcelsRecordsOfStation(@PathVariable Integer stationManagerId, @PathVariable Integer stationId) {
        iStationParcelsToPlaceService.deletePlaceParcelsRecordsOfStation(stationManagerId, stationId);
        return Result.success("Delete place parcels records of this station successfully");
    }
}
