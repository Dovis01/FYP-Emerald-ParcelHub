package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.entity.StationManager;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Shijin Zhang
 * @since 2024-02-05
 */
public interface IStationManagerService extends IService<StationManager> {
    StationManager getStationManagerByToken(Integer employeeId, Integer accountId);
}
