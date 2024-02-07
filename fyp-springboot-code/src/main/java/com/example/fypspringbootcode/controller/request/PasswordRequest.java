package com.example.fypspringbootcode.controller.request;

import lombok.Data;

@Data
public class PasswordRequest {
    private String username;
    private String email;
    private String newPassword;
}
