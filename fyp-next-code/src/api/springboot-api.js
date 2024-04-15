/**
 * API for users authentication
 * */

export const loginByUsername = async (username, password, roleType) => {
    const response = await fetch(`http://localhost:9090/api/${roleType}/v1/login?authMethod=username`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({username: username, password: password})
    });
    return response.json();
};

export const loginByEmail = async (email, password, roleType) => {
    const response = await fetch(`http://localhost:9090/api/${roleType}/v1/login?authMethod=email`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({email: email, password: password})
    });
    return response.json();
};

export const register = async (registrationData, roleType) => {
    const response = await fetch(`http://localhost:9090/api/${roleType}/v1/register`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(registrationData)
    });
    return response.json();
};

export const resetPassword = async (body) => {
    const response = await fetch(`http://localhost:9090/api/registeredAccount/v1/reset-password`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify(body)
    });
    return response.json();
};


/**
 *  API for Ecommerce Simulation Data
 * */

export const uploadEcommerceSimulationRealTimeData = async (simulationData) => {
    const response = await fetch(`http://localhost:9090/api/ecommerceJsonData/v1/insert`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({jsonData: simulationData})
    });
    return response.json();
};

export const uploadEcommerceSimulationPastTimeData = async (simulationPastData) => {
    const response = await fetch(`http://localhost:9090/api/pastStatistics/v1/insert`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({jsonDataRecords: simulationPastData})
    });
    return response.json();
};

export const getEcommerceSimulationPastTimeDataByRoleType = async (roleType) => {
    const response = await fetch(`http://localhost:9090/api/pastStatistics/v1/part-data/${roleType}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'get',
    });
    return response.json();
};

export const clearAllEcommerceSimulationData = async () => {
    const response = await fetch(`http://localhost:9090/api/ecommerceJsonData/v1/delete-all`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'delete'
    });
    return response.json();
};

export const clearSelectedEcommerceSimulationData = async (selectedIds) => {
    const response = await fetch(`http://localhost:9090/api/ecommerceJsonData/v1/delete-multiple`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'delete',
        body: JSON.stringify({ecommerceJsonDataIdsToDelete: selectedIds})
    });
    return response.json();
};

export const getAllEcommerceSimulationData = async () => {
    const response = await fetch(`http://localhost:9090/api/ecommerceJsonData/v1/all-data`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
};

/**
 * API for Google Map Geocoding
 * */

export const transferCusTrackParcelRouteAddressToLatAndLng = async (routeAddressesData) => {
    const response = await fetch(`http://localhost:9090/api/googleGeocodingCache/v1/transfer/route-addresses/cus-track-parcel`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({cusTrackParcelRouteAddresses: routeAddressesData})
    });
    return response.json();
};

export const transferStationDeliveringParcelsRouteAddressToLatAndLng = async (routeAddressesData) => {
    const response = await fetch(`http://localhost:9090/api/googleGeocodingCache/v1/transfer/route-addresses/station-delivering-parcels`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({stationDeliveringParcelsRouteAddresses: routeAddressesData})
    });
    return response.json();
};

export const transferCourierCollectionRouteAddressToLatAndLng = async (routeAddressesData) => {
    const response = await fetch(`http://localhost:9090/api/googleGeocodingCache/v1/transfer/route-addresses/courier-collection`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({courierCollectionRouteAddresses: routeAddressesData})
    });
    return response.json();
};

export const transferCourierDeliveryRouteAddressToLatAndLng = async (routeAddressesData) => {
    const response = await fetch(`http://localhost:9090/api/googleGeocodingCache/v1/transfer/route-addresses/courier-delivery`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({courierDeliveryRouteAddresses: routeAddressesData})
    });
    return response.json();
};

export const getAddressLatitudeAndLongitude = async (addresses) => {
    const response = await fetch(`http://localhost:9090/api/googleGeocodingCache/v1/transfer/addresses`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({addresses: addresses})
    });
    return response.json();
};

