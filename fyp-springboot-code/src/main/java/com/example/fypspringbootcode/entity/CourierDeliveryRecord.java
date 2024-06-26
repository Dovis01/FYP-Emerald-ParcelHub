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
 * @since 2024-02-13
 */
@Data
@TableName("t_42_courier_delivery_record")
public class CourierDeliveryRecord implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "delivery_record_id", type = IdType.AUTO)
    private Integer deliveryRecordId;

    private Integer courierId;

    private Integer stationId;

    private Integer parcelId;

    private Integer truckId;

    @TableField(exist = false)
    private Courier courier;

    @TableField(exist = false)
    private ParcelStation parcelStation;

    @TableField(exist = false)
    private Parcel parcel;

    @TableField(exist = false)
    private Truck truck;

    @TableField(exist = false)
    private CompanyEmployee parcelStationManager;

    @Override
    public String toString() {
        return "CourierDeliveryRecord{" +
        "deliveryRecordId = " + deliveryRecordId +
        ", courierId = " + courierId +
        ", stationId = " + stationId +
        ", parcelId = " + parcelId +
        ", truckId = " + truckId +
        "}";
    }
}
