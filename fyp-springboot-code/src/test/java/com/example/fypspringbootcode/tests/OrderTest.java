package com.example.fypspringbootcode.tests;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.entity.Order;
import com.example.fypspringbootcode.mapper.OrderMapper;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 20/03/2024 02:41
 **/
@SpringBootTest
public class OrderTest extends ServiceImpl<OrderMapper, Order> {

}
