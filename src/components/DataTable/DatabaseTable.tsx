import Paper from '@mui/material/Paper';
import { Box, Button, Divider, Grid, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridRowId, GridRowParams } from '@mui/x-data-grid';
import {
  ColumnConfig,
} from '../../types/types';
import { useEffect, useState } from 'react';
import {
  topicoAchadoHeader,
  achadoHeader,
} from '../../service/columns';
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



export default function DatabaseTable() {

  const [dataType, setDataType] = useState('pesquisa');
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const { handleLocalization, arrayTopicoAchado, arrayAreaAchado, arrayDivAchado, arrayAchado, setArrayTopicoAchado, setArrayAreaAchado, setArrayDivAchado, 
    setArrayAchado } = useContextTable();
  const [selectedRow, setSelectedRow] = useState<GridRowId | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const { exportToExcel } = useExportToExcel()
  const {getAllAchados, getAllTopcioAchado, getAllDivAchado, getAllAreaAchado } = useFetchListData()



  const createGridColumns = (headers: ColumnConfig[]): GridColDef[] => {

    return headers.map(header => ({
      field: header.id,
      headerName: header.label,
      width: header.minWidth,
      editable: false,
      renderCell: (params) => {
        return params.value;
      }
    }));
  };


  //cria table pra dados sem relação
  const createRows = (data: any[]): any[] => {
    return data.map((item, index) => ({
      id: item.id,
      ...item,
    }));
  };


  //controle de ações baseado no tipo de dado
  const handleDataTypeChange = (event: { target: { value: string; }; }) => {
    const value = event.target.value as string;
    setDataType(value)
    setSelectedRow(null);

    switch (value) {
      case 'achado':
        if (arrayAchado.length <= 0) {
          getAllAchados()
        }
        setColumns(createGridColumns(achadoHeader));
        setRows(createRows(arrayAchado))
        break
      case 'div-area-achado':
        if (arrayDivAchado.length <= 0) {
          getAllDivAchado()
        }
        setColumns(createGridColumns(topicoAchadoHeader));
        setRows(createRows(arrayDivAchado))
        break
      case 'area-achado':
        if (arrayAreaAchado.length <= 0) {
          getAllAreaAchado()
        }
        setColumns(createGridColumns(topicoAchadoHeader));
        setRows(createRows(arrayAreaAchado))
        break
      case 'topico-achado':
        if (arrayTopicoAchado.length <= 0) {
          getAllTopcioAchado()
        }
        setColumns(createGridColumns(topicoAchadoHeader));
        setRows(createRows(arrayTopicoAchado))
        break
      default:
        setColumns([]);
        setRows([])
    }
  };

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
    { value: 'achado', string: 'Achados' },
    { value: 'div-area-achado', string: 'Divisão dos Achados' },
    { value: 'area-achado', string: 'Área dos Achados' },
    { value: 'topico-achado', string: 'Topico dos Achados' },
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
      const response = await api.delete(`/${dataType}/${selectedRow}`)
      console.log(response)
      TypeAlert(response.data.message, 'success')
      switch (dataType) {
        case 'topico-achado':
          setArrayTopicoAchado(prevArray => prevArray.filter(item => item.id !== selectedRow))
          await getAllAreaAchado()
          await getAllDivAchado()
          await getAllAchados()
          break;
        case 'area-achado':
          setArrayAreaAchado(prevArray => prevArray.filter(item => item.id !== selectedRow))
          await getAllDivAchado()
          await getAllAchados()
          break;
        case 'div-area-achado':
          setArrayDivAchado(prevArray => prevArray.filter(item => item.id !== selectedRow))
          await getAllAchados();
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
      case 'div-area-achado':
        setRows(createRows(arrayDivAchado))
        break;
      case 'achado':
        setRows(createRows(arrayAchado))
        break;
      default:
        break;
    }
  }, [arrayTopicoAchado, arrayAreaAchado, arrayDivAchado, arrayAchado])


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
              <IconButton color='primary' onClick={() => handleUpdate(selectedRow)}>
                <EditIcon sx={{ fontSize: '30px', mb: 1, animation: 'flipInX 0.5s ease-in-out' }} />
              </IconButton>
              <IconButton color='error' onClick={() => handleDelete(selectedRow, dataType)}>
                <DeleteIcon sx={{ fontSize: '30px', mb: 1, animation: 'flipInX 0.5s ease-in-out' }} />
              </IconButton>
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