import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { useForm, UseFormRegister } from 'react-hook-form';
import { AreaAchado, NatAchado } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import React, { useEffect } from 'react';
import useFetchListData from '../../../../hooks/useFetchListData';


export const AutocompleteNatAchado = React.forwardRef<
    HTMLDivElement,
    { label: string; options: NatAchado[]} & ReturnType<UseFormRegister<any>>
>(({ onChange, onBlur, name, label, options }, ref) => (
    <>
        <Autocomplete
            disablePortal
            options={options}
            getOptionLabel={(option: NatAchado) => option.descricao}
            onChange={(event, value) => onChange({ target: { name, value: value?.id ?? '' } })}
            renderInput={(params) => (
                <TextField
                variant='filled'
                    {...params}
                    label={label}
                    onBlur={onBlur}
                    inputRef={ref}
                />
            )}
        />
    </>
));



const FormAreaAchado = () => {
    const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm<AreaAchado>({});
    const { arrayNatAchado, setArrayAreaAchado } = useContextTable();
    const {getAllNatAchado} = useFetchListData()

    const onSubmit = (data: AreaAchado) => {
        api.post('/area-achado', data).then(response => {
            const newAreaAchado = response.data.areaAchado;
            TypeAlert(response.data.message, 'success');
            reset();
            setValue('natureza', null);
            setArrayAreaAchado(prevArray => [...prevArray, newAreaAchado])
        }).catch((error) => {
            TypeAlert(error.response.data.message, 'warning');
            setValue('natureza', null);
        });

    };

    // useEffect(() => {
    //     if(arrayNatAchado.length <= 0){
    //         getAllNatAchado()
    //     }
    // },[])

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
                <AutocompleteNatAchado
                    label="Natureza"
                    options={arrayNatAchado}
                    {...register('natureza', {
                        required: 'Campo obrigatório'
                    })}
                />
            </Grid>
            <RegisterButton text="Registrar" />
        </Box>
    );
}

export default FormAreaAchado;
