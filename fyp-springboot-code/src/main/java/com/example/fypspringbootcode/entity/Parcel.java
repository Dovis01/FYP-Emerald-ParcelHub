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
 * @since 2024-03-02
 */
@Data
@TableName("t_51_parcel")
public class Parcel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "parcel_id", type = IdType.AUTO)
    private Integer parcelId;

    private Integer volume;

    private Integer weight;

    private String errorInfo;

    private Integer orderId;

    private Integer stationId;

    private Integer senderId;

    private Integer shelfId;

    @Override
    public String toString() {
        return "Parcel{" +
        "parcelId = " + parcelId +
        ", volume = " + volume +
        ", weight = " + weight +
        ", errorInfo = " + errorInfo +
        ", orderId = " + orderId +
        ", stationId = " + stationId +
        ", senderId = " + senderId +
        ", shelfId = " + shelfId +
        "}";
    }
}
