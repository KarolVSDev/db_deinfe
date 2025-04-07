import { Autocomplete, Box, Grid, IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { Controller, useForm } from 'react-hook-form';
import { AchadoBeneficio, FormBeneficioType, User } from '../../../../types/types';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import React, { useEffect, useState } from 'react';
import useFetchListData from '../../../../hooks/useFetchListData';
import CloseIcon from '@mui/icons-material/Close';
import Loader from '../../../Loader/Loader';

export interface FormBeneficioProps {
    closeModal: () => void;
    user: User | undefined;
    dataType: string;
}

const FormBeneficio: React.FC<FormBeneficioProps> = ({ user, closeModal }) => {
    const { control, handleSubmit, register, formState: { errors }, reset } = useForm<FormBeneficioType>({});
    const { arrayAchado } = useContextTable();
    const {getBeneficioByName, getAllAchados, setBeneficio, setAchadoBeneficio} = useFetchListData()
    const [situacaoBeneficio, setSituacaoBeneficio] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChangeSituacaoBeneficio = (
        _: React.MouseEvent<HTMLElement>,
        newSituacao: string | null
    ) => {
        if (newSituacao !== null) {
            setSituacaoBeneficio(newSituacao);
        }
    };

    useEffect(() => {
        const setAchados = async () => {
            if(arrayAchado.length === 0) {
                await getAllAchados()
            }
        }
        setAchados()
    },[arrayAchado])

    const onSubmit = async (data: FormBeneficioType) => {
        setLoading(true)
        try {
            //passo 1 criar o beneficio
            if (user?.cargo !== 'chefe') {
                data.situacaoBeneficio = false
            }

            const { beneficio, ...resto } = data

            const beneficioExist = await getBeneficioByName(beneficio)

            if (beneficioExist) {
                setLoading(false)
                return;
            } else {
                setLoading(true)
            }

            const dataWithSituacao = {
                beneficio: beneficio,
                situacaoBeneficio: situacaoBeneficio === 'Aprovado' ? true : false,
            };

            const retornoBeneficio = await setBeneficio(dataWithSituacao)

            //passo 2 criar a relação na entidade achadoBeneficio

            if (resto.achados.length > 0) {
                resto.achados.map(achado => {
                    const objAchadoBeneficio = { achado_id: achado.id, beneficio_id: retornoBeneficio?.id }
                    setAchadoBeneficio(objAchadoBeneficio as AchadoBeneficio)
                })
            }

            TypeAlert('Benefício adicionado', 'success');
            reset()
            closeModal()
        } catch (error) {
            TypeAlert("Erro ao tentar adicionar o Benefício", "error");
            console.log(error)
        } finally {
            setLoading(false)
        }

    };

    return (
        <Box sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }} component="form" name='formBeneficio' noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '70vw', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ pt: 3, pb: 3, color: '#1e293b' }}>Cadastrar Benefício</Typography>
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
                {user?.cargo === 'chefe' ? (<ToggleButtonGroup
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
                            onChange={(_, value) => field.onChange(value)}
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
            {loading ? <Box sx={{ display: 'flex', justifyContent: 'start', mt: 3 }}>
                <Loader />
            </Box> :
                <RegisterButton text="Registrar" />
            }
            </Box>
    );
}
            export default FormBeneficio;
