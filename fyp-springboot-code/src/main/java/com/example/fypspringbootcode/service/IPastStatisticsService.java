package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.entity.PastStatistics;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.Map;

/**
 *
 * @author Shijin Zhang
 * @since 2024-04-14
 */
public interface IPastStatisticsService extends IService<PastStatistics> {

    void addEcommercePastStatistics(PastStatistics jsonData);

    Map<String, Object> getPartEcommercePastStatisticsByRoleType(String roleType);

}
