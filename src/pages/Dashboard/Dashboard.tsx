import { useAuth } from "../../context/AuthContext"

const Dashboard = () => {
    const {isLoggedIn} = useAuth()
    return (
      <div>{isLoggedIn && (
        <div>
            <p>Usuário Logado</p>
        </div>
      )}</div>
    )
  }
export default Dashboard