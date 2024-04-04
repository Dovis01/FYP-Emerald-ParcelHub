package com.example.fypspringbootcode.controller.dto;

import lombok.Data;

import java.time.LocalDate;

/**
 * @title:FinalYearProjectCode
 * @description:<TODO description class purpose>
 * @author: Shijin Zhang
 * @version:1.0.0
 * @create:14/02/2024 01:59
 **/
@Data
public class LoginStationManagerDTO {
    // station manager table
    private Integer stationManagerId;
    private Integer employeeId;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean stationManagerStatus;
    // parcel station table
    private Integer stationId;
    private String communityName;
    private String address;
    private Integer shelvesTotalNumber;
    private Integer parcelTotalNumber;
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
