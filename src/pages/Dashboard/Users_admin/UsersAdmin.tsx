import { Box } from '@mui/material'
import SideNav from '../../../components/Layout/SideNav'
import NavBar from '../../../components/Layout/NavBar'
import ListUsers from '../../../components/Users_admin/ListUsers'


const UsersAmin = () => {
  return (
    <>
      <NavBar />
      <Box />
      <Box sx={{ display: 'flex' }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, height: '100vh' }}>
          <ListUsers />
        </Box>
      </Box>
    </>
  )
}

export default UsersAmin