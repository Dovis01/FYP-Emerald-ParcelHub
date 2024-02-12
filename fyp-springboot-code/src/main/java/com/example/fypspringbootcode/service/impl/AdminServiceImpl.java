package com.example.fypspringbootcode.service.impl;

import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.SecureUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.fypspringbootcode.controller.dto.LoginAdminDTO;
import com.example.fypspringbootcode.controller.request.BaseRequest;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.example.fypspringbootcode.controller.request.PasswordRequest;
import com.example.fypspringbootcode.entity.Admin;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.AdminMapper;
import com.example.fypspringbootcode.service.IAdminService;
import com.example.fypspringbootcode.utils.TokenUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_401;
import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_500;

@Slf4j
@Service
public class AdminServiceImpl implements IAdminService {

    @Autowired
    AdminMapper adminMapper;

    private static final String DEFAULT_PASS = "zsj123456";
    private static final String PASS_SALT = "Dovis"; //password salt

    @Override
    public List<Admin> list() {
        return adminMapper.selectList(null);
    }

    @Override
    public PageInfo<Admin> page(BaseRequest baseRequest) {
        PageHelper.startPage(baseRequest.getPageNum(), baseRequest.getPageSize());
        List<Admin> users = adminMapper.listByCondition(baseRequest);
        return new PageInfo<>(users);
    }

    @Override
    public void save(Admin obj) {
        //如果admin对象的密码属性为空 则设置默认密码 123
        //hutool包下的工具类StrUtil
        if (StrUtil.isBlank(obj.getPassword())) {
            obj.setPassword(DEFAULT_PASS);
        }
        //hutool包下的工具类SecureUtil
        obj.setPassword(securePass(obj.getPassword()));  // 设置md5加密，加盐
        try {
            //可能发生数据库加入重复admin用户名值发生的未捕获的异常  save方法可能会失败
            adminMapper.insert(obj);
        } catch (DuplicateKeyException e) {
            log.error("Fail to insert the admin, admin name:{}", obj.getAdminName(), e);
            throw new ServiceException(ERROR_CODE_401, "The username is duplicated, please change another one.");
        }
    }

    @Override
    public Admin getById(Integer id) {
        Admin admin = adminMapper.selectById(id);
        admin.setPassword(null);
        return admin;
    }

    @Override
    public void deleteById(Integer id) {
        adminMapper.deleteById(id);
    }

    @Override
    //传进来一个封装前端登录请求参数的前端请求参数对象，登陆成功后返回给前端一个登陆成功的管理员对象(使得前端获得这个登陆成功的对象所含信息)
    public LoginAdminDTO login(LoginRequest request) {
        Admin admin;
        QueryWrapper<Admin> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("admin_name", request.getUsername());
        try {
            //不通过Username和password进行查询因为这样查出的唯一admin,会出现相同用户名密码不同，一个账号多个密码问题；
            //通过Username进行查询并且数据库设置username字段唯一，解决了一个账号多个密码问题 用户名变成唯一
            admin = adminMapper.selectOne(queryWrapper);
        } catch (Exception e) {
            log.error("The deserialization of mybatis is wrong, the admin name is {}", request.getUsername());
            throw new ServiceException(ERROR_CODE_500, "The internal system is error. Please try again.");
        }
        if (admin == null) {
            throw new ServiceException(ERROR_CODE_401, "The username is wrong, no matched admin.");
        }
        handleLoginException(request.getPassword(), admin);
        return generateLoginAdminDTO(admin);
    }

    private void handleLoginException(String password, Admin admin) {
        String securePass = securePass(password);
        if (!securePass.equals(admin.getPassword())) {
            throw new ServiceException(ERROR_CODE_401,"The password of admin is wrong");
        }
        if (!admin.isStatus()) {
            throw new ServiceException(ERROR_CODE_401,"The admin is disabled. Please contact the administrator.");
        }
    }

    private static LoginAdminDTO generateLoginAdminDTO(Admin admin) {
        /*
         * Admin对象转换成LoginDTO对象
         * BeanUtils.copyProperties(源对象，目标对象)只会复制两个对象的共同属性字段值
         */
        LoginAdminDTO loginAdminDTO = new LoginAdminDTO();
        BeanUtils.copyProperties(admin, loginAdminDTO);

        // 生成token给前端请求凭证 TokenUtils genToken方法(adminId,sign)
        String token = TokenUtils.genToken("admin",String.valueOf(admin.getId()));
        loginAdminDTO.setToken(token);
        return loginAdminDTO;
    }

    @Override
    public void changePass(PasswordRequest request) {
        // 注意 你要对新的密码进行加密
        request.setNewPassword(securePass(request.getNewPassword()));
        int count = adminMapper.updatePassword(request);
        if (count <= 0) {
            throw new ServiceException(ERROR_CODE_401,"Fail to change the password. Please try again.");
        }
    }

    /**
     * encrypt the password
     *
     * @return {@link String}
     */
    private String securePass(String password) {
        return SecureUtil.md5(password + PASS_SALT);
    }

}
