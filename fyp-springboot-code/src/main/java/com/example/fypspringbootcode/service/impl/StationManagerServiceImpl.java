package com.example.fypspringbootcode.service.impl;

import cn.hutool.crypto.SecureUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.fypspringbootcode.common.config.AppConfig;
import com.example.fypspringbootcode.controller.dto.LoginStationManagerDTO;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.example.fypspringbootcode.controller.request.RegisterEmployeeRoleRequest;
import com.example.fypspringbootcode.entity.CompanyEmployee;
import com.example.fypspringbootcode.entity.StationManager;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.StationManagerMapper;
import com.example.fypspringbootcode.service.IStationManagerService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.utils.FypProjectUtils;
import com.example.fypspringbootcode.utils.TokenUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.example.fypspringbootcode.common.ErrorCodeList.*;
import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_400;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-05
 */
@Service
@Slf4j
public class StationManagerServiceImpl extends ServiceImpl<StationManagerMapper, StationManager> implements IStationManagerService {

    @Autowired
    private RegisteredAccountServiceImpl registeredAccountService;

    @Autowired
    private CompanyEmployeeServiceImpl companyEmployeeService;

    @Override
    public LoginStationManagerDTO login(LoginRequest loginRequest) {
        // get the station manager by username or email
        LoginStationManagerDTO loginStationManagerDTO;
        try {
            loginStationManagerDTO = baseMapper.checkStationManagerLoginAccount(loginRequest);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the station manager. ", e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        if (loginStationManagerDTO == null) {
            if (loginRequest.getUsername() != null && !loginRequest.getUsername().isEmpty()) {
                throw new ServiceException(ERROR_CODE_404, "The username provided is wrong, find no matched one in station managers.");
            } else {
                throw new ServiceException(ERROR_CODE_404, "The email provided is wrong, find no matched one in station managers.");
            }
        }

        // check the role type
        if(!loginStationManagerDTO.getRoleType().equals("Station-Manager")){
            throw new ServiceException(ERROR_CODE_401, "The account is not a station manager, please check it again.");
        }

        // check the status
        if (!loginStationManagerDTO.getStatus()) {
            throw new ServiceException(ERROR_CODE_401, "The account is disabled.");
        }

        // check the password
        if(loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()){
            throw new ServiceException(ERROR_CODE_400, "The password provided is empty, please check it again.");
        }
        String securePasswordDatabase = loginStationManagerDTO.getPassword();
        String securePassword = securePass(loginRequest.getPassword());
        if (!securePassword.equals(securePasswordDatabase)) {
            throw new ServiceException(ERROR_CODE_401, "The password provided is wrong, please check it again.");
        }
        loginStationManagerDTO.setPassword(null);

        // generate token
        String token = TokenUtils.genToken("stationManager", String.valueOf(loginStationManagerDTO.getEmployeeId()),String.valueOf(loginStationManagerDTO.getAccountId()));
        loginStationManagerDTO.setToken(token);
        return loginStationManagerDTO;
    }

    @Transactional
    @Override
    public void register(RegisterEmployeeRoleRequest registerRequest) {
        Integer accountId = registeredAccountService.createRegisteredAccount(registerRequest);
        CompanyEmployee companyEmployee = companyEmployeeService.checkCompanyEmployee(registerRequest);
        companyEmployeeService.initializeRoleInfo(registerRequest,companyEmployee,accountId, "Station-Manager");
        StationManager newStationManager = new StationManager();
        newStationManager.setEmployeeId(companyEmployee.getEmployeeId());
        try {
            save(newStationManager);
        } catch (Exception e) {
            log.error("The mybatis has failed to insert the new station manager and its employeeId is {}", companyEmployee.getEmployeeId(),e);
            throw new ServiceException(ERROR_CODE_500, "This employee code has been registered by another station manager.");
        }
    }

    @Override
    public StationManager getStationManagerByToken(Integer employeeId, Integer accountId) {
        CompanyEmployee companyEmployee = companyEmployeeService.getByEmployeeId(employeeId);
        if(!companyEmployee.getAccountId().equals(accountId)){
            throw new ServiceException(ERROR_CODE_401, "The account id of token is changed, please check the token.");
        }

        StationManager stationManager;
        try {
            stationManager = getOne(new QueryWrapper<StationManager>().eq("employee_id", employeeId));
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the station manager by employee id {}",employeeId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        return stationManager;
    }

    @Override
    public LoginStationManagerDTO getByStationManagerId(Integer stationManagerId) {
        // get the station manager by id
        LoginStationManagerDTO stationManager;
        try {
            stationManager = baseMapper.getStationManagerById(stationManagerId);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the station manager. ", e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        if (stationManager == null) {
            throw new ServiceException(ERROR_CODE_404, "The station manager id provided is wrong, find no matched one in station managers.");
        }
        stationManager.setPassword(null);
        return stationManager;
    }

    @Transactional
    @Override
    public void deleteOneStationManager(Integer stationManagerId, StationManager stationManager) {
        boolean isDeleted;
        try {
            isDeleted = removeById(stationManagerId);
        } catch (Exception e) {
            log.error("The mybatis has failed to delete the station manager {}", stationManagerId,e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        if (!isDeleted) {
            throw new ServiceException(ERROR_CODE_404, "The station manager id is wrong, find no matched one to delete.");
        }
        // delete the corresponding employee info
        companyEmployeeService.clearEmployeeSomeInfo(stationManager.getEmployeeId());
        // delete the corresponding registered account
        registeredAccountService.deleteByAccountId(stationManager.getAccountId());
    }

    @Override
    public StationManager updateInfoByAdmin(StationManager stationManager, Integer stationManagerId) {
        stationManager.setStationManagerId(stationManagerId);
        if(stationManager.getStationId() != null){
            StationManager matchedStationManager = FypProjectUtils.getEntityByCondition(StationManager::getStationId, stationManager.getStationId(), baseMapper);
            if (matchedStationManager != null && !matchedStationManager.getStationManagerId().equals(stationManagerId)){
                throw new ServiceException(ERROR_CODE_401, "The station id has been used by another station manager.");
            }
        }

        boolean isUpdated;
        try {
            isUpdated = updateById(stationManager);
        } catch (Exception e) {
            log.error("The mybatis has failed to update the station manager {}", stationManagerId,e);
            throw new ServiceException(ERROR_CODE_400, "The station manager info provided to update is null, please check it again.");
        }
        if (!isUpdated) {
            throw new ServiceException(ERROR_CODE_404, "The station manager id is wrong, find no matched one to update personal info.");
        }

        return getOneStationManagerByIdForUpdating(stationManagerId);
    }

    @Override
    public LoginStationManagerDTO updatePersonalInfo(CompanyEmployee companyEmployee, Integer stationManagerId) {
        StationManager stationManager = getOneStationManagerByIdForUpdating(stationManagerId);
        companyEmployeeService.updateEmployeeInfo(companyEmployee, stationManager.getEmployeeId());
        return getByStationManagerId(stationManagerId);
    }

    private StationManager getOneStationManagerByIdForUpdating(Integer stationManagerId) {
        StationManager stationManager;
        try {
            stationManager = getById(stationManagerId);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the updated station manager {}", stationManagerId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        if (stationManager == null) {
            throw new ServiceException(ERROR_CODE_404, "The station manager id is wrong, find no matched one for updated station manager to get.");
        }
        return stationManager;
    }

    private String securePass(String password) {
        return SecureUtil.md5(password + AppConfig.PASS_SALT);
    }
}
