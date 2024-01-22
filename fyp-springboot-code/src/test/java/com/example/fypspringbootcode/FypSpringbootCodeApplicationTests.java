package com.example.fypspringbootcode;

import cn.hutool.crypto.SecureUtil;
import com.example.fypspringbootcode.entity.Admin;
import com.example.fypspringbootcode.mapper.AdminMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j //用于异常错误抛出 下方log.error
class FypSpringbootCodeApplicationTests {

    private static final String DEFAULT_PASS = "zsj123456";
    private static final String PASS_SALT = "Dovis"; //密码盐

    @Autowired
    AdminMapper adminMapper;
    @Test
    public Admin getById(Integer id) {
        return adminMapper.selectById(id);
    }

    @Test
    public void deleteById(Integer id) {
        adminMapper.deleteById(id);
    }

    private String securePass(String password) {
        return SecureUtil.md5(password + PASS_SALT);
    }

}
