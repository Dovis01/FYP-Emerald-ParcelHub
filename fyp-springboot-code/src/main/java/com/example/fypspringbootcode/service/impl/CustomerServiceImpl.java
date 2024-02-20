package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.fypspringbootcode.controller.dto.LoginCustomerDTO;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.example.fypspringbootcode.controller.request.RegisterCustomerRequest;
import com.example.fypspringbootcode.entity.Customer;
import com.example.fypspringbootcode.entity.RegisteredAccount;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.CustomerMapper;
import com.example.fypspringbootcode.service.ICustomerService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.utils.TokenUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.example.fypspringbootcode.common.ErrorCodeList.*;

/**
 * @author Shijin Zhang
 * @since 2024-01-28
 */
@Service
@Slf4j
public class CustomerServiceImpl extends ServiceImpl<CustomerMapper, Customer> implements ICustomerService {

    @Autowired
    private RegisteredAccountServiceImpl registeredAccountService;

    @Override
    public LoginCustomerDTO login(LoginRequest loginRequest) {
        RegisteredAccount customerAccount = registeredAccountService.checkRegisteredAccount(loginRequest);
        QueryWrapper<Customer> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("account_id", customerAccount.getAccountId());
        Customer customer;
        try {
            customer = getOne(queryWrapper);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the {} account id entity", customerAccount.getAccountId());
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (customer == null) {
            throw new ServiceException(ERROR_CODE_404, "The account id is wrong, find no matched one in customers");
        }
        return generateLoginCustomerDTO(customer, customerAccount);
    }

    @Override
    public void register(RegisterCustomerRequest registerRequest) {
        Integer accountId = registeredAccountService.createRegisteredAccount(registerRequest);
        Customer newCustomer = new Customer();
        String fullName;
        if (registerRequest.getMiddleName().isEmpty()) {
            fullName = registerRequest.getFirstName() + " " + registerRequest.getLastName();
        } else {
            fullName = registerRequest.getFirstName() + " " + registerRequest.getMiddleName() + " " + registerRequest.getLastName();
        }
        newCustomer.setFullName(fullName);
        newCustomer.setAccountId(accountId);
        try {
            save(newCustomer);
        } catch (Exception e) {
            log.error("The mybatis has failed to insert the new customer and its full name is {}", fullName,e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
    }

    @Override
    public Customer getByCustomerId(Integer customerId) {
        Customer customer;
        try {
            customer = getById(customerId);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the customer {}",customerId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (customer == null) {
            throw new ServiceException(ERROR_CODE_404, "The customer id is wrong, find no matched one");
        }
        return customer;
    }

    @Override
    public Customer getCustomerByToken(Integer accountId) {
        Customer customer;
        try {
            customer = getOne(new QueryWrapper<Customer>().eq("account_id", accountId));
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the customer by account id {}",accountId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        return customer;
    }

    @Override
    public void deleteByCustomerId(Integer customerId, Integer accountId) {
        boolean isDeleted;
        try {
            isDeleted = removeById(customerId);
        } catch (Exception e) {
            log.error("The mybatis has failed to delete the customer {}", customerId,e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (!isDeleted) {
            throw new ServiceException(ERROR_CODE_404, "The customer id is wrong, find no matched one to delete");
        }
        registeredAccountService.deleteByAccountId(accountId);
    }

    @Override
    public Customer updatePersonalInfo(Customer customer, Integer customerId) {
        customer.setCustomerId(customerId);

        boolean isUpdated;
        try {
            isUpdated = updateById(customer);
        } catch (Exception e) {
            log.error("The mybatis has failed to update the customer {}", customerId,e);
            throw new ServiceException(ERROR_CODE_400, "The customer personal info provided to update is null, please check it again");
        }
        if (!isUpdated) {
            throw new ServiceException(ERROR_CODE_404, "The customer id is wrong, find no matched one to update personal info");
        }

        Customer updatedCustomer;
        try {
            updatedCustomer = getById(customerId);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the updated customer {}",customerId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (updatedCustomer == null) {
            throw new ServiceException(ERROR_CODE_404, "The customer id is wrong, find no matched one to updated customer");
        }
        return updatedCustomer;
    }

    private static LoginCustomerDTO generateLoginCustomerDTO(Customer customer, RegisteredAccount customerAccount) {
        /**
         * Customer对象转换成LoginDTO对象
         * BeanUtils.copyProperties(源对象，目标对象)只会复制两个对象的共同属性字段值
         * */
        LoginCustomerDTO loginCustomerDTO = new LoginCustomerDTO();
        BeanUtils.copyProperties(customer, loginCustomerDTO);
        BeanUtils.copyProperties(customerAccount, loginCustomerDTO);
        loginCustomerDTO.setRoleType("Customer");
        // 生成token给前端请求凭证 TokenUtils genToken方法(customerId,sign)
        String token = TokenUtils.genToken("customer",String.valueOf(customer.getAccountId()));
        loginCustomerDTO.setToken(token);
        return loginCustomerDTO;
    }

}
