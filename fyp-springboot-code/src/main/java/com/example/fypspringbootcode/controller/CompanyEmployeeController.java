package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.entity.CompanyEmployee;
import com.example.fypspringbootcode.service.ICompanyEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/v1/update/{employeeId}")
    public Result updateEmployeeInfo(@RequestBody CompanyEmployee companyEmployee, @PathVariable Integer employeeId) {
        CompanyEmployee updatedCompanyEmployee = companyEmployeeService.updateEmployeeInfo(companyEmployee, employeeId);
        return Result.success(updatedCompanyEmployee, "The company employee has been updated successfully");
    }

}
