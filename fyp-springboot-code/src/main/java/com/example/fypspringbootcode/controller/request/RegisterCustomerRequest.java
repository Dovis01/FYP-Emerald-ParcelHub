package com.example.fypspringbootcode.controller.request;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @title:FinalYearProjectCode
 * @description:<TODO description class purpose>
 * @author: Shijin Zhang
 * @version:1.0.0
 * @create:05/02/2024 07:51
 **/
@EqualsAndHashCode(callSuper = true)
@Data
public class RegisterCustomerRequest extends BaseRegisterRequest{
    private String firstName;
    private String middleName;
    private String lastName;
}
