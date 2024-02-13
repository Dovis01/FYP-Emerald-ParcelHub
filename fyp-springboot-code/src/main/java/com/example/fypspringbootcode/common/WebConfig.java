package com.example.fypspringbootcode.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
//对于前端请求的统一拦截器实现，请求路径有/api进行拦截  JWT
public class WebConfig implements  WebMvcConfigurer {

    @Autowired
    JwtInterceptor jwtInterceptor;

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        // 指定controller统一的接口前缀
        // Lambda表达式 对所有@RestController注解的类添加PathPrefix"/api"  clazz:class
        configurer.addPathPrefix("/api", clazz -> clazz.isAnnotationPresent(RestController.class));
    }


    // 加自定义拦截器JwtInterceptor，设置拦截规则
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //在登陆界面时要放开不去拦截，因为还没登陆成功不会有token "/api/admin/login"
        registry.addInterceptor(jwtInterceptor).addPathPatterns("/api/**")
                .excludePathPatterns("/api/admin/v1/login")
                .excludePathPatterns("/api/courier/v1/login")
                .excludePathPatterns("/api/customer/v1/login")
                .excludePathPatterns("/api/registeredAccount/**")
                .excludePathPatterns("/api/companyEmployee/**")
                .excludePathPatterns("/api/stationManager/**");
    }


}

