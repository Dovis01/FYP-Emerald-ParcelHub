package com.example.fypspringbootcode.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class Admin {
    public Admin(Integer id, String adminName, String password) {
        this.id = id;
        this.adminName = adminName;
        this.password = password;
    }

    @TableId(value = "admin_id")
    private Integer id;
    private String adminName;
    private String password;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date createTime;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date updateTime;
    private boolean status=true;
}
