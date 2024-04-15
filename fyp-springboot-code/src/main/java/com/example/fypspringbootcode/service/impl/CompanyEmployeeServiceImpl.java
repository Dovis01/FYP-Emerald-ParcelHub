package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.example.fypspringbootcode.controller.dto.CompanyEmployeeInfoDTO;
import com.example.fypspringbootcode.controller.request.RegisterEmployeeRoleRequest;
import com.example.fypspringbootcode.entity.CompanyEmployee;
import com.example.fypspringbootcode.entity.ParcelHubCompany;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.CompanyEmployeeMapper;
import com.example.fypspringbootcode.mapper.ParcelHubCompanyMapper;
import com.example.fypspringbootcode.mapper.RegisteredAccountMapper;
import com.example.fypspringbootcode.service.ICompanyEmployeeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.service.IRoleTypeService;
import com.example.fypspringbootcode.utils.FypProjectUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;

import static com.example.fypspringbootcode.common.ErrorCodeList.*;

/**
 * @author Shijin Zhang
 * @since 2024-01-28
 */
@Service
@Slf4j
public class CompanyEmployeeServiceImpl extends ServiceImpl<CompanyEmployeeMapper, CompanyEmployee> implements ICompanyEmployeeService {

    @Autowired
    private IRoleTypeService roleTypeService;

    @Autowired
    private RegisteredAccountMapper registeredAccountMapper;

    @Autowired
    private ParcelHubCompanyMapper parcelHubCompanyMapper;

    @Override
    public CompanyEmployee checkCompanyEmployee(RegisterEmployeeRoleRequest registerRequest) {
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
    public void initializeRoleInfo(RegisterEmployeeRoleRequest registerRequest,CompanyEmployee companyEmployee, Integer accountId, String roleType) {
        Integer roleId = roleTypeService.getRoleIdByRoleType(roleType);
        companyEmployee.setRoleId(roleId);
        companyEmployee.setAccountId(accountId);
        boolean isUpdated = updateById(companyEmployee);
        if (!isUpdated) {
            throw new ServiceException(ERROR_CODE_500, "Fail to update the initial employee info of the new " + roleType + " employee");
        }
    }

    @Override
    public CompanyEmployee getByEmployeeId(Integer employeeId) {
        CompanyEmployee companyEmployee;
        try {
            companyEmployee = getById(employeeId);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the employee {}", employeeId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (companyEmployee == null) {
            throw new ServiceException(ERROR_CODE_404, "The employee id provided is wrong, find no matched one to get");
        }
        companyEmployee.setEmailAddress(registeredAccountMapper.selectById(companyEmployee.getAccountId()).getEmail());
        companyEmployee.setParcelHubCompany(parcelHubCompanyMapper.selectOne(Wrappers.<ParcelHubCompany>lambdaQuery().eq(ParcelHubCompany::getCompanyId, companyEmployee.getCompanyId())));
        companyEmployee.setEmployeeCode(null);
        return companyEmployee;
    }

    @Override
    public List<CompanyEmployeeInfoDTO> getAllCompanyEmployeesInfoForAdmin() {
        return baseMapper.getAllCompanyEmployeesInfoList();
    }

    @Override
    public CompanyEmployee updateEmployeeInfo(CompanyEmployee companyEmployee, Integer employeeId) {
        companyEmployee.setEmployeeId(employeeId);
        FypProjectUtils.setEntityEmptyStringsToNull(companyEmployee);
        if (!hasUpdatableFields(companyEmployee)) {
            return null;
        }
        if (companyEmployee.getPhoneNumber() != null){
            CompanyEmployee matchedCompanyEmployee = FypProjectUtils.getEntityByCondition(CompanyEmployee::getPhoneNumber, companyEmployee.getPhoneNumber(), baseMapper);
            if (matchedCompanyEmployee != null && !matchedCompanyEmployee.getEmployeeId().equals(employeeId)){
                throw new ServiceException(ERROR_CODE_401, "The phone number has been used by another company employee.");
            }
        }
        if (companyEmployee.getFullName() != null){
            CompanyEmployee matchedCompanyEmployee = FypProjectUtils.getEntityByCondition(CompanyEmployee::getFullName, companyEmployee.getFullName(), baseMapper);
            if (matchedCompanyEmployee != null && !matchedCompanyEmployee.getEmployeeId().equals(employeeId)){
                throw new ServiceException(ERROR_CODE_401, "The full name has been used by another company employee.");
            }
        }

        // Update the record
        boolean isUpdated = false;
        try {
            isUpdated = updateById(companyEmployee);
        } catch (Exception e) {
            log.error("The mybatis has failed to update the company employee {}", employeeId, e);
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
        updateWrapper.set("role_id", null);
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
    @Override
    public String generateEmployeeCode(String fullName) {
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

    private boolean hasUpdatableFields(CompanyEmployee companyEmployee) {
        Method[] methods = companyEmployee.getClass().getMethods();

        for (Method method : methods) {
            if (method.getName().startsWith("get") && !method.getName().equals("getClass") && method.getParameterCount() == 0) {
                try {
                    Object value = method.invoke(companyEmployee);
                    if (value != null && !method.getName().equalsIgnoreCase("getEmployeeId")) {
                        return true;
                    }
                } catch (Exception e) {
                    throw new ServiceException(ERROR_CODE_500, "The internal system is error");
                }
            }
        }

        return false;
    }
}
