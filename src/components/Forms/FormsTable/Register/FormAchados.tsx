import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { Achado, DivAchado } from '../../../../types/types'
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import { useContextTable } from '../../../../context/TableContext';
import { Autocomplete } from '@mui/material';
import RegisterButton from '../../../Buttons/RegisterButton';


const FormAchado = () => {

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<Achado>({});
  const { arrayDivAchado } = useContextTable()

  const onSubmit = (data: Achado) => {
    api.post('/achado', data).then(response => {
      TypeAlert(response.data.message, 'success')
      reset()
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
        <Box component="form" name='formAchados' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ width: '360px' }}>
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


          <TextField
            variant='filled'
            autoComplete="given-name"
            required
            fullWidth
            id="texto"
            label="Texto"
            type="text"
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
            })}
          />
          {errors?.criterio && (
            <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
              {errors.criterio.message}
            </Typography>
          )}


          <TextField
            variant='filled'
            required
            fullWidth
            id="ativo"
            label="Ativo"
            type="text"
            error={!!errors?.ativo}
            {...register('ativo', {
              required: 'Campo obrigatório', pattern: {
                value: /^(S|N)$/,
                message: 'Valor do campo inválido'
              }
            })}
          />
          {errors?.ativo && (
            <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
              {errors.ativo.message}
            </Typography>
          )}



          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={arrayDivAchado}
            getOptionLabel={(option: DivAchado) => option.descricao}
            onChange={(event, value) => setValue('divisao', value?.id ?? '')}
            renderInput={(params) => <TextField variant='filled' {...params} label="Divisão" />}
          />


          <RegisterButton text="Registrar" />
        </Box>
      </Box>
    </Container>
  )
}

export default FormAchado;


