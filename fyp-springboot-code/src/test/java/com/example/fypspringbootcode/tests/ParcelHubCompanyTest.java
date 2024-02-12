package com.example.fypspringbootcode.tests;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.entity.ParcelHubCompany;

import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.ParcelHubCompanyMapper;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;

/**
 * @title:FinalYearProjectCode
 * @description:<TODO description class purpose>
 * @author: Shijin Zhang
 * @version:1.0.0
 * @create:12/02/2024 02:09
 **/
@SpringBootTest
@Slf4j
public class ParcelHubCompanyTest extends ServiceImpl<ParcelHubCompanyMapper, ParcelHubCompany> {

    @Test
    public void insertData() {
        ParcelHubCompany parcelHubCompany = new ParcelHubCompany();
        parcelHubCompany.setCompanyName("Emerald Parcel Hub Express");
        parcelHubCompany.setCompanyType("Headquarters");
        parcelHubCompany.setCountry("Ireland");
        parcelHubCompany.setCity("Dublin");
        parcelHubCompany.setAddress("482 Lopez Place Suite 528, Dublin, Ireland");
        try {
            baseMapper.insert(parcelHubCompany);
        } catch (DuplicateKeyException e) {
            log.error("Fail to insert data, company name:{}", parcelHubCompany.getCompanyName(), e);
            throw new ServiceException("Company name already exists");
        }
    }
}
