package com.example.fypspringbootcode.common;

import cn.hutool.core.util.StrUtil;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.example.fypspringbootcode.entity.Admin;
import com.example.fypspringbootcode.entity.Courier;
import com.example.fypspringbootcode.entity.Customer;
import com.example.fypspringbootcode.entity.StationManager;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.service.IAdminService;
import com.example.fypspringbootcode.service.ICourierService;
import com.example.fypspringbootcode.service.ICustomerService;
import com.example.fypspringbootcode.service.IStationManagerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_401;

@Component
@Slf4j
public class JwtInterceptor implements HandlerInterceptor {
    //401没有权限访问没有/错误token,错误码最终会在ServiceException异常类抛出，在全局异常处理中赋给Result.error方法中，传给Result对象的code属性

    @Autowired
    private IAdminService adminService;
    @Autowired
    private ICustomerService customerService;
    @Autowired
    private ICourierService courierService;
    @Autowired
    private IStationManagerService stationManagerService;

    private static final String SECRET = "ILoveChenRui";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // get token from request header
        String authHeader = request.getHeader("Authorization");
        if (StrUtil.isBlank(authHeader)) {
            throw new ServiceException(ERROR_CODE_401, "There is no authorization header, please check that.");
        }
        String token = StrUtil.subAfter(authHeader, "Bearer ", false);
        if (StrUtil.isBlank(token)) {
            // get token from request parameter
            token = request.getParameter("token");
        }

        // both header and parameter are empty
        if (StrUtil.isBlank(token)) {
            throw new ServiceException(ERROR_CODE_401, "There is no token, please login first.");
        }
        // get role from token
        String role;

        // get entity object by idNumber
        Admin admin;
        Customer customer;
        Courier courier;
        StationManager stationManager;
        try {
            role = JWT.decode(token).getAudience().get(0);
            // get admin object by idNumber
            if ("admin".equals(role)) {
                String adminId = JWT.decode(token).getAudience().get(1);
                admin = adminService.getById(Integer.parseInt(adminId));
                //Token decoding has passed, but the admin does not exist
                if (admin == null) {
                    throw new ServiceException(ERROR_CODE_401, "The admin does not exist. Please login again.");
                }
            } else if ("customer".equals(role)) {
                String customerId = JWT.decode(token).getAudience().get(1);
                customer = customerService.getCustomerByToken(Integer.parseInt(customerId));
                if (customer == null) {
                    throw new ServiceException(ERROR_CODE_401, "The customer does not exist. Please login again.");
                }
            } else if ("courier".equals(role)) {
                String employeeId = JWT.decode(token).getAudience().get(1);
                String accountId = JWT.decode(token).getAudience().get(2);
                courier = courierService.getCourierByToken(Integer.parseInt(employeeId), Integer.parseInt(accountId));
                if (courier == null) {
                    throw new ServiceException(ERROR_CODE_401, "The courier does not exist. Please login again.");
                }
            } else if ("stationManager".equals(role)) {
                String employeeId = JWT.decode(token).getAudience().get(1);
                String accountId = JWT.decode(token).getAudience().get(2);
                stationManager = stationManagerService.getStationManagerByToken(Integer.parseInt(employeeId), Integer.parseInt(accountId));
                if (stationManager == null) {
                    throw new ServiceException(ERROR_CODE_401, "The stationManager does not exist. Please login again.");
                }
            }else {
                throw new ServiceException(ERROR_CODE_401, "The role of token is abnormal, please login again.");
            }
        } catch (Exception e) {
            String errMsg = "The payload of token is abnormal, please login again.";
            log.error(errMsg + ", token=" + token, e);
            throw new ServiceException(ERROR_CODE_401, errMsg);
        }


        try {
            // verify the signature of token, regenerate the signature, compared with the original token
            JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(SECRET)).build();
            jwtVerifier.verify(token); // changed or expired token will throw an exception
        } catch (JWTVerificationException e) {
            if(e instanceof TokenExpiredException){
                throw new ServiceException(ERROR_CODE_401, "The token has expired, please login again.");
            }
            throw new ServiceException(ERROR_CODE_401, "token verification has failed, please login again.");
        }
        return true;
    }
}