/**
 * API for Customer
 * */

export const getAllCustomersInfoDataForAdmin = async () => {
    const response = await fetch(`http://localhost:9090/api/customer/v1/all/customers-info`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
};

export const getAllCustomerPersonalOrdersData = async (customerId) => {
    const response = await fetch(`http://localhost:9090/api/order/v1/part-data/customer/${customerId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
};

export const getAllCustomerPersonalParcelsData = async (customerId) => {
    const response = await fetch(`http://localhost:9090/api/parcel/v1/part-data/customer/${customerId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
};

/**
 * API for Company Employee
 * */

export const getAllCompanyEmployeesInfoDataForAdmin = async () => {
    const response = await fetch(`http://localhost:9090/api/companyEmployee/v1/all/employees-info`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
};

/**
 * API for Courier
 * */

export const getAllCouriersInfoDataForAdmin = async () => {
    const response = await fetch(`http://localhost:9090/api/courier/v1/all/couriers-info`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
};

export const getCourierTodayCollectionTasks = async (courierId) => {
    const response = await fetch(`http://localhost:9090/api/courierCollectionRecord/v1/today-tasks/${courierId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
};

export const CourierFinishTodayCollectionTasks = async (courierId) => {
    const response = await fetch(`http://localhost:9090/api/courierCollectionRecord/v1/finish-tasks/${courierId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'delete'
    });
    return response.json();
};

export const resetParcelsCollectionTasks = async () => {
    const response = await fetch(`http://localhost:9090/api/courierCollectionRecord/v1/reset-all-tasks`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'delete'
    });
    return response.json();
};

export const getCourierTodayDeliveryTasks = async (courierId) => {
    const response = await fetch(`http://localhost:9090/api/courierDeliveryRecord/v1/today-tasks/${courierId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
};

export const CourierFinishTodayDeliveryTasks = async (courierId) => {
    const response = await fetch(`http://localhost:9090/api/courierDeliveryRecord/v1/finish-tasks/${courierId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'delete'
    });
    return response.json();
};

export const resetParcelsDeliveryTasks = async () => {
    const response = await fetch(`http://localhost:9090/api/courierDeliveryRecord/v1/reset-all-tasks`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'delete'
    });
    return response.json();
};

export const updateCourierPersonalInfo = async (infoBody, courierId) => {
    const response = await fetch(`http://localhost:9090/api/courier/v1/personal/update/${courierId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'put',
        body: JSON.stringify(infoBody)
    });
    return response.json();
};

export const disableCourier = async (courierId) => {
    const response = await fetch(`http://localhost:9090/api/courier/v1/update/disable/${courierId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'put',
    });
    return response.json();
};

/**
 * API for Station Manager
 * */

export const getAllStationManagersInfoDataForAdmin = async () => {
    const response = await fetch(`http://localhost:9090/api/stationManager/v1/all/stationManagers-info`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
};

export const updateStationManagerPersonalInfo = async (infoBody, stationManagerId) => {
    const response = await fetch(`http://localhost:9090/api/stationManager/v1/personal/update/${stationManagerId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'put',
        body: JSON.stringify(infoBody)
    });
    return response.json();
};

export const disableStationManager= async (stationManagerId) => {
    const response = await fetch(`http://localhost:9090/api/stationManager/v1/update/disable/${stationManagerId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'put',
    });
    return response.json();
};

/**
 * API for Parcel Hub Station
 * */

