package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.entity.ParcelPickupCode;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-04-09
 */
public interface IParcelPickupCodeService extends IService<ParcelPickupCode> {

    List<String> getParcelPickupCodesByCustomerId(Integer customerId);

    void addParcelPickupCode(String parcelPickupCode, Integer parcelId);

    void clearPickupCodesInBatchByParcelIds(List<Integer> parcelIds);

    void clearAllPickupCodes();

}
