import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { ProcessoUpdate } from '../../../../types/types'
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import { useContextTable } from '../../../../context/TableContext';
import RegisterButton from '../../../Buttons/RegisterButton';
import { GridRowId } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { formatToInputDate } from '../../../../hooks/DateFormate';
import useFetchListData from '../../../../hooks/useFetchListData';

interface FormProcessoProps {
  id?: GridRowId;
}

const FormUpdateProcesso: React.FC<FormProcessoProps> = ({ id }) => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProcessoUpdate>({});
  const { getAllProcesso } = useContextTable()
  const [expanded, setExpanded] = useState(false);
  const {processo, getOneProcesso} = useFetchListData(id)
  

  const onSubmit = (processo: ProcessoUpdate) => {
    api.patch(`/processo/${id}`, processo).then(response => {
      TypeAlert(response.data.message, 'success')
      reset()
      getAllProcesso()
    }).catch((error) => {
      TypeAlert(error.response.data.message, 'warning');
    })
  }

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  useEffect(() => {
    if (id) {
      getOneProcesso(id);
    }
  }, []);

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
      {processo && (
        <Box
          sx={{

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" name='formProcesso' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, width: '700px', p: 2 }}>
            <Typography variant='h5' sx={{ pb: 3, color: '#1e293b', fontWeight: 'bold' }}>Atualizar Registro de Processo</Typography>
            <Grid container spacing={3} sx={{ pb: 1 }} >
              <Grid item xs={12} sm={4} >
                <TextField
                  variant='filled'
                  autoComplete="given-name"
                  defaultValue={processo.numero}
                  type="text"
                  required
                  fullWidth
                  placeholder='xxxxx'
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
              <Grid item xs={12} sm={4} >
                <TextField
                  variant='filled'
                  autoComplete="given-name"
                  defaultValue={processo.ano}
                  required
                  fullWidth
                  placeholder='xxxx'
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

              <Grid item xs={12} sm={4}>
                <TextField
                  variant='filled'
                  required
                  defaultValue={processo.natureza}
                  fullWidth
                  id="natureza"
                  label="Natureza"
                  type="text"
                  error={!!errors?.natureza}
                  {...register('natureza', {
                    required: 'Campo obrigatório'
                  })}
                />

                {errors?.natureza && (
                  <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                    {errors.natureza.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant='filled'
                  required
                  fullWidth
                  defaultValue={processo.exercicio}
                  placeholder='Muni'
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

              <Grid item xs={12} sm={4}>
                <TextField
                  variant='filled'
                  required
                  defaultValue={processo.objeto}
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

              <Grid item xs={12} sm={4}>
                <TextField
                  variant='filled'
                  required
                  defaultValue={processo.arquivamento}
                  placeholder='xx/xx/xxxx'
                  fullWidth
                  id="arquivamento"
                  label="Arquivamento"
                  type="date"
                  error={!!errors?.arquivamento}
                  {...register('arquivamento', {
                    required: 'Campo obrigatório'
                  })}
                />

                {errors?.arquivamento && (
                  <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                    {errors.arquivamento.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <RegisterButton text="Atualizar" />
          </Box>
        </Box>
      )}
    </Container>
  )
}

export default FormUpdateProcesso;


