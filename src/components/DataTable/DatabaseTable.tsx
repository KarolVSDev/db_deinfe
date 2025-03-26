import Paper from '@mui/material/Paper';
import { Box, Button, Divider, Grid, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridRowId, GridRowParams, selectedGridRowsSelector } from '@mui/x-data-grid';
import { ColumnConfig } from '../../types/types';
import { useEffect, useRef, useState } from 'react';
import { topicoAchadoHeader, achadoHeader, beneficioHeader } from '../../service/columns';
import { useContextTable } from '../../context/TableContext';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import ModalUpdatePF from '../Modals/DataTableModals/ModalUpdateForms';
import { api } from '../../service/api';
import { TypeAlert } from '../../hooks/TypeAlert';
import ModalAddData from '../Modals/DataTableModals/ModalAddDataTable';
import useExportToExcel from '../../hooks/useExportToExcel';
import useFetchListData from '../../hooks/useFetchListData';
import { useAuth } from '../../context/AuthContext';
import useFetchUsers from '../../hooks/useFetchUsers';
import dataFake from '../../service/dataFake';
import ModalBeneficios from '../Modals/DataTableModals/ModalBeneficios';
import ModalAnalises from '../Modals/DataTableModals/ModalAnalise';
import DeleteVerification from '../Dialog/VerificationStep';
import DeleteIcon from '@mui/icons-material/Delete';
import { formateDateToPtBr } from '../../hooks/DateFormate';
import { set } from 'react-hook-form';

export default function DatabaseTable() {

  const [dataType, setDataType] = useState('pesquisa');
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const { handleLocalization, arrayTopicoAchado, arrayBeneficio, arrayAchado, setArrayTopicoAchado,
    setArrayAchado, setArrayBeneficio, setArrayAchadoBeneficio, arrayAchadoBeneficio } = useContextTable();
  const [selectedRow, setSelectedRow] = useState<GridRowId>(0)
  const [openModal, setOpenModal] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const { exportToExcel } = useExportToExcel()
  const { user } = useAuth()
  const { getUser } = useFetchUsers()
  const { AchadoFormatado } = dataFake()
  const { escutarTemas, escutarAchados, escutarBeneficios } = useFetchListData();

  //Esse bloco controla a renderizaçao dos dados
  const handleDataTypeChange = (event: { target: { value: string; }; }) => {
    const value = event.target.value as string;
    setDataType(value)
    // setSelectedRow(null);

    switch (value) {
      case 'tema':
        setColumns(createGridColumns(topicoAchadoHeader));
        const temaListener = escutarTemas((temas) => {
          setArrayTopicoAchado(temas)
          setRows(createRows(temas))
        })
        return () => temaListener;
      case 'achado':
        setColumns(createGridColumns(achadoHeader));
        const achadoListener = escutarAchados((achados) => {
          setArrayAchado(achados)
          setRows(createRows(achados))
        })
        return () => achadoListener;
      case 'beneficio':
        setColumns(createGridColumns(beneficioHeader));
        const beneficioListener = escutarBeneficios((beneficios) => {
          setArrayBeneficio(beneficios)
          setRows(createRows(beneficios))
        })
        return () => beneficioListener;
      default:
        setColumns([]);
        setRows([])
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
              <IconButton color="primary" onClick={() => handleUpdate(selectedRow)}>
                <EditIcon sx={{ fontSize: '30px', mb: 1, animation: 'flipInX 0.5s ease-in-out' }} />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(selectedRow)}>
                <DeleteIcon sx={{ fontSize: '30px', mb: 1, animation: 'flipInX 0.5s ease-in-out' }} />
              </IconButton>
            </Box>
          );
        }
        if (header.id === 'data') {
          return formateDateToPtBr(params.value)
        }
        if (header.id === 'beneficios' || header.id === 'achados') {
          return <ModalBeneficios Id={params.row.id} headerId={header.id} />;
        }
        if (header.id === 'analise') {
          return <ModalAnalises key={params.row.id} analise={params.row.analise} />
        }
        if (['situacaoAchado', 'situacao', 'situacaoBeneficio'].includes(header.id) && typeof params.value === 'boolean') {
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
  }, [])

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
    { value: 'tema', string: 'Temas' },
    { value: 'achado', string: 'Achados' },
    { value: 'beneficio', string: 'Benefícios' },
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

  //esse bloco atualiza a visualização dos dados
  useEffect(() => {
    switch (dataType) {
      case 'tema':
        setRows(createRows(arrayTopicoAchado))
        break;
      case 'beneficio':
        setRows(createRows(arrayBeneficio))
        break;
      case 'achado':
        const achadoComTopico = AchadoFormatado(arrayAchado, arrayTopicoAchado)
        setRows(createRows(achadoComTopico))
        break;
      default:
        break;
    }
  }, [arrayTopicoAchado, arrayBeneficio, arrayAchado, dataType])


  return (
    <Grid sx={{ overflowY: 'auto', height: '95vh', scrollbarWidth: 'thin', pt: 10, pl: 2, pr: 2 }}>
      <Paper >
        <Typography
          gutterBottom
          variant='h5'
          component='div'
          sx={{ padding: '20px' }}>
          Catálogo
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, height: '48px' }}>
          <Select value={dataType} onChange={handleDataTypeChange} sx={{ ml: '20px', mb: '10px' }}>
            {optionsSelect.map((option) => (
              <MenuItem key={option.value} value={option.value} disabled={option.value === 'pesquisa'}>
                {option.string}
              </MenuItem>
            ))}
          </Select>
          <ModalAddData dataType={dataType} user={user} />
          <Box>
            <Button variant="contained" sx={{ bgcolor: '#ff3d00', '&:hover': { bgcolor: '#b22a00' } }} onClick={() => {
              const gridState = captureDataGridState();
              exportToExcel(gridState, 'data.xlsx')
            }}>
              <FileDownloadIcon />
            </Button>
          </Box>
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