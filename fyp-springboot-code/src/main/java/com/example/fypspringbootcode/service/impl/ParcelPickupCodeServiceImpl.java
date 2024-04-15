package com.example.fypspringbootcode.service.impl;

import com.example.fypspringbootcode.entity.ParcelPickupCode;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.ParcelPickupCodeMapper;
import com.example.fypspringbootcode.service.IParcelPickupCodeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_400;

/**
 * @author Shijin Zhang
 * @since 2024-04-09
 */
@Service
public class ParcelPickupCodeServiceImpl extends ServiceImpl<ParcelPickupCodeMapper, ParcelPickupCode> implements IParcelPickupCodeService {

    @Override
    public List<String> getParcelPickupCodesByCustomerId(Integer customerId) {
        return baseMapper.getParcelPickupCodesByCustomerId(customerId);
    }

    @Override
    public void addParcelPickupCode(String parcelPickupCode, Integer parcelId) {
        ParcelPickupCode dataRow = new ParcelPickupCode();
        dataRow.setPickupCode(parcelPickupCode);
        dataRow.setParcelId(parcelId);
        try {
            save(dataRow);
        } catch (Exception e) {
            throw new ServiceException(ERROR_CODE_400, "The pickup code record of this parcel has existed. Please check.");
        }
    }

    @Override
    public void clearPickupCodesInBatchByParcelIds(List<Integer> parcelIds) {
        if (parcelIds.isEmpty()) {
            throw new ServiceException(ERROR_CODE_400, "The parcel ids to clear pickup codes are empty.");
        }
        lambdaUpdate().in(ParcelPickupCode::getParcelId, parcelIds).remove();
    }

    @Override
    public void clearAllPickupCodes() {
        lambdaUpdate().remove();
    }
}
