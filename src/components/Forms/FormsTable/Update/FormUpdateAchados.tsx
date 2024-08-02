import { Autocomplete, Box, Container, Grid, TextField, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { useForm } from 'react-hook-form';
import { Achado, AreaAchado, DivAchado } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { GridRowId } from '@mui/x-data-grid';
import useFetchListData from '../../../../hooks/useFetchListData';
import { useEffect, useState } from 'react';

interface DivAchadoProps {
    closeModal: () => void;
    id: GridRowId | undefined;
}
const FormUpdateAchados: React.FC<DivAchadoProps> = ({ closeModal, id }) => {
    const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm<Achado>({});

    const { arrayDivAchado, setArrayDivAchado, setArrayAchado} = useContextTable()
    const { getAllAreaAchado, getDivAchadoRelation } = useFetchListData()
    const [areaAchado, setAreaAchado] = useState<AreaAchado>()
    const [divAchado, setDiviAchado] = useState<DivAchado>()


    // const setDiv = () => {
    //     try {
    //         if (divAchadoUp) {
    //             const div = arrayDivAchado.find(div => div.id === divAchadoUp.id)
    //             setDiviAchado(div)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };

    useEffect(() => {
        getAllAreaAchado()
        if (id) {
            getDivAchadoRelation(id)
            //setDiv()
        }
    }, [divAchado])


    const onSubmit = (data: Achado) => {
      api.post('/achado', data).then(response => {
        const newAchado = response.data.achado;
        TypeAlert(response.data.message, 'success')
        reset()
        setArrayAchado(prevArray => [...prevArray, newAchado])
      }).catch((error) => {
        TypeAlert(error.response.data.message, 'warning');
      })
    }


    return (
        <Container>
          <Box component="form" name='formAchados' noValidate onSubmit={handleSubmit(onSubmit)} >
          <Typography variant='h5' sx={{ pt: 3, pb: 3, color: '#1e293b', fontWeight: 'bold' }}>Atualizar Registro do Achado</Typography>
          <TextField
            variant='filled'
            autoComplete="given-name"
            type="text"
            required
            fullWidth
            id="titulo"
            label="Título"
            autoFocus
            error={errors?.titulo?.type === 'required'}
            {...register('titulo', {
              required: 'Campo obrigatório',
            })}
          />
          {errors?.titulo && (
            <Typography variant="caption" sx={{ color: 'red', ml: '10px', mb: 0 }}>
              {errors.titulo?.message}
            </Typography>
          )}


          <TextField
            variant='filled'
            autoComplete="given-name"
            required
            fullWidth
            id="texto"
            label="Texto"
            type="text"
            error={!!errors?.texto}
            {...register("texto", {
              required: 'Campo obrigatório'
            })}
          />
          {errors?.texto && (
            <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
              {errors.texto.message}
            </Typography>
          )}

          <TextField
            variant='filled'
            required
            fullWidth
            id="criterio"
            label="Critério"
            type="text"
            error={!!errors?.criterio}
            {...register('criterio', {
              required: 'Campo obrigatório',
            })}
          />
          {errors?.criterio && (
            <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
              {errors.criterio.message}
            </Typography>
          )}


          <TextField
            variant='filled'
            required
            fullWidth
            id="ativo"
            label="Ativo"
            type="text"
            error={!!errors?.ativo}
            {...register('ativo', {
              required: 'Campo obrigatório', pattern: {
                value: /^(S|N)$/,
                message: 'Valor do campo inválido'
              }
            })}
          />
          {errors?.ativo && (
            <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
              {errors.ativo.message}
            </Typography>
          )}



          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={arrayDivAchado}
            getOptionLabel={(option: DivAchado) => option.descricao}
            onChange={(event, value) => setValue('divisao', value?.id ?? '')}
            renderInput={(params) => <TextField variant='filled' {...params} label="Divisão" />}
          />


          <RegisterButton text="Registrar" />
        </Box>
        </Container>
    );
}

export default FormUpdateAchados;
