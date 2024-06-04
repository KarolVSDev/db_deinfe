import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { useForm } from 'react-hook-form';
import { AreaAchado, DivAchado } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';


const FormDivAchado = () => {
    const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm<DivAchado>({});
    const { arrayAreaAchado } = useContextTable()
    const onSubmit = (data: DivAchado) => {
        api.post('/div-area-achado', data).then(response => {
            TypeAlert(response.data.message, 'success');
            reset();
        }).catch((error) => {
            TypeAlert(error.response.data.message, 'warning');
        });

    };


    return (
        <Box component="form" name='formDivAchado' noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} sm={4}>
                <TextField
                    variant='filled'
                    required
                    fullWidth
                    autoFocus
                    id="descricao"
                    label='Divisão do Achado'
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
                    options={arrayAreaAchado}
                    getOptionLabel={(option: AreaAchado) => option.descricao}
                    onChange={(event, value) => setValue('area', value?.id ?? '')}
                    renderInput={(params) => <TextField variant='filled' {...params} label="Área" />}
                />
            </Grid>
            <RegisterButton text="Registrar"/>
        </Box>
    );
}

export default FormDivAchado;
