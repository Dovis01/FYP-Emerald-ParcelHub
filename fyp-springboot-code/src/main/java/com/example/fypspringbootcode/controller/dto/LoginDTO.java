package com.example.fypspringbootcode.controller.dto;

import lombok.Data;

/**
 * 仅用于数据传输的对象，数据从后端传回前端的数据对象(用于登陆成功后从后端返回给前端的登陆成功的管理员对象所含信息)
 * DTO：数据传输对象（DTO）(Data Transfer Object)，是一种设计模式之间传输数据的软件应用系统。
 * 数据传输目标往往是数据访问对象从数据库中检索数据。
 */
@Data
public class LoginDTO {
    private Integer id;
    private String adminName;
    private String adminEmail;
    //作为前端访问后端的凭证存到Cookies里面
    private String token;
}
