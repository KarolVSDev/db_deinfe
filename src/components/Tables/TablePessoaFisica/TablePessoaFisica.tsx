import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Divider, Typography } from '@mui/material';
import { api } from '../../../service/api';
import PessoaFisica from '../../../pages/Dashboard/Pessoa Física/PessoaFisica';


interface Column {
  id: 'nome' | 'cpf' | 'rg' | 'profissao' | 'genero' | 'cep' | 'logradouro' | 'complemento' | 'numero' | 'cidade'
   | 'uf' | 'telefone1' | 'telefone2' | 'ramal' | 'email' | 'ativo';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'nome', label: 'Nome', minWidth: 150 },
  { id: 'cpf', label: 'CPF', minWidth: 140 },
  {id: 'rg', label: 'RG', minWidth: 150, align: 'left',},
  {id: 'profissao', label: 'Profissão', minWidth: 150, align: 'left',},
  {id: 'genero', label: 'Gênero', minWidth: 150, align: 'left',},
  {id:'cep',  label:'CEP', minWidth:150, align:'left',},
  {id:'logradouro',  label:'Logradouro', minWidth:150, align:'left',},
  {id:'complemento',  label:'Complemento', minWidth:150, align:'left',},
  {id:'numero',  label:'Número', minWidth:150, align:'left',},
  {id:'cidade',  label:'Cidade', minWidth:150, align:'left',},
  {id:'uf',  label:'UF', minWidth:150, align:'left',},
  {id:'telefone1',  label:'Telefone1', minWidth:150, align:'left',},
  {id:'telefone2',  label:'Telefone2', minWidth:150, align:'left',},
  {id:'ramal',  label:'Ramal', minWidth:150, align:'left',},
  {id:'email',  label:'Email', minWidth:150, align:'left',},
  {id:'ativo',  label:'Ativo', minWidth:150, align:'left',},
];

interface PessoaFisica {
  id: string;
  nome: string;
  cpf: string;
  rg: string;
  profissao: string;
  genero: string;
  cep:string;
  logradouro:string;
  complemento:string;
  numero:string;
  cidade:string;
  uf:string;
  telefone1:string;
  telefone2:string;
  ramal:string;
  email:string;
  ativo:string;
}

function createData(
  id:string,
  nome: string,
  cpf: string,
  rg: string,
  profissao: string,
  genero: string,
  cep:string,
  logradouro:string,
  complemento:string,
  numero:string,
  cidade:string,
  uf:string,
  telefone1:string,
  telefone2:string,
  ramal:string,
  email:string,
  ativo:string,
): PessoaFisica {
  return { id, nome, cpf, rg, profissao, genero, cep, logradouro, complemento, numero, cidade, uf, telefone1, telefone2, ramal, email, ativo };
}



export default function TablePessoaFisica() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [pessoaFisica, setPessoaFisica] = React.useState<PessoaFisica[]>([]);

  const dataTable =  () => {
      api.get('/todos').then((response:any) => {
      setPessoaFisica(response.data)
      return 
    })
  }

  React.useEffect(() => {
    dataTable()
  }, [])


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = pessoaFisica.map(pf =>
    createData(pf.id, pf.nome, pf.cpf, pf.rg, pf.profissao, pf.genero, pf.cep, pf.logradouro, pf.complemento, pf.numero, pf.cidade, pf.uf, pf.telefone1, pf.telefone2, pf.ramal, pf.email, pf.ativo)
  );
  return (
    <Paper sx={{ width: '77vw', overflow: 'hidden' }}>
      <Typography
      gutterBottom
      variant='h5'
      component='div'
      sx={{padding:'20px'}}>
        Pessoa Física
      </Typography>
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
            {rows
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        labelRowsPerPage={'Linhas por Página'}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

