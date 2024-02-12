package com.example.fypspringbootcode.service;

import com.example.fypspringbootcode.entity.Trunk;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 *
 * @author Shijin Zhang
 * @since 2024-02-13
 */
public interface ITrunkService extends IService<Trunk> {

    Trunk updateTrunkInfo(Trunk trunk, Integer trunkId);
}
