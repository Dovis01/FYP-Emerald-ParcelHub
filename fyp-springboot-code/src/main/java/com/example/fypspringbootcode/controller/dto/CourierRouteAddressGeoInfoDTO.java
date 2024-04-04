package com.example.fypspringbootcode.controller.dto;

import com.example.fypspringbootcode.entity.GoogleGeocodingCache;
import lombok.Data;

import java.util.List;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 25/03/2024 23:03
 **/
@Data
public class CourierRouteAddressGeoInfoDTO {
    private List<String> parcelTrackingCodes;
    private GoogleGeocodingCache addressGeoInfo;
}
