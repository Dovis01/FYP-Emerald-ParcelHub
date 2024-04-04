package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.entity.CourierCollectionRecord;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-19
 */
public interface ICourierCollectionRecordService extends IService<CourierCollectionRecord> {

    List<CourierCollectionRecord> getTodayCollectionTasksById(Integer courierId);

    void deleteAllCollectionRecordsOfOneCourier(Integer courierId);

    void resetAllCollectionRecords();

}
