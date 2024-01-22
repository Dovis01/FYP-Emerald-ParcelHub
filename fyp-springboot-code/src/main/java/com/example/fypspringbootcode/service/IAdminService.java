package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.controller.dto.LoginDTO;
import com.example.fypspringbootcode.controller.request.BaseRequest;
import com.example.fypspringbootcode.controller.request.LoginEmailRequest;
import com.example.fypspringbootcode.controller.request.LoginUsernameRequest;
import com.example.fypspringbootcode.controller.request.PasswordRequest;
import com.example.fypspringbootcode.entity.Admin;
import com.github.pagehelper.PageInfo;

import java.util.List;

public interface IAdminService {

    List<Admin> list();

    PageInfo<Admin> page(BaseRequest baseRequest);

    void save(Admin obj);

    Admin getById(Integer id);

    void deleteById(Integer id);

    LoginDTO loginByUsername(LoginUsernameRequest request);

    LoginDTO loginByEmail(LoginEmailRequest request);

    void changePass(PasswordRequest request);

}
