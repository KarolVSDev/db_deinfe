import {  Button, Box, Grid, Autocomplete, TextField } from '@mui/material';
import { useContextTable } from '../../context/TableContext';
import { useForm } from 'react-hook-form';
import { Apenso, Jurisd, Jurisd_Jurisd, Processo } from '../../types/types';
import { api } from '../../service/api';
import { TypeInfo } from '../../hooks/TypeAlert';
import RegisterButton from '../Buttons/RegisterButton';

const FormJurisd_Jurisd = () => {
    const { handleSubmit, setValue, formState: { errors } } = useForm<Jurisd_Jurisd>({});
    const { arrayJurisd } = useContextTable();

    const onSubmit = (data: Jurisd_Jurisd) => {
        api.post('/jurisd-jurisd', data).then(response => {
          TypeInfo(response.data.message, 'success');
        }).catch((error) => {
          TypeInfo(error.response.data.message, 'warning');
        });
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={3} >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={arrayJurisd}
                getOptionLabel={(option: Jurisd) => option.nome}
                onChange={(event, value) => setValue('principal', value?.id ?? '')}
                renderInput={(params) => <TextField variant='filled'  {...params} label="Principal" />}
              />
            </Grid>
            <Grid item xs={3} >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={arrayJurisd}
                getOptionLabel={(option: Jurisd) => option.nome}
                onChange={(event, value) => setValue('subordinado', value?.id ?? '')}
                renderInput={(params) => <TextField variant='filled' {...params} label="Subordinado" />}
              />
            </Grid>
            <RegisterButton/>
        </Box>
    );
}

export default FormJurisd_Jurisd;
