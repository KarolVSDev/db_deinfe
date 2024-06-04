
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useForm } from 'react-hook-form';
import { Jurisd, PessoaFisica, PessoaJurisd } from '../../../../types/types'
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import { useContextTable } from '../../../../context/TableContext';
import { Autocomplete } from '@mui/material';
import RegisterButton from '../../../Buttons/RegisterButton';


const FormPessoaJurisd = () => {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PessoaJurisd>({});
  const { arrayPessoaFisica, arrayJurisd } = useContextTable()

  const formatDate = (data: string) => {
    const partes = data.split('/');
    const dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;
    return dataFormatada;
  }

  const onSubmit = (data: PessoaJurisd) => {
    let Ndata = formatDate(data.dataNomeacao)
    let Edata = formatDate(data.dataExoneracao)
    data.dataNomeacao = Ndata
    data.dataExoneracao = Edata
    api.post('/pessoajurisd', data).then(response => {
      TypeAlert(response.data.message, 'success')
    }).catch((error) => {
      TypeAlert(error.response.data.message, 'warning');
    })
  }

  return (
    <Container maxWidth="xs" sx={{ mb: 2 }}>
      <CssBaseline />
      <Box
        sx={{

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" name='formPessoaJurisd' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, width: '700px', p: 2 }}>
          <Grid container spacing={3} sx={{ pb: 1 }} >
            <Grid item xs={12} sm={4} >
              <TextField
                variant='filled'
                autoComplete="given-name"
                type="text"
                required
                fullWidth
                id="gestor"
                label="Gestor"
                autoFocus
                error={errors?.gestor?.type === 'required'}
                {...register('gestor', {
                  required: 'Campo obrigatório', pattern: {
                    value: /^[A-Z]$/,
                    message: 'Gestor inválido'
                  }
                })}
              />
              {errors?.gestor && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px', mb: 0 }}>
                  {errors.gestor?.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={4} >
              <TextField
                variant='filled'
                autoComplete="given-name"
                required
                fullWidth
                id="cargo"
                label="Cargo"
                type="text"
                error={!!errors?.cargo}
                {...register("cargo", {
                  required: 'Campo obrigatório', pattern: {
                    value: /^([A-Z][a-zÀ-ú]*)(\s[A-Z][a-zÀ-ú]*)*$/,
                    message: 'Cargo inválido'
                  }
                })}
              />

              {errors?.cargo && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.cargo.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                variant='filled'
                required
                fullWidth
                id="mandato"
                label="Mandato"
                type="text"
                error={!!errors?.mandato}
                {...register('mandato', {
                  required: 'Campo obrigatório',
                  pattern: {
                    value: /^([A-Z][a-zÀ-ú]*)(\s[A-Z][a-zÀ-ú]*)*$/,
                    message: 'Mandato inválido'
                  }
                })}
              />

              {errors?.mandato && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.mandato.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant='filled'
                required
                fullWidth
                id="normaNomeacao"
                label="Nomeação"
                type="text"
                error={!!errors?.normaNomeacao}
                {...register('normaNomeacao', {
                  required: 'Campo obrigatório',
                  pattern: {
                    value: /^([A-Z][a-zÀ-ú]*)(\s[A-Z][a-zÀ-ú]*)*$/,
                    message: 'Nomeação inválida'
                  }
                })}
              />

              {errors?.normaNomeacao && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.normaNomeacao.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                variant='filled'
                required
                fullWidth
                placeholder='xx/xx/xxxx'
                id="dataNomeacao"
                label="Data da Nomeação"
                type="text"
                error={!!errors?.dataNomeacao}
                {...register('dataNomeacao', {
                  required: 'Campo obrigatório', pattern: {
                    value: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                    message: 'Data inválida'
                  }
                })}
              />

              {errors?.dataNomeacao && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.dataNomeacao.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                variant='filled'
                required
                fullWidth
                id="normaExoneracao"
                label="Exoneração"
                type="text"
                error={!!errors?.normaExoneracao}
                {...register('normaExoneracao', {
                  required: 'Campo obrigatório', pattern: {
                    value: /^([A-Z][a-zÀ-ú]*)(\s[A-Z][a-zÀ-ú]*)*$/,
                    message: 'Exoneração inválida'
                  }
                })}
              />

              {errors?.normaExoneracao && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.normaExoneracao.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                variant='filled'
                required
                fullWidth
                placeholder='xx/xx/xxx'
                id="dataExoneracao"
                label="Data da Exoneração"
                type="text"
                error={!!errors?.dataExoneracao}
                {...register('dataExoneracao', {
                  required: 'Campo obrigatório', pattern: {
                    value: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                    message: 'Data inválida'
                  }
                })}
              />

              {errors?.dataExoneracao && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.dataExoneracao.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={arrayPessoaFisica}
                getOptionLabel={(option: PessoaFisica) => option.nome}
                onChange={(event, value) => setValue('pessoa', value?.id)}
                renderInput={(params) => <TextField variant='filled' {...params} label="Pessoa Física" />}
              />
            </Grid>
            <Grid item xs={12} sm={4} >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={arrayJurisd}
                getOptionLabel={(option: Jurisd) => option.nome}
                onChange={(event, value) => setValue('jurisd', value?.id ?? '')}
                renderInput={(params) => <TextField variant='filled' {...params} label="Unidade Gestora" />}
              />
            </Grid>
          </Grid>
          <RegisterButton text="Registrar"/>
        </Box>
      </Box>
    </Container>
  )
}

export default FormPessoaJurisd;


