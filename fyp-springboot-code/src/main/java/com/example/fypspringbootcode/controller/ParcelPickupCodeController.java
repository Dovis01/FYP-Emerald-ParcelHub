package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.service.IParcelPickupCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


/**
 *
 * @author Shijin Zhang
 * @since 2024-04-09
 */
@CrossOrigin
@RestController
@RequestMapping("/parcelPickupCode")
public class ParcelPickupCodeController {

    @Autowired
    IParcelPickupCodeService parcelPickupCodeService;

    @GetMapping("/v1/search/customer/{customerId}")
    public Result getParcelPickupCodesByCustomerId(Integer customerId) {
        List<String> pickupCodes = parcelPickupCodeService.getParcelPickupCodesByCustomerId(customerId);
        return Result.success(pickupCodes, "Get parcel pickup codes of this customer successfully");
    }

}
