package com.example.fypspringbootcode.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-23
 */
@Data
@TableName("t_21_ecommerce_json_data")
public class EcommerceJsonData implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "ecommerce_json_data_id", type = IdType.AUTO)
    private Integer ecommerceJsonDataId;

    private String jsonData;

    private Integer ecommerceWebsiteId;

    @TableField(exist = false)
    private Integer[] ecommerceJsonDataIdsToDelete;

    @Override
    public String toString() {
        return "EcommerceJsonData{" +
        "ecommerceJsonDataId = " + ecommerceJsonDataId +
        ", jsonData = " + jsonData +
        ", ecommerceWebsiteId = " + ecommerceWebsiteId +
        "}";
    }
}
