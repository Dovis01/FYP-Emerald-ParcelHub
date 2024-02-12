package com.example.fypspringbootcode.tests;

import com.example.fypspringbootcode.entity.CompanyEmployee;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.CompanyEmployeeMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

/**
 * @title:FinalYearProjectCode
 * @description:<TODO description class purpose>
 * @author: Shijin Zhang
 * @version:1.0.0
 * @create:28/01/2024 08:52
 **/
@SpringBootTest
@Slf4j
public class CompanyEmployeeTest {

    @Autowired
    CompanyEmployeeMapper companyEmployeeMapper;

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    private String generateEmployeeCode(String fullName) {
        String initials = getInitials(fullName);

        String dateTimeString = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());

        Random random = new Random();
        int randomNumber = random.nextInt(1000, 10000);

        String randomLetters = generateRandomLetters(2);

        return initials + "-" + dateTimeString + "-" + randomNumber + randomLetters;
    }

    private String getInitials(String fullName) {
        StringBuilder initials = new StringBuilder();
        for (String part : fullName.split("\\s+")) {
            if (!part.isEmpty()) {
                initials.append(part.charAt(0));
            }
        }
        return initials.toString().toUpperCase();
    }

    private String generateRandomLetters(int count) {
        Random random = new Random();
        return random.ints('A', 'Z' + 1)
                .limit(count)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    @Test
    public void getById() {
        System.out.println(companyEmployeeMapper.selectById(1));
    }

//    @Test
//    public void insert() {
//        CompanyEmployee companyEmployee = new CompanyEmployee("John Doe", generateEmployeeCode("John Doe"));
//        try {
//            companyEmployeeMapper.insert(companyEmployee);
//        } catch (DuplicateKeyException e) {
//            log.error("Fail to insert data, fullname:{}", companyEmployee.getFullName(), e);
//            throw new ServiceException("Full name already exists");
//        }
//    }
    @Test
    public void batchInsert() {

        String[] employeeNames = {
                "Logan Taylor", "Ella Thompson", "Ava Jackson", "Mason Miller",
                "Elijah Jones", "Elijah Perez", "Olivia Anderson", "Ava Harris",
                "Abigail Harris", "Elijah Gonzalez", "Harper Harris", "Charlotte Harris",
                "Mason Wilson", "Ethan Garcia", "Ethan Thomas", "Lily Jackson",
                "Jacob Smith", "Jacob Harris", "Emily Lee", "Avery Lopez",
                "Harper Rodriguez", "Lucas Davis", "Mason Hernandez", "Harper Williams",
                "Elijah Harris", "Abigail Thompson", "Amelia Williams", "Benjamin Miller",
                "Charlotte Williams", "Jacob Garcia"
        };

        List<CompanyEmployee> employees = new ArrayList<>();

//        for(String fullName : employeeNames) {
//            CompanyEmployee employee = new CompanyEmployee(fullName, generateEmployeeCode(fullName));
//            employees.add(employee);
//        }

        try (SqlSession sqlSession = sqlSessionTemplate.getSqlSessionFactory().openSession(ExecutorType.BATCH, false)) {
            CompanyEmployeeMapper mapper = sqlSession.getMapper(CompanyEmployeeMapper.class);
            for (CompanyEmployee employee : employees) {
                mapper.insert(employee);
            }
            sqlSession.commit();
        } catch (Exception e) {
            log.error("Fail to insert data in the batch", e);
            throw new ServiceException("Fail to insert data in the batch");
        }
    }


}
