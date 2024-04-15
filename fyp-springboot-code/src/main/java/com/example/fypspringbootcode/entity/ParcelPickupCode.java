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
 * @since 2024-04-09
 */
@Data
@TableName("t_55_parcel_pickup_code")
public class ParcelPickupCode implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "pickup_code_id", type = IdType.AUTO)
    private Integer pickupCodeId;

    private String pickupCode;

    private Integer parcelId;

    @Override
    public String toString() {
        return "ParcelPickupCode{" +
        "pickupCodeId = " + pickupCodeId +
        ", pickupCode = " + pickupCode +
        ", parcelId = " + parcelId +
        "}";
    }
}