export const getDeliveringParcelsDataOfParcelStation = async (stationId) => {
    const response = await fetch(`http://localhost:9090/api/parcel/v1/part-data/parcel-station/delivering/${stationId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
};

export const getStoredParcelsDataOfParcelStation = async (stationId) => {
    const response = await fetch(`http://localhost:9090/api/parcel/v1/part-data/parcel-station/stored/${stationId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
};

/**
 * API for Registered Account
 * */

export const updateRegisteredAccountInfo = async (infoBody, accountId) => {
    const response = await fetch(`http://localhost:9090/api/registeredAccount/v1/update/${accountId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'put',
        body: JSON.stringify(infoBody)
    });
    return response.json();
};

/**
 * API for Parcels Information
 * */

export const refreshParcelsStatusForCourier = async (parcelTrackingCode, statusInfo) => {
    const response = await fetch(`http://localhost:9090/api/parcelHistoryStatus/v1/refresh-status/${parcelTrackingCode}/${statusInfo}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'put'
    });
    return response.json();
};

export const refreshParcelsStatusInBatchForCourier = async (parcelTrackingCodes, statusInfo) => {
    const response = await fetch(`http://localhost:9090/api/parcelHistoryStatus/v1/refresh-status-in-batch/${statusInfo}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({parcelTrackingCodes: parcelTrackingCodes})
    });
    return response.json();
};

/**
 * API for Station Parcels to Place
 * */

export const addPlaceParcelsRecordsDataOfStation = async (parcelIds, stationManagerId, stationId) => {
    const response = await fetch(`http://localhost:9090/api/stationParcelsToPlace/v1/place-parcels-records/${stationManagerId}/${stationId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({parcelIds: parcelIds})
    });
    return response.json();
};

export const getPlaceParcelsRecordsDataOfStation = async (stationManagerId, stationId) => {
    const response = await fetch(`http://localhost:9090/api/stationParcelsToPlace/v1/search/place-parcels-records/${stationManagerId}/${stationId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'get',
    });
    return response.json();
};

export const deletePlaceParcelsRecordsDataOfStation = async (stationManagerId, stationId) => {
    const response = await fetch(`http://localhost:9090/api/stationParcelsToPlace/v1/remove/place-parcels-records/${stationManagerId}/${stationId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'delete',
    });
    return response.json();
};

/**
 * API for Parcel Station Shelf
 * */

export const getShelvesStorageDataOfParcelStation = async (stationId) => {
    const response = await fetch(`http://localhost:9090/api/parcelStationShelf/v1/shelves-storage-data/${stationId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'get',
    });
    return response.json();
}

export const placeOneParcelToParcelStationShelf = async (parcelId, values,stationId) => {
    const response = await fetch(`http://localhost:9090/api/parcelStationShelf/v1/place-parcel/${parcelId}/${stationId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({
            mainShelfSerialNumber: values.mainShelfSerialNumber,
            floorSerialNumber: values.floorSerialNumber,
            maxStorageParcelNumber: values.maxParcelsNumToStore,
        })
    });
    return response.json();
}

export const resetOneParcelStationAllShelvesData = async (stationId) => {
    const response = await fetch(`http://localhost:9090/api/parcelStationShelf/v1/reset-shelves-storage-data/${stationId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'put',
    });
    return response.json();
}

/**
 * API for Information Notification
 * */

export const sendInformationNotificationData = async (sendInfo, sendWay) => {
    const response = await fetch(`http://localhost:9090/api/infoNotification/send-notification/${sendWay}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({
            targetPhone: sendInfo.targetPhone,
            phoneMessage: sendInfo.phoneMessage,
            toAddress: sendInfo.toAddress,
            customerName: sendInfo.customerName,
            stationAddress: sendInfo.stationAddress,
            pickupCode: sendInfo.pickupCode,
        })
    });
    return response.json();
}

/**
 * API for Parcel Pickup Code
 * */

export const getParcelPickupCodesByCustomerId = async (customerId) => {
    const response = await fetch(`http://localhost:9090/api/parcelPickupCode/v1/search/customer/${customerId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'get',
    });
    return response.json();
}

/**
 * API for Ecommerce Website
 * */

export const getEcommerceWebsiteInfoStatisticsByCustomerId = async (customerId) => {
    const response = await fetch(`http://localhost:9090/api/ecommerceWebsite/v1/info-statistics/customer/${customerId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
        },
        method: 'get',
    });
    return response.json();
}
