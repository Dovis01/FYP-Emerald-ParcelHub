package com.example.fypspringbootcode.controller.request;

/**
 * @title:FinalYearProjectCode
 * @description:<TODO description class purpose>
 * @author: Shijin Zhang
 * @version:1.0.0
 * @create:22/01/2024 08:06
 **/
import lombok.Data;

@Data
public class LoginEmailRequest {
    private String email;
    private String password;
}
