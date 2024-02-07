package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.entity.RegisteredAccount;
import com.example.fypspringbootcode.service.IRegisteredAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Shijin Zhang
 * @since 2024-01-28
 */
@CrossOrigin
@RestController
@RequestMapping("/registeredAccount")
public class RegisteredAccountController {

    @Autowired
    IRegisteredAccountService registeredAccountService;

    @GetMapping("/v1/{accountId}")
    public Result getByFullName(@PathVariable Integer accountId) {
        RegisteredAccount registeredAccount = registeredAccountService.getByAccountId(accountId);
        return Result.success(registeredAccount, "The registered account has been found successfully");
    }

    @PutMapping("/v1/update/{accountId}")
    public Result updatePassword(@RequestBody RegisteredAccount registeredAccount, @PathVariable Integer accountId) {
        RegisteredAccount updatedRegisteredAccount = registeredAccountService.updateAccountInfo(registeredAccount, accountId);
        return Result.success(updatedRegisteredAccount, "The registered account has been updated successfully");
    }
}
