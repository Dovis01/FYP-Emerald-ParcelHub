package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.controller.dto.InfoNotificationResultDTO;
import com.example.fypspringbootcode.controller.request.InfoNotificationRequest;
import com.example.fypspringbootcode.service.IInfoNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 13/04/2024 07:34
 **/
@CrossOrigin
@RestController
@RequestMapping("/infoNotification")
public class InfoNotificationController {

    @Autowired
    IInfoNotificationService infoNotificationService;

    @PostMapping("/send-notification/{sendWay}")
    public Result sendNotification(@RequestBody InfoNotificationRequest request, @PathVariable String sendWay) {
        InfoNotificationResultDTO notification= infoNotificationService.sendNotification(request, sendWay);
        return Result.success(notification, "Send notification successfully by " + sendWay + " way");
    }

}
