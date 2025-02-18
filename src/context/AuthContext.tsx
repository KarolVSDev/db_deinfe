import { createContext, useContext, useEffect, useState } from "react";
import { AuthData, User, UserLogin } from "../types/types";
import Cookies from "universal-cookie";
import { api } from "../service/api";
import { useNavigate } from "react-router-dom";
import { TypeAlert } from "../hooks/TypeAlert";
import { authBase } from "../service/firebase.config";
import {  onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";


interface AuthContextType {
    isLoggedIn:boolean;
    login:(data:UserLogin, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => void;
    logout:() => void;
    auth:any
    user:User | undefined;
    setUser:(user:User) => void;
   
}

interface Props {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC <Props>= ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate()
    const cookies = new Cookies()
    const auth = cookies.get('focusToken');
    const [user, setUser] = useState<User>()


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authBase, (user) => {
            if (user) {
                user.getIdToken().then((token) => {
                    if(user.email !== null){
                        setCookies({ token, email: user.email });
                        setIsLoggedIn(true);
                    }
                });
            } else {
                setIsLoggedIn(false);
            }
        });
        return () => unsubscribe();
    }, []);



    const setCookies = (authData:AuthData) => {
        const cookies = new Cookies()
        cookies.set('focusToken', authData.token, {path:'/'})
        
        localStorage.setItem('email', authData.email)
    }

    const login = async (data:UserLogin, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
        setLoading(true)
        try {
            const userCredentials = await signInWithEmailAndPassword(authBase, data.email, data.password);
            const user = userCredentials.user;

            const token = await user.getIdToken();
            if(user.email !== null){
                setCookies({token, email: user.email})
            }
            setIsLoggedIn(true)
            navigate('/dashboard/table');
        } catch (error: any) {
            if(error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                TypeAlert('Email ou senha incorretos', 'error');
            } else {
                TypeAlert(error.message, 'error');
            }
        } finally{
            setLoading(false)
        }
    };

    const logout = async () => {
        const cookies = new Cookies();
        try {
            await signOut(authBase);
            cookies.remove('focusToken', {path:'/'})
            localStorage.removeItem('email')
            setIsLoggedIn(false)
            navigate('/signin')
        } catch (error: any) {
            TypeAlert(error.message, 'error')
        }
    }
  
    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, auth, user, setUser}}>
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

