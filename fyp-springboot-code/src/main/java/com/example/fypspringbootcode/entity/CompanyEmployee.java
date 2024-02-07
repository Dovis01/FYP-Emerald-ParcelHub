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
@TableName("company_employee")
public class CompanyEmployee implements Serializable {

    public CompanyEmployee(String fullName, String employeeCode) {
        this.fullName = fullName;
        this.employeeCode = employeeCode;
    }

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "employee_id", type = IdType.AUTO)
    private Integer employeeId;

    private String fullName;

    private String employeeCode;

    private String email;

    private Integer phoneNumber;

    private String accountAvatar;

    private String role;

    private Integer companyId;

    private Integer accountId;

    @Override
    public String toString() {
        return "CompanyEmployee{" +
                "employeeId = " + employeeId +
                ", fullName = " + fullName +
                ", employeeCode = " + employeeCode +
                ", email = " + email +
                ", phoneNumber = " + phoneNumber +
                ", accountAvatar = " + accountAvatar +
                ", role = " + role +
                ", companyId = " + companyId +
                ", accountId = " + accountId +
                "}";
    }
}
