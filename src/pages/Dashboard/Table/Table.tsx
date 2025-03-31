import SideNav from "../../../components/Layout/SideNav";
import { Box } from "@mui/material";
import NavBar from "../../../components/Layout/NavBar";
import DataBaseTable from "../../../components/DataTable/DatabaseTable";
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