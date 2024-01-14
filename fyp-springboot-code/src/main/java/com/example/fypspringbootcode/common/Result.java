package com.example.fypspringbootcode.common;

import lombok.Data;

/**
 * 对后台数据返回结果送到前端进行一个统一的包装，让前端更容易处理
 */
@Data
public class Result {
    private static final String SUCCESS_CODE = "200";
    private static final String ERROR_CODE = "-1";
    //返回给前端的属性
    private String code;//前端接口的响应结果
    private Object data;//将后台数据存到data中给前端所有接口调用
    private String msg;//错误信息

    public static Result success() {
        Result result = new Result();
        result.setCode(SUCCESS_CODE);
        return result;
    }

    public static Result success(Object data) {
        Result result = new Result();
        result.setCode(SUCCESS_CODE);
        result.setData(data);
        return result;
    }

    public static Result error(String msg) {
        Result result = new Result();
        result.setCode(ERROR_CODE);
        result.setMsg(msg);
        return result;
    }

    public static Result error(String code, String msg) {
        Result result = new Result();
        result.setCode(code);
        result.setMsg(msg);
        return result;
    }

}
