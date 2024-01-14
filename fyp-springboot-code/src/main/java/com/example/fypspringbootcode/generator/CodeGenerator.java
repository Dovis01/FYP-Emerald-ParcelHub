package com.example.fypspringbootcode.generator;

import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import com.baomidou.mybatisplus.generator.config.rules.DbColumnType;
import com.baomidou.mybatisplus.generator.engine.VelocityTemplateEngine;

import java.sql.Types;
import java.util.Collections;

/**
 * @title:FinalYearProjectCode
 * @description:<TODO description class purpose>
 * @author: Shijin Zhang
 * @version:1.0.0
 * @create:14/01/2024 07:13
 **/
public class CodeGenerator {

    public static final String DATABASE_URL = "jdbc:mysql://localhost:3306/setu_fyp?serverTimezone=GMT%2b8";

    public static void main(String[] args) {
        FastAutoGenerator.create(DATABASE_URL, "root", "zsj1364226740")
                .globalConfig(builder -> {
                    builder.author("Shijin Zhang")
                            .outputDir("D:\\SETU_Study\\FYP-Code\\FinalYearProjectCode\\fyp-springboot-code\\src\\main\\java");
                })
                .dataSourceConfig(builder -> builder.typeConvertHandler((globalConfig, typeRegistry, metaInfo) -> {
                    int typeCode = metaInfo.getJdbcType().TYPE_CODE;
                    if (typeCode == Types.SMALLINT) {
                        return DbColumnType.INTEGER;
                    }
                    return typeRegistry.getColumnType(metaInfo);

                }))
                .packageConfig(builder -> {
                    builder.parent("com.example.fypspringbootcode")
                            .pathInfo(Collections.singletonMap(OutputFile.xml, "D:\\SETU_Study\\FYP-Code\\FinalYearProjectCode\\fyp-springboot-code\\src\\main\\resources\\mapper"));
                })
                .strategyConfig(builder -> {
                    builder.addInclude("role")
                            .addTablePrefix("t_", "c_")
                            .entityBuilder().enableFileOverride()
                            .controllerBuilder().enableFileOverride()
                            .serviceBuilder().enableFileOverride()
                            .mapperBuilder().enableFileOverride();
                })
                .templateEngine(new VelocityTemplateEngine())
                .execute();
    }
}
