package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.entity.EcommerceJsonData;
import com.example.fypspringbootcode.service.IEcommerceJsonDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

/**
 * @author Shijin Zhang
 * @since 2024-02-23
 */
@CrossOrigin
@RestController
@RequestMapping("/ecommerceJsonData")
public class EcommerceJsonDataController {
    @Autowired
    IEcommerceJsonDataService ecommerceJsonDataService;

    @PostMapping("/v1/insert")
    public Result insertEcommerceJsonData(@RequestBody EcommerceJsonData ecommerceJsonData) {
        ecommerceJsonDataService.addEcommerceJsonData(ecommerceJsonData);
        return Result.success("Insert E-commerce Json data successfully");
    }

    @GetMapping("/v1/all-data")
    public Result getAllEcommerceJsonData() {
        ArrayList<Map<String, Object>> allEcommerceJsonData = ecommerceJsonDataService.getAllEcommerceJsonDataAsArray();
        return Result.success(allEcommerceJsonData, "Get all E-commerce Json data successfully");
    }

    @DeleteMapping("/v1/delete-all")
    public Result deleteAllEcommerceJsonData() {
        ecommerceJsonDataService.deleteAllEcommerceJsonData();
        return Result.success("Delete all E-commerce Json data successfully");
    }

    @DeleteMapping("/v1/delete-multiple")
    public Result deleteMultipleEcommerceJsonData(@RequestBody EcommerceJsonData ecommerceJsonData) {
        ecommerceJsonDataService.deleteMultipleEcommerceJsonDataById(ecommerceJsonData.getEcommerceJsonDataIdsToDelete());
        return Result.success("Delete multiple E-commerce Json data successfully");
    }
}
