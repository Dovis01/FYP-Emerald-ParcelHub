import React, {useState} from "react";

export const UsersContext = React.createContext(null);

const UsersContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(null);

    /**
     * Authentication part
     * */
    const setToken = (data) => {
        localStorage.setItem("token", data);
        setAuthToken(data);
    }
    const addUser = (user) => {
        setUser(user);
    };

    const removeUser = () => {
        setUser(null);
    };

    const signout = () => {
        setIsAuthenticated(false);
        setTimeout(() => {
            setUser(null);
        }, 100);
        localStorage.removeItem('token');
    }

    return (
        <UsersContext.Provider
            value={{
                authToken,
                user,
                isAuthenticated,
                setIsAuthenticated,
                addUser,
                removeUser,
                signout,
            }}
        >
            {props.children}
        </UsersContext.Provider>
    );
};

export default UsersContextProvider;