package com.example.fypspringbootcode.controller.request;

import lombok.Data;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 12/04/2024 07:04
 **/
@Data
public class StoreParcelInfoRequest {
    private Integer mainShelfSerialNumber;
    private Integer floorSerialNumber;
    private Integer maxStorageParcelNumber;
}
