import { Autocomplete, Box, Grid, IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { Controller, useForm, UseFormRegister } from 'react-hook-form';
import { Achado, Beneficio, FormBeneficioType, User } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import React, { useEffect, useState } from 'react';
import useFetchListData from '../../../../hooks/useFetchListData';
import dataFake from '../../../../service/dataFake';
import CloseIcon from '@mui/icons-material/Close';
import { GridRowId } from '@mui/x-data-grid';

export interface FormBeneficioProps {
    closeModal: () => void;
    user: User | undefined;
    dataType: string;
    id: GridRowId;
}

const FormBeneficio: React.FC<FormBeneficioProps> = ({ user, dataType, closeModal, id }) => {
    const { setArrayBeneficio, arrayAchado } = useContextTable();
    //const {getAllNatAchado} = useFetchListData()
    const { saveBeneficio, verifyBeneficio, saveAchadoBeneficio, getBeneficio, updateBeneficio } = dataFake()
    const [situacaoBeneficio, setSituacaoBeneficio] = useState<string>();
    const [beneficio, setBeneficio] = useState<Beneficio>()
    const [achados, setAchados] = useState<(Achado | undefined)[]>()
    const { control, handleSubmit, register, formState: { errors }, setValue, reset } = useForm<FormBeneficioType>({
        defaultValues: {
            beneficio: beneficio?.beneficio,
            situacaoBeneficio: beneficio?.situacaoBeneficio || false,
            achados: achados
        },
    });


    useEffect(() => {
        if (id) {
            const searchBeneficio = getBeneficio(id)
            if (searchBeneficio) {
                setBeneficio(searchBeneficio)
                setAchados(searchBeneficio.achados)
            }
            reset({
                id: searchBeneficio?.id || '',
                beneficio: searchBeneficio?.beneficio || '',
                situacaoBeneficio: searchBeneficio?.situacaoBeneficio || false,
                achados: searchBeneficio?.achados || []
            })
        }
    }, [id, reset])

    const onSubmit = (data: FormBeneficioType) => {
        //passo 1 criar o beneficio

        updateBeneficio(data)
       
        TypeAlert('Benefício adicionado', 'success');
        reset()
        closeModal()
    };

    return (
        <>
            {beneficio && (

                <Box sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }} component="form" name='formBeneficio' noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '70vw', justifyContent: 'space-between' }}>
                        <Typography variant="h5" sx={{ pt: 3, pb: 3, color: '#1e293b' }}>Cadastrar Novo Benefício</Typography>
                        <IconButton onClick={closeModal} sx={{
                            '&:hover': {
                                bgcolor: '#1e293b', color: '#ffffff',
                            }
                        }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Grid item xs={12} sm={4} >
                        <TextField
                            variant='filled'
                            required
                            autoFocus
                            fullWidth
                            id="beneficio"
                            label='Benefício'
                            defaultValue={beneficio.beneficio}
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
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {user?.cargo === 'Diretor' ? (<Controller
                            name="situacaoBeneficio"
                            defaultValue={beneficio.situacaoBeneficio}
                            control={control}
                            render={({ field }) => (
                                <ToggleButtonGroup
                                    color="primary"
                                    value={field.value}
                                    exclusive
                                    onChange={(event, newValue) => field.onChange(newValue)}
                                    aria-label="Situacao do Achado"
                                >
                                    <ToggleButton value={false}>Pendente</ToggleButton>
                                    <ToggleButton value={true}>Aprovado</ToggleButton>
                                </ToggleButtonGroup>
                            )}
                        />) : (
                            <input type="hidden"{...register('situacaoBeneficio')} value="false" />
                        )}
                    </Grid>

                    <Grid item xs={12} sm={4} sx={{ mt: 3 }}>
                        <Typography variant='h6' sx={{ mb: 2, color: 'rgb(17 24 39)' }}>Relacionar Achado(s)</Typography>
                        <Controller
                            name="achados"
                            control={control}
                            rules={{ required: 'Selecione pelo menos um achado' }}
                            render={({ field }) => (
                                <Autocomplete
                                    multiple
                                    id="achados"
                                    options={arrayAchado}
                                    getOptionLabel={(option) => option.achado}
                                    filterSelectedOptions
                                    value={field.value || []}
                                    onChange={(event, value) => field.onChange(value)}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Relação de Achados"
                                            placeholder="Selecione os achados"
                                            variant="filled"
                                            error={!!errors.achados}
                                            helperText={errors.achados?.message}
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>
                    <RegisterButton text="Registrar" />
                </Box>
            )}
        </>
    )
}
export default FormBeneficio;
