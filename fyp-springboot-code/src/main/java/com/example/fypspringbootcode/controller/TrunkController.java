package com.example.fypspringbootcode.controller;

import com.example.fypspringbootcode.common.Result;
import com.example.fypspringbootcode.entity.Trunk;
import com.example.fypspringbootcode.service.ITrunkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-13
 */
@CrossOrigin
@RestController
@RequestMapping("/trunk")
public class TrunkController {

    @Autowired
    ITrunkService trunkService;

    @PutMapping("/v1/update/{trunkId}")
    public Result updateTrunkInfo(@RequestBody Trunk trunk, @PathVariable Integer trunkId) {
        Trunk updatedTrunk = trunkService.updateTrunkInfo(trunk, trunkId);
        return Result.success(updatedTrunk, "The trunk has been updated successfully");
    }

}
