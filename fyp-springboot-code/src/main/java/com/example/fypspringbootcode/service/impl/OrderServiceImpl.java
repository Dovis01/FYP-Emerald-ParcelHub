package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.fypspringbootcode.entity.*;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.*;
import com.example.fypspringbootcode.service.IOrderService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.utils.FypProjectUtils;
import com.google.gson.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_500;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-03
 */
@Service
public class OrderServiceImpl extends ServiceImpl<OrderMapper, Order> implements IOrderService {

    @Autowired
    private CustomerMapper customerMapper;

    @Autowired
    private EcommerceWebsiteMapper ecommerceWebsiteMapper;

    @Autowired
    private ParcelMapper parcelMapper;

    @Autowired
    private ItemMapper itemMapper;

    @Override
    public void addOrdersInfoInBatch(JsonArray ecommerceJsonData) {
        List<Order> orderList = new ArrayList<>();

        for (JsonElement element : ecommerceJsonData) {

            LocalDateTime expectedDeliveryDate =handleOrderInfoDate(element.getAsJsonObject().get("delivery").getAsJsonObject().get("expected_delivery_date").getAsString());
            LocalDateTime orderDate = handleOrderInfoDate(element.getAsJsonObject().get("order_date").getAsString());
            Integer orderId = element.getAsJsonObject().get("order_id").getAsInt();
            String orderStatus = element.getAsJsonObject().get("order_status").getAsString();
            String ecommerceWebsiteName = element.getAsJsonObject().get("e_commerce_platform").getAsJsonObject().get("name").getAsString();
            String customerName = element.getAsJsonObject().get("customer").getAsJsonObject().get("name").getAsString();
            Integer customerId = FypProjectUtils.getEntityByCondition(Customer::getFullName, customerName, customerMapper).getCustomerId();
            Integer ecommerceWebsiteId = FypProjectUtils.getEntityByCondition(EcommerceWebsite::getWebsiteName, ecommerceWebsiteName, ecommerceWebsiteMapper).getEcommerceWebsiteId();

            Order newOrder = new Order();
            newOrder.setOrderId(orderId);
            newOrder.setCustomerId(customerId);
            newOrder.setEcommerceWebsiteId(ecommerceWebsiteId);
            newOrder.setOrderDate(orderDate);
            newOrder.setOrderStatus(orderStatus);
            newOrder.setExpectedDeliveryDate(expectedDeliveryDate);

            orderList.add(newOrder);
        }
        try {
            saveBatch(orderList);
        } catch (Exception e) {
            log.error("Fail to insert all order info data in batch, maybe having duplicated order id", e);
            throw new ServiceException(ERROR_CODE_500, "Some of orders in this file uploaded have been uploaded.");
        }
    }

    @Override
    public void updateOrderStatusById(Integer orderId, String orderStatus) {
        try {
            lambdaUpdate().eq(Order::getOrderId, orderId).set(Order::getOrderStatus, orderStatus).update();
        } catch (Exception e) {
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
    }

    @Override
    public ArrayList<Map<String, Object>> getOrderDataByCustomerId(Integer customerId) {
        List<Order> orderDataList = list(new LambdaQueryWrapper<Order>().eq(Order::getCustomerId, customerId));
        ArrayList<String> jsonStringList = convertOrderInfoToJsonString(orderDataList);
        ArrayList<Map<String, Object>> jsonMapArray = new ArrayList<>();
        for (String data : jsonStringList) {
            JsonObject jsonObject = JsonParser.parseString(data).getAsJsonObject();
            Map<String, Object> map = FypProjectUtils.convertToMap(jsonObject);
            jsonMapArray.add(map);
        }
        return jsonMapArray;
    }

    @Override
    public void deleteAllOrdersData() {
        remove(null);
    }

    private static LocalDateTime handleOrderInfoDate(String dateISO8601) {
        Instant instant = Instant.parse(dateISO8601);
        return instant.atZone(ZoneId.of("Europe/Dublin")).toLocalDateTime();
    }

    private ArrayList<String> convertOrderInfoToJsonString(List<Order> orderDataList) {
        ArrayList<String> jsonStringList = new ArrayList<>();

        Gson gson = new GsonBuilder()
                .registerTypeAdapter(LocalDateTime.class, (JsonSerializer<LocalDateTime>) (src, typeOfSrc, context) -> {
                    return src == null ? null : context.serialize(src.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
                })
                .registerTypeAdapter(LocalDateTime.class, (JsonDeserializer<LocalDateTime>) (json, typeOfT, context) -> {
                    return json == null ? null : LocalDateTime.parse(json.getAsString(), DateTimeFormatter.ISO_LOCAL_DATE_TIME);
                })
                .create();

        for (Order data : orderDataList) {
            Customer customer = FypProjectUtils.getEntityByCondition(Customer::getCustomerId, data.getCustomerId(), customerMapper);
            EcommerceWebsite ecommerceWebsite = FypProjectUtils.getEntityByCondition(EcommerceWebsite::getEcommerceWebsiteId, data.getEcommerceWebsiteId(), ecommerceWebsiteMapper);
            Parcel parcel = FypProjectUtils.getEntityByCondition(Parcel::getOrderId, data.getOrderId(), parcelMapper);
            List<Item> items = itemMapper.selectList(new LambdaQueryWrapper<Item>().eq(Item::getParcelId, parcel.getParcelId()));
            parcel.setItems(items);
            data.setCustomer(customer);
            data.setEcommerceWebsite(ecommerceWebsite);
            data.setParcel(parcel);
            String jsonString = gson.toJson(data);
            jsonStringList.add(jsonString);
        }
        return jsonStringList;
    }
}
