package com.example.fypspringbootcode.controller.dto;

import com.example.fypspringbootcode.entity.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 09/03/2024 07:39
 **/
@Data
public class ParcelInfoDTO {
    // Parcel Table
    private Parcel parcel;
    // Parcel History Status Table
    private List<ParcelHistoryStatus> parcelHistoryStatusList;
    // Parcel Station Table
    private ParcelStation parcelStation;
    // Sender Table
    private Sender sender;
    // Customer Table
    private Customer customer;
    // Parcel Station Shelf Table
    private ParcelStationShelf parcelStationShelf;

    public ParcelInfoDTO(){
        ParcelHistoryStatus phs = new ParcelHistoryStatus();
        phs.setStatusUpdateTimestamp(LocalDateTime.now());
        List<ParcelHistoryStatus> phsList = new ArrayList<>();
        phsList.add(phs);
        this.parcelHistoryStatusList = phsList;
    }
}
