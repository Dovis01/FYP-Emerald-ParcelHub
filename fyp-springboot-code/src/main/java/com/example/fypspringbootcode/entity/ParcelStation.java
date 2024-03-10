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
 * @since 2024-02-14
 */
@Data
@TableName("t_32_parcel_station")
public class ParcelStation implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "station_id", type = IdType.AUTO)
    private Integer stationId;

    private String communityName;

    private String city;

    private String address;

    private Integer shelvesTotalNumber;

    @Override
    public String toString() {
        return "ParcelStation{" +
        "stationId = " + stationId +
        ", communityName = " + communityName +
        ", address = " + address +
        ", shelvesNumber = " + shelvesTotalNumber +
        "}";
    }
}
