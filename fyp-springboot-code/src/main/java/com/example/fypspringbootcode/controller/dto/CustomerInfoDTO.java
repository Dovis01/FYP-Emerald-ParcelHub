package com.example.fypspringbootcode.controller.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 08/04/2024 22:23
 **/

@Data
public class CustomerInfoDTO {
    // customer table
    private Integer customerId;
    private String fullName;
    private String phoneNumber;
    private String orderEmail;
    private String city;
    private String country;
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
