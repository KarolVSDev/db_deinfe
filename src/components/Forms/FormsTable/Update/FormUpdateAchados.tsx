import { Autocomplete, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { useForm } from 'react-hook-form';
import { Achado, Achado2, AreaAchado, DivAchado } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { GridRowId } from '@mui/x-data-grid';
import useFetchListData from '../../../../hooks/useFetchListData';
import { useEffect, useState } from 'react';
import { achadoHeader } from '../../../../service/columns';
import HandleModalButton from '../../../Buttons/HandleTypeButton';
import ModalShowDetails from '../../../Modais/DataTableModals/ModalShowDetails';
import useFormData from '../../../../hooks/useFormData';
import useExportToExcel from '../../../../hooks/useExportToExcel';

interface DivAchadoProps {
  closeModal: () => void;
  id: GridRowId | undefined;
}
const FormUpdateAchados: React.FC<DivAchadoProps> = ({ closeModal, id }) => {
  const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm<Achado>({});

  const { arrayDivAchado, setArrayAchado, achadoUp } = useContextTable()
  const { getAllDivAchado, getAchadoRelation } = useFetchListData()
  const [achado, setAchado] = useState<Achado2>()
  const [openModal, setOpenModal] = useState(false)
  const {exportAchadoRelations} = useExportToExcel()

  const getAchado = () => {
    api.get(`achado/${id}`).then(response => {
      console.log(response.data)
      setAchado(response.data)
    }).catch((error) => {
      console.log(error)
      TypeAlert('Erro ao Resgata Achado', 'error')
    })
  }

  useEffect(() => {
    getAllDivAchado()
    if (id) {
      getAchado()
      getAchadoRelation(id)
    }
  }, [])

  const handleModal = () => {
    setOpenModal(true)
  }
  const handleClose = () => {
    setOpenModal(false)
  }

  const handleExport = () => {
    if(achadoUp){
      exportAchadoRelations(achadoUp, 'relacoes.xlsx')
    }
  }

  const onSubmit = (data: Achado) => {
    const idAchado = id;
    api.patch(`/achado/update/${idAchado}`, data).then(response => {
      TypeAlert(response.data.message, 'success')
      reset()
      setArrayAchado(prevArray => {
        const updatedArray = prevArray.map(item =>
          item.id === idAchado ? { ...item, ...data } : item
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
      {achado && (
        <Box component="form" name='formAchados' noValidate onSubmit={handleSubmit(onSubmit)} >
          <Typography variant='h5' sx={{ pt: 3, pb: 3, color: '#1e293b', fontWeight: 'bold' }}>Atualizar Registro do Achado</Typography>
          <TextField
            variant='filled'
            autoComplete="given-name"
            defaultValue={achado.titulo}
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
            defaultValue={achado.texto}
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
            defaultValue={achado.criterio}
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
            defaultValue={achado.ativo}
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
            defaultValue={achado.divisao}
            getOptionLabel={(option: DivAchado) => option.descricao}
            onChange={(event, value) => setValue('divisao', value?.id ?? '')}
            renderInput={(params) => <TextField variant='filled' {...params} label="Divisão" />}
          />


          <RegisterButton text="Registrar" />
        </Box>
      )}
      <HandleModalButton handleModal={handleModal} />
      <Button onClick={handleExport} variant="contained" sx={{ bgcolor: '#ff3d00', '&:hover': { bgcolor: '#b22a00' }, width: '100%', mt: 1 }}>Exportar</Button>
      <ModalShowDetails dataType={'achado'} open={openModal} onClose={handleClose} achadoRelation={achadoUp} />
    </Container>
  );
}

export default FormUpdateAchados;
