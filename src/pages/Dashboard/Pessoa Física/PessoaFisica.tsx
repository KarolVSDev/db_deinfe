import SideNav from "../../../components/Layout/DashboardLayout"
import { Box, Button } from "@mui/material"
import { useAuth } from "../../../context/AuthContext"
import NavBar from "../../../components/Layout/NavBar"
import DataBaseTable from "../../../components/Tables/TablePessoaFisica/DatabaseTable"

const PessoaFisica = () => {
  return (
    <>  
       <>
       <NavBar/>
       <Box height={60}/>
        <Box sx={{ display: 'flex' }}>
          <SideNav/>
          <Box component="main" sx={{flexGrow:1, p:3}}>
            <DataBaseTable/>
          </Box>
        </Box>
        </>
    </>
  )
}

export default PessoaFisica