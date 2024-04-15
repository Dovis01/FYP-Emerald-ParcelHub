package com.example.fypspringbootcode.service.impl;

import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.model.*;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.model.PublishRequest;
import com.amazonaws.services.sns.model.PublishResult;
import com.example.fypspringbootcode.controller.dto.InfoNotificationResultDTO;
import com.example.fypspringbootcode.controller.request.InfoNotificationRequest;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.service.IInfoNotificationService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_400;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 13/04/2024 07:37
 **/
@Service
public class InfoNotificationServiceImpl implements IInfoNotificationService {

    @Autowired
    private AmazonSNS snsClient;

    @Autowired
    private AmazonSimpleEmailService sesClient;

    @Override
    public InfoNotificationResultDTO sendNotification(InfoNotificationRequest request, String sendWay) {
        InfoNotificationResultDTO result;
        if (sendWay.equals("phone")) {
            result = sendSMSMessage(request.getPhoneMessage(), request.getTargetPhone());
        } else if (sendWay.equals("email")) {
            result = sendTemplatedEmailMessage(request);
        } else {
            throw new ServiceException(ERROR_CODE_400, "Unsupported send way");
        }
        return result;
    }

    private InfoNotificationResultDTO sendSMSMessage(String message, String phoneNumber) {
        String trimmedPhoneNumber = phoneNumber.replace(" 0", "");
        PublishRequest publishRequest = new PublishRequest()
                .withMessage(message)
                .withPhoneNumber(trimmedPhoneNumber);
        PublishResult publishResult;
        try {
            publishResult = snsClient.publish(publishRequest);
            return new InfoNotificationResultDTO(publishResult.getMessageId());
        } catch (Exception e) {
            throw new ServiceException(ERROR_CODE_400, "Failed to send SMS by AWS SNS");
        }
    }

    private InfoNotificationResultDTO sendTemplatedEmailMessage(InfoNotificationRequest request) {
        Map<String, String> templateData = Map.of(
                "customerName", request.getCustomerName(),
                "pickupCode", request.getPickupCode(),
                "stationAddress", request.getStationAddress()
        );

        Gson gson = new Gson();
        String templateDataJson = gson.toJson(templateData);

        SendTemplatedEmailRequest templatedEmailRequest = new SendTemplatedEmailRequest()
                .withSource("zsj1364226740@gmail.com")
                .withDestination(new Destination().withToAddresses(request.getToAddress()))
                .withTemplate("SetuFypEmail2")
                .withTemplateData(templateDataJson);

        SendTemplatedEmailResult templatedEmailResult;
        try {
            templatedEmailResult = sesClient.sendTemplatedEmail(templatedEmailRequest);
            return new InfoNotificationResultDTO(templatedEmailResult.getMessageId());
        } catch (Exception e) {
            throw new ServiceException(ERROR_CODE_400, "Failed to send templated email by AWS SES");
        }
    }
}
