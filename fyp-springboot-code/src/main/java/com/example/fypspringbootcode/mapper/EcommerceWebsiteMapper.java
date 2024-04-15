package com.example.fypspringbootcode.mapper;

import com.example.fypspringbootcode.entity.EcommerceWebsite;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-23
 */
public interface EcommerceWebsiteMapper extends BaseMapper<EcommerceWebsite> {

    List<String> selectEcommerceWebsitesByCustomerId(Integer customerId);

}
