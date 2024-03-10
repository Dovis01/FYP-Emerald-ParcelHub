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
 * @since 2024-03-10
 */
@Data
@TableName("t_56_parcel_tracking_code")
public class ParcelTrackingCode implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "tracking_code_id", type = IdType.AUTO)
    private Integer trackingCodeId;

    private String parcelTrackingCode;

    private Integer parcelId;

    @Override
    public String toString() {
        return "ParcelTrackingCode{" +
        "trackingCodeId = " + trackingCodeId +
        ", parcelTrackingCode = " + parcelTrackingCode +
        ", parcelId = " + parcelId +
        "}";
    }
}
