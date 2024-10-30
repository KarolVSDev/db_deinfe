import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { useForm } from 'react-hook-form';
import { Achado, AreaAchado, Beneficio, Catalogo, DivAchado, TopicoAchado } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { useEffect, useState } from 'react';


const FormCatalogo = () => {
    const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm<Catalogo>({});
    const { arrayTopicoAchado, arrayAchado, arrayBeneficio } = useContextTable()
    const [arrayTopicoAprovado, setArrayTopicoAprovado] = useState<TopicoAchado[]>([])
    const [arrayAchadoAprovado, setArrayAchadoaAprovado] = useState<Achado[]>([])
    const [arrayBeneficioAprovado, setArrayBeneficioAprovado] = useState<Beneficio[]>([])

    const verifyData = () => {
        if(arrayTopicoAchado){
            const arrayTopicoFiltrado = arrayTopicoAchado.filter(item => 
                item.situacao !== false 
            );
            setArrayTopicoAprovado(arrayTopicoFiltrado);
        }
        if(arrayAchado){
            const arrayAchadoFiltrado = arrayAchado.filter(item => 
                item.situacao !== false
            );
            setArrayAchadoaAprovado(arrayAchadoFiltrado);
        }
        if(arrayBeneficio){
            const arrayBeneficioFiltrado = arrayBeneficio.filter(item => 
                item.situacao !== false
            );
            setArrayBeneficioAprovado(arrayBeneficioFiltrado);
        }
    }

    useEffect(() => {
        verifyData()
    },[])
    const onSubmit = (data: Catalogo) => {
        // api.post('/div-area-achado', data).then(response => {
        //     const newDivAchado = response.data.divAreaAchado;
        //     TypeAlert(response.data.message, 'success');
        //     reset();
        //     setValue('area', '')
        //     setArrayDivAchado(prevArray => [...prevArray, newDivAchado]);
        // }).catch((error) => {
        //     TypeAlert(error.response.data.message, 'warning');
        //     setValue('area', '')
        // });
        console.log(data)

    };

    return (
        <Box component="form" name='formDivAchado' noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} sm={4}>
                <TextField
                    variant='filled'
                    required
                    fullWidth
                    autoFocus
                    id="analise"
                    label='Análise'
                    type="text"
                    error={!!errors?.analise}
                    {...register('analise', {
                        required: 'Campo obrigatório'
                    })}
                />

                {errors?.analise && (
                    <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                        {errors.analise.message}
                    </Typography>
                )}
            </Grid>

            <Grid item xs={12} sm={4} >
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={arrayTopicoAprovado}
                    getOptionLabel={(option: TopicoAchado) => option.topico}
                    onChange={(event, value) => setValue('topico_id', value?.id ?? '')}
                    renderInput={(params) => <TextField variant='filled' {...params} label="Tópico" />}
                />
            </Grid>
            <Grid item xs={12} sm={4} >
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={arrayAchadoAprovado}
                    getOptionLabel={(option: Achado) => option.achado}
                    onChange={(event, value) => setValue('achado_id', value?.id ?? '')}
                    renderInput={(params) => <TextField variant='filled' {...params} label="Achado" />}
                />
            </Grid>
            <Grid item xs={12} sm={4} >
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={arrayBeneficioAprovado}
                    getOptionLabel={(option: Beneficio) => option.beneficio}
                    onChange={(event, value) => setValue('beneficio_id', value?.id ?? '')}
                    renderInput={(params) => <TextField variant='filled' {...params} label="Beneficio" />}
                />
            </Grid>
            <Grid item xs={12} sm={4} >
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={arrayAchadoAprovado}
                    getOptionLabel={(option: Achado) => option.achado}
                    onChange={(event, value) => setValue('achado_alternativo', value?.id ?? '')}
                    renderInput={(params) => <TextField variant='filled' {...params} label="Achado Alternativo" />}
                />
            </Grid>
            
            <RegisterButton text="Registrar"/>
        </Box>
    );
}

export default FormCatalogo;
