import { Box, Grid, Autocomplete, TextField, Typography, Container } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { useForm } from 'react-hook-form';
import { Procurador } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { GridRowId } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

interface FormProcProps {
    id?: GridRowId;
}

const FormUpdateProcurador: React.FC<FormProcProps> = ({ id }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Procurador>({});
    const [procurador, setProcurador] = useState<Procurador>()
    const {getAllProcurador} = useContextTable()

    const getOneProcurador = async (id: GridRowId) => {
        try {
            const response = await api.get(`/procurador/${id}`)
            setProcurador(response.data)
        } catch (error: any) {
            TypeAlert(error.response.data.message, 'error')
        }
    }


    const onSubmit = (data: Procurador) => {
        api.patch(`/procurador/${id}`, data).then(response => {
            TypeAlert('Procurador atualizado', 'success');
            reset()
            getAllProcurador()
        }).catch((error) => {
            TypeAlert(error.response.data.message, 'warning');
        });
    };

    useEffect(() => {
        if (id) {
            getOneProcurador(id)
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
        </Container>
    );
}

export default FormUpdateProcurador;
