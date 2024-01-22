package com.example.fypspringbootcode.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.fypspringbootcode.controller.request.BaseRequest;
import com.example.fypspringbootcode.controller.request.PasswordRequest;
import com.example.fypspringbootcode.entity.Admin;
import org.apache.ibatis.annotations.Param;

import java.util.List;


public interface AdminMapper extends BaseMapper<Admin> {
    List<Admin> listByCondition(BaseRequest baseRequest);
    Admin getByAdminNameAndPassword(@Param("adminName") String adminName, @Param("password") String password);
    int updatePassword(PasswordRequest request);
}
