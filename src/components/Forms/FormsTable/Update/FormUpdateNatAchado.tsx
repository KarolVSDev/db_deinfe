import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { NatAchado } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { useContextTable } from '../../../../context/TableContext';
import { GridRowId } from '@mui/x-data-grid';
import useFetchListData from '../../../../hooks/useFetchListData';
import { useEffect, useState } from 'react';

interface NatAchadoProp {
  closeModal: () => void;
  id: GridRowId | undefined;
}

const FormUpdateNatAchado: React.FC<NatAchadoProp> = ({ closeModal, id }) => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm<NatAchado>({});
  const { setArrayNatAchado, natAchadoUp } = useContextTable()
  const { getNatAchadoRelation } = useFetchListData()


  useEffect(() => {
    if (id) {
      getNatAchadoRelation(id);
    }
  }, [])


  const onSubmit = (data: NatAchado) => {
    const NatId = id
    api.patch(`/nat-achado/update${id}`, data).then(response => {    
      TypeAlert(response.data.message, 'success');
      reset()
      closeModal()
      setArrayNatAchado(prevArray => [...prevArray, data])
    }).catch((error) => {
      TypeAlert(error.response.data.message, 'warning');
    });

  };


  return (
    <Container>
      {natAchadoUp && (
        <Box component="form" name='formNatAchado' noValidate onSubmit={handleSubmit(onSubmit)}>
           <Typography variant='h5' sx={{ pt: 3, pb: 3, color: '#1e293b', fontWeight: 'bold' }}>Atualizar Registro de Natureza do Achado</Typography>
          <Grid item xs={12} sm={4}>
            <TextField
              variant='filled'
              required
              defaultValue={natAchadoUp?.descricao}
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
    </Container>
  );
}

export default FormUpdateNatAchado;
