package com.example.fypspringbootcode;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
@MapperScan("com.example.fypspringbootcode.mapper")
public class FypSpringbootCodeApplication {

    public static void main(String[] args) {
        SpringApplication.run(FypSpringbootCodeApplication.class, args);
    }

    // 健康检查的接口
    @GetMapping("/")
    public String health() {
        return "SUCCESS";
    }
}
