import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import { ColumnConfig, } from '../../types/types';
import { useContextTable } from '../../context/TableContext';
import useFetchListData from '../../hooks/useFetchListData';



export interface DataProcessoDetailsProps {
    dataType: string;

}
const DataProcessoDetails: React.FC<DataProcessoDetailsProps> = ({ 
    dataType,
     }) => {
    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [rows, setRows] = useState<any[]>([]);
    const { handleLocalization } = useContextTable()
    const { onDelete } = useFetchListData()



    const createGridColumns = (headers: ColumnConfig[]): GridColDef[] => {

        return headers.map(header => ({
            field: header.id,
            headerName: header.label,
            width: header.minWidth,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                return params.value;
            },
        }));
    };


    const createRows = (data: any[]): any[] => {
        return data.map((item, index) => ({
            id: item.id,
            ...item,
        }));
    };

    const handleDelete = useCallback((id: string, type: string) => {
        if (id) {
            onDelete(id, type); 
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        }
    }, [onDelete]);

    // useEffect(() => {
    //     if (dataType === 'nat-achado') {
    //         setColumns(createGridColumns(natAchadoRelationHeader));
    //         if (natAchadoRelations) {
    //             const transformedRows = transformNat(natAchadoRelations, true);
    //             setRows(transformedRows);
    //         }
    //     } else if (dataType === 'area-achado') {
    //         setColumns(createGridColumns(natAchadoRelationHeader));
    //         if (areaAchadoRelations) {
    //             const transformedRows = transformAreaAchado(areaAchadoRelations, true)
    //             setRows(transformedRows)
    //         }
    //     } else if (dataType === 'div-achado') {
    //         setColumns(createGridColumns(natAchadoRelationHeader));
    //         if (divAchadoRelation) {
    //             const transformedRows = transformDivAchado(divAchadoRelation, true)
    //             setRows(transformedRows)
    //         }
    //     }else if(dataType === 'achado') {
    //         setColumns(createGridColumns(natAchadoRelationHeader));
    //         const transformedRows = transformAchado(achadoRelation, true)
    //         setRows(transformedRows)
    //     }
    // },[])

    


    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                localeText={handleLocalization}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                sx={{ bgcolor: 'white', mb: 2 }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick={true}
            />
        </Box>
    );
}

export default DataProcessoDetails