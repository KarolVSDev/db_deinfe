import { Box, Grid, Autocomplete, TextField, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { useForm } from 'react-hook-form';
import { Procurador, Relator } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';

const FormRelator = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Relator>({});
  const {getAllRelator} = useContextTable()

  const onSubmit = (data: Relator) => {
    api.post('/relator', data).then(response => {
      TypeAlert(response.data.message, 'success');
      reset()
      getAllRelator()
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
      <Grid item xs={12} sm={4}>
        <TextField
          variant='filled'
          required
          fullWidth
          autoFocus
          id="cargo"
          label="Cargo"
          type="text"
          error={!!errors?.cargo}
          {...register('cargo', {
            required: 'Campo obrigatório', maxLength:{value:25, message:'O nome do cargo é grande demais'}
          })}
        />

        {errors?.cargo && (
          <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
            {errors.cargo.message}
          </Typography>
        )}
      </Grid>
      <RegisterButton text="Registrar"/>
    </Box>
  );
}

export default FormRelator;
