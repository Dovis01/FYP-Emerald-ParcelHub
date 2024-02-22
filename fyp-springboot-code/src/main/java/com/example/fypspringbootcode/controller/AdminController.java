package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.controller.dto.LoginAdminDTO;
import com.example.fypspringbootcode.controller.request.AdminPageRequest;
import com.example.fypspringbootcode.controller.request.LoginRequest;
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

    @PostMapping("/v1/login")
    public Result login(@RequestBody LoginRequest request) {
        LoginAdminDTO login = adminService.login(request);
        return Result.success(login, "login by admin name successfully");
    }

    @PutMapping("/v1/password")
    public Result password(@RequestBody PasswordRequest request) {
        adminService.changePass(request);
        return Result.success();
    }

    @PostMapping("/v1/save")
    public Result save(@RequestBody Admin obj) {
        adminService.addAdmin(obj);
        return Result.success("register successfully");
    }

    @DeleteMapping("/v1/delete/{id}")
    public Result delete(@PathVariable Integer id) {
        adminService.deleteById(id);
        return Result.success("The admin has been deleted successfully");
    }

    @GetMapping("/v1/{id}")
    public Result getById(@PathVariable Integer id) {
        Admin obj = adminService.getById(id);
        return Result.success(obj, "The admin has been found successfully");
    }

    @GetMapping("/v1/list")
    public Result list() {
        List<Admin> list = adminService.list();
        return Result.success(list, "The admin list has been found successfully");
    }

    @GetMapping("/v1/page")
    public Result page(AdminPageRequest pageRequest) {
        return Result.success(adminService.pageAdmin(pageRequest));
    }

}
