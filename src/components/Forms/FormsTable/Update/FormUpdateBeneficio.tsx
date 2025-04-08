import { Autocomplete, Box, Grid, IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { Controller, useForm } from 'react-hook-form';
import { Beneficio, BeneficioUpdate, User } from '../../../../types/types';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import React, { useEffect, useState } from 'react';
import useFetchListData from '../../../../hooks/useFetchListData';
import CloseIcon from '@mui/icons-material/Close';
import { GridRowId } from '@mui/x-data-grid';
import Loader from '../../../Loader/Loader';
import BeneficioSkeleton from '../../../Skeletons/BeneficioSkeleton';
import useFetchAchado from '../Create/FormAchadoPasta/useFetchAchado';

export interface FormBeneficioProps {
    closeModal: () => void;
    user: User | undefined;
    dataType: string;
    id: GridRowId;
}

const FormBeneficio: React.FC<FormBeneficioProps> = ({ user, closeModal, id }) => {
    const { arrayAchado } = useContextTable();
    const {getBeneficioWithAchados, updateBeneficio, getBeneficioByName } = useFetchListData()
    const { getAllAchados } = useFetchAchado()
    const [beneficio, setBeneficio] = useState<Beneficio>()
    const [achados] = useState()
    const { control, handleSubmit, register, formState: { errors }, reset } = useForm<BeneficioUpdate>({
        defaultValues: {
            beneficio: beneficio?.beneficio,
            situacaoBeneficio: beneficio?.situacaoBeneficio || false,
            achados: achados
        },
    });
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)




    useEffect(() => {
        if (id) {
            setIsLoading(true)
            const searchBeneficioF = async () => {
                const searchBeneficio = await getBeneficioWithAchados(id)
                if (searchBeneficio) {
                    setBeneficio({
                        id: searchBeneficio.id,
                        beneficio: searchBeneficio.beneficio,
                        situacaoBeneficio: searchBeneficio.situacaoBeneficio
                    })
                }
                reset({
                    id: searchBeneficio?.id || '',
                    beneficio: searchBeneficio?.beneficio || '',
                    situacaoBeneficio: searchBeneficio?.situacaoBeneficio || false,
                    achados: searchBeneficio?.achados || []
                })
                setIsLoading(false)
            }
            searchBeneficioF()
        }
    }, [id, reset])


    useEffect(() => {
        const setAchados = async () => {
            if (arrayAchado.length === 0) {
                await getAllAchados()
            }
        }
        setAchados()
    }, [arrayAchado])

    const onSubmit = async (data: BeneficioUpdate) => {
        setLoading(true)

        try {
            if (user?.cargo !== 'chefe') {
                data.situacaoBeneficio = false
            };

            const { beneficio } = data

            const beneficioExist = await getBeneficioByName(beneficio, id)

            if (beneficioExist) {
                setLoading(false)
                return;
            } else {
                setLoading(true)
            }

            updateBeneficio(id, data)
            TypeAlert('Benefício adicionado', 'success');
            reset()
            closeModal()
        } catch (error) {
            TypeAlert("Erro ao Tentar atualizar o Benefício", "error")
            console.error(error)
        } finally {
            setLoading(false)
        }

    };



    return (
        <>
            {isLoading ? (
                <BeneficioSkeleton isLoading={isLoading} />
            ) :
                (
                    <Box sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }} component="form" name='formBeneficio' noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '70vw', justifyContent: 'space-between' }}>
                            <Typography variant="h5" sx={{ pt: 3, pb: 3, color: '#1e293b' }}>Atualizar Benefício</Typography>
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
                                defaultValue={beneficio?.beneficio}
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
                            {user?.cargo === 'chefe' ? (<Controller
                                name="situacaoBeneficio"
                                defaultValue={beneficio?.situacaoBeneficio}
                                control={control}
                                render={({ field }) => (
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={field.value}
                                        exclusive
                                        onChange={(_, newValue) => field.onChange(newValue)}
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
                        {loading ? <Box sx={{ display: "flex", justifyContent: "start", mt: 3 }}>
                            <Loader />
                        </Box> :
                            <RegisterButton text="Atualizar" />
                        }
                    </Box>
                )}
        </>
    )
}
export default FormBeneficio;
