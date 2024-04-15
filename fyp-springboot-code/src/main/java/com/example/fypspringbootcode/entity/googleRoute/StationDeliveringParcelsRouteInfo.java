package com.example.fypspringbootcode.entity.googleRoute;

import lombok.Data;

import java.util.List;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 10/04/2024 05:52
 **/
@Data
public class StationDeliveringParcelsRouteInfo {
    private List<String> parcelTrackingCodes;
    private List<String> routeAddresses;
}
