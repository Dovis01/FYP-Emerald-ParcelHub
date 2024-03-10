package com.example.fypspringbootcode.tests;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.entity.Customer;
import com.example.fypspringbootcode.entity.EcommerceJsonData;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.CustomerMapper;
import com.example.fypspringbootcode.mapper.EcommerceJsonDataMapper;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_500;

/**
 * @title:FinalYearProjectCode
 * @description:<TODO description class purpose>
 * @author: Shijin Zhang
 * @version:1.0.0
 * @create:04/02/2024 08:56
 **/
@SpringBootTest
@Slf4j
public class CustomerTest extends ServiceImpl<CustomerMapper, Customer> {
    @Autowired
    private EcommerceJsonDataMapper ecommerceJsonDataMapper;

    @Test
    public void deleteOrderCustomerRecordsFromJsonDataInBatch() {
        List<String> allOfJsonDataColumn = ecommerceJsonDataMapper.selectObjs(
                new LambdaQueryWrapper<EcommerceJsonData>().select(EcommerceJsonData::getJsonData)
        ).stream().map(obj -> (String) obj).toList();
        System.out.println(allOfJsonDataColumn);

        for (String jsonData : allOfJsonDataColumn) {
            JsonObject jsonObject = JsonParser.parseString(jsonData).getAsJsonObject();
            String customerName = jsonObject.get("customer").getAsJsonObject().get("name").getAsString();
            try {
                remove(new LambdaQueryWrapper<Customer>().eq(Customer::getFullName, customerName));
            } catch (Exception e) {
                log.error("The mybatis has failed to delete the customer record from json data in customer table", e);
                throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
            }
        }
    }
}
