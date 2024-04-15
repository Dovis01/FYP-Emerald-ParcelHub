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
 * @since 2024-04-10
 */
@Data
@TableName("t_34_station_parcels_to_place")
public class StationParcelsToPlace implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "place_id", type = IdType.AUTO)
    private Integer placeId;

    private Integer stationManagerId;

    private Integer parcelId;

    private Integer stationId;

    private Boolean placeStatus;

    @Override
    public String toString() {
        return "StationParcelsToPlace{" +
        "placeId = " + placeId +
        ", stationManagerId = " + stationManagerId +
        ", parcelId = " + parcelId +
        ", stationId = " + stationId +
        ", placeStatus = " + placeStatus +
        "}";
    }
}
