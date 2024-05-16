import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { Achado, Jurisd, PessoaFisica } from '../../types/types'
import { api } from '../../service/api';
import { TypeInfo } from '../../hooks/TypeAlert';
import { useContextTable } from '../../context/TableContext';
import { Autocomplete } from '@mui/material';
import RegisterButton from '../Buttons/RegisterButton';


const FormPessoaJurisd = () => {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Achado>({});
//   const { arrayPessoaFisica, arrayJurisd } = useContextTable()

  const onSubmit = (data: Achado) => {
    console.log(data)
    // api.post('/pessoajurisd', data).then(response => {
    //   TypeInfo(response.data.message, 'success')
    // }).catch((error) => {
    //   TypeInfo(error.response.data.message, 'warning');
    // })
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
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, width: '700px', p:2 }}>
          <Grid container spacing={3} sx={{ pb: 1 }} >
            <Grid item xs={3} >
              <TextField
                variant='filled'
                autoComplete="given-name"
                type="text"
                required
                fullWidth
                id="titulo"
                label="Título"
                autoFocus
                error={errors?.titulo?.type === 'required'}
                {...register('titulo', {
                  required: 'Campo obrigatório',
                })}
              />
              {errors?.titulo && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px', mb: 0 }}>
                  {errors.titulo?.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3} >
              <TextField
                variant='filled'
                autoComplete="given-name"
                required
                fullWidth
                id="texto"
                label="Texto"
                type="text"
                autoFocus
                error={!!errors?.texto}
                {...register("texto", {
                  required: 'Campo obrigatório'
                })}
              />
              {errors?.texto && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.texto.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant='filled'
                required
                fullWidth
                id="criterio"
                label="Critério"
                type="text"
                error={!!errors?.criterio}
                {...register('criterio', {
                  required: 'Campo obrigatório',
                  pattern: {
                    value: /^([A-Z][a-zÀ-ú]*)(\s[A-Z][a-zÀ-ú]*)*$/,
                    message: 'criterio inválido'
                  }
                })}
              />
              {errors?.criterio && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.criterio.message}
                </Typography>
              )}
           </Grid>
          </Grid>
          <RegisterButton/>
        </Box>
      </Box>
    </Container>
  )
}

export default FormPessoaJurisd;


