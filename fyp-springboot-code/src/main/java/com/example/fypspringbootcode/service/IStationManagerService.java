package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.controller.dto.LoginStationManagerDTO;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.example.fypspringbootcode.controller.request.RegisterEmployeeRoleRequest;
import com.example.fypspringbootcode.entity.StationManager;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-05
 */
public interface IStationManagerService extends IService<StationManager> {
    StationManager getStationManagerByToken(Integer employeeId, Integer accountId);

    void deleteOneStationManager(Integer stationManagerId, StationManager stationManager);

    StationManager updatePersonalInfo(StationManager stationManager, Integer stationManagerId);

    LoginStationManagerDTO login(LoginRequest loginRequest);

    void register(RegisterEmployeeRoleRequest registerRequest);

    LoginStationManagerDTO getByStationManagerId(Integer stationManagerId);
}
