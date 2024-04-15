package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.service.IEcommerceWebsiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-23
 */
@CrossOrigin
@RestController
@RequestMapping("/ecommerceWebsite")
public class EcommerceWebsiteController {

    @Autowired
    IEcommerceWebsiteService ecommerceWebsiteService;

    @GetMapping("/v1/info-statistics/customer/{customerId}")
    public Result getEcommerceWebsiteInfoStatisticsByCustomerId(@PathVariable Integer customerId) {
        Map<String,Integer> info =ecommerceWebsiteService.getEcommerceWebsiteInfoStatisticsByCustomerId(customerId);
        return Result.success(info, "Get ecommerce website info statistics by customer id successfully");
    }

}
