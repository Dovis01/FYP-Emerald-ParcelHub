package com.example.fypspringbootcode.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-02
 */
@Data
@TableName("t_61_order_details")
public class OrderDetails implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "order_id", type = IdType.AUTO)
    private Integer orderId;

    private LocalDate orderDate;

    private LocalDate expectedDeliveryDate;

    private Integer ecommerceWebsiteId;

    private Integer customerId;

    @Override
    public String toString() {
        return "OrderDetails{" +
        "orderId = " + orderId +
        ", orderDate = " + orderDate +
        ", expectedDeliveryDate = " + expectedDeliveryDate +
        ", ecommerceWebsiteId = " + ecommerceWebsiteId +
        ", customerId = " + customerId +
        "}";
    }
}
