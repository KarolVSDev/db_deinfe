import Paper from '@mui/material/Paper';
import { Box, Button, Divider, Grid, IconButton, MenuItem, Select, Tooltip, Typography, useTheme } from '@mui/material';
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridRowId, GridRowParams } from '@mui/x-data-grid';
import { ColumnConfig } from '../../types/types';
import { useEffect, useRef, useState } from 'react';
import { topicoAchadoHeader, achadoHeader, processoHeader, coletaHeader } from '../../service/columns';
import { useContextTable } from '../../context/TableContext';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import ModalUpdatePF from '../Modals/DataTableModals/ModalUpdateForms';
import ModalAddData from '../Modals/DataTableModals/ModalAddDataTable';
import useExportToExcel from '../../hooks/useExportToExcel';
import useFetchProcesso from '../Forms/FormsTable/Create/FormProcessoPasta/useFetchProcesso';
import { useAuth } from '../../context/AuthContext';
import useFetchUsers from '../Forms/SignForms/useFetchUsers';
import ModalAnalises from '../Modals/DataTableModals/ModalAnalise';
import DeleteVerification from '../Dialog/VerificationStep';
import DeleteIcon from '@mui/icons-material/Delete';
import { formateDateToPtBr, formatCurrency } from '../../hooks/DateFormate';
import useFetchAchado from '../Forms/FormsTable/Create/FormAchadoPasta/useFetchAchado';
import useFetchTema from '../Forms/FormsTable/Create/FormTemaPasta/useFetchTema';
import useFetchColeta from '../Forms/FormsTable/Create/formColetaPasta/useFetchColeta';
import DataTableSkeleton from './DataTableSkeleton';
import Helper from '../Dialog/Helper';
import HighlightedText from './HighLightMidleware';
import ModalColor from '../Forms/FormsColors/ModalColor';
import useFetchKeyWord from '../Forms/FormsColors/useFetchKeyWord';




