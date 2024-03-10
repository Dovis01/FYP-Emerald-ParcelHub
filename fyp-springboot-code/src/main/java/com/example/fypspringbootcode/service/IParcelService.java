package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.entity.Parcel;
import com.baomidou.mybatisplus.extension.service.IService;
import com.google.gson.JsonArray;

import java.util.ArrayList;
import java.util.Map;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-02
 */
public interface IParcelService extends IService<Parcel> {

    void addParcelsInfoInBatch(JsonArray ecommerceJsonData);

    ArrayList<Map<String, Object>> getParcelDataByCustomerId(Integer customerId);

    void deleteAllParcelsData();

}
