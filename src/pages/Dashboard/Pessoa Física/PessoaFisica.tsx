import SideNav from "../../../components/Layout/DashboardLayout"
import { Box, Button } from "@mui/material"
import { useAuth } from "../../../context/AuthContext"
import NavBar from "../../../components/Layout/NavBar"

const PessoaFisica = () => {
  return (
    <>  
       <>
       <NavBar/>
        <Box sx={{ display: 'flex' }}>
          <SideNav/>
          <Box component="main" sx={{mt:'4em', ml:'2em'}}>
            <div>
                <p>Página de pessoa fisica</p>
                <Button>Add Pessoa</Button>
            </div>
          </Box>
        </Box>
        </>
    </>
  )
}

export default PessoaFisica