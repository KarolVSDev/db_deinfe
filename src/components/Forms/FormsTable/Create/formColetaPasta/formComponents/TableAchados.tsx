import { Box, Divider, Grid, IconButton, InputAdornment, Paper, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react'
import DataTableSkeleton from '../../../../../DataTable/DataTableSkeleton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useContextTable } from '../../../../../../context/TableContext';
import { Achado, ColumnConfig } from '../../../../../../types/types';
import CloseIcon from '@mui/icons-material/Close';
import useFetchAchado from '../../FormAchadoPasta/useFetchAchado';
import { achadoPesquisaHeader } from '../../../../../../service/columns';
import { formateDateToPtBr } from '../../../../../../hooks/DateFormate';
import SearchIcon from '@mui/icons-material/Search';

export interface ITableAchados {
    dataType: string;
    closeFunction: () => void;
    onAchadoSelected?: (achado: Achado) => void;
}


const TableAchados: React.FC<ITableAchados> = ({ dataType, closeFunction, onAchadoSelected }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { handleLocalization, arrayAchado, setArrayAchado } = useContextTable();
    const { escutarAchados } = useFetchAchado();
    const [rows, setRows] = useState<any[]>([]);
    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const achadosFiltrados = useMemo(() => {
        if (!searchTerm.trim()) return arrayAchado;

        const termo = searchTerm.toLowerCase().trim();

        return arrayAchado.filter(achado => {
            // Busca no campo 'achado' (texto)
            const textoAchado = achado.achado.toLowerCase().includes(termo);

            // Busca no campo 'tema' (se existir)
            const textoTema = achado.tema_id?.toLowerCase().includes(termo) || false;

            //Busca na data (formata como dd/MM/yyyy e compara)
            const dataFormatada = formateDateToPtBr(achado.data.toString());
            const textoData = dataFormatada.toLowerCase().includes(termo);

            // Busca na situação (verifica se o texto é "aprovado" ou "pendente")
            const termoBool =
                termo === "aprovado" ? true :
                    termo === "pendente" ? false :
                        null;

            const textoSituacao =
                termoBool !== null ? achado.situacaoAchado === termoBool : // Compara boolean
                    ["aprovado", "pendente"].includes(termo) ? false : // Evita falsos positivos
                        false;

            // Retorna true se qualquer um dos campos corresponder
            return textoAchado || textoTema || textoSituacao || textoData;
        });
    }, [arrayAchado, searchTerm]);

    handleLocalization;

    const createGridColumns = (headers: ColumnConfig[]): GridColDef[] => {
        return headers.map(header => ({
            key: header.id,
            field: header.id,
            headerName: header.label,
            width: header.minWidth,
            editable: false,
            renderCell: (params) => {

                if (header.id === 'data') {
                    return formateDateToPtBr(params.value)
                }

                if (['situacaoAchado', 'situacao'].includes(header.id) && typeof params.value === 'boolean') {
                    return (
                        <span style={{
                            background: params.value ? '#86efac' : '#fcd34d',
                            fontWeight: 'bold',
                            padding: '5px 5px',
                            borderRadius: '5px'
                        }}>
                            {params.value ? "Aprovado" : "Pendente"}
                        </span>
                    );
                }
                return (
                    <Tooltip
                        title={params.value || ''}
                        arrow
                        enterDelay={500}
                        placement="top-start"
                        slotProps={{
                            tooltip: {
                                sx: {
                                    fontSize: '14px',

                                },
                            },
                        }}
                    >
                        <div style={{
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
                            {params.value}
                        </div>
                    </Tooltip>
                );
            },
            filterable: true,
        }));
    };

    const createRows = (data: any[]): any[] => {
        return data.map((item) => ({
            id: item.id,
            ...item,
        }));
    };


    useEffect(() => {
        const fecthData = async () => {
            setIsLoading(true);
            try {
                setColumns(createGridColumns(achadoPesquisaHeader));
                setRows(createRows(arrayAchado));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        escutarAchados((achados) => {
            setArrayAchado(achados);
            setRows(createRows(achados));
        });
        fecthData();
    }, [])

    useEffect(() => {
        setRows(createRows(achadosFiltrados));
    }, [achadosFiltrados]);


    return (
        <Grid >
            <Paper >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1 }}>
                    <Typography
                        gutterBottom
                        variant='h5'
                        component='div'
                    >
                        Lista de Achados
                    </Typography>
                    <IconButton onClick={closeFunction} sx={{
                        '&:hover': {
                            bgcolor: '#1e293b', color: '#ffffff',
                        }
                    }}>
                        <CloseIcon />
                    </IconButton>

                </Box>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Buscar achado..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 2, p: 1, borderRadius: '5px' }}
                />

                <Divider />
                <Box sx={{ height: '70vh', width: '100%', overflow: 'auto', position: 'relative' }}>
                    {isLoading && (
                        <DataTableSkeleton
                            dataType={dataType}
                            isLoading={isLoading}
                            visibleRows={rows.length || 10}
                        />
                    )}
                    <Box sx={{ visibility: isLoading ? 'hidden' : 'visible', height: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            showCellVerticalBorder
                            localeText={handleLocalization}
                            onRowDoubleClick={(params) => { 
                                if (onAchadoSelected) {
                                    onAchadoSelected(params.row as Achado); 
                                    closeFunction(); 
                                }
                            }}
                            slotProps={{
                                panel: {
                                    sx: {
                                        '& .MuiDataGrid-filterForm': {
                                            width: 700,
                                            gap: 2,
                                        },
                                        '.MuiDataGrid-filterFormValueInput': {
                                            width: 400,
                                        },
                                    },
                                },
                            }}
                            filterMode="client"
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            pageSizeOptions={[5, 10, 20]}
                            checkboxSelection={false}
                            disableRowSelectionOnClick
                            sx={{
                                '& .MuiDataGrid-columnHeaders': {
                                    position: 'relative',
                                    zIndex: 1,
                                    backgroundColor: '#fff',
                                },
                                '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
                                    outline: 'none',
                                },
                                '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within': {
                                    outline: 'none',
                                },
                                '& .MuiDataGrid-row:hover': {
                                    backgroundColor: '#e2e8f0', color: '#000',
                                },
                                cursor: 'pointer'
                            }}
                        />
                    </Box>
                </Box>
            </Paper>
        </Grid>
    )
}

export default TableAchados