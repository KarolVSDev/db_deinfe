
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

  const { register, handleSubmit, setValue, formState: { errors }, reset} = useForm<PessoaJurisd>({});
  const { arrayPessoaFisica, arrayJurisd } = useContextTable()

  const onSubmit = (data: PessoaJurisd) => {
    api.post('/pessoajurisd', data).then(response => {
      TypeAlert(response.data.message, 'success')
      reset()
    }).catch((error) => {
      TypeAlert(error.response.data.message, 'warning');
    })
  }

  return (
    <Container maxWidth="sm" sx={{ mb: 2,}}>
      <CssBaseline />
      <Box
        sx={{

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" name='formPessoaJurisd' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, width: '700px', pl: 3, pr:3 }}>
          <Grid container spacing={3} sx={{ pr:3, pl:3 }} >
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
                  required: 'Campo obrigatório'
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
                  required: 'Campo obrigatório'
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
                  required: 'Campo obrigatório'
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
                id="dataNomeacao"
                label="Data da Nomeação"
                InputLabelProps={{shrink:true}}
                type="date"
                error={!!errors?.dataNomeacao}
                {...register('dataNomeacao', {
                  required: 'Campo obrigatório'
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
                  required: 'Campo obrigatório'
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
                id="dataExoneracao"
                label="Data da Exoneração"
                InputLabelProps={{shrink:true}}
                type="date"
                error={!!errors?.dataExoneracao}
                {...register('dataExoneracao', {
                  required: 'Campo obrigatório'
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
            <Grid item >
              <RegisterButton text="Registrar" />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default FormPessoaJurisd;


