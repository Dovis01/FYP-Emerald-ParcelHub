package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.entity.ParcelHistoryStatus;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-10
 */
public interface IParcelHistoryStatusService extends IService<ParcelHistoryStatus> {

    void refreshParcelHistoryStatus(String parcelTrackingCode, String statusInfo);

    void refreshParcelHistoryStatusInBatch(List<String> parcelTrackingCodes, String statusInfo);

    void addParcelHistoryStatusInfo(Integer parcelId, String statusInfo);

    List<Integer> getParcelIdsByStatusInfo(String statusInfo);

    void resetParcelsToBeCollected();

    void resetParcelsToBeDelivered();

    List<ParcelHistoryStatus> getParcelHistoryStatusListByParcelId(Integer parcelId);

}
