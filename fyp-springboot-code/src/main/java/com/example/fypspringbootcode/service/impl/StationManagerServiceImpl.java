package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.fypspringbootcode.entity.CompanyEmployee;
import com.example.fypspringbootcode.entity.StationManager;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.StationManagerMapper;
import com.example.fypspringbootcode.service.IStationManagerService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_401;
import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_500;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Shijin Zhang
 * @since 2024-02-05
 */
@Service
@Slf4j
public class StationManagerServiceImpl extends ServiceImpl<StationManagerMapper, StationManager> implements IStationManagerService {

    @Autowired
    private CompanyEmployeeServiceImpl companyEmployeeService;

    @Override
    public StationManager getStationManagerByToken(Integer employeeId, Integer accountId) {
        CompanyEmployee companyEmployee = companyEmployeeService.getByEmployeeId(employeeId);
        if(!companyEmployee.getAccountId().equals(accountId)){
            throw new ServiceException(ERROR_CODE_401, "The account id of token is changed, please check the token");
        }

        StationManager stationManager;
        try {
            stationManager = getOne(new QueryWrapper<StationManager>().eq("employee_id", employeeId));
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the station manager by employee id {}",employeeId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        return stationManager;
    }
}
