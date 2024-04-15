package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.entity.PastStatistics;
import com.example.fypspringbootcode.service.IPastStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * @author Shijin Zhang
 * @since 2024-04-14
 */
@CrossOrigin
@RestController
@RequestMapping("/pastStatistics")
public class PastStatisticsController {

    @Autowired
    IPastStatisticsService pastStatisticsService;

    @PostMapping("/v1/insert")
    public Result insertEcommercePastStatistics(@RequestBody PastStatistics jsonData) {
        pastStatisticsService.addEcommercePastStatistics(jsonData);
        return Result.success("Insert E-commerce past Json data successfully");
    }

    @GetMapping("/v1/part-data/{roleType}")
    public Result getPartEcommercePastStatistics(@PathVariable String roleType) {
        Map<String, Object> partData = pastStatisticsService.getPartEcommercePastStatisticsByRoleType(roleType);
        return Result.success(partData, "Get part E-commerce past Json data for " + roleType + " successfully");
    }

}
