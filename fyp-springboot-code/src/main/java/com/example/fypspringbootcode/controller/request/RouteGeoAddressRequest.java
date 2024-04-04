package com.example.fypspringbootcode.controller.request;

import com.example.fypspringbootcode.entity.googleRoute.CourierCollectionRouteInfo;
import com.example.fypspringbootcode.entity.googleRoute.CourierDeliveryRouteInfo;
import com.example.fypspringbootcode.entity.googleRoute.CusTrackParcelRouteInfo;
import lombok.Data;

import java.util.List;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 13/03/2024 07:01
 **/
@Data
public class RouteGeoAddressRequest {
    private List<CusTrackParcelRouteInfo> cusTrackParcelRouteAddresses;
    private List<CourierCollectionRouteInfo> courierCollectionRouteAddresses;
    private List<CourierDeliveryRouteInfo> courierDeliveryRouteAddresses;
}
