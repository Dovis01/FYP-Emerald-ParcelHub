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
 * @since 2024-04-14
 */
@Data
@TableName("t_23_past_statistics")
public class PastStatistics implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "data_id", type = IdType.AUTO)
    private Integer dataId;

    private String jsonDataRecords;

    private String roleType;

    @Override
    public String toString() {
        return "PastStatistics{" +
        "dataId = " + dataId +
        ", jsonDataRecords = " + jsonDataRecords +
        ", roleType = " + roleType +
        "}";
    }
}
