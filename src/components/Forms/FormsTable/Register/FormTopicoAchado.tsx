import { Box, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { TopicoAchado } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { useContextTable } from '../../../../context/TableContext';


const FormTopicoAchado = () => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm<TopicoAchado>({});
  const { setArrayTopicoAchado } = useContextTable()
  const onSubmit = (data: TopicoAchado) => {
    api.post('/nat-achado', data).then(response => {
      const newTopicoAchado = response.data.natachado
      console.log(newTopicoAchado)
      TypeAlert(response.data.message, 'success');
      reset()
      setArrayTopicoAchado(prevArray => [...prevArray, newTopicoAchado])
    }).catch((error) => {
      TypeAlert(error.response.data.message, 'warning');
    });

  };

  return (
    <Box component="form" name='formTopicoAchado' noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12} sm={4}>
        <TextField
          variant='filled'
          required
          fullWidth
          autoFocus
          id="descricao"
          label='Tópico do Achado'
          type="text"
          error={!!errors?.descricao}
          {...register('descricao', {
            required: 'Campo obrigatório'
          })}
        />

        {errors?.descricao && (
          <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
            {errors.descricao.message}
          </Typography>
        )}

      </Grid>
      <RegisterButton text="Registrar" />
    </Box>
  );
}

export default FormTopicoAchado;
