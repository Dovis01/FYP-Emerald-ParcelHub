package com.example.fypspringbootcode.tests;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.entity.Customer;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.CustomerMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;

/**
 * @title:FinalYearProjectCode
 * @description:<TODO description class purpose>
 * @author: Shijin Zhang
 * @version:1.0.0
 * @create:04/02/2024 08:56
 **/
@SpringBootTest
@Slf4j //用于异常错误抛出 下方log.error
public class CustomerTest extends ServiceImpl<CustomerMapper, Customer> {
    @Test
    public void insertData() {
//       Customer customer = new Customer("Brenda Chovery", 2013);
//        try {
//            save(customer);
//        } catch (DuplicateKeyException e) {
//            log.error("Fail to insert data, fullname:{}", customer.getFullName(), e);
//            throw new ServiceException("Full name already exists");
//        }
    }
}
