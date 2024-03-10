package com.example.fypspringbootcode.service.impl;

import com.example.fypspringbootcode.entity.Item;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.ItemMapper;
import com.example.fypspringbootcode.service.IItemService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_500;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-02
 */
@Service
public class ItemServiceImpl extends ServiceImpl<ItemMapper, Item> implements IItemService {

    @Override
    public void addParcelItemsInfoInBatch(JsonArray itemsData, Integer parcelId) {
        List<Item> itemList = new ArrayList<>();
        for (JsonElement element : itemsData) {

            Integer itemId = element.getAsJsonObject().get("item_id").getAsInt();
            String description = element.getAsJsonObject().get("description").getAsString();
            Integer quantity = element.getAsJsonObject().get("quantity").getAsInt();
            BigDecimal weight = element.getAsJsonObject().get("weight").getAsBigDecimal();
            BigDecimal price = element.getAsJsonObject().get("price").getAsBigDecimal();

            Item newItem = new Item();
            newItem.setParcelId(parcelId);
            newItem.setItemId(itemId);
            newItem.setDescriptionInfo(description);
            newItem.setQuantity(quantity);
            newItem.setWeight(weight);
            newItem.setPrice(price);

            itemList.add(newItem);
        }
        try {
            saveBatch(itemList);
        } catch (Exception e) {
            log.error("Fail to insert items info data of some parcel", e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
    }

    @Override
    public void clearItemsData() {
        remove(null);
    }
}
