package com.example.fypspringbootcode.tests;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.fypspringbootcode.entity.ParcelStation;
import com.example.fypspringbootcode.mapper.ParcelStationMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;



/**
 * @title:FinalYearProjectCode
 * @description: <TODO description class purpose>
 * @author: Shijin Zhang
 * @version: 1.0.0
 * @create: 10/03/2024 00:12
 **/
@SpringBootTest
@Slf4j
public class ParcelStationTest extends ServiceImpl<ParcelStationMapper, ParcelStation> {
    String[] address = {
            "36 Oak Lane, Maryborough Ridge, Cork, Ireland, T12 R9X2",
            "52 Pine Road, Aylesbury, Dublin 24, Ireland, D24 YK8N",
            "17 Elm Drive, Stonebridge Cross, Galway, Ireland, H91 AE7Q",
            "9 Cedar Avenue, Millers Glen, Limerick, Ireland, V94 XP5C",
            "24 Maple Close, Ferrypark, Waterford, Ireland, X91 W2E6",
            "63 Willow Grove, Mervue, Galway, Ireland, H91 D6T8",
            "39 Chestnut Hill, Rosconnor, Sligo, Ireland, F91 LY3K",
            "71 Sycamore Court, Ballincurrig, Cork, Ireland, T12 E8V9",
            "12 Birch Lane, Rosegreen, Kilkenny, Ireland, R95 FX2M",
            "57 Ash Gardens, Killure, Waterford, Ireland, X91 N3H4",
            "33 Rowan Grove, Burnell Green, Dublin 15, Ireland, D15 KC7X",
            "68 Cherry Close, Oakfield, Cork, Ireland, T23 TN1R",
            "21 Hawthorn Way, Loughmore, Tipperary, Ireland, E25 A9Z6",
            "49 Poplar Drive, Greystones, Wicklow, Ireland, A63 HY2V",
            "7 Beech Avenue, Milehouse, Cork, Ireland, T23 XW8Q",
            "61 Holly Park, Westgrove, Sligo, Ireland, F91 6LN2",
            "28 Laurel Gardens, Shallogen, Wexford, Ireland, Y35 EF7J",
            "44 Mulberry Close, Tullyallen, Kilkenny, Ireland, R95 CY0D",
            "15 Walnut Crescent, Cloghan, Offaly, Ireland, R35 DP9T",
            "3 Fir Court, Skehana, Galway, Ireland, H91 V1F5",
            "65 Pine Hill, Ballinlough, Cork, Ireland, T23 N9Y8",
            "27 Redwood Avenue, Corke Abbey, Dublin 15, Ireland, D15 HX4L",
            "51 Sycamore Heights, Cloonmore, Mayo, Ireland, F28 YK6G",
            "10 Hazel Way, Rathpeacon, Cork, Ireland, T12 X7M2",
            "75 Aspen Grove, Whiterock Hill, Wexford, Ireland, Y35 E8N3",
            "41 Apple Orchard, Coshma, Limerick, Ireland, V94 A2F7",
            "18 Pear Tree Lane, Monacnapa, Tipperary, Ireland, E25 YH9D",
            "59 Plum Terrace, Elmvale, Westmeath, Ireland, N91 PP2X",
            "32 Juniper Gardens, Ballinspittle, Cork, Ireland, P81 X6Y1",
            "5 Blackthorn Crescent, Moycullen, Galway, Ireland, H91 C3Z9"
    };

    @Test
    public void insertData() {
        for (int i = 2001; i <= 2030; i++) {
            ParcelStation parcelStation = new ParcelStation();
            parcelStation.setStationId(i);
            parcelStation.setCommunityName(address[i - 2001].split(",")[1].trim());
            parcelStation.setCity(address[i - 2001].split(",")[2].trim());
            updateById(parcelStation);
        }
    }

    @Test
    public void listTest() {
        lambdaQuery().eq(ParcelStation::getCity,"Dublin").list().forEach(System.out::println);
    }
}
