package com.example.fypspringbootcode.mapper;

import com.example.fypspringbootcode.entity.ParcelPickupCode;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-04-09
 */
public interface ParcelPickupCodeMapper extends BaseMapper<ParcelPickupCode> {

    List<String> getParcelPickupCodesByCustomerId(Integer customerId);

}
