import {createContext, useContext, useEffect, useReducer, useState} from 'react';
import PropTypes from 'prop-types';
import {useRouter} from 'next/router';
import {loginByEmail, loginByUsername, register, resetPassword} from "@/api/springboot-api";

const HANDLERS = {
    INITIALIZE: 'INITIALIZE',
    SIGN_IN: 'SIGN_IN',
    SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null
};

const handlers = {
    [HANDLERS.INITIALIZE]: (state, action) => {
        const user = action.payload;

        return {
            ...state,
            ...(
                // if payload (user) is provided, then is authenticated
                user
                    ? ({
                        isAuthenticated: true,
                        isLoading: false,
                        user
                    })
                    : ({
                        isLoading: false
                    })
            )
        };
    },
    [HANDLERS.SIGN_IN]: (state, action) => {
        const user = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user
        };
    },
    [HANDLERS.SIGN_OUT]: (state) => {
        return {
            ...state,
            isAuthenticated: false,
            user: null
        };
    }
};

const reducer = (state, action) => (
    handlers[action.type] ? handlers[action.type](state, action) : state
);

export const AuthContext = createContext({undefined});

export const AuthContextProvider = (props) => {
    const {children} = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const [authToken, setAuthToken] = useState(null);
    const currentUsername = state.user?.roleType === 'Admin' ? state.user.adminName : state.user?.username
    const router = useRouter();
    const roleMappings = {
        'Customer': 'customer',
        'Courier': 'courier',
        'Station-Manager': 'stationManager',
        'Admin': 'admin'
    };

    useEffect(() => {
        const sessionUser = sessionStorage.getItem('userInfo');
        if (sessionUser) {
            const user = JSON.parse(sessionUser);
            dispatch({
                type: HANDLERS.INITIALIZE,
                payload: user
            });
        }
    }, []);

    const skip = () => {
        try {
            window.sessionStorage.setItem('authenticated', 'true');
        } catch (err) {
            console.error(err);
        }

        const user = {
            customerId: 1207,
            stationId:2001,
            //courierId: 1020,
            //workType: 'Collect Parcels',
            //courierId: 1019,
            //workType: 'Deliver Parcels',
            stationManagerId: 105,
            startDate: "2024-02-14",
            endDate: "2024-02-22",
            registerTime: "2024-02-14 01:27:10",
            dailyMaxDistributionParcelsNum: 7,
            remainingParcelsNumToDistribute: 5,
            truckType: 'Small',
            maxWeight: 100,
            country: 'Ireland',
            city: 'Waterford',
            avatar: '/assets/avatars/avatar-anika-visser.png',
            accountId: 2051,
            //roleType: 'Admin',
            //roleType: 'Station-Manager',
            //roleType: 'Courier',
            roleType: 'Customer',
            adminName: 'AdminRoot',
            username: 'Anika Visser',
            fullName: 'Anika Visser',
            email: 'anika.visser@devias.io',
            status:true
        };

        window.sessionStorage.setItem('authenticated', 'true');
        window.sessionStorage.setItem('userInfo', JSON.stringify(user));

        dispatch({
            type: HANDLERS.SIGN_IN,
            payload: user
        });
    };

    const setToken = (data) => {
        window.sessionStorage.setItem("token", data);
        setAuthToken(data);
    }

    const signInByEmail = async (email, password, roleType) => {
        const result = await loginByEmail(email, password, roleMappings[roleType]);

        if (result.data?.token) {
            setToken(result.data.token);
        } else {
            throw new Error(result.msg);
        }

        window.sessionStorage.setItem('authenticated', 'true');
        window.sessionStorage.setItem('userInfo', JSON.stringify({
            adminName: result.data?.adminName,
            fullName: result.data?.fullName,
            username: result.data?.username,
            roleType: result.data?.roleType
        }));

        const user = {
            ...result.data
        };

        dispatch({
            type: HANDLERS.SIGN_IN,
            payload: user
        });
    };

    const signInByUsername = async (username, password, roleType) => {
        const result = await loginByUsername(username, password, roleMappings[roleType]);

        if (result.data?.token) {
            setToken(result.data.token);
        } else {
            throw new Error(result.msg);
        }

        window.sessionStorage.setItem('authenticated', 'true');
        window.sessionStorage.setItem('userInfo', JSON.stringify({
            adminName: result.data?.adminName,
            fullName: result.data?.fullName,
            username: result.data?.username,
            roleType: result.data?.roleType
        }));

        const user = {
            ...result.data,
        };

        dispatch({
            type: HANDLERS.SIGN_IN,
            payload: user
        });
    };

    const signUp = async (registrationData) => {
        const result = await register(registrationData, roleMappings[registrationData.roleType]);
        if (!result.success) {
            throw new Error(result.msg);
        }
    };

    const resetPass = async (requestBody) => {
        const result = await resetPassword(requestBody);
        if (!result.success) {
            throw new Error(result.msg);
        }
    }

    const signOut = () => {
        router.replace('/auth/signIn').then(() => {
            window.sessionStorage.removeItem('authenticated');
            window.sessionStorage.removeItem('userInfo');
            dispatch({
                type: HANDLERS.SIGN_OUT
            });
        });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                authToken,
                currentUsername,
                skip,
                signInByEmail,
                signInByUsername,
                signUp,
                resetPass,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node
};

export const useAuthContext = () => useContext(AuthContext);
