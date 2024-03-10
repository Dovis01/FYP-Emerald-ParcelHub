package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.entity.Sender;
import com.baomidou.mybatisplus.extension.service.IService;
import com.google.gson.JsonArray;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-02
 */
public interface ISenderService extends IService<Sender> {

    void addOrderSendersInfoInBatch(JsonArray ecommerceJsonData);

    void deleteAllSendersData();

}
