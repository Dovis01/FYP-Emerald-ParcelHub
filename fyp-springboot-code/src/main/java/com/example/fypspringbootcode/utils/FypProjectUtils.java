package com.example.fypspringbootcode.utils;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.core.toolkit.support.SFunction;
import com.example.fypspringbootcode.exception.ServiceException;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Field;
import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_500;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 25/02/2024 21:43
 **/
@Slf4j
public class FypProjectUtils {

    public static String classNameToSpaceSeparated(String className) {
        String[] words = className.split("(?=[A-Z])");
        return Arrays.stream(words)
                .map(String::toLowerCase)
                .collect(Collectors.joining(" "));
    }

    public static <T> T getEntityByCondition(SFunction<T, ?> columnFunction, Object value, BaseMapper<T> baseMapper) {
        LambdaQueryWrapper<T> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(columnFunction, value);
        T result;
        try {
            result = baseMapper.selectOne(queryWrapper);
        } catch (Exception e) {
            log.error("The deserialization of mybatis has failed", e);
            throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
        }
        return result;
    }

    public static void setEntityEmptyStringsToNull(Object entity) {
        Field[] fields = entity.getClass().getDeclaredFields();
        for (Field field : fields) {
            try {
                field.setAccessible(true);
                Object value = field.get(entity);
                if (value instanceof String && ((String) value).isEmpty()) {
                    field.set(entity, null);
                }
            } catch (Exception e) {
                log.error("Fail to set the empty fields of entity to null", e);
                throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
            }
        }
    }

    public static Map<String, Object> convertToMap(JsonObject jsonObject) {
        Gson gson = new Gson();
        Type type = new TypeToken<Map<String, Object>>() {}.getType();
        return gson.fromJson(jsonObject, type);
    }
}
