package com.example.fypspringbootcode.tests;

import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.SecureUtil;
import com.example.fypspringbootcode.entity.Admin;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.AdminMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

/**
 * @title:FinalYearProjectCode
 * @description:<TODO description class purpose>
 * @author: Shijin Zhang
 * @version:1.0.0
 * @create:15/01/2024 04:35
 **/
@SpringBootTest
@Slf4j //用于异常错误抛出 下方log.error
public class AdminTest {

    private static final String DEFAULT_PASS = "123456";
    private static final String PASS_SALT = "Dovis"; //密码盐

    @Autowired
    AdminMapper adminMapper;
    @Test
    public void getById() {
        System.out.println(adminMapper.selectById(1));
    }
    @Test
    public void save() {
        Admin admin = new Admin(3,"admin3","zsj123456");
        //如果admin对象的密码属性为空 则设置默认密码 123
        //hutool包下的工具类StrUtil
        if (StrUtil.isBlank(admin.getPassword())) {
            admin.setPassword(DEFAULT_PASS);
        }
        //hutool包下的工具类SecureUtil
        admin.setPassword(securePass(admin.getPassword()));  // 设置md5加密，加盐
        try {
            //可能发生数据库加入重复admin用户名值发生的未捕获的异常  save方法可能会失败
            adminMapper.insert(admin);
        } catch (DuplicateKeyException e) {
            log.error("数据插入失败， username:{}", admin.getAdminName(), e);
            throw new ServiceException("用户名重复");
        }
    }

    @Test
    public void deleteById(Integer id) {
        adminMapper.deleteById(id);
    }

    private String securePass(String password) {
        return SecureUtil.md5(password + PASS_SALT);
    }
}
