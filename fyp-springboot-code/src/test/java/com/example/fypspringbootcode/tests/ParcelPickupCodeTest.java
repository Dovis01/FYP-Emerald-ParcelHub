package com.example.fypspringbootcode.tests;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.entity.ParcelPickupCode;
import com.example.fypspringbootcode.mapper.ParcelPickupCodeMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;


/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 09/04/2024 23:38
 **/
@SpringBootTest
@Slf4j
public class ParcelPickupCodeTest extends ServiceImpl<ParcelPickupCodeMapper, ParcelPickupCode> {
    @Test
    public void test() {
        System.out.println(baseMapper.getParcelPickupCodesByCustomerId(1207));
    }

}
