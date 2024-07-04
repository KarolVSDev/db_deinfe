import { Box, Grid, TextField, Typography, Container } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { useForm } from 'react-hook-form';
import { Procurador, Relator } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { GridRowId } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import useFetchListData from '../../../../hooks/useFetchListData';
import InfoPaperProcessos from '../../../InfoPaper/InfoPaperProcessos';


interface FormRelatorProps {
    id?: GridRowId;
    closeModal: () => void;
}

const FormUpdateRelator: React.FC<FormRelatorProps> = ({ id, closeModal }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Relator>({});
    const { getAllRelator, setArrayRelator} = useContextTable()
    const [relator, setRelator] = useState<Relator>()
    const {getProcessoByRelator, arrayListData, onDelete} = useFetchListData(id)
    const [buttonType, setButtonType] = useState<string>('processo')


    const getOneRelator = async (id: GridRowId) => {
        try {
            const response = await api.get(`/relator/${id}`)
            setRelator(response.data)
        } catch (error: any) {
            TypeAlert(error.response.data.message, 'error')
        }
    }

    const onSubmit = (data: Relator) => {  
        const relatorId = id;
        api.patch(`/relator/${id}`, data).then(response => {
            TypeAlert(response.data.message, 'success');
            setArrayRelator(prevArray => {
                const updatedArray = prevArray.map(item => 
                    item.id === relatorId ? {...item, ...data} : item
                )
                return updatedArray;
            })
            closeModal()
        }).catch((error) => {
            TypeAlert(error.response.data.message, 'warning');
        });
    };

    const handleDelete = (id:string, type:string) => {
        onDelete(id, type);
    }

    useEffect(() => {
        if (id) {
            getOneRelator(id)
            getProcessoByRelator(id)
        }
    }, [])

    return (
        <Container>
            {relator && (
                <Box component="form" name='formProcurador' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                    <Typography variant='h5' sx={{ pb: 3, color: '#1e293b', fontWeight: 'bold' }}>Atualizar Registro de Relator</Typography>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            variant='filled'
                            required
                            fullWidth
                            autoFocus
                            defaultValue={relator?.nome}
                            id="nome"
                            label="Nome"
                            type="text"
                            error={!!errors?.nome}
                            {...register('nome', {
                                required: 'Campo obrigatório',
                            })}
                        />

                        {errors?.nome && (
                            <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                                {errors.nome.message}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            defaultValue={relator?.cargo}
                            variant='filled'
                            required
                            fullWidth
                            autoFocus
                            id="cargo"
                            label="Cargo"
                            type="text"
                            error={!!errors?.cargo}
                            {...register('cargo', {
                                required: 'Campo obrigatório', maxLength: { value: 25, message: 'O nome do cargo é grande demais' }
                            })}
                        />

                        {errors?.cargo && (
                            <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                                {errors.cargo.message}
                            </Typography>
                        )}
                    </Grid>
                    <RegisterButton text="Registrar" />
                </Box>
            )}
            <Box sx={{ border: '1px solid #ccc', mt: 2, p: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'start', gap: 1 }} >
                    <Typography variant='h6' sx={{ color: '#1e293b', fontWeight: 'bold' }}>Lista de Processos</Typography>
                </Box>
                <InfoPaperProcessos arrayData={arrayListData} handleDelete={handleDelete} stateType={buttonType} />
            </Box>
        </Container>
    );
}

export default FormUpdateRelator;
