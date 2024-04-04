package com.example.fypspringbootcode.mapper;

import com.example.fypspringbootcode.entity.CourierCollectionRecord;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-19
 */
public interface CourierCollectionRecordMapper extends BaseMapper<CourierCollectionRecord> {
    Integer getCourierIdByParcelId(Integer parcelId);
}
