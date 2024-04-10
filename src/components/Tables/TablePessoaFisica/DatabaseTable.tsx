import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Divider, MenuItem, Select, Typography } from '@mui/material';
import { api } from '../../../service/api';
import { PessoaFisica } from '../../../types/types';
import { Edit } from '@mui/icons-material';
import { useState, useEffect } from 'react';


interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left';
}

export default function DatabaseTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pessoaFisica, setPessoaFisica] = useState<PessoaFisica[]>([]);
  const [dataType, setDataType] = useState('pessoaFisica');
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState<Column[]>([]);

  const getPessoaFisica =  () => {
      api.get('/').then((response:any) => {
      setPessoaFisica(response.data)
      return 
    })
  }

  useEffect(() => {
    getPessoaFisica()
  }, [])


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleEdit = (id: string) => {
    // Lógica para editar a pessoa com o ID fornecido
    console.log("Editar", id);
  };

  const handleDelete = (id: string) => {
    // Lógica para excluir a pessoa com o ID fornecido
    console.log("Excluir", id);
  };
  
  const buttons = {
    editButton:<Edit></Edit>
  }

  const handleDataTypeChange = (event: { target: { value: any; }; }) => {
    setDataType(event.target.value)
    let newColumns: Column[] = [];
    if(dataType === 'pessoaFisica'){
      newColumns = [
        {id:'nome', label:'Nome', minWidth:150, align:'left'},
        {id:'cpf', label:'CPF', minWidth:150, align:'left'},
        {id:'profissao', label:'Profissão', minWidth:150, align:'left'},
        {id:'genero', label:'Gênero', minWidth:150, align:'left'},
        {id:'cep', label:'CEP', minWidth:150, align:'left'},
        {id:'logradouro', label:'Logradouro', minWidth:150, align:'left'},
        {id:'complemento', label:'Complemento', minWidth:150, align:'left'},
        {id:'numero', label:'Número', minWidth:150, align:'left'},
        {id:'cidade', label:'Cidade', minWidth:150, align:'left'},
        {id:'uf', label:'UF', minWidth:150, align:'left'},
        {id:'telefone1', label:'Telefone1', minWidth:150, align:'left'},
        {id:'telefone2', label:'Telefone2', minWidth:150, align:'left'},
        {id:'ramal', label:'Ramal', minWidth:150, align:'left'},
        {id:'email', label:'E-mail', minWidth:150, align:'left'},
      ]
    }
    if(dataType === 'procurador'){
      newColumns = [
        {id:'nome', label:'Nome', minWidth:150, align:'left'},
      ]
    }
    setColumns(newColumns)
   
  };

  const optionsSelect = [
    {value:'pessoaFisica', string:'Pessoa Física'},
    {value:'achado', string:'Achado'},
    {value:'divAreaAchado', string:'Divisão da área do achado'},
    {value:'area-achado', string:'Area do Achado'},
    {value:'nat-achado', string:'Natureza do Achado'},
    {value:'interessado', string:'Interessado'},
    {value:'jurisd', string:'Jurisdicionado'},
    {value:'jurisd-jurisd', string:'Jurisd-jurisd'},
    {value:'processo', string:'Processo'},
    {value:'apenso', string:'Apenso'},
    {value:'procurador', string:'Procurador'},
    {value:'relator', string:'Relator'},
  ]
  return (
    <Paper sx={{ width: '77vw', overflow: 'hidden' }}>
      <Typography
      gutterBottom
      variant='h5'
      component='div'
      sx={{padding:'20px'}}>
        Base de dados Secex
      </Typography>
      <Select value={dataType} onChange={handleDataTypeChange} sx={{ml:'20px', mb:'10px'}}>
          {optionsSelect.map((option) => (
            <MenuItem value={option.value}>{option.string}</MenuItem>
          ))}
      </Select>
      <Divider/>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.nome}>
          {columns.map((column) => {
            const value = row[column.id];
            return (
              <TableCell key={column.id} align={column.align}>
                {value}
              </TableCell>
            );
          })}
        </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        labelRowsPerPage={'Linhas por Página'}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}