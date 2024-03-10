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
 * @since 2024-02-13
 */
@Data
@TableName("t_42_courier_delivery_record")
public class CourierDeliveryRecord implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "courier_delivery_record_id", type = IdType.AUTO)
    private Integer courierDeliveryRecordId;

    private Integer courierId;

    private Integer parcelId;

    private Integer truckId;

    @Override
    public String toString() {
        return "CourierDeliveryRecord{" +
        "courierDeliveryRecordId = " + courierDeliveryRecordId +
        ", courierId = " + courierId +
        ", parcelId = " + parcelId +
        ", truckId = " + truckId +
        "}";
    }
}
