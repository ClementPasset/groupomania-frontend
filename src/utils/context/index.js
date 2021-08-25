import { createContext, useReducer } from "react";
import isLoggedReducer from "../../reducers/isLoggedReducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    let initValue = { logged: false, userId: null, isAdmin: false, token: null, tokenExpDate: null };
    let storageInfo = JSON.parse(localStorage.getItem('isLogged'));
    if (storageInfo) {
        let expDate = new Date(storageInfo.tokenExpDate)
        if (expDate - Date.now() > 0) {
            initValue = storageInfo;
        } else {
            localStorage.removeItem('isLogged');
        }
    }

    const [isLogged, dispatchIsLogged] = useReducer(isLoggedReducer, initValue);

    return (
        <AuthContext.Provider value={{ isLogged, dispatchIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
};