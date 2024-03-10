package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-03
 */
@CrossOrigin
@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    IOrderService orderService;

    @GetMapping("/v1/part-data/customer/{customerId}")
    public Result getOrderDataOfSomeCustomer(@PathVariable Integer customerId) {
        ArrayList<Map<String, Object>> orderDataOfCustomer = orderService.getOrderDataByCustomerId(customerId);
        return Result.success(orderDataOfCustomer, "Get orders data of this customer successfully");
    }

}
