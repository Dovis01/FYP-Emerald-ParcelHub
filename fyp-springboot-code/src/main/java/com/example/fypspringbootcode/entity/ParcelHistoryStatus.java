package com.example.fypspringbootcode.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-10
 */
@Data
@TableName("t_54_parcel_history_status")
public class ParcelHistoryStatus implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "status_id", type = IdType.AUTO)
    private Integer statusId;

    private String statusInfo = "Packaged";

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Europe/Dublin")
    private LocalDateTime statusUpdateTimestamp;

    private Integer parcelId;

    @Override
    public String toString() {
        return "ParcelHistoryStatus{" +
        "statusId = " + statusId +
        ", statusInfo = " + statusInfo +
        ", statusUpdateTimestamp = " + statusUpdateTimestamp +
        ", parcelId = " + parcelId +
        "}";
    }
}
