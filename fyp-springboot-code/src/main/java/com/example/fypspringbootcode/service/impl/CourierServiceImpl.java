package com.example.fypspringbootcode.service.impl;

import cn.hutool.crypto.SecureUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.fypspringbootcode.common.config.AppConfig;
import com.example.fypspringbootcode.controller.dto.CourierInfoDTO;
import com.example.fypspringbootcode.controller.dto.LoginCourierDTO;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.example.fypspringbootcode.controller.request.RegisterEmployeeRoleRequest;
import com.example.fypspringbootcode.entity.CompanyEmployee;
import com.example.fypspringbootcode.entity.Courier;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.CourierMapper;
import com.example.fypspringbootcode.service.ICompanyEmployeeService;
import com.example.fypspringbootcode.service.ICourierService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.service.IRegisteredAccountService;
import com.example.fypspringbootcode.utils.FypProjectUtils;
import com.example.fypspringbootcode.utils.TokenUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import static com.example.fypspringbootcode.common.ErrorCodeList.*;

/**
 * @author Shijin Zhang
 * @since 2024-02-05
 */
@Service
@Slf4j
public class CourierServiceImpl extends ServiceImpl<CourierMapper, Courier> implements ICourierService {

    @Autowired
    private IRegisteredAccountService registeredAccountService;

    @Autowired
    private ICompanyEmployeeService companyEmployeeService;

    @Override
    public LoginCourierDTO login(LoginRequest loginRequest) {
        // get the courier by username or email
        LoginCourierDTO loginCourierDTO;
        try {
            loginCourierDTO = baseMapper.checkCourierLoginAccount(loginRequest);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the courier. ", e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        if (loginCourierDTO == null) {
            if (loginRequest.getUsername() != null && !loginRequest.getUsername().isEmpty()) {
                throw new ServiceException(ERROR_CODE_404, "The username provided is wrong, find no matched one in couriers.");
            } else {
                throw new ServiceException(ERROR_CODE_404, "The email provided is wrong, find no matched one in couriers.");
            }
        }

        // check the role type
        if (!loginCourierDTO.getRoleType().equals("Courier")) {
            throw new ServiceException(ERROR_CODE_401, "The account is not a courier, please check it again.");
        }

        // check the status
        if (!loginCourierDTO.getStatus()) {
            throw new ServiceException(ERROR_CODE_401, "The account is disabled.");
        }

        // check the password
        if (loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
            throw new ServiceException(ERROR_CODE_400, "The password provided is empty, please check it again.");
        }
        String securePasswordDatabase = loginCourierDTO.getPassword();
        String securePassword = securePass(loginRequest.getPassword());
        if (!securePassword.equals(securePasswordDatabase)) {
            throw new ServiceException(ERROR_CODE_401, "The password provided is wrong, please check it again.");
        }
        loginCourierDTO.setPassword(null);

        // generate token
        String token = TokenUtils.genToken("courier", String.valueOf(loginCourierDTO.getEmployeeId()), String.valueOf(loginCourierDTO.getAccountId()));
        loginCourierDTO.setToken(token);
        return loginCourierDTO;
    }

