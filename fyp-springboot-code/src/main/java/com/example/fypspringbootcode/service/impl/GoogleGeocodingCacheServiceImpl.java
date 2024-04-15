package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.fypspringbootcode.common.config.AppConfig;
import com.example.fypspringbootcode.controller.dto.CourierRouteAddressGeoInfoDTO;
import com.example.fypspringbootcode.controller.dto.CusTrackParcelGeoRouteDTO;
import com.example.fypspringbootcode.controller.dto.StationDeliveringParcelsGeoRouteDTO;
import com.example.fypspringbootcode.controller.request.RouteGeoAddressRequest;
import com.example.fypspringbootcode.controller.request.TransferAddressRequest;
import com.example.fypspringbootcode.entity.GoogleGeocodingCache;
import com.example.fypspringbootcode.entity.googleRoute.CourierCollectionRouteInfo;
import com.example.fypspringbootcode.entity.googleRoute.CourierDeliveryRouteInfo;
import com.example.fypspringbootcode.entity.googleRoute.CusTrackParcelRouteInfo;
import com.example.fypspringbootcode.entity.googleRoute.StationDeliveringParcelsRouteInfo;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.GoogleGeocodingCacheMapper;
import com.example.fypspringbootcode.service.IGoogleGeocodingCacheService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.model.GeocodingResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_400;
import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_404;

/**
 * @author Shijin Zhang
 * @since 2024-03-13
 */
@Slf4j
@Service
public class GoogleGeocodingCacheServiceImpl extends ServiceImpl<GoogleGeocodingCacheMapper, GoogleGeocodingCache> implements IGoogleGeocodingCacheService {

    private final String apiKey = AppConfig.GOOGLE_MAPS_API_KEY;

    private final Map<String, String> addressTypeMap;

    public GoogleGeocodingCacheServiceImpl() {
        addressTypeMap = new HashMap<>();
        addressTypeMap.put("PHC", "COL-Parcel Hub");
        addressTypeMap.put("SEN", "ORG-Shipper");
        addressTypeMap.put("CUS", "Customer's Address");
        addressTypeMap.put("PST", "DST-Parcel Station");
    }

    @Override
    public List<CusTrackParcelGeoRouteDTO> transferCusTrackParcelRouteAddresses(RouteGeoAddressRequest request) {
        List<CusTrackParcelGeoRouteDTO> geoRoutes = new ArrayList<>();

        for (CusTrackParcelRouteInfo routeInfo : request.getCusTrackParcelRouteAddresses()) {
            CusTrackParcelGeoRouteDTO geoRoute = new CusTrackParcelGeoRouteDTO();
            List<GoogleGeocodingCache> routeRecord = new ArrayList<>();
            geoRoute.setOrderId(routeInfo.getOrderId());

            for (String routeAddress : routeInfo.getRouteAddresses()) {
                int lastCommaIndex = routeAddress.lastIndexOf(',');
                String addressType = addressTypeMap.get(routeAddress.substring(lastCommaIndex + 2));
                String address = routeAddress.substring(0, lastCommaIndex);

                LambdaQueryWrapper<GoogleGeocodingCache> queryWrapper = new LambdaQueryWrapper<>();
                queryWrapper.eq(GoogleGeocodingCache::getAddress, address);
                getOneOpt(queryWrapper).ifPresentOrElse(
                        routeRecord::add,
                        () -> routeRecord.add(getGeoCodingFromGoogle(address, addressType))
                );
            }

            geoRoute.setRouteRecord(routeRecord);
            geoRoutes.add(geoRoute);
        }

        return geoRoutes;
    }

    @Override
    public List<StationDeliveringParcelsGeoRouteDTO> transferStationDeliveringParcelsRouteAddresses(RouteGeoAddressRequest request) {
        List<StationDeliveringParcelsGeoRouteDTO> geoRoutes = new ArrayList<>();

        for (StationDeliveringParcelsRouteInfo routeInfo : request.getStationDeliveringParcelsRouteAddresses()) {
            StationDeliveringParcelsGeoRouteDTO geoRoute = new StationDeliveringParcelsGeoRouteDTO();
            List<GoogleGeocodingCache> routeRecord = new ArrayList<>();
            geoRoute.setParcelTrackingCodes(routeInfo.getParcelTrackingCodes());

            for (String routeAddress : routeInfo.getRouteAddresses()) {
                int lastCommaIndex = routeAddress.lastIndexOf(',');
                String addressType = addressTypeMap.get(routeAddress.substring(lastCommaIndex + 2));
                String address = routeAddress.substring(0, lastCommaIndex);

                LambdaQueryWrapper<GoogleGeocodingCache> queryWrapper = new LambdaQueryWrapper<>();
                queryWrapper.eq(GoogleGeocodingCache::getAddress, address);
                getOneOpt(queryWrapper).ifPresentOrElse(
                        routeRecord::add,
                        () -> routeRecord.add(getGeoCodingFromGoogle(address, addressType))
                );
            }

            geoRoute.setRouteRecord(routeRecord);
            geoRoutes.add(geoRoute);
        }

        return geoRoutes;
    }

