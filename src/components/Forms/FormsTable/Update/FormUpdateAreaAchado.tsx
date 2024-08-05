import { Autocomplete, Box, Container, Grid, TextField, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { useForm, UseFormRegister } from 'react-hook-form';
import { AreaAchado, AreaAchado2, AreaAchadoUp, NatAchado } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import React, { useEffect, useState } from 'react';
import { GridRowId } from '@mui/x-data-grid';
import useFetchListData from '../../../../hooks/useFetchListData';


export const AutocompleteNatAchado = React.forwardRef<
    HTMLDivElement,
    { label: string; options: NatAchado[], value: NatAchado | undefined } & ReturnType<UseFormRegister<any>>
>(({ onChange, onBlur, name, label, options, value }, ref) => (
    <>
        <Autocomplete
            disablePortal
            options={options}
            defaultValue={value}
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
    const { arrayNatAchado, setArrayAreaAchado, areaAchadoUp } = useContextTable();

    const [natAchado, setNatAchado] = useState<NatAchado>()
    const [areaAchado, setAreaAchado] = useState<AreaAchado2>()
    const { getAllNatAchado, getAreaAchadoRelation} = useFetchListData()
   

    const getAreaAchado = () => {
        api.get(`area-achado/${id}`).then(response => {
            setAreaAchado(response.data)
        }).catch((error) => {
            console.log(error)
            TypeAlert('Erro ao buscar a área do Achado', 'error')
        })
    }

    useEffect(() => {
        getAllNatAchado()
        if (id) {
            getAreaAchado()
            getAreaAchadoRelation(id)
            setNatAchado(areaAchado?.natureza);
        }
    }, [])

    console.log(areaAchado)


    const onSubmit = (data: AreaAchado) => {
        const areaId = id;
        api.patch(`/area-achado/update/${id}`, data).then(response => {
            TypeAlert(response.data.message, 'success');
            reset();
            setArrayAreaAchado(prevArray => {
                const updatedArray = prevArray.map(item => 
                    item.id === areaId ? {...item, ...data} : item
                )
                
                return updatedArray
            })
            closeModal()
        }).catch((error) => {
            TypeAlert(error.response.data.message, 'warning');
        });

    };


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
                            value={areaAchado.natureza}
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
