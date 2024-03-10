package com.example.fypspringbootcode.controller.request;

import lombok.Data;

@Data
public class ResetPasswordRequest {
    private String adminName;
    private String username;
    private String email;
    private String newPassword;
}
