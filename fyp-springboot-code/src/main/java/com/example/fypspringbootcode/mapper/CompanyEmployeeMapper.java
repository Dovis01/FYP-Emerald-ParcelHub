package com.example.fypspringbootcode.mapper;

import com.example.fypspringbootcode.controller.dto.CompanyEmployeeInfoDTO;
import com.example.fypspringbootcode.entity.CompanyEmployee;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-01-28
 */
public interface CompanyEmployeeMapper extends BaseMapper<CompanyEmployee> {

    List<CompanyEmployeeInfoDTO> getAllCompanyEmployeesInfoList();

}
