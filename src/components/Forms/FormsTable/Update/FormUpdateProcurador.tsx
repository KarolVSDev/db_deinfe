import { Box, Grid, Autocomplete, TextField, Typography, Container } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { useForm } from 'react-hook-form';
import { Procurador } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { GridRowId } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import InfoPaperProcessos from '../../../InfoPaper/InfoPaperProcessos';
import useFetchListData from '../../../../hooks/useFetchListData';

interface FormProcProps {
    id?: GridRowId;
    closeModal: () => void;
}

const FormUpdateProcurador: React.FC<FormProcProps> = ({ id, closeModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Procurador>({});
    const [procurador, setProcurador] = useState<Procurador>()
    const { setArrayProcurador} = useContextTable()
    const { arrayListData, onDelete, getProcessoByProc } = useFetchListData(id)
    const [buttonType, setButtonType] = useState<string>('processo')

    const getOneProcurador = async (id: GridRowId) => {
        try {
            const response = await api.get(`/procurador/${id}`)
            setProcurador(response.data)
        } catch (error: any) {
            TypeAlert(error.response.data.message, 'error')
        }
    }


    const onSubmit = (data: Procurador) => {
        const procuradorId = id;
        api.patch(`/procurador/${id}`, data).then(response => {
            TypeAlert(response.data.message, 'success');
            setArrayProcurador(prevArray => {
                const updatedArray = prevArray.map(item => 
                    item.id === procuradorId ? {...item, ...data} : item
                )
                return updatedArray;
            })
            closeModal()
        }).catch((error) => {
            TypeAlert(error.response.data.message, 'warning');
        });
    };

    const handleDelete = (id: string, type: string) => {
        onDelete(id, type)
    }

    useEffect(() => {
        if (id) {
            getOneProcurador(id)
            getProcessoByProc(id)
        }
    })

    return (
        <Container  >
            {procurador && (
                <Box component="form" name='formProcurador' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                    <Typography variant='h5' sx={{ pb: 3, color: '#1e293b', fontWeight: 'bold' }}>Atualizar Registro de Procurador</Typography>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            variant='filled'
                            required
                            defaultValue={procurador.nome}
                            fullWidth
                            autoFocus
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
                    <RegisterButton text="Atualizar" />
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

export default FormUpdateProcurador;
