package com.example.fypspringbootcode.controller.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 08/04/2024 22:21
 **/

@Data
public class CompanyEmployeeInfoDTO {
    // company employee table
    private Integer employeeId;
    private String fullName;
    private String employeeCode;
    private String phoneNumber;
    private String roleType;
    // parcel hub company table
    private String companyName;
    private String companyType;
    private String country;
    private String city;
    private String address;
    // register account table
    private String username;
    private String email;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Europe/Dublin")
    private LocalDateTime registerTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Europe/Dublin")
    private LocalDateTime updateTime;
    private Boolean status;
}
