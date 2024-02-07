package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.controller.dto.LoginCustomerDTO;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.example.fypspringbootcode.controller.request.RegisterCustomerRequest;
import com.example.fypspringbootcode.entity.Customer;
import com.example.fypspringbootcode.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Shijin Zhang
 * @since 2024-01-28
 */
@CrossOrigin
@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    ICustomerService customerService;

    @PostMapping("/v1/login")
    public Result login(@RequestParam(defaultValue = "username") String authMethod ,@RequestBody LoginRequest loginRequest) {
        LoginCustomerDTO login;
        if (authMethod.equals("username")) {
            login = customerService.login(loginRequest);
            return Result.success(login, "login by username successfully");
        } else if (authMethod.equals("email")) {
            login = customerService.login(loginRequest);
            return Result.success(login,"login by email successfully");
        } else {
            return Result.error("Invalid authMethod");
        }
    }

    @PostMapping("/v1/register")
    public Result register(@RequestBody RegisterCustomerRequest registerRequest) {
        customerService.register(registerRequest);
        return Result.success("The customer has registered successfully");
    }

    @GetMapping("/v1/{customerId}")
    public Result getByFullName(@PathVariable Integer customerId) {
        Customer customer = customerService.getByCustomerId(customerId);
        return Result.success(customer, "The customer has been found successfully");
    }

    @DeleteMapping("/v1/{customerId}")
    public Result delete(@PathVariable Integer customerId , @RequestBody Customer customer) {
        customerService.deleteByCustomerId(customerId,customer.getAccountId());
        return Result.success("The customer has been deleted successfully");
    }

    @PutMapping("/v1/update/personalInfo/{customerId}")
    public Result updatePersonalInfo(@RequestBody Customer customer, @PathVariable Integer customerId) {
        Customer updatedCustomer = customerService.updatePersonalInfo(customer, customerId);
        return Result.success(updatedCustomer,"The personal info of customer has been updated successfully");
    }

}
