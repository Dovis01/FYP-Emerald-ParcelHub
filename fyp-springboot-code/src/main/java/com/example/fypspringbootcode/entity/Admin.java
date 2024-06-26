package com.example.fypspringbootcode.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("t_00_admin")
public class Admin {

    @TableId(value = "admin_id", type = IdType.AUTO)
    private Integer adminId;

    private String adminName;

    private String password;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Europe/Dublin")
    private LocalDateTime createTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Europe/Dublin")
    private LocalDateTime updateTime;

    private Boolean status = true;
    @Override
    public String toString() {
        return "Admin{" +
                "adminId = " + adminId +
                ", adminName = " + adminName +
                ", password = " + password +
                ", createTime = " + createTime +
                ", updateTime = " + updateTime +
                ", status = " + status +
                "}";
    }
}
