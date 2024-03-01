package com.example.fypspringbootcode.entity;

import com.baomidou.mybatisplus.annotation.IdType;
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
@TableName("t_22_ecommerce_website")
public class EcommerceWebsite implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "ecommerce_website_id", type = IdType.AUTO)
    private Integer ecommerceWebsiteId;

    private String websiteName;

    private String url;

    @Override
    public String toString() {
        return "EcommerceWebsite{" +
        "ecommerceWebsiteId = " + ecommerceWebsiteId +
        ", name = " + websiteName +
        ", url = " + url +
        "}";
    }
}
