package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.entity.Item;
import com.baomidou.mybatisplus.extension.service.IService;
import com.google.gson.JsonArray;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-02
 */
public interface IItemService extends IService<Item> {

    List<Item> getItemsDataByParcelId(Integer parcelId);

    void addParcelItemsInfoInBatch(JsonArray itemsData, Integer parcelId);

    void clearItemsData();

}
