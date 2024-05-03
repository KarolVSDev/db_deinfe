import { Box } from '@mui/material'
import SideNav from '../../../components/Layout/DashboardLayout'
import NavBar from '../../../components/Layout/NavBar'
import ListUsers from '../../../components/Users_admin/ListUsers'


const UsersAmin = () => {
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