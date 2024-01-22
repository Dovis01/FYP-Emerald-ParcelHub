package com.example.fypspringbootcode.controller.request;

import lombok.Data;

@Data
public class LoginUsernameRequest {
    private String username;
    private String password;
}
