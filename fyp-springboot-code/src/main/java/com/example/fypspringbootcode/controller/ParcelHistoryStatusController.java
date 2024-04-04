package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.controller.request.RefreshStatusInBatchRequest;
import com.example.fypspringbootcode.service.IParcelHistoryStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-10
 */
@CrossOrigin
@RestController
@RequestMapping("/parcelHistoryStatus")
public class ParcelHistoryStatusController {

    @Autowired
    private IParcelHistoryStatusService parcelHistoryStatusService;

    @PutMapping("/v1/refresh-status/{parcelTrackingCode}/{statusInfo}")
    public Result refreshParcelHistoryStatus(@PathVariable String parcelTrackingCode, @PathVariable String statusInfo) {
        parcelHistoryStatusService.refreshParcelHistoryStatus(parcelTrackingCode, statusInfo);
        return Result.success("Refresh parcel history status successfully.");
    }

    @PostMapping("/v1/refresh-status-in-batch/{statusInfo}")
    public Result refreshParcelHistoryStatusInBatch(@RequestBody RefreshStatusInBatchRequest request, @PathVariable String statusInfo) {
        parcelHistoryStatusService.refreshParcelHistoryStatusInBatch(request.getParcelTrackingCodes(), statusInfo);
        return Result.success("Refresh all parcels history status in batch successfully.");
    }

}
