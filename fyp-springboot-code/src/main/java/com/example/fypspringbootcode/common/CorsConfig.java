package com.example.fypspringbootcode.common;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * 跨域配置
 *    1.有了这个配置类后不需要在Controller类中加上CrossOrigin注解了
 *    2.***有了这个配置类后可以在request中自定义请求头 -> 可以自定义token属性放在request header中 并且可以从http中获取到自定义的token
 *    3.实现了浏览器跨域请求
 * @author Dovis
 * @date 2023/01/12
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*"); // 1 设置访问源地址 ip端口任何都可以访问
        corsConfiguration.addAllowedHeader("*"); // 2 设置访问源请求头 任何请求头
        corsConfiguration.addAllowedMethod("*"); // 3 设置访问源请求方法 put delete get post
        source.registerCorsConfiguration("/**", corsConfiguration); // 4 对所有接口配置以上跨域设置
        return new CorsFilter(source);
    }
}

