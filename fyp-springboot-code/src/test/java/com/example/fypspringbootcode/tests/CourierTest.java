package com.example.fypspringbootcode.tests;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.entity.Courier;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.CourierMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;


/**
 * @title:FinalYearProjectCode
 * @description:<TODO description class purpose>
 * @author: Shijin Zhang
 * @version:1.0.0
 * @create:12/02/2024 02:46
 **/
@SpringBootTest
@Slf4j
public class CourierTest extends ServiceImpl<CourierMapper, Courier> {
    @Test
    public void insertData() {
        Courier courier = new Courier();
        courier.setEmployeeId(2);
        courier.setDailyDeliveryParcelsNum(14);
        try {
            baseMapper.insert(courier);
        } catch (DuplicateKeyException e) {
            log.error("Fail to insert data, courier:{}", courier.getCourierId(), e);
            throw new ServiceException("Company name already exists");
        }
    }
}
