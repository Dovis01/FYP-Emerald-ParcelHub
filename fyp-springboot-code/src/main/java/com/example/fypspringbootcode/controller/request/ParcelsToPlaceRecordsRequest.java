package com.example.fypspringbootcode.controller.request;

import lombok.Data;

import java.util.List;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 10/04/2024 16:43
 **/
@Data
public class ParcelsToPlaceRecordsRequest {
    private List<Integer> parcelIds;
}
