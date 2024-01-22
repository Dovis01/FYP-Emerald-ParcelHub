package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.controller.dto.LoginDTO;
import com.example.fypspringbootcode.controller.request.AdminPageRequest;
import com.example.fypspringbootcode.controller.request.LoginEmailRequest;
import com.example.fypspringbootcode.controller.request.LoginUsernameRequest;
import com.example.fypspringbootcode.controller.request.PasswordRequest;
import com.example.fypspringbootcode.entity.Admin;
import com.example.fypspringbootcode.service.IAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    IAdminService adminService;

    @PostMapping("/login/username")
    public Result loginByUsername(@RequestBody LoginUsernameRequest request) {
        LoginDTO login = adminService.loginByUsername(request);
        return Result.success(login, "login by username successfully");
    }

    @PostMapping("/login/email")
    public Result loginByEmail(@RequestBody LoginEmailRequest request) {
        LoginDTO login = adminService.loginByEmail(request);
        return Result.success(login,"login by email successfully");
    }

    @PutMapping("/password")
    public Result password(@RequestBody PasswordRequest request) {
        adminService.changePass(request);
        return Result.success();
    }

    @PostMapping("/save")
    public Result save(@RequestBody Admin obj) {
        adminService.save(obj);
        return Result.success("register successfully");
    }

    @DeleteMapping("/delete/{id}")
    public Result delete(@PathVariable Integer id) {
        adminService.deleteById(id);
        return Result.success();
    }

    @GetMapping("/{id}")
    public Result getById(@PathVariable Integer id) {
        Admin obj = adminService.getById(id);
        return Result.success(obj);
    }

    @GetMapping("/list")
    public Result list() {
        List<Admin> list = adminService.list();
        return Result.success(list);
    }

    @GetMapping("/page")
    public Result page(AdminPageRequest pageRequest) {
        return Result.success(adminService.page(pageRequest));
    }

}
