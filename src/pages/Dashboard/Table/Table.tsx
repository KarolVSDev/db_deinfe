import SideNav from "../../../components/Layout/SideNav";
import { Box, Button } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import NavBar from "../../../components/Layout/NavBar";
import DataBaseTable from "../../../components/Tables/TablePessoaFisica/DatabaseTable";
import { TableProvider } from "../../../context/TableContext";

const Table = () => {
  return (
    <>
      <NavBar />
      <Box />
      <Box sx={{ display: 'flex' }}>
        <SideNav />
        <Box component='main' sx={{ flexGrow: 1, height: '100vh' }}>
          <TableProvider>
            <DataBaseTable />
          </TableProvider>
        </Box>
      </Box>
    </>
  )
}

export default Table