
import MiniDrawer from "../../components/Layout/DashboardLayout"
import { useAuth } from "../../context/AuthContext"

const Dashboard = () => {
    const {isLoggedIn, logout} = useAuth()
    console.log(isLoggedIn)
    return (
      <MiniDrawer>
        <div>{isLoggedIn ? (
          <div>
              <p>Usuário Logado</p>
              <button onClick={logout}>Desconectar</button>
          </div>
        ):(404)}</div>
      </MiniDrawer>
    )
  }
export default Dashboard