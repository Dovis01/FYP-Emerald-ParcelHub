package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.entity.EcommerceWebsite;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.Map;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-23
 */
public interface IEcommerceWebsiteService extends IService<EcommerceWebsite> {

    Map<String,Integer> getEcommerceWebsiteInfoStatisticsByCustomerId(Integer customerId);

    void addEcommerceWebsite(EcommerceWebsite ecommerceWebsite);

    EcommerceWebsite getEcommerceWebsiteByName(String websiteName);

    boolean isEcommerceWebsiteExist(String websiteName);

    void deleteEcommerceWebsiteById(Integer ecommerceWebsiteId);

    void deleteAllEcommerceWebsite();

}
