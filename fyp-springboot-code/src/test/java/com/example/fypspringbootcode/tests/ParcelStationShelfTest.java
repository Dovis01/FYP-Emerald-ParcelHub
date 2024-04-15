package com.example.fypspringbootcode.tests;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.entity.ParcelStation;
import com.example.fypspringbootcode.entity.ParcelStationShelf;
import com.example.fypspringbootcode.mapper.ParcelStationMapper;
import com.example.fypspringbootcode.mapper.ParcelStationShelfMapper;
import com.example.fypspringbootcode.service.IParcelStationShelfService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 03/03/2024 07:26
 **/
@SpringBootTest
@Slf4j
public class ParcelStationShelfTest extends ServiceImpl<ParcelStationShelfMapper, ParcelStationShelf>{

    @Autowired
    private ParcelStationMapper parcelStationMapper;

    @Test
    public void insertData() {
        List<ParcelStation> parcelStations = parcelStationMapper.selectList(null);
        for (ParcelStation parcelStation : parcelStations) {
            Integer shelvesTotalNumber = parcelStation.getShelvesTotalNumber();
            for (int i = 1; i <= shelvesTotalNumber; i++) {
                for (int j = 1; j <= 3; j++) {
                    ParcelStationShelf parcelStationShelf = new ParcelStationShelf();
                    parcelStationShelf.setParcelStationId(parcelStation.getStationId());
                    parcelStationShelf.setMainShelfSerialNumber(i);
                    parcelStationShelf.setFloorSerialNumber(j);
                    parcelStationShelf.setMaxStorageParcelNumber(8);
                    baseMapper.insert(parcelStationShelf);
                }
            }
        }
    }

    @Test
    public void test() {
        lambdaUpdate().eq(ParcelStationShelf::getParcelStationId, 2001).set(ParcelStationShelf::getMaxStorageParcelNumber, 8).update();
    }
}
