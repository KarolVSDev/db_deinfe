import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import validator from 'validator'
import { useForm } from 'react-hook-form';
import { Apenso, Jurisd, PessoaFisica, PessoaJurisd, Processo, Procurador, Relator } from '../../types/types'
import { api } from '../../service/api';
import { TypeInfo } from '../../hooks/TypeAlert';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SearchParams from '../Inputs/SearchParams';
import { useContextTable } from '../../context/TableContext';
import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSlots, AccordionSummary, Autocomplete, Fade, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormApenso from './FormApenso';


const FormProcesso = () => {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Processo>({});
  const { arrayPessoaFisica, arrayJurisd, arrayRelator, arrayProcurador} = useContextTable()
  const [expanded, setExpanded] = React.useState(false);

  const formatDate = (data: string) => {
    const partes = data.split('/');
    const dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;
    return dataFormatada;
  }
  
  const onSubmit = (data: Processo) => {
    let dataArq = data.arquivamento;
    data.arquivamento = formatDate(dataArq)
    console.log(data)
    api.post('/processo', data).then(response => {
      TypeInfo(response.data.message, 'success')
    }).catch((error) => {
      TypeInfo(error.response.data.message, 'warning');
    })
  }

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
      <CssBaseline />
      <Box
        sx={{

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, width: '700px' }}>
          <Grid container spacing={3} sx={{ pb: 1 }} >
            <Grid item xs={3} >
              <TextField
                variant='filled'
                autoComplete="given-name"
                type="text"
                required
                fullWidth
                id="numero"
                label="Número"
                autoFocus
                error={errors?.numero?.type === 'required'}
                {...register('numero', {
                  required: 'Campo obrigatório', maxLength: {
                    value: 5,
                    message: 'Tamanho inválido' 
                  }, 
                  minLength: {
                    value: 5,
                    message: 'Tamanho inválido' 
                  }, 
                  pattern: {
                    value: /^\d+$/,
                    message: 'Apenas números'
                  }
                })}
              />
              {errors?.numero && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px', mb: 0 }}>
                  {errors.numero?.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3} >
              <TextField
                variant='filled'
                autoComplete="given-name"
                required
                fullWidth
                id="ano"
                label="Ano"
                type="text"
                autoFocus
                error={!!errors?.ano}
                {...register("ano", {
                  required: 'Campo obrigatório', 
                  maxLength: {
                    value: 4,
                    message: 'Tamanho inválido' 
                  }, 
                  minLength: {
                    value: 4,
                    message: 'Tamanho inválido' 
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: 'Apenas Números'
                  }
                })}
              />

              {errors?.ano && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.ano.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant='filled'
                required
                fullWidth
                id="natureza"
                label="Natureza"
                type="text"
                error={!!errors?.natureza}
                {...register('natureza', {
                  required: 'Campo obrigatório',
                  pattern: {
                    value: /^([A-Z][a-zÀ-ú]*)(\s[A-Z][a-zÀ-ú]*)*$/,
                    message: 'Natureza inválida'
                  }
                })}
              />

              {errors?.natureza && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.natureza.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant='filled'
                required
                fullWidth
                id="exercicio"
                label="Exercício"
                type="text"
                error={!!errors?.exercicio}
                {...register('exercicio', {
                  required: 'Campo obrigatório',
                   maxLength: {
                    value: 4,
                    message: 'Tamanho inválido'
                  },
                   minLength: {
                    value: 4,
                    message: 'Tamanho inválido'
                  },
                  pattern: {
                    value: /^([A-Z][a-zÀ-ú]*)(\s[A-Z][a-zÀ-ú]*)*$/,
                    message: 'Exercício inválido'
                  }
                })}
              />

              {errors?.exercicio && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.exercicio.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant='filled'
                required
                fullWidth
                id="objeto"
                label="Objeto"
                type="text"
                error={!!errors?.objeto}
                {...register('objeto', {
                  required: 'Campo obrigatório',
                })}
              />

              {errors?.objeto && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.objeto.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant='filled'
                required
                placeholder='xx/xx/xxxx'
                fullWidth
                id="arquivamento"
                label="Arquivamento"
                type="text"
                error={!!errors?.arquivamento}
                {...register('arquivamento', {
                  required: 'Campo obrigatório', pattern: {
                    value: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                    message: 'Data inválida'
                  }
                })}
              />

              {errors?.arquivamento && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.arquivamento.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={arrayJurisd}
                getOptionLabel={(option: Jurisd) => option.nome}
                onChange={(event, value) => setValue('jurisd', value?.id ?? '')}
                renderInput={(params) => <TextField variant='filled' {...params} label="Unidade Gestora" />}
              />
              {errors.jurisd && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.jurisd.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3} >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={arrayRelator}
                getOptionLabel={(option: Relator) => option.nome}
                onChange={(event, value) => setValue('relator', value?.id ?? '')}
                renderInput={(params) => <TextField variant='filled' {...params} label="Relator"/>}
              />
            </Grid>
            <Grid item xs={3} >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={arrayProcurador}
                getOptionLabel={(option: Procurador) => option.nome}
                onChange={(event, value) => setValue('procurador', value?.id ?? '')}
                renderInput={(params) => <TextField variant='filled' {...params} label="Procurador" />}
              />
            </Grid>
            <Grid item xs={3} >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={arrayPessoaFisica}
                getOptionLabel={(option: PessoaFisica) => option.nome}
                onChange={(event, value) => setValue('advogado', value?.id ?? '')}
                renderInput={(params) => <TextField variant='filled' {...params} label="Advogado" />}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: 'rgb(17 24 39)', '&:hover': {
                bgcolor: '#1e293b',
              }, width: '200px', m: 'auto', mt: 3, display: 'flex'
            }}
          >
            Registrar
          </Button>
        </Box>
      </Box>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade as AccordionSlots['transition'] }}
        slotProps={{ transition: { timeout: 500 } }}
        sx={{
          width: '100%', mt: 4,
          '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
          '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Apenso</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormApenso />
        </AccordionDetails>
      </Accordion>
    </Container>
  )
}

export default FormProcesso;


