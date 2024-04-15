package com.example.fypspringbootcode.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.fypspringbootcode.controller.dto.CustomerInfoDTO;
import com.example.fypspringbootcode.entity.Customer;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-01-28
 */
public interface CustomerMapper extends BaseMapper<Customer> {

    List<CustomerInfoDTO> getAllCustomersInfoList();

}
