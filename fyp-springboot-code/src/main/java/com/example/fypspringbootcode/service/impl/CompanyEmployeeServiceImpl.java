package com.example.fypspringbootcode.service.impl;

import com.example.fypspringbootcode.entity.CompanyEmployee;
import com.example.fypspringbootcode.mapper.CompanyEmployeeMapper;
import com.example.fypspringbootcode.service.ICompanyEmployeeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

/**
 *
 * @author Shijin Zhang
 * @since 2024-01-28
 */
@Service
@Slf4j
public class CompanyEmployeeServiceImpl extends ServiceImpl<CompanyEmployeeMapper, CompanyEmployee> implements ICompanyEmployeeService {
    private static String generateEmployeeCode(String fullName) {
        String initials = getInitials(fullName);

        String dateTimeString = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());

        Random random = new Random();
        int randomNumber = random.nextInt(1000, 10000);

        String randomLetters = generateRandomLetters(2);

        return initials + "-" + dateTimeString + "-" + randomNumber + randomLetters;
    }

    private static String getInitials(String fullName) {
        StringBuilder initials = new StringBuilder();
        for (String part : fullName.split("\\s+")) {
            if (!part.isEmpty()) {
                initials.append(part.charAt(0));
            }
        }
        return initials.toString().toUpperCase();
    }

    private static String generateRandomLetters(int count) {
        Random random = new Random();
        return random.ints('A', 'Z' + 1)
                .limit(count)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    public static void main(String[] args) {
        String employeeCode = generateEmployeeCode("John Doe");
        System.out.println(employeeCode);
    }
}