    @Transactional
    @Override
    public void register(RegisterEmployeeRoleRequest registerRequest) {
        Integer accountId = registeredAccountService.createRegisteredAccount(registerRequest);
        CompanyEmployee companyEmployee = companyEmployeeService.checkCompanyEmployee(registerRequest);
        companyEmployeeService.initializeRoleInfo(registerRequest, companyEmployee, accountId, "Courier");
        Courier newCourier = new Courier();
        if (registerRequest.getWorkType().equals("Collect Parcels")) {
            newCourier.setDailyMaxDistributionParcelsNum(7);
            newCourier.setRemainingParcelsNumToDistribute(7);
        } else {
            newCourier.setDailyMaxDistributionParcelsNum(14);
            newCourier.setRemainingParcelsNumToDistribute(14);
        }
        newCourier.setEmployeeId(companyEmployee.getEmployeeId());
        newCourier.setWorkType(registerRequest.getWorkType());
        try {
            save(newCourier);
        } catch (Exception e) {
            log.error("The mybatis has failed to insert the new courier and its employeeId is {}", companyEmployee.getEmployeeId(), e);
            throw new ServiceException(ERROR_CODE_500, "This employee code has been registered by another courier.");
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
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        if (courier == null) {
            throw new ServiceException(ERROR_CODE_404, "The courier id provided is wrong, find no matched one in couriers.");
        }
        courier.setPassword(null);
        return courier;
    }

    @Override
    public List<CourierInfoDTO> getAllCouriersInfoForAdmin() {
        return baseMapper.getAllCouriersInfoList();
    }

    @Override
    public Courier getOneCourierFullObjectInfo(Integer courierId) {
        if(courierId == null) {
           return null;
        }
        Courier courier = getById(courierId);
        courier.setEmployeeInfo(companyEmployeeService.getByEmployeeId(courier.getEmployeeId()));
        return courier;
    }

    @Override
    public Courier getCourierByToken(Integer employeeId, Integer accountId) {
        CompanyEmployee companyEmployee = companyEmployeeService.getByEmployeeId(employeeId);
        if (!companyEmployee.getAccountId().equals(accountId)) {
            throw new ServiceException(ERROR_CODE_401, "The account id of token is changed, please check the token.");
        }

        Courier courier;
        try {
            courier = getOne(new QueryWrapper<Courier>().eq("employee_id", employeeId));
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the courier by employee id {}", employeeId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        return courier;
    }

    @Transactional
    @Override
    public void deleteOneCourier(Integer courierId, Courier courier) {
        // delete the corresponding delivery/collection records firstly

        boolean isDeleted;
        try {
            isDeleted = removeById(courierId);
        } catch (Exception e) {
            log.error("The mybatis has failed to delete the courier {}", courierId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        if (!isDeleted) {
            throw new ServiceException(ERROR_CODE_404, "The courier id is wrong, find no matched one to delete.");
        }
        // delete the corresponding employee info
        companyEmployeeService.clearEmployeeSomeInfo(courier.getEmployeeId());
        // delete the corresponding registered account
        registeredAccountService.deleteByAccountId(courier.getAccountId());
    }

    @Override
    public Courier updateInfoByAdmin(Courier courier, Integer courierId) {
        updateInfo(courier, courierId);
        return getOneCourierByIdForUpdating(courierId);
    }

    @Override
    public void updateInfo(Courier courier, Integer courierId) {
        courier.setCourierId(courierId);
        if (courier.getTruckId() != null) {
            Courier matchedCourier = FypProjectUtils.getEntityByCondition(Courier::getTruckId, courier.getTruckId(), baseMapper);
            if (matchedCourier != null && !matchedCourier.getCourierId().equals(courierId)) {
                throw new ServiceException(ERROR_CODE_401, "The courier id has been used by another courier.");
            }
        }

        boolean isUpdated;
        try {
            isUpdated = updateById(courier);
        } catch (Exception e) {
            log.error("The mybatis has failed to update the courier {}", courierId, e);
            throw new ServiceException(ERROR_CODE_400, "The courier info provided to update is null, please check it again.");
        }
        if (!isUpdated) {
            throw new ServiceException(ERROR_CODE_404, "The courier id is wrong, find no matched one to update personal info.");
        }
    }

    @Override
    public LoginCourierDTO updatePersonalInfo(CompanyEmployee companyEmployee, Integer courierId) {
        Courier courier = getOneCourierByIdForUpdating(courierId);
        companyEmployeeService.updateEmployeeInfo(companyEmployee, courier.getEmployeeId());
        return getByCourierId(courierId);
    }

    @Override
    public List<Courier> getSomeWorkTypeAllAvailableCouriers(String workType) {
        LambdaQueryWrapper<Courier> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.gt(Courier::getRemainingParcelsNumToDistribute, 0)
                .eq(Courier::getWorkType, workType)
                .eq(Courier::getCourierStatus, true);
        List<Courier> result = list(queryWrapper);
        if (result == null || result.isEmpty()) {
            throw new ServiceException(ERROR_CODE_404, "No available " + workType + " couriers.");
        }
        return result;
    }

    @Override
    public void disableCourier(Integer courierId) {
        if (courierId == null) {
            throw new ServiceException(ERROR_CODE_400, "The courier id provided is null, please check it again.");
        }
        Courier courier = new Courier();
        courier.setCourierId(courierId);
        courier.setCourierStatus(false);
        boolean isUpdated;
        try {
            isUpdated = updateById(courier);
        } catch (Exception e) {
            log.error("The mybatis has failed to disable the courier {}", courierId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (!isUpdated) {
            throw new ServiceException(ERROR_CODE_404, "The courier id provided is wrong, find no matched one to disable courier");
        }
    }

    @Override
    public void resetOneCourier(Integer courierId, Integer assignedParcelsNum) {
        Courier courier = getById(courierId);
        boolean isUpdated;
        try {
            isUpdated = lambdaUpdate()
                    .set(Courier::getRemainingParcelsNumToDistribute, courier.getRemainingParcelsNumToDistribute() + assignedParcelsNum)
                    .set(Courier::getTruckId, null)
                    .eq(Courier::getCourierId, courierId).update();
        } catch (Exception e) {
            log.error("The mybatis has failed to reset the courier {}", courierId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (!isUpdated) {
            throw new ServiceException(ERROR_CODE_404, "The courier id provided is wrong, find no matched one to reset courier's assigned parcels num");
        }
    }

    @Override
    public void resetSomeWorkTypeAllCouriers(String workType) {
        List<Courier> couriers = lambdaQuery().eq(Courier::getWorkType, workType).list();
        for (Courier courier : couriers) {
            courier.setRemainingParcelsNumToDistribute(courier.getDailyMaxDistributionParcelsNum());
            updateById(courier);
        }

        lambdaUpdate().set(Courier::getTruckId, null).eq(Courier::getWorkType, workType).update();
    }

    private Courier getOneCourierByIdForUpdating(Integer courierId) {
        Courier courier;
        try {
            courier = getById(courierId);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the updated courier {}", courierId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        if (courier == null) {
            throw new ServiceException(ERROR_CODE_404, "The courier id is wrong, find no matched one for updated courier to get.");
        }
        return courier;
    }

    private String securePass(String password) {
        return SecureUtil.md5(password + AppConfig.PASS_SALT);
    }

}
