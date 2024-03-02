package com.example.fypspringbootcode.service.impl;

import com.example.fypspringbootcode.entity.OrderDetails;
import com.example.fypspringbootcode.mapper.OrderDetailsMapper;
import com.example.fypspringbootcode.service.IOrderDetailsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-02
 */
@Service
public class OrderDetailsServiceImpl extends ServiceImpl<OrderDetailsMapper, OrderDetails> implements IOrderDetailsService {

}
