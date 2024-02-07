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
