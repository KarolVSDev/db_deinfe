import { Autocomplete, Box, Button, Container, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { useForm } from 'react-hook-form';
import { Achado } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { GridRowId } from '@mui/x-data-grid';
import useFetchListData from '../../../../hooks/useFetchListData';
import { useEffect, useState } from 'react';
import useExportToExcel from '../../../../hooks/useExportToExcel';

interface DivAchadoProps {
  closeModal: () => void;
  id: GridRowId | undefined;
}
const FormUpdateAchados: React.FC<DivAchadoProps> = ({ closeModal, id }) => {
  const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm<Achado>({});
  const [achado, setAchado] = useState<Achado>()
  const [openModal, setOpenModal] = useState(false)
  const {exportAchadoRelations} = useExportToExcel()
  const {arrayAchado, setArrayAchado} = useContextTable()
  const [situacao, setSituacao] = useState<string>();

  const getAchado = () => {
    // api.get(`achado/${id}`).then(response => {
    //   console.log(response.data)
    //   setAchado(response.data)
    // }).catch((error) => {
    //   console.log(error)
    //   TypeAlert('Erro ao Resgata Achado', 'error')
    // })
    const achado = arrayAchado.find(item => item.id === id)
    setAchado(achado)
  }

  useEffect(() => {
    if (id) {
      getAchado()
    }
  }, [])

  useEffect(() => {
    if(achado){
      setSituacao(achado.situacao === false ? 'Pendente' : 'Aprovado');
    }
  },[achado])

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newSituacao: string,
  ) => {
    if (newSituacao !== undefined) {
      setSituacao(newSituacao);
    }
  };

  const handleModal = () => {
    setOpenModal(true)
  }
  const handleClose = () => {
    setOpenModal(false)
  }

  // const handleExport = () => {
  //   if(achadoUp){
  //     exportAchadoRelations(achadoUp, 'relacoes.xlsx')
  //   }
  // }

  const onSubmit = (data: Achado) => {
    // const idAchado = id;
    // api.patch(`/achado/update/${idAchado}`, data).then(response => {
    //   TypeAlert(response.data.message, 'success')
    //   reset()
    //   setArrayAchado(prevArray => {
    //     const updatedArray = prevArray.map(item =>
    //       item.id === idAchado ? { ...item, ...data } : item
    //     )
    //     return updatedArray
    //   });
    //   closeModal()
    // }).catch((error) => {
    //   TypeAlert(error.response.data.message, 'warning');
    // })

    const updateData = {
      ...data,
      situacao:situacao === "Aprovado"? true : false
    }

    setArrayAchado(prevArray => prevArray.map(item => item.id === id? {...item, ...updateData}:item))
    closeModal()
  }


  return (
    <Container>
      {achado && (
        <Box component="form" name='formAchados' noValidate onSubmit={handleSubmit(onSubmit)} >
          <Typography variant='h5' sx={{ pt: 3, pb: 3, color: '#1e293b', fontWeight: 'bold' }}>Atualizar Registro do Achado</Typography>
          <Grid item xs={12} sm={4}>
          <TextField
            variant='filled'
            autoComplete="given-name"
            defaultValue={achado.achado}
            type="text"
            required
            fullWidth
            id="achado"
            label="Achado"
            autoFocus
            error={errors?.achado?.type === 'required'}
            {...register('achado', {
              required: 'Campo obrigatório',
            })}
          />
          {errors?.achado && (
            <Typography variant="caption" sx={{ color: 'red', ml: '10px', mb: 0 }}>
              {errors.achado?.message}
            </Typography>
          )}

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
       {/*<HandleModalButton handleModal={handleModal} />
     <Button onClick={handleExport} variant="contained" sx={{ bgcolor: '#ff3d00', '&:hover': { bgcolor: '#b22a00' }, width: '100%', mt: 1 }}>Exportar</Button>
      <ModalShowDetails dataType={'achado'} open={openModal} onClose={handleClose} achadoRelation={achadoUp} />*/}
    </Container>
  );
}

export default FormUpdateAchados;
