import { createContext, useReducer } from "react";
import isLoggedReducer from "../../reducers/isLoggedReducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogged, dispatchIsLogged] = useReducer(isLoggedReducer, { logged: false, userId: null, token: null });

    return (
        <AuthContext.Provider value={{ isLogged, dispatchIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
};