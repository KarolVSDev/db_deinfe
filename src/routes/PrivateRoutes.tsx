import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';



const PrivateRoutes = ({ children }: { children: any }) => {
    const {auth} = useAuth()
    
    useEffect(() => {
        auth
    }, [])
    
    return auth ? children :
        
    <Navigate to='/signin' />
}

export default PrivateRoutes