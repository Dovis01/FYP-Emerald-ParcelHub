package com.example.fypspringbootcode.controller.request;

import lombok.Data;

import java.util.List;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 02/04/2024 23:13
 **/
@Data
public class RefreshStatusInBatchRequest {
    List<String> parcelTrackingCodes;
}
