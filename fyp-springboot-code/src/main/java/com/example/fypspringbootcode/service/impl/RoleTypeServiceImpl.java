package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.fypspringbootcode.entity.RoleType;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.RoleTypeMapper;
import com.example.fypspringbootcode.service.IRoleTypeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_500;

/**
 * @author Shijin Zhang
 * @since 2024-02-22
 */
@Slf4j
@Service
public class RoleTypeServiceImpl extends ServiceImpl<RoleTypeMapper, RoleType> implements IRoleTypeService {

    @Override
    public Integer getRoleIdByRoleType(String roleType) {
        RoleType role;
        try {
            QueryWrapper<RoleType> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("role_type", roleType);
            role = getOne(queryWrapper);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the role type {}", roleType, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (role == null) {
            throw new RuntimeException("The role type is wrong, find no matched one in role types");
        }
        return role.getRoleId();
    }
}
