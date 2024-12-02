import { Autocomplete, Box, Grid, IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { Controller, useForm, UseFormRegister } from 'react-hook-form';
import { Achado, Beneficio, BeneficioComAchado, User } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import React, { useEffect, useState } from 'react';
import useFetchListData from '../../../../hooks/useFetchListData';
import dataFake from '../../../../service/dataFake';
import ButtonNovo from '../../../Buttons/ButtonNovo';
import CloseIcon from '@mui/icons-material/Close';

export interface FormBeneficioProps {
    closeModal: () => void;
    user: User | undefined;
    dataType: string;
}

const FormBeneficio: React.FC<FormBeneficioProps> = ({ user, dataType, closeModal }) => {
    const { control, handleSubmit, register, formState: { errors }, setValue, reset } = useForm<BeneficioComAchado>({});
    const { setArrayBeneficio, arrayAchado } = useContextTable();
    //const {getAllNatAchado} = useFetchListData()
    const { saveBeneficio, verifyBeneficio, saveAchadoBeneficio} = dataFake()
    const [situacao, setSituacao] = useState<string | null>(null);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newSituacao: string,
    ) => {
        if (newSituacao !== undefined) {
            setSituacao(newSituacao);
        }
    };

    const onSubmit = (data: BeneficioComAchado) => {
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
        const {achado, beneficio} = data; 

        if (verifyBeneficio(beneficio)) {
            return
        }

        if (user?.cargo !== 'Diretor') {
            data.situacaoBeneficio = false
        }

        const BeneficioWithSituacao = {
            beneficio,
            situacaoBeneficio: situacao === 'Aprovado' ? true : false,
        }

        //salva o beneficio
        const retornoBeneficio = saveBeneficio(BeneficioWithSituacao)

        //bloco que manipula e salva o AchadoBeneficio
        if (retornoBeneficio) {
            const objAchadoBeneficio = { achado_id: achado.id, beneficio_id: retornoBeneficio.id }
            saveAchadoBeneficio(objAchadoBeneficio)
        }

        TypeAlert('Benefício adicionado', 'success');
        reset()
        closeModal()

    };

    return (
        <Box sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }} component="form" name='formBeneficio' noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', alignItems: 'center',width:'70vw', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ pt: 3, pb: 3, color: '#1e293b' }}>Cadastrar Novo Benefício</Typography>
                <IconButton onClick={closeModal} sx={{
                    '&:hover': {
                        bgcolor: '#1e293b', color: '#ffffff',
                    }
                }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Grid item xs={12} sm={4} sx={{ mb: 2 }}>
                <Controller
                    name="achado.id"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Campo obrigatório' }}
                    render={({ field }) => (
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={arrayAchado}
                            getOptionLabel={(option: Achado) => option.achado}
                            onChange={(event, value) => field.onChange(value?.id || '')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Achado"
                                    variant="filled"
                                    error={!!errors.achado?.id} // Mostra erro
                                    helperText={errors.achado?.id?.message} // Mostra a mensagem de erro
                                />
                            )}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12} sm={4} sx={{ mt: 3 }}>
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
            </Grid>
            <Grid item xs={12} sm={4}>
                {user?.cargo === 'Diretor' ? (<ToggleButtonGroup
                    color="primary"
                    value={situacao}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    <ToggleButton value='Pendente' >Pendente</ToggleButton>
                    <ToggleButton value='Aprovado' >Aprovado</ToggleButton>
                </ToggleButtonGroup>) : (
                    <input type="hidden"{...register('situacaoBeneficio')} value="false" />
                )}
            </Grid>
            <RegisterButton text="Registrar" />
        </Box>
    );
}

export default FormBeneficio;
