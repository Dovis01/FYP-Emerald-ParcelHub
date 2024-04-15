package com.example.fypspringbootcode.controller.dto;

import com.example.fypspringbootcode.entity.GoogleGeocodingCache;
import lombok.Data;

import java.util.List;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 10/04/2024 05:54
 **/
@Data
public class StationDeliveringParcelsGeoRouteDTO {
    private List<String> parcelTrackingCodes;
    private List<GoogleGeocodingCache> routeRecord;
}
