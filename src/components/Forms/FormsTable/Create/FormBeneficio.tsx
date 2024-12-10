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

export interface FormBeneficioProps {
    closeModal: () => void;
    user: User | undefined;
    dataType: string;
}

const FormBeneficio: React.FC<FormBeneficioProps> = ({ user, dataType, closeModal }) => {
    const { control, handleSubmit, register, formState: { errors }, setValue, reset } = useForm<FormBeneficioType>({});
    const { setArrayBeneficio, arrayAchado } = useContextTable();
    //const {getAllNatAchado} = useFetchListData()
    const { saveBeneficio, verifyBeneficio, saveAchadoBeneficio } = dataFake()
    const [situacaoBeneficio, setSituacaoBeneficio] = useState<string | null>(null);

    


    const handleChangeSituacaoBeneficio = (
        event: React.MouseEvent<HTMLElement>,
        newSituacao: string | null
    ) => {
        if (newSituacao !== null) {
            setSituacaoBeneficio(newSituacao);
        }
    };

    const onSubmit = (data: FormBeneficioType) => {
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

        //passo 1 criar o beneficio
        console.log(data)

        if (user?.cargo !== 'Diretor') {
            data.situacaoBeneficio = false
        }


        const { beneficio, ...resto } = data

        if (data.beneficio && verifyBeneficio(data.beneficio)) {
            // Se o benefício já existe, não continue o processo de envio
            return;
        }

        const dataWithSituacao = {
            beneficio: beneficio,
            situacaoBeneficio: situacaoBeneficio === 'Aprovado' ? true : false,
        };

        const retornoBeneficio = saveBeneficio(dataWithSituacao)

        //passo 2 criar a relação na entidade achadoBeneficio

        if (resto.achados.length > 0) {
            resto.achados.map(achado => {
                const objAchadoBeneficio = { achado_id: achado.id, beneficio_id: retornoBeneficio.id }
                saveAchadoBeneficio(objAchadoBeneficio)
            })
        }

        TypeAlert('Benefício adicionado', 'success');
        reset()
        closeModal()
    };

    return (
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
                    label='Proposta de Benefício'
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
                {user?.cargo === 'Diretor' ? (<ToggleButtonGroup
                    color="primary"
                    value={situacaoBeneficio}
                    exclusive
                    onChange={handleChangeSituacaoBeneficio}
                    aria-label="Platform"
                >
                    <ToggleButton value='Pendente' >Pendente</ToggleButton>
                    <ToggleButton value='Aprovado' >Aprovado</ToggleButton>
                </ToggleButtonGroup>) : (
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
    );
}
export default FormBeneficio;
