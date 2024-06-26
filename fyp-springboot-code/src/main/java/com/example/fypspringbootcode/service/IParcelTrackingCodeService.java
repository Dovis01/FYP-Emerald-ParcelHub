package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.entity.ParcelTrackingCode;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * @author Shijin Zhang
 * @since 2024-03-10
 */
public interface IParcelTrackingCodeService extends IService<ParcelTrackingCode> {
    void addParcelTrackingCode(Integer parcelId);

    void clearParcelTrackingCode();
}
