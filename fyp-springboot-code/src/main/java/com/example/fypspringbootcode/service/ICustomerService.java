package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.controller.dto.CustomerInfoDTO;
import com.example.fypspringbootcode.controller.dto.LoginCustomerDTO;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.fypspringbootcode.controller.request.RegisterCustomerRequest;
import com.example.fypspringbootcode.entity.Customer;
import com.google.gson.JsonArray;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-01-28
 */
public interface ICustomerService extends IService<Customer> {
    LoginCustomerDTO login(LoginRequest loginRequest);

    void register(RegisterCustomerRequest registerRequest);

    void addOrderCustomersInfoInBatch(JsonArray ecommerceJsonData);

    Customer getByCustomerId(Integer customerId);

    Customer getCustomerByToken(Integer accountId);

    List<CustomerInfoDTO> getAllCustomersInfoForAdmin();

    void deleteByCustomerId(Integer customerId, Integer accountId);

    void deleteOrderCustomerRecordsFromJsonDataInBatch();

    Customer updatePersonalInfo(Customer customer, Integer customerId);
}
