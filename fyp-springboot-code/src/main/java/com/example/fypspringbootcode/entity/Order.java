package com.example.fypspringbootcode.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-03
 */
@Data
@TableName("t_61_order")
public class Order implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "order_id", type = IdType.AUTO)
    private Integer orderId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Europe/Dublin")
    private LocalDateTime orderDate;

    private String orderStatus;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Europe/Dublin")
    private LocalDateTime expectedDeliveryDate;

    private Integer ecommerceWebsiteId;

    private Integer customerId;

    @TableField(exist = false)
    private Customer customer;

    @TableField(exist = false)
    private EcommerceWebsite ecommerceWebsite;

    @TableField(exist = false)
    private Parcel parcel;

    @Override
    public String toString() {
        return "Order{" +
        "orderId = " + orderId +
        ", orderDate = " + orderDate +
        ", expectedDeliveryDate = " + expectedDeliveryDate +
        ", ecommerceWebsiteId = " + ecommerceWebsiteId +
        ", customerId = " + customerId +
        "}";
    }
}
