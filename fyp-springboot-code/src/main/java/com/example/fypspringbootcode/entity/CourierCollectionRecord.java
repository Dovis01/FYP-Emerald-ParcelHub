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
 * @since 2024-03-19
 */
@Data
@TableName("t_43_courier_collection_record")
public class CourierCollectionRecord implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "collection_record_id", type = IdType.AUTO)
    private Integer collectionRecordId;

    private Integer courierId;

    private Integer senderId;

    private Integer parcelId;

    private Integer truckId;

    @TableField(exist = false)
    private Courier courier;

    @TableField(exist = false)
    private Sender sender;

    @TableField(exist = false)
    private Parcel parcel;

    @TableField(exist = false)
    private Truck truck;

    @Override
    public String toString() {
        return "CourierCollectionRecord{" +
        "collectionRecordId = " + collectionRecordId +
        ", courierId = " + courierId +
        ", senderId = " + senderId +
        ", parcelId = " + parcelId +
        ", truckId = " + truckId +
        "}";
    }
}
