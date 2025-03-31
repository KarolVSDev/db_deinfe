import { GridColDef } from "@mui/x-data-grid";
import * as  XLSX from 'xlsx';



interface GridState {
    columns: GridColDef[];
    rows: any[];
}

const useExportToExcel = () => {

    const exportToExcel = (gridState: GridState, fileName: 'data.xlsx') => {
        const { rows } = gridState;
        const exportRows = rows.map((row) => {
            const { id, ...exportRow } = row;
            return exportRow;
        })

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exportRows);
        XLSX.utils.book_append_sheet(wb, ws, 'Data');
        XLSX.writeFile(wb, fileName)
    }

   

    return {
        exportToExcel,
    }
}

export default useExportToExcel;