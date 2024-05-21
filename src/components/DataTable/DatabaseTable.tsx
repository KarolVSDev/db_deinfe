import Paper from '@mui/material/Paper';
import { Box, Button, Divider, Grid, MenuItem, Select, Typography } from '@mui/material';
import { api } from '../../service/api';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  PessoaFisica,
  Procurador,
  Relator,
  NatAchado,
  AreaAchado,
  Achado,
  Jurisd,
  Processo,
  Interessado,
  PessoaJurisd,
  ColumnConfig
} from '../../types/types';
import { useState, useEffect } from 'react';
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
  pessoaJurisdHeader
} from '../../service/columns';
import { TypeInfo } from '../../hooks/TypeAlert';
import { useContextTable } from '../../context/TableContext';
import SearchParams from '../Inputs/SearchParams';
import ModalPessoaFisica from '../Modais/ModalAddDataTable';
import Actions from './Actions';
import * as XLSX from 'xlsx';

export default function DatabaseTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pessoaFisica, setPessoaFisica] = useState<PessoaFisica[]>([]);
  const [procurador, setProcurador] = useState<Procurador[]>([]);
  const [relator, setRelator] = useState<Relator[]>([]);
  const [natAchado, setNatAchado] = useState<NatAchado[]>([]);
  const [divAreaAchado, setDivAreaAchado] = useState<DivAreaAchado[]>([]);
  const [areaAchado, setAreaAchado] = useState<AreaAchado[]>([]);
  const [achado, setAchado] = useState<Achado[]>([]);
  const [jurisd, setJurisd] = useState<Jurisd[]>([]);
  const [processo, setProcesso] = useState<Processo[]>([]);
  const [interessado, setInteressado] = useState<Interessado[]>([]);
  const [pessoaJurisd, setPessoaJurisd] = useState<PessoaJurisd[]>([]);
  const [dataType, setDataType] = useState('pesquisa');
  const [searchPessoa, setSearchPessoa] = useState('');
  const [searchProcesso, setSearchProcesso] = useState('');
  const [searchJurisd, setSearchJurisd] = useState('');
  const [searchTipo, setSearchTipo] = useState('');
  const [data, setData] = useState([10]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [selectedPessoaFisica, setSelectedPessoaFisica] = useState<PessoaFisica | null>(null);
  const { arrayPessoaFisica, arrayJurisd, arrayProcesso, arrayProcurador, arrayRelator } = useContextTable()


  const handleOptionSelected = (option: PessoaFisica | null) => {
    setSelectedPessoaFisica(option)
  }

  const createGridColumns = (headers: ColumnConfig[]): GridColDef[] => {
    return headers.map(header => ({
      field: header.id,
      headerName: header.label,
      width: header.minWidth,
      editable: false, 
    }));
  };

  const createRows = (data: any[]): any[] => {
    return data.map((item, index) => ({
      id: item.id,
      ...item,
    }));
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'data.xlsx');
  };

  const handleDataTypeChange = (event: { target: { value: any; }; }) => {
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
      default:
        setColumns([]);
        setRows([])
    }
  };


  const optionsSelect = [
    { value: 'pesquisa', string: 'Pesquisa' },
    { value: 'pessoafisica', string: 'Pessoa Física' },
    { value: 'jurisd', string: 'Jurisdicionado' },
    { value: 'processo', string: 'Processo' },
    { value: 'procurador', string: 'Procurador' },
    { value: 'relator', string: 'Relator' },
  ]


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
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Select value={dataType} onChange={handleDataTypeChange} sx={{ ml: '20px', mb: '10px', }}>
            {optionsSelect.map((option) => (
              <MenuItem value={option.value} disabled={option.value === 'pesquisa'}>{option.string}</MenuItem>
            ))}
          </Select>
          <ModalPessoaFisica />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" sx={{bgcolor:'#ff3d00', '&:hover':{bgcolor:'#b22a00'}, mb: 2 }} onClick={exportToExcel}>
            Exportar para Excel
          </Button>
          </Box>
          {/* {dataType === 'pessoafisica' && (
            <>
              <SearchParams data={pessoaFisica} onOptionSelected={handleOptionSelected} />
            </>
          )
          }
        </Box>
        <Divider />
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
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
          />
        </Box>
      </Paper>
    </Grid>
  );
}