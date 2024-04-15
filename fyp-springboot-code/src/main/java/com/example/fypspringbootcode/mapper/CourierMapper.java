package com.example.fypspringbootcode.mapper;

import com.example.fypspringbootcode.controller.dto.CourierInfoDTO;
import com.example.fypspringbootcode.controller.dto.LoginCourierDTO;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.example.fypspringbootcode.entity.Courier;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-05
 */
public interface CourierMapper extends BaseMapper<Courier> {
    LoginCourierDTO checkCourierLoginAccount(LoginRequest loginRequest);

    LoginCourierDTO getCourierById(@Param("courierId") Integer courierId);

    List<CourierInfoDTO> getAllCouriersInfoList();

}
