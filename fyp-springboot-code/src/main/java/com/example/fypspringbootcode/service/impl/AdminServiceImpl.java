package com.example.fypspringbootcode.service.impl;

import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.SecureUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.fypspringbootcode.controller.dto.LoginDTO;
import com.example.fypspringbootcode.controller.request.BaseRequest;
import com.example.fypspringbootcode.controller.request.LoginEmailRequest;
import com.example.fypspringbootcode.controller.request.LoginUsernameRequest;
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

@Slf4j //用于异常错误抛出 下方log.error
@Service
public class AdminServiceImpl implements IAdminService {

    @Autowired
    AdminMapper adminMapper;

    private static final String DEFAULT_PASS = "zsj123456";
    private static final String PASS_SALT = "Dovis"; //密码盐

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
            log.error("数据插入失败， username:{}", obj.getAdminName(), e);
            throw new ServiceException("用户名重复");
        }
    }

    @Override
    public Admin getById(Integer id) {
        return adminMapper.selectById(id);
    }

    @Override
    public void deleteById(Integer id) {
        adminMapper.deleteById(id);
    }

    @Override
    //传进来一个封装前端登录请求参数的前端请求参数对象，登陆成功后返回给前端一个登陆成功的管理员对象(使得前端获得这个登陆成功的对象所含信息)
    public LoginDTO loginByUsername(LoginUsernameRequest request) {
        Admin admin = null;
        QueryWrapper<Admin> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("admin_name", request.getUsername());
        try {
    //不通过Username和password进行查询因为这样查出的唯一admin,会出现相同用户名密码不同，一个账号多个密码问题；
    //通过Username进行查询并且数据库设置username字段唯一，解决了一个账号多个密码问题 用户名变成唯一
    //try catch保护防止返回的是admin list对像
            admin = adminMapper.selectOne(queryWrapper);
        } catch (Exception e) {
            log.error("根据用户名{} 查询出错", request.getUsername());
            throw new ServiceException("用户名错误");//全局异常处理 自定义业务异常类
        }
        if (admin == null) {
            //查不到admin
            throw new ServiceException("用户名或密码错误");
        }
        // 根据用户名查到admin之后再判断其密码是否合法
        handleLoginException(request.getPassword(), admin);
        return generateLoginDTO(admin);
    }

    private void handleLoginException(String password, Admin admin) {
        String securePass = securePass(password);
        if (!securePass.equals(admin.getPassword())) {
            throw new ServiceException("用户名或密码错误");
        }
        if (!admin.isStatus()) {
            throw new ServiceException("当前用户处于禁用状态，请联系管理员");
        }
    }

    @Override
    //传进来一个封装前端登录请求参数的前端请求参数对象，登陆成功后返回给前端一个登陆成功的管理员对象(使得前端获得这个登陆成功的对象所含信息)
    public LoginDTO loginByEmail(LoginEmailRequest request) {
        Admin admin = null;
        QueryWrapper<Admin> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("admin_email", request.getEmail());
        try {
            //不通过Username和password进行查询因为这样查出的唯一admin,会出现相同用户名密码不同，一个账号多个密码问题；
            //通过Username进行查询并且数据库设置username字段唯一，解决了一个账号多个密码问题 用户名变成唯一
            //try catch保护防止返回的是admin list对像
            admin = adminMapper.selectOne(queryWrapper);
        } catch (Exception e) {
            log.error("根据邮箱{} 查询出错", request.getEmail());
            throw new ServiceException("Error admin email");//全局异常处理 自定义业务异常类
        }
        if (admin == null) {
            //查不到admin
            throw new ServiceException("邮箱或密码错误");
        }
        // 根据用户名查到admin之后再判断其密码是否合法
        handleLoginException(request.getPassword(), admin);
        return generateLoginDTO(admin);
    }

    private static LoginDTO generateLoginDTO(Admin admin) {
        /**
         * Admin对象转换成LoginDTO对象
         *  BeanUtils.copyProperties(源对象，目标对象)只会复制两个对象的共同属性字段值
         * */
        LoginDTO loginDTO = new LoginDTO();
        BeanUtils.copyProperties(admin, loginDTO);

        // 生成token给前端请求凭证 TokenUtils genToken方法(adminId,sign)
        String token = TokenUtils.genToken(String.valueOf(admin.getId()), admin.getPassword());
        loginDTO.setToken(token);
        return loginDTO;
    }

    @Override
    public void changePass(PasswordRequest request) {
        // 注意 你要对新的密码进行加密
        request.setNewPass(securePass(request.getNewPass()));
        int count = adminMapper.updatePassword(request);
        if (count <= 0) {
            throw new ServiceException("修改密码失败");
        }
    }

    /**
     * 安全通过
     *
     * @param password 密码
     * @return {@link String}
     */
    private String securePass(String password) {
        return SecureUtil.md5(password + PASS_SALT);
    }

}
