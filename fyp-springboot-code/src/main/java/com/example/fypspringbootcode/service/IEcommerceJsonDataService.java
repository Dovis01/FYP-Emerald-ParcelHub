package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.entity.EcommerceJsonData;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.ArrayList;
import java.util.Map;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-23
 */
public interface IEcommerceJsonDataService extends IService<EcommerceJsonData> {

    void addEcommerceJsonData(EcommerceJsonData ecommerceJsonData);

    ArrayList<Map<String, Object>> getAllEcommerceJsonDataAsArray();

    EcommerceJsonData getOneEcommerceJsonDataById(Integer ecommerceJsonDataId);

    void deleteAllEcommerceJsonData();

    void deleteOneEcommerceJsonDataById(Integer ecommerceJsonDataId);

    void deleteMultipleEcommerceJsonDataById(Integer[] ecommerceJsonDataIds);
}
