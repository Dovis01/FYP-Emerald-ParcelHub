package com.example.fypspringbootcode.service.impl;

import com.example.fypspringbootcode.entity.PastStatistics;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.PastStatisticsMapper;
import com.example.fypspringbootcode.service.IPastStatisticsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.utils.FypProjectUtils;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.stereotype.Service;
import java.util.Map;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_400;

/**
 * @author Shijin Zhang
 * @since 2024-04-14
 */
@Service
public class PastStatisticsServiceImpl extends ServiceImpl<PastStatisticsMapper, PastStatistics> implements IPastStatisticsService {

    @Override
    public void addEcommercePastStatistics(PastStatistics jsonData) {
        JsonElement jsonElement = JsonParser.parseString(jsonData.getJsonDataRecords());
        if (jsonElement.isJsonObject()) {
            PastStatistics customerJsonData = new PastStatistics();
            JsonObject pastJsonDataObject = jsonElement.getAsJsonObject();
            JsonElement customerDataElement = pastJsonDataObject.get("customer_data");

            // 检查customer_data是否存在且不是null
            if (customerDataElement != null && !customerDataElement.isJsonNull()) {
                customerJsonData.setRoleType("Customer");
                customerJsonData.setJsonDataRecords(customerDataElement.toString());
                save(customerJsonData);
            } else {
                throw new ServiceException(ERROR_CODE_400, "No valid customer data found");
            }
        } else {
            throw new ServiceException(ERROR_CODE_400, "The json data is not a json object, please check it again");
        }
    }

    @Override
    public Map<String, Object> getPartEcommercePastStatisticsByRoleType(String roleType) {
        PastStatistics pastJsonData = lambdaQuery().eq(PastStatistics::getRoleType, roleType).one();
        JsonObject jsonObject = JsonParser.parseString(pastJsonData.getJsonDataRecords()).getAsJsonObject();
        Map<String, Object> map = FypProjectUtils.convertToMap(jsonObject);
        return map;
    }

    @Override
    public void deleteAllPastStatistics() {
        remove(null);
    }
}
