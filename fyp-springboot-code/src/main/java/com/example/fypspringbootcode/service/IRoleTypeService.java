package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.entity.RoleType;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-22
 */
public interface IRoleTypeService extends IService<RoleType> {

    Integer getRoleIdByRoleType(String roleType);

}
