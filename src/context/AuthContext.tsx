import { createContext, useContext, useState } from "react";
import { AuthData, UserLogin } from "../types/types";
import Cookies from "universal-cookie";
import { api } from "../service/api";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    isLoggedIn:boolean;
    login:(data:UserLogin) => void;
    logout:() => void;
}

interface Props {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC <Props>= ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const setCookies = (authData:AuthData) => {
        const cookies = new Cookies()
        cookies.set('focusToken', authData.token, {path:'/'})

        localStorage.setItem('email', authData.email)
    }

    const login = async (data:UserLogin) => {
       await  api.post('/login', data).then((response:any) => {
            setCookies(response.data)
            setIsLoggedIn(true)
        })
    };

    const logout = () => {

        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('useAuth deve ser usado dentro de um AuthProvider')
    }
    return context
};

