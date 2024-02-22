package com.example.fypspringbootcode.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.fypspringbootcode.controller.dto.LoginAdminDTO;
import com.example.fypspringbootcode.controller.request.BaseRequest;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.example.fypspringbootcode.controller.request.PasswordRequest;
import com.example.fypspringbootcode.entity.Admin;

import java.util.List;

public interface IAdminService extends IService<Admin> {

    List<Admin> list();

    IPage<Admin> pageAdmin(BaseRequest baseRequest);

    void addAdmin(Admin obj);

    Admin getById(Integer id);

    void deleteById(Integer id);

    LoginAdminDTO login(LoginRequest request);

    void changePass(PasswordRequest request);

}
