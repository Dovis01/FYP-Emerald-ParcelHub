package com.example.fypspringbootcode.common.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClient;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 13/04/2024 20:58
 **/
@Configuration
public class AwsConfig {

    @Bean
    public AmazonSNS amazonSNS() {
        return AmazonSNSClient.builder()
                .withRegion(Regions.fromName(AppConfig.AWS_REGION))
                .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(AppConfig.AWS_ACCESS_KEY_ID, AppConfig.AWS_SECRET_ACCESS_KEY)))
                .build();
    }

    @Bean
    public AmazonSimpleEmailService amazonSimpleEmailService() {
        return AmazonSimpleEmailServiceClient.builder()
                .withRegion(Regions.fromName(AppConfig.AWS_REGION))
                .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(AppConfig.AWS_ACCESS_KEY_ID, AppConfig.AWS_SECRET_ACCESS_KEY)))
                .build();
    }
}

