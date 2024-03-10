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
 * @since 2024-03-03
 */
@Data
@TableName("t_33_parcel_station_shelf")
public class ParcelStationShelf implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "shelf_id", type = IdType.AUTO)
    private Integer shelfId;

    private Integer mainShelfSerialNumber;

    private Integer floorSerialNumber;

    private Integer maxStorageParcelNumber;

    private Integer parcelStationId;

    @Override
    public String toString() {
        return "ParcelStationShelf{" +
        "shelfId = " + shelfId +
        ", mainShelfSerialNumber = " + mainShelfSerialNumber +
        ", floorSerialNumber = " + floorSerialNumber +
        ", maxStorageParcelNumber = " + maxStorageParcelNumber +
        ", parcelStationId = " + parcelStationId +
        "}";
    }
}
