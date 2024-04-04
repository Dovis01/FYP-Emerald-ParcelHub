package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.controller.dto.CourierRouteAddressGeoInfoDTO;
import com.example.fypspringbootcode.controller.dto.CusTrackParcelGeoRouteDTO;
import com.example.fypspringbootcode.controller.request.RouteGeoAddressRequest;
import com.example.fypspringbootcode.controller.request.TransferAddressRequest;
import com.example.fypspringbootcode.entity.GoogleGeocodingCache;
import com.example.fypspringbootcode.service.IGoogleGeocodingCacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-13
 */
@CrossOrigin
@RestController
@RequestMapping("/googleGeocodingCache")
public class GoogleGeocodingCacheController {

    @Autowired
    IGoogleGeocodingCacheService googleGeocodingCacheService;

    @PostMapping("/v1/transfer/route-addresses/cus-track-parcel")
    public Result transferCusTrackParcelRouteAddresses(@RequestBody RouteGeoAddressRequest request) {
        List<CusTrackParcelGeoRouteDTO> geoRoutes= googleGeocodingCacheService.transferCusTrackParcelRouteAddresses(request);
        return Result.success(geoRoutes, "Get route records for customer tracking parcel with latitude and longitude successfully.");
    }

    @PostMapping("/v1/transfer/route-addresses/courier-collection")
    public Result transferCourierCollectionRouteAddresses(@RequestBody RouteGeoAddressRequest request) {
        List<CourierRouteAddressGeoInfoDTO> geoRoutes= googleGeocodingCacheService.transferCourierCollectionRouteAddresses(request);
        return Result.success(geoRoutes, "Get route records for courier collection with latitude and longitude successfully.");
    }

    @PostMapping("/v1/transfer/route-addresses/courier-delivery")
    public Result transferCourierDeliveryRouteAddresses(@RequestBody RouteGeoAddressRequest request) {
        List<CourierRouteAddressGeoInfoDTO> geoRoutes= googleGeocodingCacheService.transferCourierDeliveryRouteAddresses(request);
        return Result.success(geoRoutes, "Get route records for courier delivery with latitude and longitude successfully.");
    }

    @PostMapping("/v1/transfer/addresses")
    public Result transferAddresses(@RequestBody TransferAddressRequest request) {
        List<GoogleGeocodingCache> addresses= googleGeocodingCacheService.transferAddresses(request);
        return Result.success(addresses, "Get latitude and longitude of the addresses successfully.");
    }

}
