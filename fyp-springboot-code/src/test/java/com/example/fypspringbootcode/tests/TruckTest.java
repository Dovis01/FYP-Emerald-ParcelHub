package com.example.fypspringbootcode.tests;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.entity.Truck;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.TruckMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.List;
import java.util.Random;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_500;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 05/03/2024 07:52
 **/
@SpringBootTest
@Slf4j
public class TruckTest extends ServiceImpl<TruckMapper, Truck>{

    @Test
    public void allocateTruckIdToCourier() {
        LambdaQueryWrapper<Truck> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.select(Truck::getTruckId).eq(Truck::getTruckStatus, true);
        List<Integer> availableTruckIds;
        try {
            availableTruckIds = listObjs(queryWrapper, o -> (Integer) o);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the trucks", e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if(availableTruckIds.isEmpty()){
            System.out.println(availableTruckIds);
        }else {
            System.out.println(availableTruckIds.get(0));
        }
    }

    @Test
    public void test() {
        List<Truck> trucks = list();
        for (Truck truck : trucks) {
            truck.setTruckStatus(true);
        }
        updateBatchById(trucks);
    }

    @Test
    public void insertAndCalculateVolume() {
        List<Truck> trucks = list();
        Random random = new Random();

        for (Truck truck : trucks) {
            BigDecimal length, width, height;
            switch (truck.getTruckType()) {
                case "small":
                    length = BigDecimal.valueOf(random.nextInt(5) + 5); // 5-9
                    width = BigDecimal.valueOf(random.nextInt(2) + 2); // 2-3
                    height = BigDecimal.valueOf(random.nextInt(2) + 2); // 2-3
                    break;
                case "medium":
                    length = BigDecimal.valueOf(random.nextInt(10) + 10); // 10-19
                    width = BigDecimal.valueOf(random.nextInt(3) + 4); // 4-6
                    height = BigDecimal.valueOf(random.nextInt(3) + 4); // 4-6
                    break;
                case "large":
                    length = BigDecimal.valueOf(random.nextInt(20) + 20); // 20-39
                    width = BigDecimal.valueOf(random.nextInt(5) + 7); // 7-11
                    height = BigDecimal.valueOf(random.nextInt(5) + 7); // 7-11
                    break;
                default:
                    length = width = height = BigDecimal.ONE;
            }
            truck.setStorageAreaLength(length);
            truck.setStorageAreaWidth(width);
            truck.setStorageAreaHeight(height);

            // 计算体积
            BigDecimal volume = length.multiply(width).multiply(height);
            truck.setVolume(volume);
            updateById(truck);
        }
    }
}