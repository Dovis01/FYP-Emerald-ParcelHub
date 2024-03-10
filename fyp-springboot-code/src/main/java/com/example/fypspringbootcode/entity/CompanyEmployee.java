package com.example.fypspringbootcode.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * @author Shijin Zhang
 * @since 2024-01-28
 */
@Data
@TableName("t_72_company_employee")
public class CompanyEmployee implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "employee_id", type = IdType.AUTO)
    private Integer employeeId;

    private String fullName;

    private String employeeCode;

    private String phoneNumber;

    private String avatar;

    private String workCity;

    private Integer roleId;

    private Integer companyId;

    private Integer accountId;

    @Override
    public String toString() {
        return "CompanyEmployee{" +
                "employeeId = " + employeeId +
                ", fullName = " + fullName +
                ", employeeCode = " + employeeCode +
                ", phoneNumber = " + phoneNumber +
                ", accountAvatar = " + avatar +
                ", role = " + roleId +
                ", companyId = " + companyId +
                ", accountId = " + accountId +
                "}";
    }
}
