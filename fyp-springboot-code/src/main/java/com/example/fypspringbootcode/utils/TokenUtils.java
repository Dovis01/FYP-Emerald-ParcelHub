package com.example.fypspringbootcode.utils;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.fypspringbootcode.entity.Admin;
import com.example.fypspringbootcode.service.IAdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Component
@Slf4j
public class TokenUtils {

    private static IAdminService staticAdminService;

    private static final String SECRET = "ILoveChenRui";

    @Resource
    //默认通过By Name原则进行依赖注入
    private IAdminService adminService;

    @PostConstruct
    //可以在静态方法里面使用SpringBoot中的类，依赖注入之后的初始化操作
    public void setUserService() {
        staticAdminService = adminService;
    }

    /**
     * generate token
     *
     * @return
     */
    public static String genToken(String idNumber) {
        String token =JWT.create().withAudience(idNumber)
                .withExpiresAt(DateUtil.offsetHour(new Date(), 2))
                .sign(Algorithm.HMAC256(SECRET));
        return "Bearer " + token;
    }

    public static String genToken(String idNumber, int days) {
        String token = JWT.create().withAudience(idNumber) // 将 user id 保存到 token 里面,作为载荷
                .withExpiresAt(DateUtil.offsetDay(new Date(), days)) // token is expired after n days
                .sign(Algorithm.HMAC256(SECRET)); //use fullName as the secret
        return "Bearer " + token;
    }

    /**
     * get the current admin object by token
     *
     * @return admin object
     *  /admin?token=xxxx
     */
    public static Admin getCurrentAdmin() {
        String token = null;
        try {
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            String authHeader = request.getHeader("Authorization");
            if (StrUtil.isBlank(authHeader)) {
                log.error("The authorization header is null, authorization header: {}", authHeader);
                return null;
            }
            // get token from request header
            token =StrUtil.subAfter(authHeader, "Bearer ", false);
            if (StrUtil.isBlank(token)) {  // header is empty, get from parameter(/admin?token=xxxx)
                token = request.getParameter("token");
            }
            if (StrUtil.isBlank(token)) {
                log.error("Fail to get the token of the current user, the token is null, token: {}", token);
                return null;
            }

            // decode token to get the id of the current admin, then get the admin object by id
            String idNumber = JWT.decode(token).getAudience().get(0);
            return staticAdminService.getById(Integer.valueOf(idNumber));
        } catch (Exception e) {
            log.error("Fail to get the current admin info, token={}", token,  e);
            return null;
        }
    }
}

