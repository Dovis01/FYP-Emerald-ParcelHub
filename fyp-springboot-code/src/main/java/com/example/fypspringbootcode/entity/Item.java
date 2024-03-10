package com.example.fypspringbootcode.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-02
 */
@Data
@TableName("t_52_item")
public class Item implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "item_id", type = IdType.AUTO)
    private Integer itemId;

    private String descriptionInfo;

    private Integer quantity;

    private String errorInfo;

    private BigDecimal weight;

    private BigDecimal price;

    private Integer parcelId;

    @Override
    public String toString() {
        return "Item{" +
        "itemId = " + itemId +
        ", description = " + descriptionInfo +
        ", quantity = " + quantity +
        ", errorInfo = " + errorInfo +
        ", weight = " + weight +
        ", price = " + price +
        ", parcelId = " + parcelId +
        "}";
    }
}
