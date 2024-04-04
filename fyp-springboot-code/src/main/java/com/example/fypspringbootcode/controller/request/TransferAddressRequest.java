package com.example.fypspringbootcode.controller.request;

import lombok.Data;

import java.util.List;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 16/03/2024 07:23
 **/
@Data
public class TransferAddressRequest {
    private List<String> addresses;
}
