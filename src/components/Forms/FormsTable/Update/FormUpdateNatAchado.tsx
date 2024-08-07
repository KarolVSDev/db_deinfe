import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { NatAchado } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { useContextTable } from '../../../../context/TableContext';
import { GridRowId } from '@mui/x-data-grid';
import useFetchListData from '../../../../hooks/useFetchListData';
import { useEffect, useState } from 'react';
import ModalShowDetails from '../../../Modais/DataTableModals/ModalShowDetails';
import HandleModalButton from '../../../Buttons/HandleTypeButton';
import useExportToExcel from '../../../../hooks/useExportToExcel';
import ButtonExport from '../../../Buttons/ButtonExport';

interface NatAchadoProp {
  closeModal: () => void;
  id: GridRowId | undefined;
}

const FormUpdateNatAchado: React.FC<NatAchadoProp> = ({ closeModal, id }) => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm<NatAchado>({});
  const { setArrayNatAchado, natAchadoUp, arrayNatAchado } = useContextTable()
  const { getNatAchadoRelation } = useFetchListData()
  const [natAchado, setNatAchado] = useState<NatAchado>()
  const [openModal, setOpenModal] = useState(false)
  const {exportNatRelations} = useExportToExcel()

  console.log(id)
  const getNatAchado = () => {
    const natachado = arrayNatAchado.find(item => item.id === id);
    if (natachado) {
      setNatAchado(natachado)
    } else {
      return console.log('natChado não encontrado')
    }
  }


  const onSubmit = (data: NatAchado) => {
    const NatId = id
    api.patch(`/nat-achado/update/${id}`, data).then(response => {
      TypeAlert(response.data.message, 'success');
      reset()
      setArrayNatAchado(prevArray => {
        const updatedArray = prevArray.map(item =>
          item.id === NatId ? { ...item, ...data } : item
        )
        return updatedArray
      })
      closeModal()
    }).catch((error) => {
      TypeAlert(error.response.data.message, 'warning');
    });

  };

  useEffect(() => {
    if (id) {
      getNatAchado()
    }
  }, [natAchadoUp])

  const handleModal = () => {
    getNatAchadoRelation(id);
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const handleExport = () => {
    getNatAchadoRelation(id);
    if(natAchadoUp){
      exportNatRelations(natAchadoUp, 'relacoes.xlsx')
    }
}

  return (
    <Container>
      {natAchado && (
        <Box component="form" name='formNatAchado' noValidate onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='h5' sx={{ pt: 3, pb: 3, color: '#1e293b', fontWeight: 'bold' }}>Atualizar Registro de Natureza do Achado</Typography>
          <Grid item xs={12} sm={4}>
            <TextField
              variant='filled'
              required
              defaultValue={natAchado.descricao}
              fullWidth
              autoFocus
              id="descricao"
              label='Natureza do Achado'
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
          <RegisterButton text="Registrar" />
        </Box>
      )}
      <HandleModalButton handleModal={handleModal} />
      <ButtonExport handleExport={handleExport}/>
      <ModalShowDetails dataType={'nat-achado'} natAchadoRelations={natAchadoUp} onClose={handleClose} open={openModal} />
    </Container>
  );
}

export default FormUpdateNatAchado;
