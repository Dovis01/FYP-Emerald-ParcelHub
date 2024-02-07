package com.example.fypspringbootcode.controller.request;

import lombok.Data;

/**
 * @title:FinalYearProjectCode
 * @description:<TODO description class purpose>
 * @author: Shijin Zhang
 * @version:1.0.0
 * @create:05/02/2024 08:03
 **/
@Data
public class BaseRegisterRequest {
    private String username;
    private String email;
    private String password;
}
