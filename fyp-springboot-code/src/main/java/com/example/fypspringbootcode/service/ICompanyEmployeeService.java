package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.controller.request.RegisterEmployeeRoleRequest;
import com.example.fypspringbootcode.entity.CompanyEmployee;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * @author Shijin Zhang
 * @since 2024-01-28
 */
public interface ICompanyEmployeeService extends IService<CompanyEmployee> {

    CompanyEmployee checkCompanyEmployee(RegisterEmployeeRoleRequest registerRequest);

    void initializeCourierInfo(CompanyEmployee companyEmployee, Integer accountId);

    void initializeStationManagerInfo(CompanyEmployee companyEmployee, Integer accountId);

    CompanyEmployee getByEmployeeId(Integer employeeId);

    CompanyEmployee updateEmployeeInfo(CompanyEmployee companyEmployee, Integer employeeId);

    void clearEmployeeSomeInfo(Integer employeeId);
}
