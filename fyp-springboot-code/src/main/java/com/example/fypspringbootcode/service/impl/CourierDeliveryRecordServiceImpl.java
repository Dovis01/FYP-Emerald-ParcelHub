package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.fypspringbootcode.entity.CourierDeliveryRecord;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.CourierDeliveryRecordMapper;
import com.example.fypspringbootcode.service.ICourierDeliveryRecordService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_404;
import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_500;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-13
 */
@Service
@Slf4j
public class CourierDeliveryRecordServiceImpl extends ServiceImpl<CourierDeliveryRecordMapper, CourierDeliveryRecord> implements ICourierDeliveryRecordService {

    @Override
    public void deleteDeliveryRecordByCourierId(Integer courierId) {
        boolean isDeleted;
        try {
            isDeleted = remove(new QueryWrapper<CourierDeliveryRecord>().eq("courier_id", courierId));
        } catch (Exception e) {
            log.error("The mybatis has failed to delete the specific courier delivery record {}", courierId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (!isDeleted) {
            throw new ServiceException(ERROR_CODE_404, "The courier id is wrong, find no matched records to delete");
        }
    }
}
