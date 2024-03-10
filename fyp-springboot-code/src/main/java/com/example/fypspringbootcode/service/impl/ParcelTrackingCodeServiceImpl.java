package com.example.fypspringbootcode.service.impl;

import com.example.fypspringbootcode.entity.ParcelTrackingCode;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.ParcelTrackingCodeMapper;
import com.example.fypspringbootcode.service.IParcelTrackingCodeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.fypspringbootcode.common.ErrorCodeList.*;

/**
 * @author Shijin Zhang
 * @since 2024-03-10
 */
@Service
public class ParcelTrackingCodeServiceImpl extends ServiceImpl<ParcelTrackingCodeMapper, ParcelTrackingCode> implements IParcelTrackingCodeService {

    @Override
    public void addParcelTrackingCode(Integer parcelId) {
        ParcelTrackingCode parcelTrackingCode = new ParcelTrackingCode();
        parcelTrackingCode.setParcelId(parcelId);
        parcelTrackingCode.setParcelTrackingCode(generateUniqueTackingCode());
        try {
            save(parcelTrackingCode);
        } catch (Exception e) {
            throw new ServiceException(ERROR_CODE_400, "Failed to add parcel tracking code, maybe the parcel id already exists.");
        }
    }

    @Override
    public void clearParcelTrackingCode() {
        try {
            remove(null);
        } catch (Exception e) {
            throw new ServiceException(ERROR_CODE_500, "Failed to clear parcel tracking code.");
        }
    }

    private String generateUniqueTackingCode() {
        String randomLetters = RandomStringUtils.randomAlphabetic(4).toUpperCase();
        String randomNumbers = RandomStringUtils.randomNumeric(6);
        String combined = randomLetters + randomNumbers;

        List<Character> shuffled = combined.chars()
                .mapToObj(c -> (char) c)
                .collect(Collectors.toList());
        // Shuffle the list
        Collections.shuffle(shuffled);

        return shuffled.stream()
                .map(String::valueOf)
                .collect(Collectors.joining());
    }
}
