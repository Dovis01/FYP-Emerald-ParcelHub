package com.example.fypspringbootcode.controller.request;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @title:FinalYearProjectCode
 * @description:<TODO description class purpose>
 * @author: Shijin Zhang
 * @version:1.0.0
 * @create:11/02/2024 08:28
 **/
@EqualsAndHashCode(callSuper = true)
@Data
public class RegisterEmployeeRoleRequest extends BaseRegisterRequest{
    private String employeeCode;
    private String workCity;
    private String workType;
}

