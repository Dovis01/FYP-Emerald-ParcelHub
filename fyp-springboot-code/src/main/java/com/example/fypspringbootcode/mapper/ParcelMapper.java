package com.example.fypspringbootcode.mapper;

import com.example.fypspringbootcode.entity.Parcel;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-02
 */
public interface ParcelMapper extends BaseMapper<Parcel> {

    List<Parcel> getParcelsToBeCollectedSortedByOrderDate(List<Integer> parcelIdsToBeCollected);

    List<Parcel> getParcelsToBeDeliveredSortedByOrderDate(List<Integer> parcelIdsToBeDelivered, List<Integer> parcelIdsInParcelHub);

}
