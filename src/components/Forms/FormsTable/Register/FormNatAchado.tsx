import { Box, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { NatAchado } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { useContextTable } from '../../../../context/TableContext';


const FormNatAchado = () => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm<NatAchado>({});
  const { setArrayNatAchado } = useContextTable()
  const onSubmit = (data: NatAchado) => {
    api.post('/nat-achado', data).then(response => {
      const newNatAchado = response.data.natachado
      console.log(newNatAchado)
      TypeAlert(response.data.message, 'success');
      reset()
      setArrayNatAchado(prevArray => [...prevArray, newNatAchado])
    }).catch((error) => {
      TypeAlert(error.response.data.message, 'warning');
    });

  };

  return (
    <Box component="form" name='formNatAchado' noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12} sm={4}>
        <TextField
          variant='filled'
          required
          fullWidth
          autoFocus
          id="descricao"
          label='Natureza do Achado'
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

export default FormNatAchado;
