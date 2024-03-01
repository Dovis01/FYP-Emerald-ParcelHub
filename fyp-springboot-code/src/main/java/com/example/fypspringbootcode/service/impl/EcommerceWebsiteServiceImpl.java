package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.fypspringbootcode.entity.EcommerceWebsite;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.EcommerceWebsiteMapper;
import com.example.fypspringbootcode.service.IEcommerceWebsiteService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.example.fypspringbootcode.common.ErrorCodeList.*;

/**
 * @author Shijin Zhang
 * @since 2024-02-23
 */
@Service
@Slf4j
public class EcommerceWebsiteServiceImpl extends ServiceImpl<EcommerceWebsiteMapper, EcommerceWebsite> implements IEcommerceWebsiteService {
    @Override
    public void addEcommerceWebsite(EcommerceWebsite ecommerceWebsite) {
        try {
            save(ecommerceWebsite);
        } catch (Exception e) {
            log.error("The mybatis has failed to insert the new ecommerce website entity {}", ecommerceWebsite.getWebsiteName() ,e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error, maybe duplicate entry some fields.");
        }
    }

    @Override
    public EcommerceWebsite getEcommerceWebsiteByName(String websiteName) {
        EcommerceWebsite ecommerceWebsite;
        QueryWrapper<EcommerceWebsite> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("website_name", websiteName);
        try {
            ecommerceWebsite = getOne(queryWrapper);
        } catch (Exception e) {
            log.error("The deserialization of mybatis is wrong, the ecommerce website name is {}", websiteName, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error. Please try again.");
        }
        if (ecommerceWebsite == null) {
            throw new ServiceException(ERROR_CODE_400, "The ecommerce website name is not found, please check it again");
        }
        return ecommerceWebsite;
    }

    @Override
    public boolean isEcommerceWebsiteExist(String websiteName) {
        EcommerceWebsite ecommerceWebsite;
        QueryWrapper<EcommerceWebsite> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("website_name", websiteName);
        try {
            ecommerceWebsite = getOne(queryWrapper);
        } catch (Exception e) {
            log.error("The deserialization of mybatis is wrong, the ecommerce website name is {}", websiteName, e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error. Please try again.");
        }
        return ecommerceWebsite != null;
    }

    @Override
    public void deleteEcommerceWebsiteById(Integer ecommerceWebsiteId) {
        try {
            removeById(ecommerceWebsiteId);
        } catch (Exception e) {
            log.error("The mybatis has failed to delete the ecommerce website entity with id {}", ecommerceWebsiteId, e);
            throw new ServiceException(ERROR_CODE_400, "The ecommerce website with id " + ecommerceWebsiteId + " is not found, please check it again");
        }
    }

    @Override
    public void deleteAllEcommerceWebsite() {
        try {
            remove(null);
        } catch (Exception e) {
            log.error("The mybatis has failed to delete all the ecommerce website", e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error");
        }
    }
}
