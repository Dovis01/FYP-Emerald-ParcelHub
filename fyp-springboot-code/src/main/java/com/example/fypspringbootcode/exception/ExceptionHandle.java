package com.example.fypspringbootcode.exception;

import cn.hutool.core.util.StrUtil;
import com.example.fypspringbootcode.common.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_400;
import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_500;

@Slf4j
@RestControllerAdvice
public class ExceptionHandle {
    //只要是所属/触发/激活 自定义抛出异常类ServiceException异常类 进行处理返回Controller的要返回的Result对象，并且携带错误信息
    //对业务层代码出现的业务异常进行统一捕获进行处理
    @ExceptionHandler(value = ServiceException.class)
    public ResponseEntity<Result> serviceExceptionError(ServiceException e) {
    //将后端实际运行出现的异常作为Throwable cause 捕获抛到这里被log.error所打印出来.
    //统一的对具体运行出现的异常放在这里进行log.error打印出来
        log.error("System business is error", e);
        String code = e.getCode();
        if (StrUtil.isNotBlank(code)) {
            int codeInt = Integer.parseInt(code);
            return ResponseEntity.status(codeInt).body(Result.error(code, e.getMessage()));
        }
        // badRequest() 400
        return ResponseEntity.badRequest().body(Result.error(ERROR_CODE_400, e.getMessage()));
    }

    //没有抛出自定义异常类，属于自定义异常类管理范围之外的错误，系统运行中发生代码错误会触发该类
    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<Result> exceptionError(Exception e) {
        log.error("System is error", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Result.error(ERROR_CODE_500, "System is error, please contact the administrator."));
    }

}
