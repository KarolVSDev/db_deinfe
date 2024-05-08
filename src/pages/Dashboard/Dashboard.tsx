import { Box } from "@mui/material"
import SideNav from "../../components/Layout/SideNav"
import { useAuth } from "../../context/AuthContext"
import NavBar from "../../components/Layout/NavBar"

const Dashboard = () => {
  const { isLoggedIn, logout } = useAuth()
  console.log(isLoggedIn)
  return (
    <>
      <NavBar />
      <Box sx={{ display: 'flex' }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, height: '100vh' }}>
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