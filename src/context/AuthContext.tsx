import { createContext, useContext, useEffect, useState } from "react";
import { AuthData, UserLogin } from "../types/types";
import Cookies from "universal-cookie";
import { api } from "../service/api";
import { useNavigate } from "react-router-dom";
import { TypeAlert } from "../hooks/TypeAlert";

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
    const navigate = useNavigate()
    const cookies = new Cookies()
    const auth = cookies.get('focusToken')

    useEffect(()=>{
        if(auth){
            setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false)
        }
    },[isLoggedIn])

    const setCookies = (authData:AuthData) => {
        const cookies = new Cookies()
        cookies.set('focusToken', authData.token, {path:'/'})

        localStorage.setItem('email', authData.email)
    }

    const login = async (data:UserLogin) => {
       await api.post('/auth/login', data).then((response:any) => {
            setCookies(response.data.token)
            setIsLoggedIn(true)
            navigate('/dashboard')
        }).catch((error:any) => {
            if(error.response.status === 401){
                TypeAlert(error.response.data.message, 'error' )
            }
        })
    };

    const logout = () => {
        const cookies = new Cookies();
        cookies.remove('focusToken', {path:'/'})
        localStorage.removeItem('email')
        setIsLoggedIn(false)
        navigate('/signin')
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

