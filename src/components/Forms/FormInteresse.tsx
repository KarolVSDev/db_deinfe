import {  Button, Box, Grid, Autocomplete, TextField, Typography } from '@mui/material';
import { useContextTable } from '../../context/TableContext';
import { useForm } from 'react-hook-form';
import { Apenso, Interessado, PessoaFisica, Processo } from '../../types/types';
import { api } from '../../service/api';
import { TypeInfo } from '../../hooks/TypeAlert';
import RegisterButton from '../Buttons/RegisterButton';

const FormInteresse = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Interessado>({});
    const { arrayProcesso, arrayPessoaFisica } = useContextTable();

    const onSubmit = (data: Interessado) => {
        api.post('/interessado', data).then(response => {
          TypeInfo(response.data.message, 'success');
        }).catch((error) => {
          TypeInfo(error.response.data.message, 'warning');
        });
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2}}>

            <Grid item xs={3}>
              <TextField
                variant='filled'
                required
                fullWidth
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
            <Grid item xs={3} >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={arrayProcesso}
                getOptionLabel={(option: Processo) => 'N.º ' + option.numero}
                onChange={(event, value) => setValue('processo', value?.id ?? '')}
                renderInput={(params) => <TextField variant='filled'  {...params} label="Processo" />}
              />
            </Grid>
            <Grid item xs={3} >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={arrayPessoaFisica}
                getOptionLabel={(option: PessoaFisica) => option.nome}
                onChange={(event, value) => setValue('pessoa', value?.id ?? '')}
                renderInput={(params) => <TextField variant='filled' {...params} label="Pessoa Física" />}
              />
            </Grid>
            <RegisterButton/>
        </Box>
    );
}

export default FormInteresse;
