import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { Achado } from '../../../../types/types'
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import { useContextTable } from '../../../../context/TableContext';
import { Autocomplete } from '@mui/material';
import RegisterButton from '../../../Buttons/RegisterButton';
import dataFake from '../../../../service/dataFake';


const FormAchado = () => {

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<Achado>({});
  //const { setArrayAchado } = useContextTable()
  const { saveAchado } = dataFake()

  const onSubmit = (data: Achado) => {
    // api.post('/achado', data).then(response => {
    //   const newAchado = response.data.achado;
    //   TypeAlert(response.data.message, 'success')
    //   reset()
    //   setArrayAchado(prevArray => [...prevArray, newAchado])
    // }).catch((error) => {
    //   TypeAlert(error.response.data.message, 'warning');
    // })
    data.situacao = false
    saveAchado(data)
    TypeAlert('Achado adicionado', 'success');
    reset()

  }

  return (
        <Box component="form" name='formAchados' noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant='filled'
            autoComplete="given-name"
            type="text"
            required
            fullWidth
            id="achado"
            label="Achado"
            autoFocus
            error={errors?.achado?.type === 'required'}
            {...register('achado', {
              required: 'Campo obrigatório',
            })}
          />
          {errors?.achado && (
            <Typography variant="caption" sx={{ color: 'red', ml: '10px', mb: 0 }}>
              {errors.achado?.message}
            </Typography>
          )}

          <input type="hidden"{...register('situacao')} value="false" />

          <RegisterButton text="Registrar" />
        </Box>
  )
}

export default FormAchado;


