package com.example.fypspringbootcode.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * @title:FinalYearProjectCode
 * @description:<TODO description class purpose>
 * @author: Shijin Zhang
 * @version:1.0.0
 * @create:05/02/2024 03:30
 **/
@Data
@TableName("t_63_customer")
public class Customer implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "customer_id", type = IdType.AUTO)
    private Integer customerId;

    private String fullName;

    private String avatar;

    private String phoneNumber;

    private String country;

    private String city;

    private String address;

    private Integer accountId;

    @Override
    public String toString() {
        return "Customer{" +
                "customerId = " + customerId +
                ", fullName = " + fullName +
                ", avatar = " + avatar +
                ", phoneNumber = " + phoneNumber +
                ", country = " + country +
                ", city = " + city +
                ", address = " + address +
                ", accountId = " + accountId +
                "}";
    }
}
