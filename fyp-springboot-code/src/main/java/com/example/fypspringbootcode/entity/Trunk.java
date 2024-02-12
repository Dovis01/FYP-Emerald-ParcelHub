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
@TableName("t_43_trunk")
public class Trunk implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "trunk_id", type = IdType.AUTO)
    private Integer trunkId;

    private String trunkType;

    private String trunkPlateNumber;

    private Integer maxWeight;

    private Integer volume;


    @Override
    public String toString() {
        return "Trunk{" +
        "trunkId = " + trunkId +
        ", trunkType = " + trunkType +
        ", trunkPlateNumber = " + trunkPlateNumber +
        ", maxWeight = " + maxWeight +
        ", volume = " + volume +
        "}";
    }
}
