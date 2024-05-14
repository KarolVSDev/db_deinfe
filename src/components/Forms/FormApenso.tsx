import {  Button, Box, Grid, Autocomplete, TextField } from '@mui/material';
import { useContextTable } from '../../context/TableContext';
import { useForm } from 'react-hook-form';
import { Apenso, Processo } from '../../types/types';
import { api } from '../../service/api';
import { TypeInfo } from '../../hooks/TypeAlert';

const FormApenso = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Apenso>({});
    const { arrayProcesso } = useContextTable();

    const onSubmit = (data: Apenso) => {
        api.post('/apenso', data).then(response => {
          TypeInfo(response.data.message, 'success');
        }).catch((error) => {
          TypeInfo(error.response.data.message, 'warning');
        });
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2}}>
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
                onChange={(event, value) => setValue('apenso', value?.id ?? '')}
                renderInput={(params) => <TextField variant='filled' {...params} label="Apenso" />}
              />
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{
              bgcolor: 'rgb(17 24 39)', '&:hover': {
                bgcolor: '#1e293b',
              }, m: 'auto', mt: 3, display: 'flex'
            }}>
                Registrar
            </Button>
        </Box>
    );
}

export default FormApenso;
