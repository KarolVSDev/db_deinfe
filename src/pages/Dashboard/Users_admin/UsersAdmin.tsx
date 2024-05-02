import { Box } from '@mui/material'
import SideNav from '../../../components/Layout/DashboardLayout'
import NavBar from '../../../components/Layout/NavBar'
import ListUsers from '../../../components/Users_admin/ListUsers'
import { useAuth } from '../../../context/AuthContext'

const UsersAmin = () => {
  const {user} = useAuth()
    return (
        <>  
           <NavBar/>
           <Box height={60}/>
            <Box sx={{ display: 'flex' }}>
              <SideNav/>
              <Box component="main" sx={{flexGrow:1, p:3}}>
                  <ListUsers/>
              </Box>
            </Box>
            </>
      )
}

export default UsersAmin