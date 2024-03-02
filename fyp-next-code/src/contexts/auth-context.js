import {createContext, useContext, useEffect, useReducer, useState} from 'react';
import PropTypes from 'prop-types';
import {useRouter} from 'next/router';
import {loginByEmail, loginByUsername, register} from "@/api/springboot-api";

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
        'ParcelStationManager': 'stationManager',
        'Admin': 'admin'
    };

    useEffect(() => {
        // 尝试从sessionStorage获取用户信息
        const sessionUser = sessionStorage.getItem('userInfo');
        if (sessionUser) {
            const user = JSON.parse(sessionUser);
            // 如果有用户信息，则使用INITIALIZE动作初始化状态
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
            id: '5e86809283e28b96d2d38537',
            avatar: '/assets/avatars/avatar-anika-visser.png',
            roleType: 'Customer',
            username: 'Anika Visser',
            fullName: 'Anika Visser',
            email: 'anika.visser@devias.io'
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

    const signOut = () => {
        window.sessionStorage.removeItem('authenticated');
        window.sessionStorage.removeItem('userInfo');
        router.reload();
        dispatch({
            type: HANDLERS.SIGN_OUT
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
