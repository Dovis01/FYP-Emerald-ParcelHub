package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.controller.dto.CompanyEmployeeInfoDTO;
import com.example.fypspringbootcode.controller.request.RegisterEmployeeRoleRequest;
import com.example.fypspringbootcode.entity.CompanyEmployee;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * @author Shijin Zhang
 * @since 2024-01-28
 */
public interface ICompanyEmployeeService extends IService<CompanyEmployee> {

    CompanyEmployee checkCompanyEmployee(RegisterEmployeeRoleRequest registerRequest);

    void initializeRoleInfo(RegisterEmployeeRoleRequest registerRequest, CompanyEmployee companyEmployee, Integer accountId, String roleType);

    CompanyEmployee getByEmployeeId(Integer employeeId);

    List<CompanyEmployeeInfoDTO> getAllCompanyEmployeesInfoForAdmin();

    CompanyEmployee updateEmployeeInfo(CompanyEmployee companyEmployee, Integer employeeId);

    void clearEmployeeSomeInfo(Integer employeeId);

    String generateEmployeeCode(String fullName);
}
