package com.example.fypspringbootcode.controller.dto;

import lombok.Data;

/**
 * @title:FinalYearProjectCode
 * @description:<TODO description class purpose>
 * @author: Shijin Zhang
 * @version:1.0.0
 * @create:04/02/2024 08:38
 **/
@Data
public class LoginCustomerDTO {
    // customer table
    private Integer customerId;
    private String roleType;
    private String fullName;
    private String avatar;
    private String phoneNumber;
    private String country;
    private String city;
    private String address;
    // registered account table
    private Integer accountId;
    private String username;
    private String email;
    private Boolean status;
    private String token;
}
