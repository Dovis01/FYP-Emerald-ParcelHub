package com.example.fypspringbootcode.tests;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.entity.Parcel;
import com.example.fypspringbootcode.mapper.ParcelMapper;
import com.example.fypspringbootcode.service.IParcelHistoryStatusService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 20/03/2024 18:14
 **/
@SpringBootTest
public class ParcelTest extends ServiceImpl<ParcelMapper, Parcel> {

    @Autowired
    private IParcelHistoryStatusService parcelHistoryStatusService;

    @Test
    public void testGetParcelById() {
        lambdaUpdate().eq(Parcel::getParcelId, 271).set(Parcel::getShelfId, null).update();
    }
}
