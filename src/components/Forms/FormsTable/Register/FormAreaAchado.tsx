import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { useForm } from 'react-hook-form';
import { AreaAchado, NatAchado } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';


const FormAreaAchado = () => {
    const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm<AreaAchado>({});
    const { arrayNatAchado } = useContextTable();

    const onSubmit = (data: AreaAchado) => {
        api.post('/area-achado', data).then(response => {
            TypeAlert(response.data.message, 'success');
            reset();
            setValue('natureza', null);
        }).catch((error) => {
            TypeAlert(error.response.data.message, 'warning');
            setValue('natureza', null);
        });

    };

    return (
        <Box component="form" name='formAreaAchado' noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} sm={4}>
                <TextField
                    variant='filled'
                    required
                    autoFocus
                    fullWidth
                    id="descricao"
                    label='Área do Achado'
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

            <Grid item xs={12} sm={4} >
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={arrayNatAchado}
                    getOptionLabel={(option: NatAchado) => option.descricao}
                    onChange={(event, value) => setValue('natureza', value?.id ?? '')}
                    renderInput={(params) => <TextField variant='filled' {...params} label="Natureza" />}
                />
            </Grid>
            <RegisterButton text="Registrar"/>
        </Box>
    );
}

export default FormAreaAchado;
