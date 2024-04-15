package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.controller.dto.CompanyEmployeeInfoDTO;
import com.example.fypspringbootcode.entity.CompanyEmployee;
import com.example.fypspringbootcode.service.ICompanyEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-01-28
 */
@CrossOrigin
@RestController
@RequestMapping("/companyEmployee")
public class CompanyEmployeeController {

    @Autowired
    ICompanyEmployeeService companyEmployeeService;

    @GetMapping("/v1/all/employees-info")
    public Result getAllCompanyEmployeesInfoForAdmin() {
        List<CompanyEmployeeInfoDTO> employeesInfo = companyEmployeeService.getAllCompanyEmployeesInfoForAdmin();
        return Result.success(employeesInfo, "All company employees' information has been retrieved successfully");
    }

    @PutMapping("/v1/update/{employeeId}")
    public Result updateEmployeeInfo(@RequestBody CompanyEmployee companyEmployee, @PathVariable Integer employeeId) {
        CompanyEmployee updatedCompanyEmployee = companyEmployeeService.updateEmployeeInfo(companyEmployee, employeeId);
        return Result.success(updatedCompanyEmployee, "The company employee has been updated successfully");
    }

}
