package com.example.fypspringbootcode.service.impl;

import com.example.fypspringbootcode.entity.Trunk;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.TrunkMapper;
import com.example.fypspringbootcode.service.ITrunkService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.example.fypspringbootcode.common.ErrorCodeList.*;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-13
 */
@Service
@Slf4j
public class TrunkServiceImpl extends ServiceImpl<TrunkMapper, Trunk> implements ITrunkService {

    @Override
    public Trunk updateTrunkInfo(Trunk trunk, Integer trunkId) {
        trunk.setTrunkId(trunkId);

        // Update the record
        boolean isUpdated;
        try {
            isUpdated = updateById(trunk);
        } catch (Exception e) {
            log.error("The mybatis has failed to update the trunk {}", trunkId, e);
            throw new ServiceException(ERROR_CODE_400, "The trunk info provided to update is null, please check it again");
        }
        if (!isUpdated) {
            throw new ServiceException(ERROR_CODE_404, "The trunk id provided is wrong, find no matched one to update trunk info");
        }

        // Return the updated record
        Trunk updatedTrunk;
        try {
            updatedTrunk= getById(trunkId);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed for the updated trunk {}", trunkId, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
        if (updatedTrunk== null) {
            throw new ServiceException(ERROR_CODE_404, "The trunk id provided is wrong, find no matched updated trunk to get");
        }
        return updatedTrunk;
    }
}
