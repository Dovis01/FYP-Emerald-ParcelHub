package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.entity.CourierDeliveryRecord;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-13
 */
public interface ICourierDeliveryRecordService extends IService<CourierDeliveryRecord> {

    List<CourierDeliveryRecord> getTodayDeliveryTasksById(Integer courierId);

    void deleteAllDeliveryRecordsOfOneCourier(Integer courierId);

    void resetAllDeliveryRecords();

}
