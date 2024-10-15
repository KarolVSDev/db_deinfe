import Paper from '@mui/material/Paper';
import { Box, Button, Divider, Grid, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridRowId, GridRowParams } from '@mui/x-data-grid';
import {ColumnConfig} from '../../types/types';
import { useEffect, useState } from 'react';
import {topicoAchadoHeader,achadoHeader,beneficioHeader} from '../../service/columns';
import { useContextTable } from '../../context/TableContext';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalUpdatePF from '../Modais/DataTableModals/ModalUpdateForms';
import { api } from '../../service/api';
import { TypeAlert } from '../../hooks/TypeAlert';
import ModalAddData from '../Modais/DataTableModals/ModalAddDataTable';
import useExportToExcel from '../../hooks/useExportToExcel';
import useFetchListData from '../../hooks/useFetchListData';
import { useAuth } from '../../context/AuthContext';
import useFetchUsers from '../../hooks/useFetchUsers';

export default function DatabaseTable() {

  const [dataType, setDataType] = useState('pesquisa');
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const { handleLocalization, arrayTopicoAchado, arrayAreaAchado, arrayBeneficio, arrayAchado, setArrayTopicoAchado, setArrayAreaAchado, 
    setArrayAchado, setArrayBeneficio } = useContextTable();
  const [selectedRow, setSelectedRow] = useState<GridRowId | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const { exportToExcel } = useExportToExcel()
  const {getAllAchados, getAllTopcioAchado, getAllAreaAchado } = useFetchListData()
  const {user} = useAuth()
  const {getUser} = useFetchUsers()


  const handleDataTypeChange = (event: { target: { value: string; }; }) => {
    const value = event.target.value as string;
    setDataType(value)
    setSelectedRow(null);

    switch (value) {
      case 'achado':
        // if (arrayAchado.length <= 0) {
          //   getAllAchados()
          // }
          console.log(arrayAchado)
          setColumns(createGridColumns(achadoHeader));
          setRows(createRows(arrayAchado))
        break
      case 'beneficio':
        setColumns(createGridColumns(beneficioHeader));
        setRows(createRows(arrayBeneficio))
        break
      case 'area-achado':
        if (arrayAreaAchado.length <= 0) {
          getAllAreaAchado()
        }
        setColumns(createGridColumns(topicoAchadoHeader));
        setRows(createRows(arrayAreaAchado))
        break
      case 'topico-achado':
        // if (arrayTopicoAchado.length <= 0) {
        //   getAllTopcioAchado()
        // }
        console.log(arrayTopicoAchado)
        setColumns(createGridColumns(topicoAchadoHeader));
        setRows(createRows(arrayTopicoAchado))
        break
      default:
        setColumns([]);
        setRows([])
    }
  };
    
    const createGridColumns = (headers: ColumnConfig[]): GridColDef[] => {

      return headers.map(header => ({
        field: header.id,
        headerName: header.label,
        width: header.minWidth,
        editable: false,
        renderCell: (params) => {
          if (header.id === 'situacao' && typeof params.value === 'boolean') {
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
          return params.value;
        },
        filterable: true,
      }));
    };


  //cria table pra dados sem relação
  const createRows = (data: any[]): any[] => {
    return data.map((item, index) => ({
      id: item.id,
      ...item,
    }));
  };

  //pegando usuário
  useEffect(() => {
    getUser()
  },[])
  

  //controle de ações baseado no tipo de dado
  

  //traduz o dataGrid
  handleLocalization

  //captura o estado atual do dataGrid
  const getVisibleColumnsFromModel = (columns: GridColDef[], model: GridColumnVisibilityModel) => {
    return console.log(columns, model)
  };

  const captureDataGridState = () => {
    const gridState = {
      columns: columns,
      rows: rows,
    }
    return gridState
  }

  const optionsSelect = [
    { value: 'pesquisa', string: 'Pesquisa' },
    { value: 'topico-achado', string: 'Topicos' },
    { value: 'achado', string: 'Achados' },
    { value: 'beneficio', string: 'Benefícios' },
    { value: 'area-achado', string: 'Área dos Achados' },
  ]


  function handleUpdate(selectedRow: GridRowId) {
    setSelectedRow(selectedRow);
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  //função de delete
  const handleDelete = async (selectedRow: GridRowId, dataType: string) => {
    try {
      //const response = await api.delete(`/${dataType}/${selectedRow}`)
      //console.log(response)
      //TypeAlert(response.data.message, 'success')
      switch (dataType) {
        case 'topico-achado':
          setArrayTopicoAchado(prevArray => prevArray.filter(item => item.id !== selectedRow))
          TypeAlert('Tópico removido', 'success')
          break;
        case 'area-achado':
          setArrayAreaAchado(prevArray => prevArray.filter(item => item.id !== selectedRow))
          await getAllAchados()
          break;
        case 'beneficio':
          setArrayBeneficio(prevArray => prevArray.filter(item => item.id !== selectedRow))
          break;
        case 'achado':
          setArrayAchado(prevArray => prevArray.filter(item => item.id !== selectedRow))
          break;
        default:
          break;
      }
      setSelectedRow(null)

    } catch (error: any) {
      console.log(error)
      TypeAlert('Erro ao tentar excluir', 'error')
    }
  }

  //esse bloco atualiza a visualização dos dados
  useEffect(() => {
    switch (dataType) {
      case 'topico-achado':
        setRows(createRows(arrayTopicoAchado))
        break;
      case 'area-achado':
        setRows(createRows(arrayAreaAchado))
        break;
      case 'beneficio':
        setRows(createRows(arrayBeneficio))
        break;
      case 'achado':
        setRows(createRows(arrayAchado))
        break;
      default:
        break;
    }
  }, [arrayTopicoAchado, arrayAreaAchado, arrayBeneficio, arrayAchado])

  
  return (
    <Grid sx={{ overflowY: 'auto', height: '95vh', scrollbarWidth: 'thin', pt: 10, pl: 2, pr: 2 }}>
      <Paper >
        <Typography
          gutterBottom
          variant='h5'
          component='div'
          sx={{ padding: '20px' }}>
          Base de dados Secex
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, height: '48px' }}>
          <Select value={dataType} onChange={handleDataTypeChange} sx={{ ml: '20px', mb: '10px' }}>
            {optionsSelect.map((option) => (
              <MenuItem key={option.value} value={option.value} disabled={option.value === 'pesquisa'}>
                {option.string}
              </MenuItem>
            ))}
          </Select>
          <ModalAddData />
          <Box>
            <Button variant="contained" sx={{ bgcolor: '#ff3d00', '&:hover': { bgcolor: '#b22a00' } }} onClick={() => {
              const gridState = captureDataGridState();
              exportToExcel(gridState, 'data.xlsx')
            }}>
              <FileDownloadIcon />
            </Button>
          </Box>
          {selectedRow !== null && (
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
               {user?.cargo === 'Diretor' && (
                <>
                  <IconButton color='primary' onClick={() => handleUpdate(selectedRow)}>
                    <EditIcon sx={{ fontSize: '30px', mb: 1, animation: 'flipInX 0.5s ease-in-out' }} />
                  </IconButton>
                  <IconButton color='error' onClick={() => handleDelete(selectedRow, dataType)}>
                    <DeleteIcon sx={{ fontSize: '30px', mb: 1, animation: 'flipInX 0.5s ease-in-out' }} />
                  </IconButton>
                </>
              )}
            </Box>
          )}
        </Box>
        <Divider />
        <Box sx={{ height: '70vh', width: '100%', overflow: 'auto', position: 'relative' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            localeText={handleLocalization}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection={false}
            disableRowSelectionOnClick
            onRowClick={(params: GridRowParams) => {
              setSelectedRow(params.id)
            }}
            getRowClassName={(params: GridRowParams) => {
              return params.id === selectedRow ? 'selected-row' : '';
            }}
            onColumnVisibilityModelChange={(model: GridColumnVisibilityModel) => {
              const visibleCols = getVisibleColumnsFromModel(columns, model);
              return visibleCols
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
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#e2e8f0', color: '#000',
              },
              cursor: 'pointer'
            }}
          />
        </Box>
      </Paper>
      {selectedRow !== null && (
        <ModalUpdatePF
          id={selectedRow}
          dataType={dataType}
          open={openModal}
          onClose={handleCloseModal}
        />
      )}
    </Grid>
  );
}