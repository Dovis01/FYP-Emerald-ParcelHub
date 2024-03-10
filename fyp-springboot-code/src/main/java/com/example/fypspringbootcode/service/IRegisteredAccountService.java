package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.controller.request.BaseRegisterRequest;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.example.fypspringbootcode.controller.request.ResetPasswordRequest;
import com.example.fypspringbootcode.entity.RegisteredAccount;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 *
 * @author Shijin Zhang
 * @since 2024-01-28
 */
public interface IRegisteredAccountService extends IService<RegisteredAccount> {
    void deleteByAccountId(Integer accountId);

    RegisteredAccount getByAccountId(Integer accountId);

    Integer createRegisteredAccount(BaseRegisterRequest registerRequest);

    RegisteredAccount checkRegisteredAccount(LoginRequest request);

    RegisteredAccount updateAccountInfo(RegisteredAccount registeredAccount, Integer accountId);

    void resetPassword(ResetPasswordRequest request);
}
