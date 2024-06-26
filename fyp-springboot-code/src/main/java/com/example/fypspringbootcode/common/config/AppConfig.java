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

    public static final String GOOGLE_MAPS_API_KEY = dotenv.get("GOOGLE_MAPS_API_KEY");

    public static final String AWS_ACCESS_KEY_ID = dotenv.get("AWS_ACCESS_KEY_ID");

    public static final String AWS_SECRET_ACCESS_KEY = dotenv.get("AWS_SECRET_ACCESS_KEY");

    public static final String AWS_REGION = dotenv.get("AWS_REGION");

}
