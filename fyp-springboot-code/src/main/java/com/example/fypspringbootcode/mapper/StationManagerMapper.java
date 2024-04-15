package com.example.fypspringbootcode.mapper;

import com.example.fypspringbootcode.controller.dto.LoginStationManagerDTO;
import com.example.fypspringbootcode.controller.dto.StationManagerInfoDTO;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.example.fypspringbootcode.entity.StationManager;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author Shijin Zhang
 * @since 2024-02-05
 */
public interface StationManagerMapper extends BaseMapper<StationManager> {
    LoginStationManagerDTO checkStationManagerLoginAccount(LoginRequest loginRequest);

    LoginStationManagerDTO getStationManagerById(@Param("stationManagerId") Integer stationManagerId);

    List<StationManagerInfoDTO> getAllStationManagersInfoList();
}
