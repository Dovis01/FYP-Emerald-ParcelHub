package com.example.fypspringbootcode.entity.googleRoute;

import lombok.Data;

import java.util.List;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 25/03/2024 19:28
 **/
@Data
public class CourierDeliveryRouteInfo {
    private List<String> parcelTrackingCodes;
    private String address;
}
