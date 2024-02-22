package com.example.fypspringbootcode.service.impl;

import cn.hutool.crypto.SecureUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.fypspringbootcode.common.config.AppConfig;
import com.example.fypspringbootcode.controller.dto.LoginCourierDTO;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.example.fypspringbootcode.controller.request.RegisterEmployeeRoleRequest;
import com.example.fypspringbootcode.entity.CompanyEmployee;
import com.example.fypspringbootcode.entity.Courier;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.CourierMapper;
import com.example.fypspringbootcode.service.ICourierService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.utils.TokenUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.example.fypspringbootcode.common.ErrorCodeList.*;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-05
 */
@Service
@Slf4j
public class CourierServiceImpl extends ServiceImpl<CourierMapper, Courier> implements ICourierService {

    @Autowired
    private RegisteredAccountServiceImpl registeredAccountService;

    @Autowired
    private CompanyEmployeeServiceImpl companyEmployeeService;

    @Autowired
    private CourierDeliveryRecordServiceImpl courierDeliveryRecordService;


    @Override
    public LoginCourierDTO login(LoginRequest loginRequest) {
        // get the courier by username or email
        LoginCourierDTO loginCourierDTO;
        try {
            loginCourierDTO = baseMapper.checkCourierLoginAccount(loginRequest);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the courier. ", e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (loginCourierDTO == null) {
            throw new ServiceException(ERROR_CODE_404, "The username or email provided is wrong, find no matched one in couriers");
        }

        // check the role type
        if(!loginCourierDTO.getRoleType().equals("Courier")){
            throw new ServiceException(ERROR_CODE_401, "The role type of the login account is wrong, please check it again");
        }

        // check the status
        if (!loginCourierDTO.getStatus()) {
            throw new ServiceException(ERROR_CODE_401, "The account is disabled");
        }

        // check the password
        if(loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()){
            throw new ServiceException(ERROR_CODE_400, "The password provided is empty, please check it again");
        }
        String securePasswordDatabase = loginCourierDTO.getPassword();
        String securePassword = securePass(loginRequest.getPassword());
        if (!securePassword.equals(securePasswordDatabase)) {
            throw new ServiceException(ERROR_CODE_401, "The password provided is wrong, please check it again");
        }
        loginCourierDTO.setPassword(null);

        // generate token
        String token = TokenUtils.genToken("courier", String.valueOf(loginCourierDTO.getEmployeeId()),String.valueOf(loginCourierDTO.getAccountId()));
        loginCourierDTO.setToken(token);
        return loginCourierDTO;
    }

    @Override
    public void register(RegisterEmployeeRoleRequest registerRequest) {
        Integer accountId = registeredAccountService.createRegisteredAccount(registerRequest);
        CompanyEmployee companyEmployee = companyEmployeeService.checkCompanyEmployee(registerRequest);
        companyEmployeeService.initializeRoleInfo(companyEmployee,accountId, "Courier");
        Courier newCourier = new Courier();
        newCourier.setEmployeeId(companyEmployee.getEmployeeId());
        try {
            save(newCourier);
        } catch (Exception e) {
            log.error("The mybatis has failed to insert the new courier and its employeeId is {}", companyEmployee.getEmployeeId(),e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
    }

    @Override
    public LoginCourierDTO getByCourierId(Integer courierId) {
        // get the courier by id
        LoginCourierDTO courier;
        try {
            courier = baseMapper.getCourierById(courierId);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the courier. ", e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (courier == null) {
            throw new ServiceException(ERROR_CODE_404, "The courier id provided is wrong, find no matched one in couriers");
        }
        courier.setPassword(null);
        return courier;
    }

    @Override
    public Courier getCourierByToken(Integer employeeId, Integer accountId) {
        CompanyEmployee companyEmployee = companyEmployeeService.getByEmployeeId(employeeId);
        if(!companyEmployee.getAccountId().equals(accountId)){
            throw new ServiceException(ERROR_CODE_401, "The account id of token is changed, please check the token");
        }

        Courier courier;
        try {
            courier = getOne(new QueryWrapper<Courier>().eq("employee_id", employeeId));
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the courier by employee id {}",employeeId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        return courier;
    }

    @Override
    public void deleteOneCourier(Integer courierId, Courier courier) {
        // delete the corresponding delivery records firstly
        courierDeliveryRecordService.deleteDeliveryRecordByCourierId(courierId);

        boolean isDeleted;
        try {
            isDeleted = removeById(courierId);
        } catch (Exception e) {
            log.error("The mybatis has failed to delete the courier {}", courierId,e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (!isDeleted) {
            throw new ServiceException(ERROR_CODE_404, "The courier id is wrong, find no matched one to delete");
        }
        // delete the corresponding employee info
        companyEmployeeService.clearEmployeeSomeInfo(courier.getEmployeeId());
        // delete the corresponding registered account
        registeredAccountService.deleteByAccountId(courier.getAccountId());
    }

    @Override
    public Courier updatePersonalInfo(Courier courier, Integer courierId) {
        courier.setCourierId(courierId);

        boolean isUpdated;
        try {
            isUpdated = updateById(courier);
        } catch (Exception e) {
            log.error("The mybatis has failed to update the courier {}", courierId,e);
            throw new ServiceException(ERROR_CODE_400, "The courier info provided to update is null, please check it again");
        }
        if (!isUpdated) {
            throw new ServiceException(ERROR_CODE_404, "The courier id is wrong, find no matched one to update personal info");
        }

        Courier updatedCourier;
        try {
            updatedCourier = getById(courierId);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the updated courier {}",courierId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (updatedCourier == null) {
            throw new ServiceException(ERROR_CODE_404, "The courier id is wrong, find no matched one for updated courier to get");
        }
        return updatedCourier;
    }

    private String securePass(String password) {
        return SecureUtil.md5(password + AppConfig.PASS_SALT);
    }

}
