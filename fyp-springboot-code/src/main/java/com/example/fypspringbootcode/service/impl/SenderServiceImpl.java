package com.example.fypspringbootcode.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.fypspringbootcode.entity.Sender;
import com.example.fypspringbootcode.exception.ServiceException;
import com.example.fypspringbootcode.mapper.SenderMapper;
import com.example.fypspringbootcode.service.ISenderService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.springframework.stereotype.Service;

import static com.example.fypspringbootcode.common.ErrorCodeList.ERROR_CODE_500;

/**
 *
 * @author Shijin Zhang
 * @since 2024-03-02
 */
@Service
public class SenderServiceImpl extends ServiceImpl<SenderMapper, Sender> implements ISenderService {

    @Override
    public void addOrderSendersInfoInBatch(JsonArray ecommerceJsonData) {

        for (JsonElement element : ecommerceJsonData) {
            JsonObject senderInfoObject = element.getAsJsonObject().get("sender").getAsJsonObject();

            Sender newSender = new Sender();
            newSender.setFullName(senderInfoObject.get("name").getAsString());
            newSender.setPhoneNumber(senderInfoObject.get("phone").getAsString());
            newSender.setEmail(senderInfoObject.get("email").getAsString());

            LambdaQueryWrapper<Sender> queryWrapper = new LambdaQueryWrapper<>();
            queryWrapper.eq(Sender::getFullName, newSender.getFullName())
                    .or()
                    .eq(Sender::getPhoneNumber, newSender.getPhoneNumber())
                    .or()
                    .eq(Sender::getEmail, newSender.getEmail());

            Sender matchedSender;
            try {
                matchedSender = getOne(queryWrapper);
            } catch (Exception e) {
                log.error("The deserialization of mybatis has failed for the order sender info", e);
                throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
            }

            if (matchedSender != null) {
                continue;
            }

            String address = senderInfoObject.get("address").getAsString();
            newSender.setAddress(address);
            Sender completeSender = handleOrderSendersCityAndCountry(address, newSender);

            try {
                save(completeSender);
            } catch (Exception e) {
                log.error("Fail to insert order sender info data", e);
                throw new ServiceException(ERROR_CODE_500, "The internal system is error.");
            }
        }
    }

    @Override
    public void deleteAllSendersData() {
        remove(null);
    }

    private static Sender handleOrderSendersCityAndCountry(String address, Sender sender) {
        String[] addressArray = address.split(",");
        String city = addressArray.length >= 3 ? addressArray[addressArray.length - 3].trim() : "";
        String country = addressArray.length >= 2 ? addressArray[addressArray.length - 2].trim() : "";
        sender.setCity(city);
        sender.setCountry(country);
        return sender;
    }
}
