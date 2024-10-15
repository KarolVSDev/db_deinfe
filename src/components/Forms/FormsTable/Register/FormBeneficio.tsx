import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { useForm, UseFormRegister } from 'react-hook-form';
import { Beneficio } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import React, { useEffect } from 'react';
import useFetchListData from '../../../../hooks/useFetchListData';
import dataFake from '../../../../service/dataFake';


const FormBeneficio = () => {
    const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm<Beneficio>({});
    const { setArrayBeneficio } = useContextTable();
    //const {getAllNatAchado} = useFetchListData()
    const { saveBeneficio } = dataFake()

    const onSubmit = (data: Beneficio) => {
        // api.post('/area-achado', data).then(response => {
        //     const newAreaAchado = response.data.areaAchado;
        //     TypeAlert(response.data.message, 'success');
        //     reset();
        //     setValue('natureza', '');
        //     setArrayAreaAchado(prevArray => [...prevArray, newAreaAchado])
        // }).catch((error) => {
        //     TypeAlert(error.response.data.message, 'warning');
        //     setValue('natureza', '');
        // });

        data.situacao = false
        saveBeneficio(data)
        TypeAlert('Benefício adicionado', 'success');
        reset()
        console.log(data)

    };

    return (
        <Box component="form" name='formAreaAchado' noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} sm={4}>
                <TextField
                    variant='filled'
                    required
                    autoFocus
                    fullWidth
                    id="beneficio"
                    label='Benefício'
                    type="text"
                    error={!!errors?.beneficio}
                    {...register('beneficio', {
                        required: 'Campo obrigatório'
                    })}
                />

                {errors?.beneficio && (
                    <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                        {errors.beneficio.message}
                    </Typography>
                )}

                <input type="hidden"{...register('situacao')} value="false" />
            </Grid>
            <RegisterButton text="Registrar" />
        </Box>
    );
}

export default FormBeneficio;
