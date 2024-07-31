import { Autocomplete, Box, Container, Grid, TextField, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { useForm, UseFormRegister } from 'react-hook-form';
import { AreaAchado, NatAchado } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import React, { useEffect, useState } from 'react';
import { GridRowId } from '@mui/x-data-grid';


export const AutocompleteNatAchado = React.forwardRef<
    HTMLDivElement,
    { label: string; options: NatAchado[] } & ReturnType<UseFormRegister<any>>
>(({ onChange, onBlur, name, label, options }, ref) => (
    <>
        <Autocomplete
            disablePortal
            options={options}
            getOptionLabel={(option: NatAchado) => option.descricao}
            onChange={(event, value) => onChange({ target: { name, value: value?.id ?? '' } })}
            renderInput={(params) => (
                <TextField
                    variant='filled'
                    {...params}
                    label={label}
                    onBlur={onBlur}
                    inputRef={ref}
                />
            )}
        />
    </>
));

interface AreaAchadoProps {
    closeModal: () => void;
    id: GridRowId | undefined;
}

const FormUpdateAreaAchado: React.FC<AreaAchadoProps> = ({ closeModal, id }) => {
    const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm<AreaAchado>({});
    const { arrayNatAchado, setArrayAreaAchado, arrayAreaAchado } = useContextTable();
    const [areaAchado, setAreaAchado] = useState<AreaAchado>()

    const getNatAchado = () => {
        const areachado = arrayAreaAchado.find(item => item.id === id);
        if (areachado) {
            setAreaAchado(areachado)
        } else {
            return console.log('Area não encontrado')
        }
    }

    const onSubmit = (data: AreaAchado) => {
        api.post('/area-achado', data).then(response => {
            const newAreaAchado = response.data.areaAchado;
            TypeAlert(response.data.message, 'success');
            reset();
            setValue('natureza', null);
            setArrayAreaAchado(prevArray => [...prevArray, newAreaAchado])
            closeModal()
        }).catch((error) => {
            TypeAlert(error.response.data.message, 'warning');
            setValue('natureza', null);
        });

    };

    useEffect(() => {
        getNatAchado()
    }, [])

    return (
        <Container>
            {areaAchado && (
                <Box component="form" name='formAreaAchado' noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant='h5' sx={{ pt: 3, pb: 3, color: '#1e293b', fontWeight: 'bold' }}>Atualizar Registro de Área do Achado</Typography>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            variant='filled'
                            defaultValue={areaAchado.descricao}
                            required
                            autoFocus
                            fullWidth
                            id="descricao"
                            label='Área do Achado'
                            type="text"
                            error={!!errors?.descricao}
                            {...register('descricao', {
                                required: 'Campo obrigatório'
                            })}
                        />

                        {errors?.descricao && (
                            <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                                {errors.descricao.message}
                            </Typography>
                        )}
                    </Grid>

                    <Grid item xs={12} sm={4} >
                        <AutocompleteNatAchado
                            label="Natureza"
                            options={arrayNatAchado}
                            {...register('natureza', {
                                required: 'Campo obrigatório'
                            })}
                        />
                        {errors?.natureza && (
                            <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                                {errors.natureza.message}
                            </Typography>
                        )}
                    </Grid>
                    <RegisterButton text="Registrar" />
                </Box>
            )}
        </Container>
    );
}

export default FormUpdateAreaAchado;
