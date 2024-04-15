package com.example.fypspringbootcode.controller.request;

import lombok.Data;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 13/04/2024 08:22
 **/
@Data
public class InfoNotificationRequest {
    // TwilioSmsService
    private String targetPhone;
    private String phoneMessage;
    // MailjetEmailService
    private String toAddress;
    // Dynamic parameters
    private String customerName;
    private String stationAddress;
    private String pickupCode;
}
