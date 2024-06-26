package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.controller.dto.LoginStationManagerDTO;
import com.example.fypspringbootcode.controller.dto.StationManagerInfoDTO;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.example.fypspringbootcode.controller.request.RegisterEmployeeRoleRequest;
import com.example.fypspringbootcode.entity.CompanyEmployee;
import com.example.fypspringbootcode.entity.StationManager;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-05
 */
public interface IStationManagerService extends IService<StationManager> {

    StationManager getStationManagerByToken(Integer employeeId, Integer accountId);

    void deleteOneStationManager(Integer stationManagerId, StationManager stationManager);

    StationManager updateInfoByAdmin(StationManager stationManager, Integer stationManagerId);

    LoginStationManagerDTO updatePersonalInfo(CompanyEmployee companyEmployee, Integer stationManagerId);

    LoginStationManagerDTO login(LoginRequest loginRequest);

    void register(RegisterEmployeeRoleRequest registerRequest);

    LoginStationManagerDTO getByStationManagerId(Integer stationManagerId);

    List<StationManagerInfoDTO> getAllStationManagersInfoForAdmin();

    void disableStationManager(Integer stationManagerId);
}
