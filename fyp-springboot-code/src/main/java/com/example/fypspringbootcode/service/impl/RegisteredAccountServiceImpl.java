package com.example.fypspringbootcode.service.impl;

import cn.hutool.crypto.SecureUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.example.fypspringbootcode.common.config.AppConfig;
import com.example.fypspringbootcode.controller.request.BaseRegisterRequest;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.example.fypspringbootcode.entity.RegisteredAccount;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.RegisteredAccountMapper;
import com.example.fypspringbootcode.service.IRegisteredAccountService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import static com.example.fypspringbootcode.common.ErrorCodeList.*;

/**
 * @author Shijin Zhang
 * @since 2024-01-28
 */
@Service
@Slf4j
public class RegisteredAccountServiceImpl extends ServiceImpl<RegisteredAccountMapper, RegisteredAccount> implements IRegisteredAccountService {

    @Override
    public void deleteByAccountId(Integer accountId) {
        boolean isDeleted;
        try {
            isDeleted = removeById(accountId);
        } catch (Exception e) {
            log.error("The mybatis has failed to delete the registered account {}", accountId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        if (!isDeleted) {
            throw new ServiceException(ERROR_CODE_404, "The registered account id is wrong, find no matched one to delete.");
        }
    }

    @Override
    public RegisteredAccount getByAccountId(Integer accountId) {
        RegisteredAccount registeredAccount;
        try {
            registeredAccount = getById(accountId);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed", e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        if (registeredAccount == null) {
            throw new ServiceException(ERROR_CODE_404, "The account id is wrong, find no matched one.");
        }
        registeredAccount.setPassword(null);
        return registeredAccount;
    }

    @Override
    public Integer createRegisteredAccount(BaseRegisterRequest registerRequest) {
        // Check if the username or email already exists
        QueryWrapper<RegisteredAccount> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", registerRequest.getUsername());
        if (getOne(queryWrapper) != null) {
            throw new ServiceException(ERROR_CODE_401, "The username already exists.");
        }
        queryWrapper.clear();
        queryWrapper.eq("email", registerRequest.getEmail());
        if (getOne(queryWrapper) != null) {
            throw new ServiceException(ERROR_CODE_401, "The email already exists.");
        }

        // Insert the new record
        RegisteredAccount newRecord = new RegisteredAccount();
        newRecord.setUsername(registerRequest.getUsername());
        newRecord.setEmail(registerRequest.getEmail());
        newRecord.setPassword(securePass(registerRequest.getPassword()));
        save(newRecord);
        return newRecord.getAccountId();
    }

    @Override
    public RegisteredAccount checkRegisteredAccount(LoginRequest loginRequest) {
        QueryWrapper<RegisteredAccount> queryWrapper = new QueryWrapper<>();
        RegisteredAccount result = null;

        // Check which field (username or email) is provided and set the condition accordingly
        if (loginRequest.getUsername() != null && !loginRequest.getUsername().isEmpty()) {
            queryWrapper.eq("username", loginRequest.getUsername());
            result = getRegisteredAccountByQueryWrapper(queryWrapper);
            if (result == null) {
                throw new ServiceException(ERROR_CODE_404, "The username is wrong, find no matched one.");
            }
        }
        if (loginRequest.getEmail() != null && !loginRequest.getEmail().isEmpty()) {
            queryWrapper.eq("email", loginRequest.getEmail());
            result = getRegisteredAccountByQueryWrapper(queryWrapper);
            if (result == null) {
                throw new ServiceException(ERROR_CODE_404, "The email is wrong, find no matched one.");
            }
        }

        assert result != null;
        handleLoginException(loginRequest.getPassword(), result);
        // Return the account_id if a matching record is found
        return result;
    }

    private RegisteredAccount getRegisteredAccountByQueryWrapper(QueryWrapper<RegisteredAccount> queryWrapper) {
        // Execute the query
        RegisteredAccount result;
        try {
            result = getOne(queryWrapper);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed", e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        return result;
    }

    @Override
    public RegisteredAccount updateAccountInfo(RegisteredAccount registeredAccount, Integer accountId) {

        // Check if the new account info is provided
        if (registeredAccount.getNewPassword().isEmpty() &&
                registeredAccount.getUsername().isEmpty() &&
                registeredAccount.getEmail().isEmpty()) {
            throw new ServiceException(ERROR_CODE_400, "No new account info is provided to update the account.");
        }
        // Set the new account info to null if it is empty
        if(registeredAccount.getUsername().isEmpty()){
            registeredAccount.setUsername(null);
        }
        if(registeredAccount.getEmail().isEmpty()){
            registeredAccount.setEmail(null);
        }
        if (!registeredAccount.getNewPassword().isEmpty()) {
            registeredAccount.setPassword(securePass(registeredAccount.getNewPassword()));
        }

        registeredAccount.setUpdateTime(LocalDateTime.now());
        UpdateWrapper<RegisteredAccount> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("account_id", accountId);

        // Update the record
        boolean isUpdated;
        try {
            isUpdated = update(registeredAccount, updateWrapper);
        } catch (Exception e) {
            log.error("The mybatis has failed to update the registered account {}", accountId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        if (!isUpdated) {
            throw new ServiceException(ERROR_CODE_404, "The account id provided is wrong, find no matched one to update account info.");
        }

        // Return the updated record
        RegisteredAccount updatedRegisteredAccount;
        try {
            updatedRegisteredAccount = getById(accountId);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the updated account {}", accountId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        if (updatedRegisteredAccount == null) {
            throw new ServiceException(ERROR_CODE_404, "The account id provided is wrong, find no matched updated account to get.");
        }
        updatedRegisteredAccount.setPassword(null);
        return updatedRegisteredAccount;
    }


    private void handleLoginException(String password, RegisteredAccount result) {
        String securePass = securePass(password);
        if (!securePass.equals(result.getPassword())) {
            throw new ServiceException(ERROR_CODE_401, "The password provided is wrong.");
        }
        if (!result.getStatus()) {
            throw new ServiceException(ERROR_CODE_401, "The account is disabled.");
        }
    }

    private String securePass(String password) {
        return SecureUtil.md5(password + AppConfig.PASS_SALT);
    }
}
