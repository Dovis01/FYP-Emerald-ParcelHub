package com.example.fypspringbootcode.controller.dto;

import com.example.fypspringbootcode.entity.*;
import lombok.Data;
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
    // Sender Table
    private Sender sender;
    // Customer Table
    private Customer customer;
    // Parcel Hub Company Table
    private ParcelHubCompany parcelHubCompany;
    // Courier Table
    private Courier courier;
    // Parcel Station Table
    private ParcelStation parcelStation;
    // Parcel Station Shelf Table
    private ParcelStationShelf parcelStationShelf;
    // Parcel Station Manager Employee Table
    private CompanyEmployee parcelStationManager;
}
