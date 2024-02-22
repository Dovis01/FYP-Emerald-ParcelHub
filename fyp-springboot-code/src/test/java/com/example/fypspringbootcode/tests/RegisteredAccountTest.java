package com.example.fypspringbootcode.tests;

import cn.hutool.crypto.SecureUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.common.config.AppConfig;
import com.example.fypspringbootcode.entity.RegisteredAccount;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.RegisteredAccountMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;

/**
 * @title:FinalYearProjectCode
 * @description:<TODO description class purpose>
 * @author: Shijin Zhang
 * @version:1.0.0
 * @create:04/02/2024 09:07
 **/
@SpringBootTest
@Slf4j
public class RegisteredAccountTest extends ServiceImpl<RegisteredAccountMapper, RegisteredAccount> {
    @Test
    public void insertData() {
        RegisteredAccount registeredAccount = new RegisteredAccount();
        registeredAccount.setUsername("JohnLDoe");
        registeredAccount.setEmail("JohnDoe123456@gmail.com");
        registeredAccount.setPassword("zsj123456");
        registeredAccount.setPassword(securePass(registeredAccount.getPassword()));
        try {
            baseMapper.insert(registeredAccount);
        } catch (DuplicateKeyException e) {
            log.error("Fail to insert data, username:{}", registeredAccount.getUsername(), e);
            throw new ServiceException("User name already exists");
        }
    }

    private String securePass(String password) {
        return SecureUtil.md5(password + AppConfig.PASS_SALT);
    }
}
