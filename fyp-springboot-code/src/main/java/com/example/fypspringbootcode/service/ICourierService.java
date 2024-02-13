package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.controller.dto.LoginCourierDTO;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.example.fypspringbootcode.controller.request.RegisterEmployeeRoleRequest;
import com.example.fypspringbootcode.entity.Courier;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-05
 */
public interface ICourierService extends IService<Courier> {
    LoginCourierDTO login(LoginRequest loginRequest);

    void register(RegisterEmployeeRoleRequest registerRequest);

    LoginCourierDTO getByCourierId(Integer courierId);

    Courier getCourierByToken(Integer employeeId, Integer accountId);

    void deleteOneCourier(Integer courierId, Courier courier);

    Courier updatePersonalInfo(Courier courier, Integer customerId);
}
