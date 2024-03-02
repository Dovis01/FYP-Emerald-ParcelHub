package com.example.fypspringbootcode.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-02
 */
@Data
@TableName("t_62_sender")
public class Sender implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "sender_id", type = IdType.AUTO)
    private Integer senderId;

    private String fullName;

    private String email;

    private String phoneNumber;

    private String address;

    @Override
    public String toString() {
        return "Sender{" +
        "senderId = " + senderId +
        ", fullName = " + fullName +
        ", email = " + email +
        ", phoneNumber = " + phoneNumber +
        ", address = " + address +
        "}";
    }
}
