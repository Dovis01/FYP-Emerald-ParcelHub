package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.controller.dto.LoginCourierDTO;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.example.fypspringbootcode.controller.request.RegisterEmployeeRoleRequest;
import com.example.fypspringbootcode.entity.CompanyEmployee;
import com.example.fypspringbootcode.entity.Courier;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-05
 */
public interface ICourierService extends IService<Courier> {
    LoginCourierDTO login(LoginRequest loginRequest);

    void register(RegisterEmployeeRoleRequest registerRequest);

    LoginCourierDTO getByCourierId(Integer courierId);

    Courier getOneCourierFullObjectInfo(Integer courierId);

    Courier getCourierByToken(Integer employeeId, Integer accountId);

    void deleteOneCourier(Integer courierId, Courier courier);

    Courier updateInfoByAdmin(Courier courier, Integer courierId);

    void updateInfo(Courier courier, Integer courierId);

    LoginCourierDTO updatePersonalInfo(CompanyEmployee companyEmployee, Integer courierId);

    List<Courier> getSomeWorkTypeAllAvailableCouriers(String workType);

    void disableCourier(Integer courierId);

    void resetOneCourier(Integer courierId, Integer assignedParcelsNum);

    void resetSomeWorkTypeAllCouriers(String workType);
}
