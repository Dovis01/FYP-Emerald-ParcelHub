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
 * @since 2024-03-13
 */
@Data
@TableName("t_91_google_geocoding_cache")
public class GoogleGeocodingCache implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "geocoding_id", type = IdType.AUTO)
    private Integer geocodingId;

    private BigDecimal longitude;

    private BigDecimal latitude;

    private String addressType;

    private String address;

    @Override
    public String toString() {
        return "GoogleGeocodingCache{" +
        "geocodingId = " + geocodingId +
        ", longitude = " + longitude +
        ", latitude = " + latitude +
        ", addressType = " + addressType +
        ", address = " + address +
        "}";
    }
}
