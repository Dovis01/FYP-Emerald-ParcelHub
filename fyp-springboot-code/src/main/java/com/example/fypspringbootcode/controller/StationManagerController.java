package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.controller.dto.LoginStationManagerDTO;
import com.example.fypspringbootcode.controller.request.LoginRequest;
import com.example.fypspringbootcode.controller.request.RegisterEmployeeRoleRequest;
import com.example.fypspringbootcode.entity.CompanyEmployee;
import com.example.fypspringbootcode.entity.StationManager;
import com.example.fypspringbootcode.service.IStationManagerService;
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
@RequestMapping("/stationManager")
public class StationManagerController {

    @Autowired
    IStationManagerService stationManagerService;

    @PostMapping("/v1/login")
    public ResponseEntity<Result> login(@RequestParam(defaultValue = "username") String authMethod , @RequestBody LoginRequest loginRequest) {
        LoginStationManagerDTO login;
        if (authMethod.equals("username")) {
            login = stationManagerService.login(loginRequest);
            return ResponseEntity.ok(Result.success(login, "login by username successfully"));
        } else if (authMethod.equals("email")) {
            login = stationManagerService.login(loginRequest);
            return ResponseEntity.ok(Result.success(login,"login by email successfully"));
        } else {
            return ResponseEntity.badRequest().body(Result.error(ERROR_CODE_400,"Invalid authMethod"));
        }
    }

    @PostMapping("/v1/register")
    public Result register(@RequestBody RegisterEmployeeRoleRequest registerRequest) {
        stationManagerService.register(registerRequest);
        return Result.success("The station manager has registered successfully");
    }

    @GetMapping("/v1/{stationManagerId}")
    public Result getByFullName(@PathVariable Integer stationManagerId) {
        LoginStationManagerDTO stationManager = stationManagerService.getByStationManagerId(stationManagerId);
        return Result.success(stationManager , "The station manager has been found successfully");
    }

    @DeleteMapping("/v1/{stationManagerId}")
    public Result delete(@PathVariable Integer stationManagerId, @RequestBody StationManager stationManager) {
        stationManagerService.deleteOneStationManager(stationManagerId, stationManager);
        return Result.success("The station manager has been deleted successfully");
    }

    @PutMapping("/v1/admin/update/{stationManagerId}")
    public Result updateInfoByAdmin(@RequestBody StationManager stationManager, @PathVariable Integer stationManagerId) {
        StationManager updatedStationManager = stationManagerService.updateInfoByAdmin(stationManager, stationManagerId);
        return Result.success(updatedStationManager,"The position info of station manager has been updated successfully");
    }

    @PutMapping("/v1/personal/update/{stationManagerId}")
    public Result updatePersonalInfo(@RequestBody CompanyEmployee companyEmployee, @PathVariable Integer stationManagerId) {
        LoginStationManagerDTO updatedStationManager = stationManagerService.updatePersonalInfo(companyEmployee, stationManagerId);
        return Result.success(updatedStationManager,"The personal info of station manager has been updated successfully");
    }
}
