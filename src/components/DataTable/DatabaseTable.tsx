import Paper from '@mui/material/Paper';
import { Box, Button, Divider, Grid, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { api } from '../../service/api';
import { DataGrid, GridColDef, GridRowId, GridRowParams } from '@mui/x-data-grid';
import {
  ColumnConfig,
  Interessado
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
import { TypeInfo } from '../../hooks/TypeAlert';
import { useContextTable } from '../../context/TableContext';
import SearchParams from '../Inputs/SearchParams';
import ModalPessoaFisica from '../Modais/ModalAddDataTable';
import Actions from './Actions';
import * as XLSX from 'xlsx';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function DatabaseTable() {

  const [dataType, setDataType] = useState('pesquisa');
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const { arrayPessoaFisica, arrayJurisd, arrayProcesso,
    arrayProcurador, arrayRelator, arrayRelations, arrayRelationpp, handleLocalization,
    getAllPessoaFisica } = useContextTable();
  const [selectedRow, setSelectedRow] = useState<GridRowId | null>(null)



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
      default:
        setColumns([]);
        setRows([])
    }
  };

  //traduz o dataGrid
  handleLocalization

  //export
  const exportToExcel = () => {
    const exportRows = rows.map(row => {
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
    { value: 'jurisd', string: 'Jurisdicionado' },
    { value: 'processo', string: 'Processo' },
    { value: 'procurador', string: 'Procurador' },
    { value: 'relator', string: 'Relator' },
    { value: 'interessado', string: 'Interessado' },
  ]

  //esse bloco atualiza a visualização de pessoa física
  useEffect(() => {
    getAllPessoaFisica();
  }, [])

  useEffect(() => {
    if (dataType === 'pessoafisica') {
      setRows(createRows(arrayPessoaFisica))
    }
  }, [arrayPessoaFisica])

  function handleUpdate(selectedRow: GridRowId): void {
    throw new Error('Function not implemented.');
  }

  function handleDelete(selectedRow: GridRowId): void {
    throw new Error('Function not implemented.');
  }

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
          <ModalPessoaFisica />
          <Box>
            <Button variant="contained" sx={{ bgcolor: '#ff3d00', '&:hover': { bgcolor: '#b22a00' } }} onClick={exportToExcel}>
              <FileDownloadIcon />
            </Button>
          </Box>
          {selectedRow !== null && (
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
              <IconButton color='primary' onClick={() => handleUpdate(selectedRow)}>
                <EditIcon sx={{ fontSize: '30px', mb: 1, animation: 'flipInX 0.5s ease-in-out' }} />
              </IconButton>
              <IconButton color='error' onClick={() => handleDelete(selectedRow)}>
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
                backgroundColor: '#e2e8f0', color:'#000',
              },
              cursor: 'pointer'
            }}
          />
        </Box>
      </Paper>
    </Grid>
  );
}