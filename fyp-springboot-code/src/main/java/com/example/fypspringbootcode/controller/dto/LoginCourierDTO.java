package com.example.fypspringbootcode.controller.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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
    private Integer dailyMaxDistributionParcelsNum;
    private Integer remainingParcelsNumToDistribute;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Europe/Dublin")
    private LocalDateTime registerTime;
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
    private String phoneNumber;
    private String avatar;
    private String workCity;
    private String roleType;
    // parcel hub company table
    private String companyName;
    private String companyType;
    private String country;
    private String city;
    // registered account table
    private String accountId;
    private String username;
    private String email;
    private String password;
    private Boolean status;
    private String token;
}
