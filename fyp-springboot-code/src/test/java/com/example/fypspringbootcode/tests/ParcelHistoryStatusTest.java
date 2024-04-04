package com.example.fypspringbootcode.tests;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.entity.ParcelHistoryStatus;
import com.example.fypspringbootcode.mapper.ParcelHistoryStatusMapper;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 24/03/2024 22:56
 **/
@SpringBootTest
public class ParcelHistoryStatusTest extends ServiceImpl<ParcelHistoryStatusMapper, ParcelHistoryStatus> {

    @Test
    public void getParcelHistoryStatusListByParcelId() {
        ParcelHistoryStatus phs = new ParcelHistoryStatus();
        List<ParcelHistoryStatus> parcelHistoryStatusList = lambdaQuery().eq(ParcelHistoryStatus::getParcelId, 270).orderByDesc(ParcelHistoryStatus::getStatusUpdateTimestamp).list();
        parcelHistoryStatusList.add(phs);
        System.out.println(parcelHistoryStatusList);
    }

    @Test
    public void test() {
        List<Integer> parcelIds = lambdaQuery().eq(ParcelHistoryStatus::getStatusInfo, "In parcel hub").list().stream().map(ParcelHistoryStatus::getParcelId).toList();
        List<Integer> allParcelIds = listObjs(Wrappers.<ParcelHistoryStatus>lambdaQuery().select(ParcelHistoryStatus::getParcelId), obj -> (Integer) obj);
        List<Integer> filteredParcelIds = allParcelIds.stream()
                .filter(id -> !parcelIds.contains(id))
                .toList();
        for (Integer id : filteredParcelIds) {
            ParcelHistoryStatus phs = new ParcelHistoryStatus();
            phs.setParcelId(id);
            phs.setStatusInfo("In parcel hub");
            save(phs);
        }
    }
}
