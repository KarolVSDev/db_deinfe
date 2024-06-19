import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { Jurisd, PessoaFisica, Processo, Procurador, Relator } from '../../../../types/types'
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import { useContextTable } from '../../../../context/TableContext';
import { Autocomplete} from '@mui/material';
import RegisterButton from '../../../Buttons/RegisterButton';



const FormProcesso = () => {

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<Processo>({});
  const { arrayPessoaFisica, arrayJurisd, arrayRelator, arrayProcurador, getAllProcesso } = useContextTable()
  const [expanded, setExpanded] = React.useState(false);


  const onSubmit = (data: Processo) => {
    api.post('/processo', data).then(response => {
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
        <Box component="form" name='formProcesso' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, width: '700px', p: 2 }}>
          <Grid container spacing={3} sx={{ pb: 1 }} >
            <Grid item xs={12} sm={4} >
              <TextField
                variant='filled'
                autoComplete="given-name"
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
                fullWidth
                id="arquivamento"
                label="Arquivamento"
                type="date"
                InputLabelProps={{ shrink: true }}
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
            <Grid item xs={12} sm={4}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={arrayJurisd}
                clearOnBlur
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
            <Grid item xs={12} sm={4} >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={arrayRelator}
                getOptionLabel={(option: Relator) => option.nome}
                onChange={(event, value) => setValue('relator', value?.id ?? '')}
                renderInput={(params) => <TextField variant='filled' {...params} label="Relator" />}
              />
            </Grid>
            <Grid item xs={12} sm={4} >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={arrayProcurador}
                getOptionLabel={(option: Procurador) => option.nome}
                onChange={(event, value) => setValue('procurador', value?.id ?? '')}
                renderInput={(params) => <TextField variant='filled' {...params} label="Procurador" />}
              />
            </Grid>
            <Grid item xs={12} sm={4} >
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
          <RegisterButton text="Registrar"/>
        </Box>
      </Box>
    </Container>
  )
}

export default FormProcesso;


