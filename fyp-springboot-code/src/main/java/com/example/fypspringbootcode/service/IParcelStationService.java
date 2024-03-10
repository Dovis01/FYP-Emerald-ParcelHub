package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.entity.ParcelStation;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-14
 */
public interface IParcelStationService extends IService<ParcelStation> {

    Integer allocateParcelStation(String customerAddress);

}
