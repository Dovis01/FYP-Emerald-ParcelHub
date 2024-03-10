package com.example.fypspringbootcode.service.impl;

import cn.hutool.core.util.ArrayUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.fypspringbootcode.controller.dto.LoginCustomerDTO;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.example.fypspringbootcode.controller.request.RegisterCustomerRequest;
import com.example.fypspringbootcode.entity.Customer;
import com.example.fypspringbootcode.entity.EcommerceJsonData;
import com.example.fypspringbootcode.entity.RegisteredAccount;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.CustomerMapper;
import com.example.fypspringbootcode.mapper.EcommerceJsonDataMapper;
import com.example.fypspringbootcode.service.ICustomerService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.utils.FypProjectUtils;
import com.example.fypspringbootcode.utils.TokenUtils;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.example.fypspringbootcode.common.ErrorCodeList.*;

/**
 * @author Shijin Zhang
 * @since 2024-01-28
 */
@Service
@Data
@Slf4j
public class CustomerServiceImpl extends ServiceImpl<CustomerMapper, Customer> implements ICustomerService {

    @Autowired
    private RegisteredAccountServiceImpl registeredAccountService;

    @Autowired
    private EcommerceJsonDataMapper ecommerceJsonDataMapper;

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
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        if (customer == null) {
            throw new ServiceException(ERROR_CODE_404, "The account is not a customer, please check it again.");
        }
        return generateLoginCustomerDTO(customer, customerAccount);
    }

    @Transactional
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

        Customer matchedCustomer = FypProjectUtils.getEntityByCondition(Customer::getFullName, fullName, baseMapper);
        if (matchedCustomer != null) {
            if(matchedCustomer.getAccountId() != null){
                throw new ServiceException(ERROR_CODE_401, "The full name has been used by another customer.");
            }else{
                matchedCustomer.setAccountId(accountId);
                try {
                    updateById(matchedCustomer);
                } catch (Exception e) {
                    log.error("The mybatis has failed to update the order customer account id {}", matchedCustomer.getCustomerId(), e);
                    throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
                }
                return;
            }
        }

        newCustomer.setFullName(fullName);
        newCustomer.setAccountId(accountId);
        try {
            save(newCustomer);
        } catch (Exception e) {
            log.error("The mybatis has failed to insert the new customer and its full name is {}", fullName, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
    }

    @Override
    public void addOrderCustomersInfoInBatch(JsonArray ecommerceJsonData) {

        for (JsonElement element : ecommerceJsonData) {
            JsonObject customerInfoObject = element.getAsJsonObject().get("customer").getAsJsonObject();

            Customer newCus = new Customer();
            newCus.setFullName(customerInfoObject.get("name").getAsString());
            newCus.setPhoneNumber(customerInfoObject.get("phone").getAsString());
            newCus.setOrderEmail(customerInfoObject.get("email").getAsString());
            String address = customerInfoObject.get("address").getAsString();
            newCus.setAddress(address);
            Customer completeCustomer = handleOrderCustomersCityAndCountry(address, newCus);

            LambdaQueryWrapper<Customer> queryWrapper = new LambdaQueryWrapper<>();
            queryWrapper.eq(Customer::getFullName, newCus.getFullName())
                    .or()
                    .eq(Customer::getPhoneNumber, newCus.getPhoneNumber())
                    .or()
                    .eq(Customer::getOrderEmail, newCus.getOrderEmail());

            Customer matchedCustomer;
            try {
                matchedCustomer = getOne(queryWrapper);
            } catch (Exception e) {
                log.error("The deserialization of mybatis has failed for the order customer info", e);
                throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
            }

            if (matchedCustomer != null) {
                if (matchedCustomer.getAccountId() != null) {
                    try {
                        completeCustomer.setCustomerId(matchedCustomer.getCustomerId());
                        updateById(completeCustomer);
                    } catch (Exception e) {
                        log.error("The mybatis has failed to update the order customer account id {}", matchedCustomer.getCustomerId(), e);
                        throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
                    }
                    continue;
                }
                continue;
            }

            try {
                save(completeCustomer);
            } catch (Exception e) {
                log.error("Fail to insert order customer info data", e);
                throw new ServiceException(ERROR_CODE_500, "The internal system is error. Please try again.");
            }
        }
    }

    @Override
    public Customer getByCustomerId(Integer customerId) {
        Customer customer;
        try {
            customer = getById(customerId);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the customer {}", customerId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        if (customer == null) {
            throw new ServiceException(ERROR_CODE_404, "The customer id is wrong, find no matched one.");
        }
        return customer;
    }

    @Override
    public Customer getCustomerByToken(Integer accountId) {
        Customer customer;
        try {
            customer = getOne(new QueryWrapper<Customer>().eq("account_id", accountId));
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the customer by account id {}", accountId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        return customer;
    }

    @Transactional
    @Override
    public void deleteByCustomerId(Integer customerId, Integer accountId) {
        boolean isDeleted;
        try {
            isDeleted = removeById(customerId);
        } catch (Exception e) {
            log.error("The mybatis has failed to delete the customer {}", customerId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        if (!isDeleted) {
            throw new ServiceException(ERROR_CODE_404, "The customer id is wrong, find no matched one to delete.");
        }
        registeredAccountService.deleteByAccountId(accountId);
    }

    @Override
    public void deleteOrderCustomerRecordsFromJsonDataInBatch() {
        List<String> allOfJsonDataColumn = ecommerceJsonDataMapper.selectObjs(
                new LambdaQueryWrapper<EcommerceJsonData>().select(EcommerceJsonData::getJsonData)
        ).stream().map(obj -> (String) obj).toList();

        if (ArrayUtil.isEmpty(allOfJsonDataColumn.toArray())) {
            throw new ServiceException(ERROR_CODE_404, "The simulation json data in ecommerce json data storage table is empty.");
        }

        for (String jsonData : allOfJsonDataColumn) {
            JsonObject jsonObject = JsonParser.parseString(jsonData).getAsJsonObject();
            String customerName = jsonObject.get("customer").getAsJsonObject().get("name").getAsString();
            try {
                Integer accountId = getObj(new LambdaQueryWrapper<Customer>().select(Customer::getAccountId).eq(Customer::getFullName, customerName), obj -> (Integer) obj);
                if (accountId != null) {
                    continue;
                }
                remove(new LambdaQueryWrapper<Customer>().eq(Customer::getFullName, customerName));
            } catch (Exception e) {
                log.error("The mybatis has failed to delete the customer record from json data in customer table", e);
                throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
            }
        }
    }

    @Override
    public Customer updatePersonalInfo(Customer customer, Integer customerId) {
        customer.setCustomerId(customerId);
        FypProjectUtils.setEntityEmptyStringsToNull(customer);
        if (customer.getPhoneNumber() != null) {
            Customer matchedCustomer = FypProjectUtils.getEntityByCondition(Customer::getPhoneNumber, customer.getPhoneNumber(), baseMapper);
            if (matchedCustomer != null && !matchedCustomer.getCustomerId().equals(customerId)) {
                throw new ServiceException(ERROR_CODE_401, "The phone number has been used by another customer.");
            }
        }
        if (customer.getOrderEmail() != null) {
            Customer matchedCustomer = FypProjectUtils.getEntityByCondition(Customer::getOrderEmail, customer.getOrderEmail(), baseMapper);
            if (matchedCustomer != null && !matchedCustomer.getCustomerId().equals(customerId)) {
                throw new ServiceException(ERROR_CODE_401, "The email used in orders has been used by another customer.");
            }
        }

        boolean isUpdated;
        try {
            isUpdated = updateById(customer);
        } catch (Exception e) {
            log.error("The mybatis has failed to update the customer {}", customerId, e);
            throw new ServiceException(ERROR_CODE_400, "The customer personal info provided to update is null, please check it again.");
        }
        if (!isUpdated) {
            throw new ServiceException(ERROR_CODE_404, "The customer id is wrong, find no matched one to update personal info.");
        }

        Customer updatedCustomer;
        try {
            updatedCustomer = getById(customerId);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the updated customer {}", customerId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        if (updatedCustomer == null) {
            throw new ServiceException(ERROR_CODE_404, "The customer id is wrong, find no matched one to updated customer.");
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
        String token = TokenUtils.genToken("customer", String.valueOf(customer.getAccountId()));
        loginCustomerDTO.setToken(token);
        return loginCustomerDTO;
    }

    private static Customer handleOrderCustomersCityAndCountry(String address, Customer customer) {
        String[] addressArray = address.split(",");
        String city = addressArray.length >= 3 ? addressArray[addressArray.length - 3].trim() : "";
        String country = addressArray.length >= 2 ? addressArray[addressArray.length - 2].trim() : "";
        customer.setCity(city);
        customer.setCountry(country);
        return customer;
    }

}
