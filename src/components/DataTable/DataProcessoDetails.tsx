import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridFooter, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { ColumnConfig, dataRelation, ProcessoDetails } from '../../types/types';
import { interessadoHeader, apensoHeader, processoHeader } from '../../service/columns';
import { useContextTable } from '../../context/TableContext';
import DeleteDataButton from '../Buttons/DeleteButton';
import { Button, Divider, Typography } from '@mui/material';
import useFetchListData from '../../hooks/useFetchListData';
import { formateDateToPtBr } from '../../hooks/DateFormate';


export interface DataProcessoDetailsProps {
    dataType: string;
    Details: ProcessoDetails | undefined;
    arrayRelation: dataRelation | undefined;
}
const DataProcessoDetails: React.FC<DataProcessoDetailsProps> = ({ dataType, Details, arrayRelation }) => {
    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [rows, setRows] = useState<any[]>([]);
    const { handleLocalization } = useContextTable()
    const { onDelete } = useFetchListData(Details?.id)


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
        }));
    };



    useEffect(() => {
        if (dataType === "apenso") {
            setColumns(createGridColumns(apensoHeader));
            if (Details) {
                setRows(createRows(Details.apensados.map(apenso => ({
                    id: apenso.id,
                    remover: <DeleteDataButton stateType={dataType} itemId={apenso.id} handleDelete={handleDelete} />,
                    numero: apenso.apensado.numero,
                    ano: apenso.apensado.ano,
                    natureza: apenso.apensado.natureza,
                    exercicio: apenso.apensado.exercicio,
                    objeto: apenso.apensado.objeto,
                    arquivamento: formateDateToPtBr(apenso.apensado.arquivamento)
                }))));
            }
        } else if (dataType === "interessado") {
            setColumns(createGridColumns(interessadoHeader));
            if (Details?.interessados) {
                setRows(Details.interessados.map(interessado => ({
                    id: interessado.id,
                    remover: <DeleteDataButton stateType={dataType} itemId={interessado.id} handleDelete={handleDelete} />,
                    interesse: interessado.interesse,
                    pessoa: interessado.pessoa.nome,
                })))
            }
        } else if (dataType === "processos") {
            setColumns(createGridColumns(apensoHeader));
            if (arrayRelation?.processos) {
                setRows(arrayRelation.processos.map(processo => ({
                    id: processo.id,
                    remover: <DeleteDataButton stateType={dataType} itemId={processo.id} handleDelete={handleDelete} />,
                    numero: processo.numero,
                    ano: processo.ano,
                    natureza: processo.natureza,
                    exercicio: processo.exercicio,
                    objeto: processo.objeto,
                    arquivamento: formateDateToPtBr(processo.arquivamento)
                })));
                
            }
        }
    })
   
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
                sx={{ bgcolor: 'white' }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick={true}
            />
        </Box>
    );
}

export default DataProcessoDetails