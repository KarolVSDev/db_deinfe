import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { api } from '../../../service/api';
import {
  PessoaFisica,
  Procurador,
  Relator,
  NatAchado,
  DivAreaAchado,
  AreaAchado,
  Achado,
  Jurisd,
  Processo,
  Interessado,
} from '../../../types/types';
import { Edit } from '@mui/icons-material';
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
  interessadoHeader
} from '../../../service/columns';
import { TypeAlert, TypeInfo } from '../../../hooks/TypeAlert';

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
  const [natAchado, setNatAchado] = useState<NatAchado[]>([]);
  const [divAreaAchado, setDivAreaAchado] = useState<DivAreaAchado[]>([]);
  const [areaAchado, setAreaAchado] = useState<AreaAchado[]>([]);
  const [achado, setAchado] = useState<Achado[]>([]);
  const [jurisd, setJurisd] = useState<Jurisd[]>([]);
  const [processo, setProcesso] = useState<Processo[]>([]);
  const [interessado, setInteressado] = useState<Interessado[]>([]);
  const [dataType, setDataType] = useState('pessoafisica');
  const [searchPessoa, setSearchPessoa] = useState('');
  const [searchProcesso, setSearchProcesso] = useState('');
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState<Column[]>([]);

  const fetchData = async () => {
    try {
      await api.get(`/${dataType}`).then((response: any) => {
        if (dataType === 'pessoafisica') {
          setPessoaFisica(response.data)
        } else if (dataType === 'procurador') {
          setProcurador(response.data)
        } else if (dataType === 'relator') {
          setRelator(response.data)
        } else if (dataType === 'nat-achado') {
          setNatAchado(response.data)
        } else if (dataType === 'div-area-achado') {
          setDivAreaAchado(response.data)
        } else if (dataType === 'area-achado') {
          setAreaAchado(response.data)
        } else if (dataType === 'achado') {
          setAchado(response.data)
        } else if (dataType === 'jurisd') {
          setJurisd(response.data)
        } else if (dataType === 'processo') {
          setProcesso(response.data)
        }
        return
      })
    } catch (error) {
      console.log('Erro ao buscar dados', error)
    }
    fetchProcesso()
  }

  const fetchProcesso = async () => {
    await api.get('/processo').then(response => {
      setProcesso(response.data)
    }).catch(error => {
      console.error('Erro eu pegar dados de processo', error)
    })
  }
  useEffect(() => {
    fetchData()
  }, [dataType, columns])


  if (dataType) {
    fetchData()
  }

  console.log(areaAchado)

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

  const handleDataTypeChange = (event: { target: { value: any; }; }) => {
    setDataType(event.target.value)
  };

  const handleSearchPessoa = (event: { target: { value: any } }) => {
    setSearchPessoa(event.target.value)
  };
  const handleSearchProcesso = (event: { target: { value: any } }) => {
    setSearchProcesso(event.target.value)
  };

  const handleBusca = async () => {
    if (searchPessoa !== '' && searchProcesso === '') {
      await api.get(`/${dataType}/pessoa/${searchPessoa}`).then((response) => {
        setInteressado(response.data)
      }).catch(error => {
        console.error('Erro ao buscar dados', error)
      })
    }else if (searchProcesso !== '' && searchPessoa === '') {
      await api.get(`/${dataType}/processo/${searchProcesso}`).then((response) => {
        setInteressado(response.data)
      }).catch(error => {
        console.error('Erro ao buscar dados', error)
      })
    }else if(searchProcesso === '' && searchPessoa === ''){
      TypeInfo('Selecione um campo')
    }else{
      TypeInfo('Os dois campos estão preenchidos, preencha apenas um deles')
    }
  }

  const cleanInput = () => {
    setSearchPessoa('')
    setSearchProcesso('')
    return
  }

  const optionsSelect = [
    { value: 'pessoafisica', string: 'Pessoa Física' },
    { value: 'achado', string: 'Achado' },
    { value: 'div-area-achado', string: 'Divisão da área do achado' },
    { value: 'area-achado', string: 'Area do Achado' },
    { value: 'nat-achado', string: 'Natureza do Achado' },
    { value: 'interessado', string: 'Interessado' },
    { value: 'jurisd', string: 'Jurisdicionado' },
    { value: 'jurisd-jurisd', string: 'Jurisd-jurisd' },
    { value: 'processo', string: 'Processo' },
    { value: 'apenso', string: 'Apenso' },
    { value: 'procurador', string: 'Procurador' },
    { value: 'relator', string: 'Relator' },
  ]

  return (
    <Paper sx={{ maxWidth: 'calc(100vw - 300px)', overflow: 'hidden' }}>
      <Typography
        gutterBottom
        variant='h5'
        component='div'
        sx={{ padding: '20px' }}>
        Base de dados Secex
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Select value={dataType} onChange={handleDataTypeChange} sx={{ ml: '20px', mb: '10px' }}>
          {optionsSelect.map((option) => (
            <MenuItem value={option.value}>{option.string}</MenuItem>
          ))}
        </Select>
        {dataType === 'interessado' && (
          <Box sx={{ alignItems: 'bottom' }}>
            <FormControl variant="standard" sx={{ m: 1, ml: 3, minWidth: 122 }}>
              <InputLabel id="label-pesoafisica">Pessoa Física</InputLabel>
              <Select value={searchPessoa} onChange={handleSearchPessoa} labelId="label-pesoafisica" >
                {pessoaFisica.map((option) => (
                  <MenuItem key={option.id} value={option.id}>{option.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, ml: 3, minWidth: 122 }}>
              <InputLabel id="label-processo">n do processo</InputLabel>
              <Select value={searchProcesso} onChange={handleSearchProcesso} labelId="label-processo" >
                {processo.map((option) => (
                  <MenuItem key={option.id} value={option.id}>{option.numero}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {(searchProcesso !== '' || searchPessoa !== '') && (
              <Button variant="outlined" sx={{ height: 20, mt: '27px', width: 10 }} color='error' onClick={cleanInput} >Limpar</Button>
            )}
            <Button variant="outlined" sx={{ ml:2,height: 30, mt: '27px' }} onClick={handleBusca} >Buscar</Button>
          </Box>
        )}
      </Box>
      <Divider />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {dataType === 'pessoafisica' && (
                pessoaFisicaHeader.map((pf) => (
                  <TableCell
                    id={pf.id}
                    align={'left'}
                    style={{ minWidth: 150, backgroundColor: '#e2e8f0' }}
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
                    style={{ minWidth: 150, backgroundColor: '#e2e8f0' }}
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
                    style={{ minWidth: 150, backgroundColor: '#e2e8f0' }}
                  >
                    {p.label}
                  </TableCell>
                ))
              )}
              {dataType === 'nat-achado' && (
                natAchadoHeader.map((p) => (
                  <TableCell
                    id={p.id}
                    align={'left'}
                    style={{ minWidth: 150, backgroundColor: '#e2e8f0' }}
                  >
                    {p.label}
                  </TableCell>
                ))
              )}
              {dataType === 'div-area-achado' && (
                divAreaAchadoHeader.map((p) => (
                  <TableCell
                    id={p.id}
                    align={'left'}
                    style={{ minWidth: 150, backgroundColor: '#e2e8f0' }}
                  >
                    {p.label}
                  </TableCell>
                ))
              )}
              {dataType === 'area-achado' && (
                areaAchadoHeader.map((p) => (
                  <TableCell
                    id={p.id}
                    align={'left'}
                    style={{ minWidth: 150, backgroundColor: '#e2e8f0' }}
                  >
                    {p.label}
                  </TableCell>
                ))
              )}
              {dataType === 'achado' && (
                achadoHeader.map((p) => (
                  <TableCell
                    id={p.id}
                    align={'left'}
                    style={{ minWidth: 150, backgroundColor: '#e2e8f0' }}
                  >
                    {p.label}
                  </TableCell>
                ))
              )}
              {dataType === 'jurisd' && (
                jurisdHeader.map((p) => (
                  <TableCell
                    id={p.id}
                    align={'left'}
                    style={{ minWidth: 150, backgroundColor: '#e2e8f0' }}
                  >
                    {p.label}
                  </TableCell>
                ))
              )}
              {dataType === 'processo' && (
                processoHeader.map((p) => (
                  <TableCell
                    id={p.id}
                    align={'left'}
                    style={{ minWidth: 150, backgroundColor: '#e2e8f0' }}
                  >
                    {p.label}
                  </TableCell>
                ))
              )}
              {dataType === 'interessado' && (
                interessadoHeader.map((p) => (
                  <TableCell
                    id={p.id}
                    align={'left'}
                    style={{ minWidth: 150, backgroundColor: '#e2e8f0' }}
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
            {dataType === 'nat-achado' && (
              natAchado.map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  <TableCell align="left">{row.descricao}</TableCell>
                </TableRow>
              )))}
            {dataType === 'div-area-achado' && (
              divAreaAchado.map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  <TableCell align="left">{row.descricao}</TableCell>
                </TableRow>
              )))}
            {dataType === 'area-achado' && (
              areaAchado.map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  <TableCell align="left">{row.descricao}</TableCell>
                </TableRow>
              )))}
            {dataType === 'achado' && (
              achado.map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  <TableCell align="left">{row.titulo}</TableCell>
                  <TableCell align="left">{row.texto}</TableCell>
                  <TableCell align="left">{row.criterio}</TableCell>
                  <TableCell align="left">{row.ativo}</TableCell>
                </TableRow>
              )))}
            {dataType === 'jurisd' && (
              jurisd.map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  <TableCell align="left">{row.nome}</TableCell>
                  <TableCell align="left">{row.sigla}</TableCell>
                  <TableCell align="left">{row.cnpj}</TableCell>
                  <TableCell align="left">{row.ug}</TableCell>
                  <TableCell align="left">{row.cep}</TableCell>
                  <TableCell align="left">{row.logradouro}</TableCell>
                  <TableCell align="left">{row.complemento}</TableCell>
                  <TableCell align="left">{row.numero}</TableCell>
                  <TableCell align="left">{row.cidade}</TableCell>
                  <TableCell align="left">{row.telefone1}</TableCell>
                  <TableCell align="left">{row.telefone2}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.site}</TableCell>
                  <TableCell align="left">{row.cargoGestor}</TableCell>
                  <TableCell align="left">{row.normaCriacao}</TableCell>
                  <TableCell align="left">{row.dataCriacao}</TableCell>
                  <TableCell align="left">{row.normaExtincao}</TableCell>
                  <TableCell align="left">{row.dataExtincao}</TableCell>
                  <TableCell align="left">{row.poder}</TableCell>
                  <TableCell align="left">{row.ativo}</TableCell>
                </TableRow>
              )))}
            {dataType === 'processo' && (
              processo.map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  <TableCell align="left">{row.numero}</TableCell>
                  <TableCell align="left">{row.ano}</TableCell>
                  <TableCell align="left">{row.natureza}</TableCell>
                  <TableCell align="left">{row.exercicio}</TableCell>
                  <TableCell align="left">{row.objeto}</TableCell>
                  <TableCell align="left">{row.arquivamento}</TableCell>
                </TableRow>
              )))}
            {dataType === 'interessado' && (
              interessado.map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  <TableCell key={row.id} align="left">{row.interesse}</TableCell>
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