package com.example.fypspringbootcode.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

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

    @TableField(exist = false)
    private String parcelTrackingCode;

    private BigDecimal length;

    private BigDecimal width;

    private BigDecimal height;

    private BigDecimal volume;

    private BigDecimal weight;

    private String errorInfo;

    private Integer orderId;

    private Integer stationId;

    private Integer senderId;

    private Integer shelfId;

    @TableField(exist = false)
    private List<Item> items;

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
