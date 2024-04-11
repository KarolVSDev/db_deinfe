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
import { PessoaFisica, Procurador, Relator } from '../../../types/types';
import { Edit } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { pessoaFisicaHeader, procuradorHeader, relatorHeader } from '../../../service/columns';


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
  const [procurador, setProcurador] = useState<Procurador[]>([]);
  const [relator, setRelator] = useState<Relator[]>([]);
  const [dataType, setDataType] = useState('pessoafisica');
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState<Column[]>([]);

  const fetchData =  async () => {
    try {
      await api.get(`/${dataType}`).then((response:any) => {
        if(dataType === 'pessoafisica'){
          setPessoaFisica(response.data)
        }else if(dataType === 'procurador'){
          setProcurador(response.data)
        }else if(dataType === 'relator'){
          setRelator(response.data)
        }
      return 
    })
    } catch (error) {
      console.log('Erro ao buscar dados', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [dataType, columns])
  

  if(dataType){
    fetchData()
  }
  console.log(relator)
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
  };
  

  const optionsSelect = [
    {value:'pessoafisica', string:'Pessoa Física'},
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
    <Paper sx={{ maxWidth: 'calc(100vw - 300px)', overflow: 'hidden' }}>
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
              {dataType === 'pessoafisica' && (
                pessoaFisicaHeader.map((pf) => (
                  <TableCell
                  id={pf.id}
                  align={'left'}
                  style={{ minWidth: 150 }}
                >
                  {pf.label}
                </TableCell> 
                ))
                
              )}
              {dataType === 'procurador' && (
                procuradorHeader.map((p) => (
                  <TableCell
                  id={p.id}
                  align={'left'}
                  style={{ minWidth: 150 }}
                >
                  {p.label}
                </TableCell> 
                ))
              )}
              {dataType === 'relator' && (
                relatorHeader.map((p) => (
                  <TableCell
                  id={p.id}
                  align={'left'}
                  style={{ minWidth: 150 }}
                >
                  {p.label}
                </TableCell> 
                ))
              )}
            </TableRow>
          </TableHead>
          <TableBody>
          {dataType === 'pessoafisica' && (
              pessoaFisica.map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  <TableCell align="left">{row.nome}</TableCell>
                  <TableCell align="left">{row.cpf}</TableCell>
                  <TableCell align="left">{row.rg}</TableCell>
                  <TableCell align="left">{row.profissao}</TableCell>
                  <TableCell align="left">{row.genero}</TableCell>
                  <TableCell align="left">{row.cep}</TableCell>
                  <TableCell align="left">{row.logradouro}</TableCell>
                  <TableCell align="left">{row.complemento}</TableCell>
                  <TableCell align="left">{row.numero}</TableCell>
                  <TableCell align="left">{row.cidade}</TableCell>
                  <TableCell align="left">{row.uf}</TableCell>
                  <TableCell align="left">{row.telefone1}</TableCell>
                  <TableCell align="left">{row.telefone2}</TableCell>
                  <TableCell align="left">{row.ramal}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.ativo}</TableCell>
                </TableRow>
          )))}
          {dataType === 'procurador' && (
              procurador.map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  <TableCell align="left">{row.nome}</TableCell>
                </TableRow>
          )))}
          {dataType === 'relator' && (
              relator.map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  <TableCell align="left">{row.nome}</TableCell>
                  <TableCell align="left">{row.cargo}</TableCell>
                </TableRow>
          )))}
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