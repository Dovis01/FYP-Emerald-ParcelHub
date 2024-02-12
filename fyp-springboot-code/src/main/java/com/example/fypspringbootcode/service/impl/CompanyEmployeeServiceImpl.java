package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.example.fypspringbootcode.controller.request.RegisterCourierRequest;
import com.example.fypspringbootcode.entity.CompanyEmployee;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.CompanyEmployeeMapper;
import com.example.fypspringbootcode.service.ICompanyEmployeeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import static com.example.fypspringbootcode.common.ErrorCodeList.*;

/**
 * @author Shijin Zhang
 * @since 2024-01-28
 */
@Service
@Slf4j
public class CompanyEmployeeServiceImpl extends ServiceImpl<CompanyEmployeeMapper, CompanyEmployee> implements ICompanyEmployeeService {

    @Override
    public CompanyEmployee checkCompanyEmployee(RegisterCourierRequest registerRequest) {
        QueryWrapper<CompanyEmployee> queryWrapper = new QueryWrapper<>();
        if (registerRequest.getEmployeeCode() != null && !registerRequest.getEmployeeCode().isEmpty()) {
            queryWrapper.eq("employee_code", registerRequest.getEmployeeCode());
        } else {
            throw new ServiceException(ERROR_CODE_403, "The employee code is empty or not provided, please check it again");
        }

        // Execute the query
        CompanyEmployee result;
        try {
            result = getOne(queryWrapper);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed", e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (result == null) {
            throw new ServiceException(ERROR_CODE_404, "The employee code is wrong, find no matched one");
        }
        return result;
    }

    @Override
    public void initializeCourierInfo(CompanyEmployee companyEmployee, Integer accountId) {
        companyEmployee.setRoleType("Courier");
        companyEmployee.setAccountId(accountId);
        boolean isUpdated = updateById(companyEmployee);
        if(!isUpdated) {
            throw new ServiceException(ERROR_CODE_500, "Fail to update the initial employee info of the new courier");
        }
    }

    @Override
    public CompanyEmployee updateEmployeeInfo(CompanyEmployee companyEmployee, Integer employeeId) {
        companyEmployee.setEmployeeId(employeeId);

        // Update the record
        boolean isUpdated;
        try {
            isUpdated = updateById(companyEmployee);
        } catch (Exception e) {
            log.error("The mybatis has failed to update the company employee {}", employeeId, e);
            throw new ServiceException(ERROR_CODE_400, "The employee info provided to update is null, please check it again");
        }
        if (!isUpdated) {
            throw new ServiceException(ERROR_CODE_404, "The employee id provided is wrong, find no matched one to update employee info");
        }

        // Return the updated record
        CompanyEmployee updatedCompanyEmployee;
        try {
            updatedCompanyEmployee = getById(employeeId);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the updated employee {}", employeeId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (updatedCompanyEmployee == null) {
            throw new ServiceException(ERROR_CODE_404, "The employee id provided is wrong, find no matched updated employee to get");
        }
        return updatedCompanyEmployee;
    }

    @Override
    public void clearEmployeeSomeInfo(Integer employeeId) {
        UpdateWrapper<CompanyEmployee> updateWrapper = new UpdateWrapper<>();
        updateWrapper.set("role_type", null);
        updateWrapper.set("account_id", null);
        updateWrapper.eq("employee_id", employeeId);
        // Update the record
        boolean isUpdated;
        try {
            isUpdated = update(updateWrapper);
        } catch (Exception e) {
            log.error("The mybatis has failed to clear some info for the company employee {}", employeeId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (!isUpdated) {
            throw new ServiceException(ERROR_CODE_404, "The employee id provided is wrong, find no matched one to clear some info");
        }
    }


    // The following method is used to generate the employee code
    private static String generateEmployeeCode(String fullName) {
        String initials = getInitials(fullName);

        String dateTimeString = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());

        Random random = new Random();
        int randomNumber = random.nextInt(1000, 10000);

        String randomLetters = generateRandomLetters(2);

        return initials + "-" + dateTimeString + "-" + randomNumber + randomLetters;
    }

    private static String getInitials(String fullName) {
        StringBuilder initials = new StringBuilder();
        for (String part : fullName.split("\\s+")) {
            if (!part.isEmpty()) {
                initials.append(part.charAt(0));
            }
        }
        return initials.toString().toUpperCase();
    }

    private static String generateRandomLetters(int count) {
        Random random = new Random();
        return random.ints('A', 'Z' + 1)
                .limit(count)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    public static void main(String[] args) {
        String employeeCode = generateEmployeeCode("John Doe");
        System.out.println(employeeCode);
    }
}
