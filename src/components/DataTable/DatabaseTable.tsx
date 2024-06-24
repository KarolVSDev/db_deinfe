import Paper from '@mui/material/Paper';
import { Box, Button, Divider, Grid, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridRowId, GridRowParams } from '@mui/x-data-grid';
import {
  ColumnConfig,
  Interessado,
  Jurisd
} from '../../types/types';
import { useEffect, useState } from 'react';
import {
  pessoaFisicaHeader,
  procuradorHeader,
  relatorHeader,
  natAchadoHeader,
  divAreaAchadoHeader,
  areaAchadoHeader,
  achadoHeader,
  jurisdHeader,
  processoHeader,
  interessadoHeader,
  pessoaJurisdHeader,
  arrayRelationsHeader
} from '../../service/columns';
import { useContextTable } from '../../context/TableContext';
import * as XLSX from 'xlsx';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalUpdatePF from '../Modais/DataTableModals/ModalUpdatePF';
import { api } from '../../service/api';
import { TypeAlert } from '../../hooks/TypeAlert';
import ModalAddData from '../Modais/DataTableModals/ModalAddDataTable';


export default function DatabaseTable() {

  const [dataType, setDataType] = useState('pesquisa');
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const { arrayPessoaFisica, arrayProcesso, arrayJurisd,
    arrayProcurador, arrayRelator, arrayRelationpp, handleLocalization, arrayNatAchado,
    setArrayPessoaFisica, setArrayJurisd, getAllJurisd, getAllProcesso, getAllProcurador, getAllRelator } = useContextTable();
  const [selectedRow, setSelectedRow] = useState<GridRowId | null>(null)
  const [openModal, setOpenModal] = useState(false)


  const createGridColumns = (headers: ColumnConfig[]): GridColDef[] => {

    return headers.map(header => ({
      field: header.id,
      headerName: header.label,
      width: header.minWidth,
      editable: false,
      renderCell: (params) => {
        if (header.id === 'pessoa') {
          return params.value ? params.value.nome : '';
        } else if (header.id === 'processo') {
          return params.value ? params.value.numero : '';
        }
        return params.value;
      }
    }));
  };

  //cria a table pra dados relacionados com interessado
  const createInteressadoRows = (data: Interessado[]): any[] => {
    return data.map((item, index) => ({
      id: item.id,
      interesse: item.interesse,
      pessoa: item.pessoa,
      processo: item.processo
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
      case 'pessoafisica':
        setColumns(createGridColumns(pessoaFisicaHeader));
        setRows(createRows(arrayPessoaFisica));
        break;
      case 'jurisd':
        setColumns(createGridColumns(jurisdHeader));
        setRows(createRows(arrayJurisd))
        break;
      case 'processo':
        setColumns(createGridColumns(processoHeader));
        setRows(createRows(arrayProcesso));
        break;
      case 'procurador':
        setColumns(createGridColumns(procuradorHeader));
        setRows(createRows(arrayProcurador))
        break;
      case 'relator':
        setColumns(createGridColumns(relatorHeader));
        setRows(createRows(arrayRelator))
        break;
      case 'interessado':
        setColumns(createGridColumns(interessadoHeader));
        setRows(createInteressadoRows(arrayRelationpp))
        break;
      case 'nat-achado':
        setColumns(createGridColumns(natAchadoHeader));
        setRows(createRows(arrayNatAchado))
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


  //export
  interface GridState {
    columns: GridColDef[];
    rows: any[];
  }
  const exportToExcel = (gridState: GridState) => {
    const { columns, rows } = gridState
    const exportRows = rows.map((row) => {
      const exportRow: any = { ...row };

      if (dataType === 'interessado') {
        exportRow.pessoa = row.pessoa ? row.pessoa.nome : '';
        exportRow.processo = row.processo ? row.processo.numero : '';
      }

      return exportRow;
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportRows);
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'data.xlsx');
  };

  const optionsSelect = [
    { value: 'pesquisa', string: 'Pesquisa' },
    { value: 'pessoafisica', string: 'Pessoa Física' },
    { value: 'jurisd', string: 'Unidade Gestora' },
    { value: 'processo', string: 'Processo' },
    { value: 'procurador', string: 'Procurador' },
    { value: 'relator', string: 'Relator' },
    { value: 'interessado', string: 'Interessado' },
    { value: 'nat-achado', string: 'Natureza do Achado' },
  ]


  function handleUpdate(selectedRow: GridRowId) {
    setSelectedRow(selectedRow);
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = async (selectedRow: GridRowId, dataType: string) => {
    try {
      const response = await api.delete(`/${dataType}/${selectedRow}`)
      TypeAlert(response.data.message, 'success')
      switch (dataType) {
        case 'pessoafisica':
          setArrayPessoaFisica(prevArray => prevArray.filter(item => item.id !== selectedRow))
          break;
        case 'jurisd':
          setArrayJurisd(prevArray => prevArray.filter(item => item.id !== selectedRow))
          break;
        default:
          break;
      }
    } catch (error: any) {
      TypeAlert(error.response.data.message, 'error')
    }
  }


  //esse bloco atualiza a visualização de pessoa física
  // useEffect(() => {
  //   getAllPessoaFisica();
  //   getAllJurisd();
  //   getAllProcesso();
  //   getAllProcurador();
  //   getAllRelator();
  // }, [])

  useEffect(() => {
    switch (dataType) {
      case 'pessoafisica':
        setRows(createRows(arrayPessoaFisica))
        break;
      case 'jurisd':
        setRows(createRows(arrayJurisd))
        break;
      case 'processo':
        getAllProcesso()
        setRows(createRows(arrayProcesso))
        break;
      case 'procurador':
        getAllProcurador()
        setRows(createRows(arrayProcurador))
        break;
      case 'relator':
        getAllRelator()
        setRows(createRows(arrayRelator))
        break;
      default:
        break;
    }
  }, [ arrayJurisd, arrayPessoaFisica, arrayProcesso, arrayProcurador, arrayRelator])


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
          <Select value={dataType} onChange={handleDataTypeChange} sx={{ ml: '20px', mb: '10px', }}>
            {optionsSelect.map((option) => (
              <MenuItem key={option.value} value={option.value} disabled={option.value === 'pesquisa'}>{option.string}</MenuItem>
            ))}
          </Select>
          <ModalAddData />
          <Box>
            <Button variant="contained" sx={{ bgcolor: '#ff3d00', '&:hover': { bgcolor: '#b22a00' } }} onClick={() => {
              const gridState = captureDataGridState();
              exportToExcel(gridState)
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
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
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