  import Paper from '@mui/material/Paper';
  import { Box, Button, Divider, Grid, MenuItem, Select, Typography } from '@mui/material';
  import { api } from '../../service/api';
  import { DataGrid, GridColDef } from '@mui/x-data-grid';
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


  export default function DatabaseTable() {

    const [dataType, setDataType] = useState('pesquisa');
    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [rows, setRows] = useState<any[]>([]);
    const { arrayPessoaFisica, arrayJurisd, arrayProcesso,
      arrayProcurador, arrayRelator, arrayRelations, arrayRelationpp, handleLocalization,
      getAllPessoaFisica } = useContextTable()

    

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

    useEffect(() => {
      getAllPessoaFisica();
    }, [])

    useEffect(() => {
      if(dataType === 'pessoafisica'){
        setRows(createRows(arrayPessoaFisica))
      }
    }, [arrayPessoaFisica])

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
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, height:'48px' }}>
            <Select value={dataType} onChange={handleDataTypeChange} sx={{ ml: '20px', mb: '10px', }}>
              {optionsSelect.map((option) => (
                <MenuItem value={option.value} disabled={option.value === 'pesquisa'}>{option.string}</MenuItem>
              ))}
            </Select>
            <ModalPessoaFisica />
            <Box>
              <Button variant="contained" sx={{ bgcolor: '#ff3d00', '&:hover': { bgcolor: '#b22a00' }}} onClick={exportToExcel}>
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
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
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
              }}
            />
          </Box>
        </Paper>
      </Grid>
    );
  }