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

export const uploadEcommerceSimulationPastTimeData = async (simulationData) => {
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
 * API for Courier
 * */

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
