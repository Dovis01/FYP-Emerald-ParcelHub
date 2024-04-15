package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.entity.Order;
import com.baomidou.mybatisplus.extension.service.IService;
import com.google.gson.JsonArray;

import java.util.ArrayList;
import java.util.Map;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-03
 */
public interface IOrderService extends IService<Order> {

    void addOrdersInfoInBatch(JsonArray ecommerceJsonData);

    void updateOrderStatusById(Integer orderId, String orderStatus);

    ArrayList<Map<String, Object>> getOrderDataByCustomerId(Integer customerId);

    void deleteAllOrdersData();

}
