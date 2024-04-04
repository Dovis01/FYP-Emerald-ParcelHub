package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.example.fypspringbootcode.entity.ParcelHistoryStatus;
import com.example.fypspringbootcode.entity.ParcelTrackingCode;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.ParcelHistoryStatusMapper;
import com.example.fypspringbootcode.mapper.ParcelTrackingCodeMapper;
import com.example.fypspringbootcode.service.IParcelHistoryStatusService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static com.example.fypspringbootcode.common.ErrorCodeList.*;

/**
 * @author Shijin Zhang
 * @since 2024-03-10
 */
@Service
public class ParcelHistoryStatusServiceImpl extends ServiceImpl<ParcelHistoryStatusMapper, ParcelHistoryStatus> implements IParcelHistoryStatusService {

    @Autowired
    private ParcelTrackingCodeMapper parcelTrackingCodeMapper;

    @Override
    public void refreshParcelHistoryStatus(String parcelTrackingCode, String statusInfo) {
        ParcelHistoryStatus parcelHistoryStatus = new ParcelHistoryStatus();
        Integer parcelId = parcelTrackingCodeMapper.selectOne(Wrappers.<ParcelTrackingCode>lambdaQuery().select(ParcelTrackingCode::getParcelId).eq(ParcelTrackingCode::getParcelTrackingCode, parcelTrackingCode)).getParcelId();
        parcelHistoryStatus.setParcelId(parcelId);
        parcelHistoryStatus.setStatusInfo(statusInfo);
        parcelHistoryStatus.setStatusUpdateTimestamp(LocalDateTime.now());
        try {
            save(parcelHistoryStatus);
        } catch (Exception e) {
            throw new ServiceException(ERROR_CODE_400, "The Parcel ("+parcelTrackingCode+") has already been '"+statusInfo+"'.");
        }
    }

    @Transactional
    @Override
    public void refreshParcelHistoryStatusInBatch(List<String> parcelTrackingCodes, String statusInfo) {
        for (String parcelTrackingCode : parcelTrackingCodes) {
            refreshParcelHistoryStatus(parcelTrackingCode, statusInfo);
        }
    }

    @Override
    public void addParcelHistoryStatusInfo(Integer parcelId, String statusInfo) {
        ParcelHistoryStatus parcelHistoryStatus = new ParcelHistoryStatus();
        parcelHistoryStatus.setParcelId(parcelId);
        parcelHistoryStatus.setStatusInfo(statusInfo);
        try {
            save(parcelHistoryStatus);
        } catch (Exception e) {
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
    }

    @Override
    public List<Integer> getParcelIdsByStatusInfo(String statusInfo) {
        return listObjs(Wrappers.<ParcelHistoryStatus>lambdaQuery().select(ParcelHistoryStatus::getParcelId).eq(ParcelHistoryStatus::getStatusInfo, statusInfo), o -> (Integer) o);
    }

    @Override
    public void resetParcelsToBeCollected() {
        List<Integer> parcelIds =listObjs(Wrappers.<ParcelHistoryStatus>lambdaQuery().select(ParcelHistoryStatus::getParcelId).eq(ParcelHistoryStatus::getStatusInfo, "To be collected"), o -> (Integer) o);
        try {
            lambdaUpdate().in(ParcelHistoryStatus::getParcelId, parcelIds).remove();
        } catch (Exception e) {
            log.error("The mybatis has failed to remove parcels to be collected.", e);
            throw new ServiceException(ERROR_CODE_404, "The history status of parcels to be collected is not found to delete.");
        }
    }

    @Override
    public void resetParcelsToBeDelivered() {
        List<Integer> parcelIds =listObjs(Wrappers.<ParcelHistoryStatus>lambdaQuery().select(ParcelHistoryStatus::getParcelId).eq(ParcelHistoryStatus::getStatusInfo, "To be delivered"), o -> (Integer) o);
        try {
            lambdaUpdate().eq(ParcelHistoryStatus::getStatusInfo, "To be delivered").or()
                    .eq(ParcelHistoryStatus::getStatusInfo, "In transit").or()
                    .eq(ParcelHistoryStatus::getStatusInfo, "Delivered")
                    .in(ParcelHistoryStatus::getParcelId, parcelIds)
                    .remove();
        } catch (Exception e) {
            log.error("The mybatis has failed to remove parcels to be delivered.", e);
            throw new ServiceException(ERROR_CODE_404, "The history status of parcels to be delivered is not found to delete.");
        }
    }

    @Override
    public List<ParcelHistoryStatus> getParcelHistoryStatusListByParcelId(Integer parcelId) {
        ParcelHistoryStatus phs = new ParcelHistoryStatus();
        List<ParcelHistoryStatus> parcelHistoryStatusList = lambdaQuery().select(ParcelHistoryStatus::getStatusInfo, ParcelHistoryStatus::getStatusUpdateTimestamp)
                .eq(ParcelHistoryStatus::getParcelId, parcelId)
                .orderByDesc(ParcelHistoryStatus::getStatusUpdateTimestamp)
                .list();
        parcelHistoryStatusList.add(phs);
        return parcelHistoryStatusList;
    }
}
