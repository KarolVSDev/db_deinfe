import {  Button, Box, Grid, Autocomplete, TextField } from '@mui/material';
import { useContextTable } from '../../context/TableContext';
import { useForm } from 'react-hook-form';
import { Apenso, Processo } from '../../types/types';
import { api } from '../../service/api';
import { TypeAlert } from '../../hooks/TypeAlert';
import RegisterButton from '../Buttons/RegisterButton';

const FormApenso = () => {
    const { handleSubmit, setValue, formState: { errors }, reset } = useForm<Apenso>({});
    const { arrayProcesso } = useContextTable();

    const onSubmit = (data: Apenso) => {
        api.post('/apenso', data).then(response => {
          TypeAlert(response.data.message, 'success');
          reset()
        }).catch((error) => {
          TypeAlert(error.response.data.message, 'warning');
        });
    };

    return (
        <Box component="form"  name='formApenso' noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={3} >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={arrayProcesso}
                getOptionLabel={(option: Processo) => 'N.º ' + option.numero}
                onChange={(event, value) => setValue('principal', value?.id ?? '')}
                renderInput={(params) => <TextField variant='filled'  {...params} label="Principal" />}
              />
            </Grid>
            <Grid item xs={3} >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={arrayProcesso}
                getOptionLabel={(option: Processo) => 'N.º ' + option.numero}
                onChange={(event, value) => setValue('apensado', value?.id ?? '')}
                renderInput={(params) => <TextField variant='filled' {...params} label="Apensado" />}
              />
            </Grid>
            <RegisterButton/>
        </Box>
    );
}

export default FormApenso;
