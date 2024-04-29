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
  PessoaJurisd
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
  interessadoHeader,
  pessoaJurisdHeader
} from '../../../service/columns';
import { TypeInfo } from '../../../hooks/TypeAlert';
import { useContextTable } from '../../../context/TableContext';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left';
}


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
 
  
  //função pra resgatar os dados da api
  const entidades = ['interessado', 'pessoajurisd']
  const fetchData = async ()  => {
    entidades.map((entidade):any => {
      if(dataType !== entidade){
        if(dataType === 'pessoafisica'){
          api.get(`/${dataType}`).then(response => {
            setPessoaFisica(response.data)
          })
        }else if(dataType === 'procurador'){
          api.get(`/${dataType}`).then(response => {
            setProcurador(response.data)
          })
        }else if(dataType === 'relator'){
          api.get(`/${dataType}`).then(response => {
            setRelator(response.data)
          })
        }else if (dataType === 'nat-achado') {
          api.get(`/${dataType}`).then(response => {
            setNatAchado(response.data)
          })
        }else if(dataType === 'div-area-achado'){
          api.get(`/${dataType}`).then(response => {
            setDivAreaAchado(response.data)
          })
        }else if(dataType === 'area-achado'){
          api.get(`/${dataType}`).then(response => {
            setAreaAchado(response.data)
          })
        }else if(dataType === 'achado'){
          api.get(`/${dataType}`).then(response => {
            setAchado(response.data)
          })
        }else if(dataType === 'jurisd'){
          api.get(`/${dataType}`).then(response => {
            setJurisd(response.data)
          })
        }else if(dataType === 'processo'){
          api.get(`/${dataType}`).then(response  => {
            setProcesso(response.data)
          })
        }
      }
      fetchProcesso()
    }
  )
}
  //resgata dados para os inputs da table interessado
  const fetchProcesso = async () => {
    if(dataType == 'interessado'){
      await api.get('/processo').then(response => {
        setProcesso(response.data)
      }).catch(error => {
        console.error('Erro eu pegar dados de processo', error)
      })
    }else if(dataType === 'pessoajurisd'){
      await api.get('/jurisd').then(response => {
        setJurisd(response.data)
      }).catch(error => {
        console.error('Erro eu pegar dados de jurisd', error)
      })
    }
  }


  useEffect(() => {
    fetchData()
  }, [dataType])


  if (dataType) {
    fetchData()
  }

  //lida com as páginas
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //controle dos botões de update e delete
  const handleEdit = (id: string) => {
    // Lógica para editar a pessoa com o ID fornecido
    console.log("Editar", id);
  };

  const handleDelete = (id: string) => {
    // Lógica para excluir a pessoa com o ID fornecido
    console.log("Excluir", id);
  };

  //armazenam os valores dos inputs
  const handleDataTypeChange = (event: { target: { value: any; }; }) => {
    setDataType(event.target.value)
  };
  const handleSearchPessoa = (event: { target: { value: any } }) => {
    setSearchPessoa(event.target.value)
  };
  const handleSearchJurisd = (event: { target: { value: any } }) => {
    setSearchJurisd(event.target.value)
  };
  const handleSearchProcesso = (event: { target: { value: any } }) => {
    setSearchProcesso(event.target.value)
  };

  //lida com as buscas do usuário
  const handleBusca = async () => {
    if(dataType === 'interessado'){
      if (searchPessoa !== '' && searchProcesso === '') {
        await api.get(`/${dataType}/pessoa/${searchPessoa}`).then((response) => {
          console.log(response.data)
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
        TypeInfo('Selecione um campo', 'info')
      }else{
        TypeInfo('Os dois campos estão preenchidos, preencha apenas um deles', 'info')
      }
    }

    if(dataType === 'pessoajurisd'){
      if (searchPessoa !== '' && searchJurisd === '') {
        await api.get(`/${dataType}/pessoa/${searchPessoa}`).then((response) => {
          const data = response.data
          setPessoaJurisd(data.result)
        }).catch(error => {
          console.error('Erro ao buscar dados', error)
        })
      }else if (searchJurisd !== '' && searchPessoa === '') {
        await api.get(`/${dataType}/jurisd/${searchJurisd}`).then((response) => {
          const data = response.data
          setPessoaJurisd(data.result)
        }).catch(error => {
          console.error('Erro ao buscar dados', error)
        })
      }else if(searchJurisd === '' && searchPessoa === ''){
        TypeInfo('Selecione um campo', 'info')
      }else{
        TypeInfo('Os dois campos estão preenchidos, preencha apenas um deles', 'info')
      }
      console.log(pessoaJurisd)
    }
  }

    
  const cleanInput = () => {
    setSearchPessoa('')
    setSearchProcesso('')
    setSearchJurisd('')
    return
  }

  const optionsSelect = [
    { value: 'pesquisa', string: 'Pesquisa' },
    { value: 'pessoafisica', string: 'Pessoa Física' },
    { value: 'pessoajurisd', string: 'Pessoa Jurisdicionada' },
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
    <Paper sx={{ maxWidth: 'calc(100vw - 300px)', overflow: 'hidden',  }}>
      <Typography
        gutterBottom
        variant='h5'
        component='div'
        sx={{ padding: '20px' }}>
        Base de dados Secex
      </Typography>
      <Box sx={{ display: 'flex'}}>
        <Select value={dataType} onChange={handleDataTypeChange} sx={{ ml: '20px', mb: '10px', height:30, mt:'25px' }}>
          {optionsSelect.map((option) => (
            <MenuItem value={option.value} disabled = {option.value === 'pesquisa'}>{option.string}</MenuItem>
          ))}
        </Select>
        {dataType === 'interessado' && (
          <Box sx={{ alignItems: 'bottom' }}>
            <FormControl variant="standard" sx={{ m: 1, ml: 3, minWidth: 122 }}>
              <InputLabel id="label-pesoafisica">Pessoa Física</InputLabel>
              <Select value={searchPessoa} onChange={handleSearchPessoa} labelId="label-pesoafisica" >
                {pessoaFisica.map((option) => (
                  <MenuItem key={option.id} value={option.id} >{option.nome}</MenuItem>
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
        {dataType === 'pessoajurisd' && (
          <Box sx={{ alignItems: 'bottom' }}>
            <FormControl variant="standard" sx={{ m: 1, ml: 3, minWidth: 122 }}>
              <InputLabel id="label-pesoafisica">Pessoa Física</InputLabel>
              <Select value={searchPessoa} onChange={handleSearchPessoa} labelId="label-pesoafisica" >
                {pessoaFisica.map((option) => (
                  <MenuItem key={option.id} value={option.id}>{option.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, ml: 3, minWidth: 124 }}>
              <InputLabel id="label-processo">Jurisdicionado</InputLabel>
              <Select value={searchJurisd} onChange={handleSearchJurisd} labelId="label-processo" >
                {jurisd.map((option) => (
                  <MenuItem key={option.id} value={option.id}>{option.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {(searchJurisd !== '' || searchPessoa !== '') && (
              <Button variant="outlined" sx={{ height: 20, mt: '27px', width: 10 }} color='error' onClick={cleanInput} >Limpar</Button>
            )}
            <Button variant="outlined" sx={{ ml:2,height: 30, mt: '27px' }} onClick={handleBusca} >Buscar</Button>
          </Box>
        )}
        {dataType === 'pessoafisica' && (
          <Box sx={{ alignItems: 'bottom' }}>
            <FormControl variant="standard" sx={{ m: 1, ml: 3, minWidth: 122 }}>
              <InputLabel id="label-pesoafisica">Tipo</InputLabel>
              <Select value={searchTipo} onChange={handleBusca} labelId="label-pesoafisica" >
                {pessoaFisica.map((option) => (
                  <MenuItem key={option.id} value={option.id}>{option.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, ml: 3, minWidth: 124 }}>
              <InputLabel id="label-processo">Jurisdicionado</InputLabel>
              <Select value={searchJurisd} onChange={handleSearchJurisd} labelId="label-processo" >
                {jurisd.map((option) => (
                  <MenuItem key={option.id} value={option.id}>{option.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {(searchJurisd !== '' || searchPessoa !== '') && (
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
              {dataType === 'pessoajurisd' && (
                pessoaJurisdHeader.map((p) => (
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
                  <TableCell align="left">{row.interesse}</TableCell>
                </TableRow>
              )))}
            {dataType === 'pessoajurisd' && (
              pessoaJurisd.map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  <TableCell align="left">{row.cargo}</TableCell>
                  <TableCell align="left">{row.mandato}</TableCell>
                  <TableCell align="left">{row.normaNomeacao}</TableCell>
                  <TableCell align="left">{row.dataNomeacao}</TableCell>
                  <TableCell align="left">{row.normaExoneracao}</TableCell>
                  <TableCell align="left">{row.dataExoneracao}</TableCell>
                  <TableCell align="left">{row.gestor}</TableCell>
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