package com.example.fypspringbootcode.controller.dto;

import lombok.Data;

import java.math.BigDecimal;

/**
 * @title:FinalYearProjectCode
 * @description:<TODO description class purpose>
 * @author: Shijin Zhang
 * @version:1.0.0
 * @create:11/02/2024 05:29
 **/
@Data
public class LoginCourierDTO {
    // courier table
    private Integer courierId;
    private Integer employeeId;
    private Integer dailyDistributionParcelsNum;
    private String workType;
    private Boolean courierStatus;
    // truck table
    private String truckType;
    private String truckPlateNumber;
    private BigDecimal maxWeight;
    private BigDecimal storageAreaHeight;
    private BigDecimal storageAreaLength;
    private BigDecimal storageAreaWidth;
    private BigDecimal volume;
    // company employee table
    private String fullName;
    private String employeeCode;
    private Integer phoneNumber;
    private String avatar;
    private String workCity;
    private String roleType;
    // parcel hub company table
    private String companyName;
    private String companyType;
    // registered account table
    private String accountId;
    private String username;
    private String email;
    private String password;
    private Boolean status;
    private String token;
}
