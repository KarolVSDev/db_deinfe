import { Autocomplete, Box, Container, Grid, TextField, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { useForm } from 'react-hook-form';
import { AreaAchado, DivAchado } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { GridRowId } from '@mui/x-data-grid';
import useFetchListData from '../../../../hooks/useFetchListData';
import { useEffect, useState } from 'react';

interface DivAchadoProps {
    closeModal: () => void;
    id: GridRowId | undefined;
}
const FormUpdateDivAchado: React.FC<DivAchadoProps> = ({ closeModal, id }) => {
    const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm<DivAchado>({});

    const { arrayAreaAchado, arrayDivAchado, setArrayDivAchado, divAchadoUp } = useContextTable()
    const { getAllAreaAchado, getDivAchadoRelation } = useFetchListData()
    const [areaAchado, setAreaAchado] = useState<AreaAchado>()
    const [divAchado, setDiviAchado] = useState<DivAchado>()


    const setDiv = () => {
        try {
            if (divAchadoUp) {
                const div = arrayDivAchado.find(div => div.id === divAchadoUp.id)
                setDiviAchado(div)
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getAllAreaAchado()
        if (id) {
            getDivAchadoRelation(id)
            setAreaAchado(divAchadoUp?.area)
            setDiv()
        }
    }, [divAchado, divAchadoUp])


    const onSubmit = (data: DivAchado) => {
        const divId = id;
        api.patch(`/div-area-achado/update/${id}`, data).then(response => {
            const newDivAchado = response.data.divAreaAchado;
            TypeAlert(response.data.message, 'success');
            reset();
            setArrayDivAchado(prevArray => {
                const updatedArray = prevArray.map(item => 
                    item.id === divId ? {...item, ...data} : item
                )
                
                return updatedArray
            })
            closeModal()
        }).catch((error) => {
            TypeAlert(error.response.data.message, 'warning');
        });

    };


    return (
        <Container>
            {(divAchadoUp && divAchado) && (
                <Box component="form" name='formDivAchado' noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant='h5' sx={{ pt: 3, pb: 3, color: '#1e293b', fontWeight: 'bold' }}>Atualizar Registro de Divisão do Achado</Typography>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            variant='filled'
                            required
                            defaultValue={divAchado?.descricao}
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
                            defaultValue={areaAchado}
                            getOptionLabel={(option: AreaAchado) => option.descricao}
                            onChange={(event, value) => setValue('area', value?.id ?? '')}
                            renderInput={(params) => <TextField variant='filled' {...params} label="Área" />}
                        />
                    </Grid>
                    <RegisterButton text="Registrar" />
                </Box>
            )}
        </Container>
    );
}

export default FormUpdateDivAchado;
