package com.example.fypspringbootcode.mapper;

import com.example.fypspringbootcode.entity.CourierDeliveryRecord;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-13
 */
public interface CourierDeliveryRecordMapper extends BaseMapper<CourierDeliveryRecord> {
    Integer getCourierIdByParcelId(Integer parcelId);
}
