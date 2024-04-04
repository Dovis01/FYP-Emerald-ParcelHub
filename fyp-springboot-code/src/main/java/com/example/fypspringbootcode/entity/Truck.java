package com.example.fypspringbootcode.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-13
 */
@Data
@TableName("t_44_truck")
public class Truck implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "truck_id", type = IdType.AUTO)
    private Integer truckId;

    private String truckType;

    private String truckPlateNumber;

    private BigDecimal maxWeight;

    private BigDecimal storageAreaHeight;

    private BigDecimal storageAreaLength;

    private BigDecimal storageAreaWidth;

    private BigDecimal volume;

    private Boolean truckStatus;

    @Override
    public String toString() {
        return "Truck{" +
        "truckId = " + truckId +
        ", truckType = " + truckType +
        ", truckPlateNumber = " + truckPlateNumber +
        ", maxWeight = " + maxWeight +
        ", volume = " + volume +
        "}";
    }
}
