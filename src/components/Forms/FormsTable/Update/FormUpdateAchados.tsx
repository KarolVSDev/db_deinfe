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
import { achadoHeader } from '../../../../service/columns';

interface DivAchadoProps {
  closeModal: () => void;
  id: GridRowId | undefined;
}
const FormUpdateAchados: React.FC<DivAchadoProps> = ({ closeModal, id }) => {
  const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm<Achado>({});

  const { arrayDivAchado, setArrayDivAchado, setArrayAchado, achadoUp } = useContextTable()
  const { getAllDivAchado, getAchadoRelation } = useFetchListData()
  const [areaAchado, setAreaAchado] = useState<AreaAchado>()
  const [divAchado, setDivAchado] = useState<DivAchado>()

  useEffect(() => {
    getAllDivAchado()
    if (id) {
      getAchadoRelation(id)
      setDiv()
    }
  }, [achadoUp, divAchado])

  const setDiv = () => {
      try {
          if (achadoUp) {
              const div =  {
                id:achadoUp.divisao.id,
                descricao:achadoUp.divisao.descricao
              }
              setDivAchado(div)
          }
      } catch (error) {
          console.log(error)
      }
  };


  const onSubmit = (data: Achado) => {
    const idAchado = id;
    api.patch(`/achado/update/${idAchado}`, data).then(response => {
      TypeAlert(response.data.message, 'success')
      reset()
      setArrayAchado(prevArray => {
        const updatedArray = prevArray.map(item => 
          item.id === idAchado ? {...item, ...data} : item
        )
        return updatedArray
      });
      closeModal()
    }).catch((error) => {
      TypeAlert(error.response.data.message, 'warning');
    })
  }


  return (
    <Container>
      {(achadoUp && divAchado) && (
        <Box component="form" name='formAchados' noValidate onSubmit={handleSubmit(onSubmit)} >
          <Typography variant='h5' sx={{ pt: 3, pb: 3, color: '#1e293b', fontWeight: 'bold' }}>Atualizar Registro do Achado</Typography>
          <TextField
            variant='filled'
            autoComplete="given-name"
            defaultValue={achadoUp.titulo}
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
            defaultValue={achadoUp.texto}
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
            defaultValue={achadoUp.criterio}
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
            defaultValue={achadoUp.ativo}
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
            defaultValue={divAchado}
            getOptionLabel={(option: DivAchado) => option.descricao}
            onChange={(event, value) => setValue('divisao', value?.id ?? '')}
            renderInput={(params) => <TextField variant='filled' {...params} label="Divisão" />}
          />


          <RegisterButton text="Registrar" />
        </Box>
      )}
    </Container>
  );
}

export default FormUpdateAchados;
