import { Autocomplete, Box, Button, Container, Grid, IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { Controller, useForm } from 'react-hook-form';
import { Achado, AreaAchado, Beneficio, DivAchado, DivAchado2 } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { GridRowId } from '@mui/x-data-grid';
import useFetchListData from '../../../../hooks/useFetchListData';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import dataFake from '../../../../service/dataFake';



interface DivAchadoProps {
    closeModal: () => void;
    id: GridRowId | undefined;
}
const FormUpdateBeneficio: React.FC<DivAchadoProps> = ({ closeModal, id }) => {
    const {control, handleSubmit, register, formState: { errors }, setValue, reset } = useForm<Beneficio>({});

    const { arrayBeneficio, setArrayBeneficio, arrayAchado } = useContextTable()
    const [beneficio, setBeneficio] = useState<Beneficio>()
    const [openModal, setOpenModal] = useState(false)
    const [situacao, setSituacao] = useState<string>()
    const {getAchado} = dataFake()
    const [achado, setAchado] = useState<Achado | undefined>()


    const getBeneficio = () => {
        // api.get(`/div-area-achado/${id}`).then(response => {
        //     console.log(response.data)
        //     setDivAchado(response.data)
        // }).catch((error) => {
        //     console.log(error)
        //     TypeAlert('Erro ao resgatar Divisão do ahcado', 'error')
        // })
        const beneficio = arrayBeneficio.find(item => item.id === id);
        setBeneficio(beneficio);
    }

    useEffect(() => {
        if(id){
            getBeneficio()
        }
    }, [])
   
    useEffect(() => {
        if(beneficio){
            setSituacao(beneficio.situacao === false ? 'Pendente' : 'Aprovado');
            const achado = getAchado(beneficio.achado_id)
            setAchado(achado)
        }
    },[beneficio])
   

    const handleModal = () => {
        setOpenModal(true)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newSituacao: string,
      ) => {
        if (newSituacao !== undefined) {
          setSituacao(newSituacao);
        }
      };

    // const handleExport = () => {
    //     if(divAchadoUp) {
    //         exportDivRelations(divAchadoUp, 'relacoes.xlsx')
    //     }
    // }


    const onSubmit = (data: Beneficio) => {
        // const divId = id;
        // api.patch(`/div-area-achado/update/${id}`, data).then(response => {
        //     TypeAlert(response.data.message, 'success');
        //     reset();
        //     setArrayDivAchado(prevArray => {
        //         const updatedArray = prevArray.map(item =>
        //             item.id === divId ? { ...item, ...data } : item
        //         )

        //         return updatedArray
        //     })
        //     closeModal()
        // }).catch((error) => {
        //     TypeAlert(error.response.data.message, 'warning');
        // });
        const updateData = {
            ...data,
            situacao:situacao === "Aprovado"? true : false
        }

        setArrayBeneficio(prevArray => prevArray.map(item => item.id === id? {...item, ...updateData} : item))
        closeModal()
    };


    return (
        <>
            {beneficio && (
                <Box sx={{borderRadius:2, padding:'20px 20px 20px',boxShadow:'1px 2px 4px'}}
                component="form" name='formDivAchado' noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{display:'flex', alignItems:'center', width:'426.95px', justifyContent:'space-between'}}>
                        <Typography variant="h5" sx={{ pt: 3, pb: 3, color: '#1e293b' }}>Atualizar Registro de Benefício</Typography>
                        <IconButton onClick={closeModal} sx={{
                        '&:hover': {
                        bgcolor: '#1e293b', color: '#ffffff',
                        }
                        }}>
                        <CloseIcon />
                        </IconButton>
                    </Box>
                    {achado && 
                        <Grid item xs={12} sm={4} sx={{ mb: 2 }}>
                            <Controller
                            name="achado_id"
                            control={control}
                            
                            rules={{ required: 'Campo obrigatório' }} 
                            render={({ field }) => (
                            <Autocomplete
                                disablePortal
                                defaultValue={achado}
                                id="combo-box-demo"
                                options={arrayAchado}
                                getOptionLabel={(option: Achado) => option.achado}
                                onChange={(event, value) => field.onChange(value?.id || '')} 
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    defaultValue={achado.achado}
                                    label="Achado"
                                    variant="filled"
                                    error={!!errors.achado_id} // Mostra erro
                                    helperText={errors.achado_id?.message} // Mostra a mensagem de erro
                                />
                                )}
                            />
                            )}
                            />
                        </Grid>
                    }
                    <Grid item xs={12} sm={4}>
                        <TextField
                            variant='filled'
                            required
                            defaultValue={beneficio.beneficio}
                            fullWidth
                            autoFocus
                            id="beneficio"
                            label='Beneficio'
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

                    <Grid item xs={12} sm={4} >
                        <ToggleButtonGroup
                            color="primary"
                            value={situacao}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                        >
                            <ToggleButton value='Pendente' >Pendente</ToggleButton>
                            <ToggleButton value='Aprovado' >Aprovado</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <RegisterButton text="Registrar" />
                </Box>
            )}
        </>
    );
}

export default FormUpdateBeneficio;
