import { Box, Grid, Autocomplete, TextField, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { useForm } from 'react-hook-form';
import { Interessado, PessoaFisica, Processo } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { useState } from 'react';
import useFetchListData from '../../../../hooks/useFetchListData';

const FormInteresse = () => {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<Interessado>({});
  const { arrayProcesso, arrayPessoaFisica } = useContextTable();

  const onSubmit = (data: Interessado) => {
    api.post('/interessado', data).then(response => {
      TypeAlert(response.data.message, 'success');
      reset() 
    }).catch((error) => {
      TypeAlert(error.response.data.message, 'warning');
    });
  };

  return (
    <Box component="form" name='formInteresse' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, p:2 }}>

      <Grid item xs={12} sm={4}>
        <TextField
          variant='filled'
          required
          fullWidth
          autoFocus
          id="interesse"
          label="Interesse"
          type="text"
          error={!!errors?.interesse}
          {...register('interesse', {
            required: 'Campo obrigatório',
          })}
        />

        {errors?.interesse && (
          <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
            {errors.interesse.message}
          </Typography>
        )}

      </Grid>
      <Grid item xs={12} sm={4} >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={arrayProcesso}
          getOptionLabel={(option: Processo) => 'N.º ' + option.numero}
          onChange={(event, value) => setValue('processo', value?.id ?? '')}
          renderInput={(params) => <TextField variant='filled'  {...params} label="Processo" />}
        />
      </Grid>
      <Grid item xs={12} sm={4} >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={arrayPessoaFisica}
          getOptionLabel={(option: PessoaFisica) => option.nome}
          onChange={(event, value) => setValue('pessoa', value?.id ?? '')}
          renderInput={(params) => <TextField variant='filled' {...params} label="Pessoa Física" />}
        />
      </Grid>
      <RegisterButton text="Registrar"/>
    </Box>
  );
}

export default FormInteresse;
