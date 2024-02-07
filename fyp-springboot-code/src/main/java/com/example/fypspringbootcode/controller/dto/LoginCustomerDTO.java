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
    private Integer customerId;
    private String fullName;
    private String username;
    private String email;
    private String token;
}
