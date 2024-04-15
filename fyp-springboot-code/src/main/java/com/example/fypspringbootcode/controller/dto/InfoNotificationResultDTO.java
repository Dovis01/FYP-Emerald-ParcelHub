package com.example.fypspringbootcode.controller.dto;

import lombok.Data;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 13/04/2024 08:28
 **/
@Data
public class InfoNotificationResultDTO {
    private String messageId;

    public InfoNotificationResultDTO(String messageId) {
        this.messageId = messageId;
    }

}
