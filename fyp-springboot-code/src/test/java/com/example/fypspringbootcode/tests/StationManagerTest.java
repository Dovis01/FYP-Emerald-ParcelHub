package com.example.fypspringbootcode.tests;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.entity.Courier;
import com.example.fypspringbootcode.entity.StationManager;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.CourierMapper;
import com.example.fypspringbootcode.mapper.StationManagerMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;

import java.time.LocalDate;

/**
 * @title:FinalYearProjectCode
 * @description:<TODO description class purpose>
 * @author: Shijin Zhang
 * @version:1.0.0
 * @create:14/02/2024 01:21
 **/
@SpringBootTest
@Slf4j
public class StationManagerTest extends ServiceImpl<StationManagerMapper, StationManager> {
    @Test
    public void insertData() {
        StationManager stationManager = new StationManager();
        stationManager.setEmployeeId(1);
        stationManager.setStartDate(LocalDate.now());
        stationManager.setEndDate(LocalDate.of(2024, 2, 22));
        stationManager.setStationId(2011);
        try {
            baseMapper.insert(stationManager);
        } catch (DuplicateKeyException e) {
            log.error("Fail to insert data, stationManager:{}", stationManager.getStationManagerId(), e);
            throw new ServiceException("Company name already exists");
        }
    }
}
