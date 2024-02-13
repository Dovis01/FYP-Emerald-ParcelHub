package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.controller.dto.LoginCourierDTO;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.example.fypspringbootcode.controller.request.RegisterEmployeeRoleRequest;
import com.example.fypspringbootcode.entity.Courier;
import com.example.fypspringbootcode.service.ICourierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_400;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-05
 */
@CrossOrigin
@RestController
@RequestMapping("/courier")
public class CourierController {

    @Autowired
    ICourierService courierService;

    @PostMapping("/v1/login")
    public ResponseEntity<Result> login(@RequestParam(defaultValue = "username") String authMethod , @RequestBody LoginRequest loginRequest) {
        LoginCourierDTO login;
        if (authMethod.equals("username")) {
            login = courierService.login(loginRequest);
            return ResponseEntity.ok(Result.success(login, "login by username successfully"));
        } else if (authMethod.equals("email")) {
            login = courierService.login(loginRequest);
            return ResponseEntity.ok(Result.success(login,"login by email successfully"));
        } else {
            return ResponseEntity.badRequest().body(Result.error(ERROR_CODE_400,"Invalid authMethod"));
        }
    }

    @PostMapping("/v1/register")
    public Result register(@RequestBody RegisterEmployeeRoleRequest registerRequest) {
        courierService.register(registerRequest);
        return Result.success("The courier has registered successfully");
    }

    @GetMapping("/v1/{courierId}")
    public Result getByFullName(@PathVariable Integer courierId) {
        LoginCourierDTO courier = courierService.getByCourierId(courierId);
        return Result.success(courier , "The courier has been found successfully");
    }

    @DeleteMapping("/v1/{courierId}")
    public Result delete(@PathVariable Integer courierId, @RequestBody Courier courier) {
        courierService.deleteOneCourier(courierId, courier);
        return Result.success("The courier has been deleted successfully");
    }

    @PutMapping("/v1/update/{courierId}")
    public Result updatePersonalInfo(@RequestBody Courier courier, @PathVariable Integer courierId) {
        Courier updatedCourier = courierService.updatePersonalInfo(courier, courierId);
        return Result.success(updatedCourier,"The info of courier has been updated successfully");
    }

}
