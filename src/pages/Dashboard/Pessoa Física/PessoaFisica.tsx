import SideNav from "../../../components/Layout/DashboardLayout"
import { Box, Button } from "@mui/material"
import { useAuth } from "../../../context/AuthContext"
import NavBar from "../../../components/Layout/NavBar"
import TablePessoaFisica from "../../../components/Tables/TablePessoaFisica/TablePessoaFisica"

const PessoaFisica = () => {
  return (
    <>  
       <>
       <NavBar/>
       <Box height={60}/>
        <Box sx={{ display: 'flex' }}>
          <SideNav/>
          <Box component="main" sx={{flexGrow:1, p:3}}>
            <TablePessoaFisica/>
          </Box>
        </Box>
        </>
    </>
  )
}

export default PessoaFisica