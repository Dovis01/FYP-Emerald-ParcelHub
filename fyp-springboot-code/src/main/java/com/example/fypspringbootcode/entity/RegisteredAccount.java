package com.example.fypspringbootcode.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 *
 * @author Shijin Zhang
 * @since 2024-01-28
 */
@Data
@TableName("registered_account")
public class RegisteredAccount implements Serializable {

//    public RegisteredAccount(String username, String email, String password) {
//        this.username = username;
//        this.email = email;
//        this.password = password;
//    }

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "account_id", type = IdType.AUTO)
    private Integer accountId;

    private String username;

    private String email;

    private String password;

    @TableField(exist = false)
    private String newPassword;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private LocalDateTime registerTime;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private LocalDateTime updateTime;

    private Boolean status=true;

    @Override
    public String toString() {
        return "RegisteredAccount{" +
        "accountId = " + accountId +
        ", username = " + username +
        ", email = " + email +
        ", password = " + password +
        ", registerTime = " + registerTime +
        ", updateTime = " + updateTime +
        ", status = " + status +
        "}";
    }
}
