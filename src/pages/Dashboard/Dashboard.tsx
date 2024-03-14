import { useAuth } from "../../context/AuthContext"

const Dashboard = () => {
    const {isLoggedIn, logout} = useAuth()
    console.log(isLoggedIn)
    return (
      <>
      <div>{isLoggedIn ? (
        <div>
            <p>Usuário Logado</p>
            <button onClick={logout}>Desconectar</button>
        </div>
      ):(404)}</div>
      </>
      
    )
  }
export default Dashboard