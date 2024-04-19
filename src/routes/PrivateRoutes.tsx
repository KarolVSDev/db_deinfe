import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom';



const PrivateRoutes = ({ children }: { children: any }) => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate()
    console.log(isLoggedIn)
    
    return isLoggedIn ? children :
        
    <Navigate to='/signin' />
}

export default PrivateRoutes