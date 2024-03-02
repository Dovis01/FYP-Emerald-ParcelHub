/**
 * API for users authentication
 * */

export const loginByUsername = async (username, password, roleType) => {
    const response = await fetch(`http://localhost:9090/api/${roleType}/v1/login?authMethod=username`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const loginByEmail = async (email, password, roleType) => {
    const response = await fetch(`http://localhost:9090/api/${roleType}/v1/login?authMethod=email`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ email: email, password: password })
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

export const uploadEcommerceSimulationData = async (simulationData) => {
    const response = await fetch(`http://localhost:9090/api/ecommerceJsonData/v1/insert`, {
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': window.localStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({ jsonData: simulationData})
    });
    return response.json();
};

export const clearAllEcommerceSimulationData = async () => {
    const response = await fetch(`http://localhost:9090/api/ecommerceJsonData/v1/delete-all`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'delete'
    });
    return response.json();
};

export const clearSelectedEcommerceSimulationData = async (selectedIds) => {
    const response = await fetch(`http://localhost:9090/api/ecommerceJsonData/v1/delete-multiple`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'delete',
        body: JSON.stringify({ ecommerceJsonDataIdsToDelete: selectedIds})
    });
    return response.json();
};

export const getAllEcommerceSimulationData = async () => {
    const response = await fetch(`http://localhost:9090/api/ecommerceJsonData/v1/all-data`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    });
    return response.json();
};
