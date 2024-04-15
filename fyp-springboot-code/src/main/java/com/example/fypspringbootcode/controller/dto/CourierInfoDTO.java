package com.example.fypspringbootcode.controller.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 08/04/2024 22:24
 **/

@Data
public class CourierInfoDTO {
    // courier table
    private Integer courierId;
    private String workType;
    private Integer dailyMaxDistributionParcelsNum;
    private Integer remainingParcelsNumToDistribute;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Europe/Dublin")
    private LocalDateTime registerTime;
    private Boolean courierStatus;
    // truck table
    private String truckType;
    private String truckPlateNumber;
    private BigDecimal maxWeight;
    private BigDecimal storageAreaHeight;
    private BigDecimal storageAreaLength;
    private BigDecimal storageAreaWidth;
    private BigDecimal volume;
    private Boolean truckStatus;
    // company employee table
    private String fullName;
    private String employeeCode;
}
