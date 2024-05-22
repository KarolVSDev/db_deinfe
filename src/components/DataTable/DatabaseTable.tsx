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
      arrayProcurador, arrayRelator, arrayRelations, arrayRelationpp,
      getAllPessoaFisica } = useContextTable()

    const handleLocalization = {
      columnHeaderSortIconLabel: 'ordenar',
      columnMenuSortAsc: 'Ordenar por ASC',
      columnMenuSortDesc: 'Ordenar por Desc',
      columnMenuFilter: 'Filtrar',
      columnMenuHideColumn: 'Esconder Coluna',
      columnMenuManageColumns: 'Gerenciar Colunas',
      columnsManagementSearchTitle: 'Pesquisar',
      checkboxSelectionHeaderName: 'Caixa de Seleção',
      columnsManagementShowHideAllText: 'Mostrar/Esconder Todos',
      columnsManagementReset: 'Resetar',
      filterPanelColumns: 'Colunas',
      filterPanelOperator: 'Operador',
      filterPanelInputLabel: 'Valor',
      filterOperatorContains: 'contém',
      filterOperatorEquals: 'igual a',
      filterOperatorStartsWith: 'começa com',
      filterOperatorEndsWith: 'termina com',
      filterOperatorIsEmpty: 'está vazio',
      filterOperatorIsNotEmpty: 'não está vazio',
      filterOperatorIsAnyOf: 'é qualquer um',
      noRowsLabel:'sem dados',
      noResultsOverlayLabel:'nenhum resultado encontrado',
      footerRowSelected: (count:number) =>
        count !== 1
          ? `${count.toLocaleString()} linhas selecionadas`
          : `${count.toLocaleString()} linha selecionada`,
    };

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

    const createInteressadoRows = (data: Interessado[]): any[] => {
      return data.map((item, index) => ({
          id: item.id,
          interesse: item.interesse,
          pessoa: item.pessoa,
          processo: item.processo
      }));
  };

    const createRows = (data: any[]): any[] => {
      return data.map((item, index) => ({
        id: item.id,
        ...item,
      }));
    };

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
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Select value={dataType} onChange={handleDataTypeChange} sx={{ ml: '20px', mb: '10px', }}>
              {optionsSelect.map((option) => (
                <MenuItem value={option.value} disabled={option.value === 'pesquisa'}>{option.string}</MenuItem>
              ))}
            </Select>
            <ModalPessoaFisica />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button variant="contained" sx={{ bgcolor: '#ff3d00', '&:hover': { bgcolor: '#b22a00' }, mb: 2, display: 'flex', flexDirection: 'column' }} onClick={exportToExcel}>
                <FileDownloadIcon />
              </Button>
            </Box>
            {/* {dataType === 'pessoafisica' && (
              <>
                <SearchParams data={pessoaFisica} onOptionSelected={handleOptionSelected} />
              </>
            )
            } */}
          </Box>
          <Divider />
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
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </Paper>
      </Grid>
    );
  }