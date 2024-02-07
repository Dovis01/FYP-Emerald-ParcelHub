package com.example.fypspringbootcode.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-05
 */
@Data
@TableName("station_manager")
public class StationManager implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "station_manager_id", type = IdType.AUTO)
    private Integer stationManagerId;

    private Integer employeeId;

    private LocalDate startDate;

    private LocalDate endDate;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private LocalDateTime registerTime;

    private Integer stationId;

    @Override
    public String toString() {
        return "StationManager{" +
        "stationManagerId = " + stationManagerId +
        ", employeeId = " + employeeId +
        ", startDate = " + startDate +
        ", endDate = " + endDate +
        ", registerTime = " + registerTime +
        ", stationId = " + stationId +
        "}";
    }
}
