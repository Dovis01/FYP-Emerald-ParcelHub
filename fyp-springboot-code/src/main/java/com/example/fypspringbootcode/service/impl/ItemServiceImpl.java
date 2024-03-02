package com.example.fypspringbootcode.service.impl;

import com.example.fypspringbootcode.entity.Item;
import com.example.fypspringbootcode.mapper.ItemMapper;
import com.example.fypspringbootcode.service.IItemService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-02
 */
@Service
public class ItemServiceImpl extends ServiceImpl<ItemMapper, Item> implements IItemService {

}
