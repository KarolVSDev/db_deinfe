import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { TopicoAchado } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { useContextTable } from '../../../../context/TableContext';
import dataFake from '../../../../service/dataFake'

const FormTopicoAchado = () => {
  const { handleSubmit, register, formState: { errors }, reset, setValue } = useForm<TopicoAchado>({});
  //const { setArrayTopicoAchado } = useContextTable()
  const { saveTopico } = dataFake()

  const onSubmit = (data: TopicoAchado) => {
    // api.post('/nat-achado', data).then(response => {
    //   const newTopicoAchado = response.data.natachado
    //   console.log(newTopicoAchado)
    //   
    //   setArrayTopicoAchado(prevArray => [...prevArray, newTopicoAchado])
    // }).catch((error) => {
    //   TypeAlert(error.response.data.message, 'warning');
    // });
    data.situacao = false;
    
    saveTopico(data)
    TypeAlert('Tópico adicionado', 'success');
    reset()
    console.log(data)


  };

  return (
    <Box component="form" name='formTopicoAchado' noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12} sm={4}>
        <TextField
          variant='filled'
          required
          fullWidth
          autoFocus
          id="topico"
          label='Proposta de Tópico'
          type="text"
          error={!!errors?.topico}
          {...register('topico', {
            required: 'Campo obrigatório'
          })}
        />

        {errors?.topico && (
          <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
            {errors.topico.message}
          </Typography>
        )}

        <input type="hidden"{...register('situacao')} value="false" />

      </Grid>
      <RegisterButton text="Registrar" />
    </Box>
  );
}

export default FormTopicoAchado;
