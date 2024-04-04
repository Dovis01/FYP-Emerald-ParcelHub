package com.example.fypspringbootcode.entity.googleRoute;

import lombok.Data;

import java.util.List;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 15/03/2024 08:00
 **/
@Data
public class CusTrackParcelRouteInfo {
    private Integer orderId;
    private List<String> routeAddresses;
}
