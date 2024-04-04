package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.controller.dto.CourierRouteAddressGeoInfoDTO;
import com.example.fypspringbootcode.controller.dto.CusTrackParcelGeoRouteDTO;
import com.example.fypspringbootcode.controller.request.RouteGeoAddressRequest;
import com.example.fypspringbootcode.controller.request.TransferAddressRequest;
import com.example.fypspringbootcode.entity.GoogleGeocodingCache;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-13
 */
public interface IGoogleGeocodingCacheService extends IService<GoogleGeocodingCache> {

    List<CusTrackParcelGeoRouteDTO> transferCusTrackParcelRouteAddresses(RouteGeoAddressRequest request);

    List<CourierRouteAddressGeoInfoDTO> transferCourierCollectionRouteAddresses(RouteGeoAddressRequest request);

    List<CourierRouteAddressGeoInfoDTO> transferCourierDeliveryRouteAddresses(RouteGeoAddressRequest request);

    List<GoogleGeocodingCache> transferAddresses (TransferAddressRequest request);
}
