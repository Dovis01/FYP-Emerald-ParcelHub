package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.controller.dto.InfoNotificationResultDTO;
import com.example.fypspringbootcode.controller.request.InfoNotificationRequest;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 13/04/2024 07:36
 **/
public interface IInfoNotificationService {

    InfoNotificationResultDTO sendNotification(InfoNotificationRequest request, String sendWay);
}
