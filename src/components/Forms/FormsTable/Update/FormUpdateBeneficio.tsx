import { Autocomplete, Box, Button, Container, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { useForm } from 'react-hook-form';
import { AreaAchado, Beneficio, DivAchado, DivAchado2 } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { GridRowId } from '@mui/x-data-grid';
import useFetchListData from '../../../../hooks/useFetchListData';
import { useEffect, useState } from 'react';
import HandleModalButton from '../../../Buttons/HandleTypeButton';
import ModalShowDetails from '../../../Modais/DataTableModals/ModalShowDetails';
import useExportToExcel from '../../../../hooks/useExportToExcel';

interface DivAchadoProps {
    closeModal: () => void;
    id: GridRowId | undefined;
}
const FormUpdateBeneficio: React.FC<DivAchadoProps> = ({ closeModal, id }) => {
    const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm<Beneficio>({});

    const { arrayBeneficio, setArrayBeneficio } = useContextTable()
    const [beneficio, setBeneficio] = useState<Beneficio>()
    const [openModal, setOpenModal] = useState(false)
    const [situacao, setSituacao] = useState<string>()
    //const {exportDivRelations} = useExportToExcel()


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
        <Container>
            {beneficio && (
                <Box component="form" name='formDivAchado' noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant='h5' sx={{ pt: 3, pb: 3, color: '#1e293b', fontWeight: 'bold' }}>Atualizar Registro do Benefício</Typography>
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
           { /*<HandleModalButton handleModal={handleModal}/>
            <Button onClick={handleExport} variant="contained" sx={{ bgcolor: '#ff3d00', '&:hover': { bgcolor: '#b22a00' }, width: '100%', mt: 1 }}>Exportar</Button>
            <ModalShowDetails dataType={'div-achado'} divAchadoRelation={divAchadoUp} onClose={handleClose} open={openModal} />*/}
        </Container>
    );
}

export default FormUpdateBeneficio;
