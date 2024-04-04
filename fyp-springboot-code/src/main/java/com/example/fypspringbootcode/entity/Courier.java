package com.example.fypspringbootcode.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @author Shijin Zhang
 * @since 2024-02-05
 */
@Data
@TableName("t_41_courier")
public class Courier implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "courier_id", type = IdType.AUTO)
    private Integer courierId;

    private Integer employeeId;

    private String workType;

    private Integer dailyMaxDistributionParcelsNum;

    private Integer remainingParcelsNumToDistribute;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Europe/Dublin")
    private LocalDateTime registerTime;

    private Integer truckId;

    @TableField(exist = false)
    private Integer accountId;

    @TableField(exist = false)
    private CompanyEmployee employeeInfo;

    private Boolean courierStatus = true;

    @Override
    public String toString() {
        return "Courier{" +
                "courierId = " + courierId +
                ", employeeId = " + employeeId +
                ", dailyMaxDistributionParcelsNum = " + dailyMaxDistributionParcelsNum +
                ", remainingParcelsNumToDistribute = " + remainingParcelsNumToDistribute +
                ", registeredDate = " + registerTime +
                ", truckId = " + truckId +
                ", status = " + courierStatus +
                "}";
    }
}
