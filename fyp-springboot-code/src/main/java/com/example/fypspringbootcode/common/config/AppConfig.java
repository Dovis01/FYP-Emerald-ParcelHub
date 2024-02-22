package com.example.fypspringbootcode.common.config;

import io.github.cdimascio.dotenv.Dotenv;

/**
 * @title:FinalYearProjectCode
 * @description:<TODO description class purpose>
 * @author: Shijin Zhang
 * @version:1.0.0
 * @create:21/02/2024 05:43
 **/
public class AppConfig {
    private static final Dotenv dotenv = Dotenv.load();

    public static final String ENVIRONMENT = dotenv.get("ENVIRONMENT");

    public static final String SECRET_KEY = dotenv.get("SECRET_KEY");

    public static final String PASS_SALT = dotenv.get("PASS_SALT");

    public static final String DEFAULT_PASS = dotenv.get("DEFAULT_PASS");

}
