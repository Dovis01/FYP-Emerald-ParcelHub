package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.controller.dto.LoginCustomerDTO;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.fypspringbootcode.controller.request.RegisterCustomerRequest;
import com.example.fypspringbootcode.entity.Customer;

/**
 *
 * @author Shijin Zhang
 * @since 2024-01-28
 */
public interface ICustomerService extends IService<Customer> {
    LoginCustomerDTO login(LoginRequest loginRequest);

    void register(RegisterCustomerRequest registerRequest);

    Customer getByCustomerId(Integer customerId);

    Customer getCustomerByToken(Integer accountId);

    void deleteByCustomerId(Integer customerId, Integer accountId);

    Customer updatePersonalInfo(Customer customer, Integer customerId);
}
