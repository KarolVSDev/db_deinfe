import { Box, Grid, Autocomplete, TextField, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { useForm } from 'react-hook-form';
import { Procurador } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';

const FormProcurador = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Procurador>({});
  const {getAllProcurador} = useContextTable()

  const onSubmit = (data: Procurador) => {
    api.post('/procurador', data).then(response => {
      TypeAlert(response.data.message, 'success');
      reset()
      getAllProcurador()
    }).catch((error) => {
      TypeAlert(error.response.data.message, 'warning');
    });
  };

  return (
    <Box component="form" name='formProcurador' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>

      <Grid item xs={12} sm={4}>
        <TextField
          variant='filled'
          required
          fullWidth
          autoFocus
          id="nome"
          label="Nome"
          type="text"
          error={!!errors?.nome}
          {...register('nome', {
            required: 'Campo obrigatório',
          })}
        />

        {errors?.nome && (
          <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
            {errors.nome.message}
          </Typography>
        )}

      </Grid>
      <RegisterButton text="Registrar"/>
    </Box>
  );
}

export default FormProcurador;
