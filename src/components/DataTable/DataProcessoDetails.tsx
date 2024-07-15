import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridFooter, GridRenderCellParams, GridRowId } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { ColumnConfig, ProcessoDetails } from '../../types/types';
import { processoHeader, interessadoHeader, apensoHeader } from '../../service/columns';
import { useContextTable } from '../../context/TableContext';
import DeleteDataButton from '../Buttons/DeleteButton';
import { Button, Divider } from '@mui/material';
import useFetchListData from '../../hooks/useFetchListData';

export interface DataProcessoDetailsProps {
    dataType: string;
    processoDetails: ProcessoDetails | undefined;
}
const DataProcessoDetails: React.FC<DataProcessoDetailsProps> = ({ dataType, processoDetails }) => {
    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [rows, setRows] = useState<any[]>([]);
    const {handleLocalization} = useContextTable()
    const {onDelete} = useFetchListData(processoDetails?.id)


    const handleDelete = (id: string, type: string) => {
        onDelete(id, type)
      }

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
            remover: 
        }));
    };



    useEffect(() => {
        if (dataType === "apenso") {
            setColumns(createGridColumns(apensoHeader));
            if(processoDetails){
                setRows(createRows(processoDetails.apensados.map(apenso => apenso.apensado)));
            }
        } else if (dataType === "interesse") {
            setColumns(createGridColumns(interessadoHeader));
            if(processoDetails?.interessados){
               setRows(processoDetails.interessados.map(interessado => ({
                id: interessado.id,
                interesse: interessado.interesse,
                pessoa: interessado.pessoa.nome,
            })))
        }
    }})


    return (
        <Box sx={{ height: 400, width: '100%'}}>
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
                sx={{bgcolor:'white'}}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick = {true}
            />
        </Box>
    );
}

export default DataProcessoDetails