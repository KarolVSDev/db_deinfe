import { GridColDef } from "@mui/x-data-grid";
import { useCallback } from "react";
import * as  XLSX from 'xlsx';
import { formateDateToPtBr } from "./DateFormate";



interface GridState {
    columns: GridColDef[];
    rows: any[];
}

const useExportToExcel = () => {

    const exportToExcel = (gridState: GridState, fileName: 'data.xlsx') => {
        const { columns, rows } = gridState;
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