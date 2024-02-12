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
 * @since 2024-02-12
 */
@Data
@TableName("t_71_parcel_hub_company")
public class ParcelHubCompany implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "company_id", type = IdType.AUTO)
    private Integer companyId;

    private String companyName;

    private String companyType;

    private String country;

    private String city;

    private String address;

    @Override
    public String toString() {
        return "ParcelHubCompany{" +
        "companyId = " + companyId +
        ", companyName = " + companyName +
        ", companyType = " + companyType +
        ", country = " + country +
        ", city = " + city +
        ", address = " + address +
        "}";
    }
}
