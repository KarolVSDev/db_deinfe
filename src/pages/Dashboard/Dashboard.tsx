import { Box } from "@mui/material"
import SideNav from "../../components/Layout/DashboardLayout"
import { useAuth } from "../../context/AuthContext"
import NavBar from "../../components/Layout/NavBar"

const Dashboard = () => {
    const {isLoggedIn, logout} = useAuth()
    console.log(isLoggedIn)
    return (
        <>
        <NavBar/>      
        <Box sx={{ display: 'flex' }}>
          <SideNav/>
          <Box component="main" sx={{mt:'4em', ml:'2em'}}>
            <div>
                <p>Usuário Logado</p>
                <button onClick={logout}>Desconectar</button>
            </div>
          </Box>
        </Box>
        </>
    )
  }
export default Dashboard