    @Override
    public List<CourierRouteAddressGeoInfoDTO> transferCourierCollectionRouteAddresses(RouteGeoAddressRequest request) {
        List<CourierRouteAddressGeoInfoDTO> geoInfoDTOList = new ArrayList<>();

        for (CourierCollectionRouteInfo routeInfo : request.getCourierCollectionRouteAddresses()) {
            CourierRouteAddressGeoInfoDTO geoInfoDTO = new CourierRouteAddressGeoInfoDTO();
            // Set parcel tracking codes
            geoInfoDTO.setParcelTrackingCodes(routeInfo.getParcelTrackingCodes());
            // Handle address info and find the address type
            String addressInfo = routeInfo.getAddress();
            int lastCommaIndex = addressInfo.lastIndexOf(',');
            String addressType = addressTypeMap.get(addressInfo.substring(lastCommaIndex + 2));
            String address = addressInfo.substring(0, lastCommaIndex);

            // Query and set the lat and lng from the database
            LambdaQueryWrapper<GoogleGeocodingCache> queryWrapper = new LambdaQueryWrapper<>();
            queryWrapper.eq(GoogleGeocodingCache::getAddress, address);
            getOneOpt(queryWrapper).ifPresentOrElse(
                    geoInfoDTO::setAddressGeoInfo,
                    () -> geoInfoDTO.setAddressGeoInfo(getGeoCodingFromGoogle(address, addressType))
            );

            geoInfoDTOList.add(geoInfoDTO);
        }

        return geoInfoDTOList;
    }

    @Override
    public List<CourierRouteAddressGeoInfoDTO> transferCourierDeliveryRouteAddresses(RouteGeoAddressRequest request) {
        List<CourierRouteAddressGeoInfoDTO> geoInfoDTOList = new ArrayList<>();

        for (CourierDeliveryRouteInfo routeInfo : request.getCourierDeliveryRouteAddresses()) {
            CourierRouteAddressGeoInfoDTO geoInfoDTO = new CourierRouteAddressGeoInfoDTO();
            // Set parcel tracking codes
            geoInfoDTO.setParcelTrackingCodes(routeInfo.getParcelTrackingCodes());
            // Handle address info and find the address type
            String addressInfo = routeInfo.getAddress();
            int lastCommaIndex = addressInfo.lastIndexOf(',');
            String addressType = addressTypeMap.get(addressInfo.substring(lastCommaIndex + 2));
            String address = addressInfo.substring(0, lastCommaIndex);

            // Query and set the lat and lng from the database
            LambdaQueryWrapper<GoogleGeocodingCache> queryWrapper = new LambdaQueryWrapper<>();
            queryWrapper.eq(GoogleGeocodingCache::getAddress, address);
            getOneOpt(queryWrapper).ifPresentOrElse(
                    geoInfoDTO::setAddressGeoInfo,
                    () -> geoInfoDTO.setAddressGeoInfo(getGeoCodingFromGoogle(address, addressType))
            );

            geoInfoDTOList.add(geoInfoDTO);
        }

        return geoInfoDTOList;
    }

    @Override
    public List<GoogleGeocodingCache> transferAddresses(TransferAddressRequest request) {
        List<GoogleGeocodingCache> addresses = new ArrayList<>();

        for (String addressInfo : request.getAddresses()) {
            int lastCommaIndex = addressInfo.lastIndexOf(',');
            String addressType = addressTypeMap.get(addressInfo.substring(lastCommaIndex + 2));
            String address = addressInfo.substring(0, lastCommaIndex);

            LambdaQueryWrapper<GoogleGeocodingCache> queryWrapper = new LambdaQueryWrapper<>();
            queryWrapper.eq(GoogleGeocodingCache::getAddress, address);
            getOneOpt(queryWrapper).ifPresentOrElse(
                    addresses::add,
                    () -> addresses.add(getGeoCodingFromGoogle(address, addressType))
            );
        }
        return addresses;
    }

    private GoogleGeocodingCache getGeoCodingFromGoogle(String address, String addressType) {
        GeoApiContext context = new GeoApiContext.Builder().apiKey(apiKey).build();

        GeocodingResult[] results;
        try {
            results = GeocodingApi.geocode(context, address).await();
        } catch (Exception e) {
            log.error("Fail to get the Google geocoding result.", e);
            throw new ServiceException(ERROR_CODE_400, "Fail to get the Google geocoding result.");
        }
        if (results.length > 0) {
            GeocodingResult result = results[0];
            GoogleGeocodingCache cache = new GoogleGeocodingCache();
            cache.setLatitude(BigDecimal.valueOf(result.geometry.location.lat));
            cache.setLongitude(BigDecimal.valueOf(result.geometry.location.lng));
            cache.setAddress(address);
            cache.setAddressType(addressType);
            save(cache);
            return cache;
        } else {
            throw new ServiceException(ERROR_CODE_404, "There is no geocoding result for the address.");
        }
    }
}