export default function DatabaseTable() {

  const [dataType, setDataType] = useState('pesquisa');
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const { handleLocalization, arrayTopicoAchado, setArrayTopicoAchado, setArrayColeta,
    setArrayAchado, setArrayProcesso, setArrayKeyWord } = useContextTable();
  const [selectedRow, setSelectedRow] = useState<GridRowId>(0)
  const [openModal, setOpenModal] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const { exportToExcel } = useExportToExcel()
  const { user } = useAuth()
  const { getUser } = useFetchUsers()
  const { escutarTemas } = useFetchTema();
  const { escutarAchados } = useFetchAchado();
  const { escutarProcessos } = useFetchProcesso();
  const { escutarColeta } = useFetchColeta();
  const [isLoading, setIsLoading] = useState(true);
  const [textButton, setTextButton] = useState('')
  const { escutarKeyWords } = useFetchKeyWord();
  const theme = useTheme();




  //Esse bloco controla a renderizaçao dos dados
  const handleDataTypeChange = (event: { target: { value: string; }; }) => {
    const value = event.target.value as string;
    setDataType(value)
    setIsLoading(true);
    let keywordUnsubscribe: (() => void) | undefined;

    // Sempre escuta keywords
    keywordUnsubscribe = escutarKeyWords((keywords) => {
      setArrayKeyWord(keywords);
    });
    switch (value) {
      case 'tema':
        setTextButton('Tema')
        setColumns(createGridColumns(topicoAchadoHeader));
        const temaListener = escutarTemas((temas) => {
          setArrayTopicoAchado(temas)
          setRows(createRows(temas))
          setIsLoading(false);
        })
        return () => temaListener;
      case 'achado':
        setTextButton('Banco de Achado')
        setColumns(createGridColumns(achadoHeader));
        const achadoListener = escutarAchados((achados) => {
          const keywordListener = escutarKeyWords((keyword) => {
            return keyword;
          })
          keywordListener();
          setArrayAchado(achados)
          setRows(createRows(achados))
          setIsLoading(false);
        })
        return () => achadoListener;
      case 'processo':
        setTextButton('Processo')
        setColumns(createGridColumns(processoHeader));
        const processoListener = escutarProcessos((processos) => {
          setArrayProcesso(processos)
          setRows(createRows(processos))
          setIsLoading(false);
        })
        return () => processoListener;
      case 'relacionamentos':
        setTextButton('Coleta')
        setColumns(createGridColumns(coletaHeader));
        const coletaListener = escutarColeta((coleta) => {
          setArrayColeta(coleta)
          setRows(createRows(coleta))
          setIsLoading(false);
        })
        return () => coletaListener;
      default:
        setColumns([]);
        setRows([])
        keywordUnsubscribe
    }
  };

  const createGridColumns = (headers: ColumnConfig[]): GridColDef[] => {
    return headers.map(header => ({
      key: header.id,
      field: header.id,
      headerName: header.label,
      width: header.minWidth,
      editable: false,
      renderCell: (params) => {
        if (header.id === "acoes") {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
              <Helper title="Clique aqui para editar o registro">
                <IconButton color="primary" onClick={() => handleUpdate(selectedRow)}>
                  <EditIcon sx={{ fontSize: '30px', mb: 1, animation: 'flipInX 0.5s ease-in-out' }} />
                </IconButton>
              </Helper>
              <Helper title="Clique aqui para deletar o registro">
                <IconButton color="error" onClick={() => handleDelete(selectedRow)}>
                  <DeleteIcon sx={{ fontSize: '30px', mb: 1, animation: 'flipInX 0.5s ease-in-out' }} />
                </IconButton>
              </Helper>
            </Box>
          );
        }

        if (header.id === 'data') {
          return formateDateToPtBr(params.value)
        }
        if (header.id === 'valorFinanceiro') {
          return formatCurrency(params.value)
        }
        if (header.id === 'analise') {
          return <ModalAnalises key={params.row.id} analise={params.row.analise} />
        }
        if (['situacaoAchado', 'situacao'].includes(header.id) && typeof params.value === 'boolean') {
          const aprovadoColor = theme.palette.mode === 'dark' ? '#22c55e' : '#86efac';   // verde escuro ou claro
          const pendenteColor = theme.palette.mode === 'dark' ? '#facc15' : '#fcd34d';   // amarelo escuro ou claro
          return (
            <span style={{
              background: params.value ? aprovadoColor : pendenteColor,
              fontWeight: 'bold',
              padding: '5px 5px',
              borderRadius: '5px'
            }}>
              {params.value ? "Aprovado" : "Pendente"}
            </span>
          );
        }

        if (header.id === 'achado' || header.id === 'achadoId') {
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
              {/* Adicionamos uma div wrapper para o Tooltip */}
              <div style={{
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'inline-block', // Importante para o Tooltip
              }}>
                <HighlightedText text={params.value || ''} />
              </div>
            </Tooltip>
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
              whiteSpace: 'nowrap',
            }}>
              {params.value}
            </div>
          </Tooltip>
        );
      },
      filterable: true,
    }));
  };


  //cria table pra dados sem relação
  const createRows = (data: any[]): any[] => {
    return data.map((item) => ({
      id: item.id,
      ...item,
    }));
  };

  //pegando usuário
  useEffect(() => {
    getUser()
  }, [])

  //traduz o dataGrid
  handleLocalization

  //captura o estado atual do dataGrid
  const getVisibleColumnsFromModel = (columns: GridColDef[], model: GridColumnVisibilityModel) => {
    return console.log(columns, model)
  };

  const optionsSelect = [
    { value: 'pesquisa', string: 'Pesquisa' },
    { value: 'tema', string: 'Temas' },
    { value: 'achado', string: 'Banco de Achados' },
    { value: 'processo', string: 'Processos' },
    { value: 'relacionamentos', string: 'Coleta' },
  ]


  function handleUpdate(selectedRow: GridRowId) {
    setSelectedRow(selectedRow);
    setOpenModal(true)
  }


  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const dataTypeRef = useRef(dataType);

  useEffect(() => {
    dataTypeRef.current = dataType;
  }, [dataType, arrayTopicoAchado, selectedRow]);



  //função de delete
  const handleDelete = async (selectedRow: GridRowId) => {
    setSelectedRow(selectedRow)
    setOpenModalDelete(true)
  }

  return (
    <Grid sx={{ overflowY: 'auto', height: '95vh', scrollbarWidth: 'thin', pt: 10, pl: 2, pr: 2 }}>
      <Paper >
        <Typography
          gutterBottom
          variant='h5'
          component='div'
          sx={{ padding: '20px' }}>
          Coleta
        </Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          height: 48,
          mb: 2,
          '& > *': { minWidth: 48 }
        }}>
          <Select name="dataTypeSelect" id="dataTypeSelect" value={dataType} onChange={handleDataTypeChange} sx={{ ml: '20px', mb: '10px' }}>
            {optionsSelect.map((option) => (
              <MenuItem key={option.value} value={option.value} disabled={option.value === 'pesquisa'}>
                {option.string}
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ height: 40 }}>
            <ModalAddData dataType={dataType} textButton={textButton} user={user} />
          </Box>
          <Box sx={{ height: 40 }}>
            <ModalColor />
          </Box>
          <Box>
            <Helper title="Clique aqui para exportar os dados dessa tabela">
              <Button variant="contained" sx={{
                bgcolor: theme.palette.mode === 'dark' ? '#fde68a' : '#fb923c', 
                color: theme.palette.mode === 'dark' ? '#232b3b' : '#fff',     
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' ? '#fbbf24' : '#fdba74', 
                },
                minWidth: 40,
                height: 40,
                p: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }} onClick={() => {
                exportToExcel(dataType, 'data.xlsx')
              }}>
                <FileDownloadIcon />
              </Button>
            </Helper>
          </Box>
        </Box>
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
              onRowClick={(params: GridRowParams) => {
                setSelectedRow(params.id);
              }}
              getRowClassName={(params: GridRowParams) => {
                return params.id === selectedRow ? 'selected-row' : '';
              }}
              onColumnVisibilityModelChange={(model: GridColumnVisibilityModel) => {
                const visibleCols = getVisibleColumnsFromModel(columns, model);
                return visibleCols;
              }}
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
                
                cursor: 'pointer'
              }}
            />
          </Box>
        </Box>
      </Paper>
      {selectedRow !== null && (
        <ModalUpdatePF
          id={selectedRow}
          dataType={dataType}
          open={openModal}
          user={user}
          onClose={handleCloseModal}
        />
      )}
      {selectedRow !== null && (
        <DeleteVerification
          selectedRow={selectedRow}
          dataType={dataType}
          onClose={handleCloseModalDelete}
          open={openModalDelete}
        />
      )}
    </Grid>
  );
}