import { Autocomplete, AutocompleteGetTagProps, Box, Grid, IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { Controller, useForm } from 'react-hook-form';
import { Achado, Beneficio, TopicoAchado, User } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { GridRowId } from '@mui/x-data-grid';
import useFetchListData from '../../../../hooks/useFetchListData';
import { useEffect, useState } from 'react';
import useExportToExcel from '../../../../hooks/useExportToExcel';
import CloseIcon from '@mui/icons-material/Close';
import ButtonNovo from '../../../Buttons/ButtonNovo';
import dataFake from '../../../../service/dataFake';
import MultiploAutoComplete from '../../../Autocomplete/AutoCompleteComopnent';

interface DivAchadoProps {
  closeModal: () => void;
  id: GridRowId | undefined;
}

export interface FormUpdateAchadoProps {
  closeModal: () => void;
  user: User | undefined;
  id: GridRowId | undefined;
  dataType: string;
}
const FormUpdateAchados: React.FC<FormUpdateAchadoProps> = ({ closeModal, id, user, dataType }) => {
  const { control, handleSubmit, register, formState: { errors }, setValue, reset } = useForm<Achado & Beneficio>({});
  const [achado, setAchado] = useState<Achado>()
  const [topico, setTopico] = useState<TopicoAchado>()
  const [openModal, setOpenModal] = useState(false)
  const { exportAchadoRelations } = useExportToExcel()
  const { arrayAchado, setArrayAchado, arrayTopicoAchado, arrayBeneficio } = useContextTable()
  const [situacaoAchado, setSituacaoAchado] = useState<string | null>(null);
  const [situacaoBeneficio, setSituacaoBeneficio] = useState<string | null>(null);
  const { getBeneficiosByAchado } = dataFake()
  const [bda, setbda] = useState<Beneficio[]>([])

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
  const getTopico = () => {
    if (achado) {
      const topico = arrayTopicoAchado.find(item => item.id === achado.topico_id)
      setTopico(topico)
    }
  }

  useEffect(() => {
    if (id) {
      getAchado()
    }
  }, [])


  useEffect(() => {
    if (achado) {
      setSituacaoAchado(achado.situacaoAchado === false ? 'Pendente' : 'Aprovado');
      const bda = getBeneficiosByAchado(achado?.id)
      setbda(bda)
      getTopico()
    }
  }, [achado])


  const handleChangeSituacaoAchado = (
    event: React.MouseEvent<HTMLElement>,
    newSituacao: string | null
  ) => {
    if (newSituacao !== null) {
      setSituacaoAchado(newSituacao);
    }
  };

  const handleChangeSituacaoBeneficio = (
    event: React.MouseEvent<HTMLElement>,
    newSituacao: string | null
  ) => {
    if (newSituacao !== null) {
      setSituacaoBeneficio(newSituacao);
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

  const onSubmit = (data: Achado & Beneficio) => {
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
      situacao: situacaoAchado === "Aprovado" ? true : false
    }

    setArrayAchado(prevArray => prevArray.map(item => item.id === id ? { ...item, ...updateData } : item))
    closeModal()
  }
  
  return (
    <>
      {achado && (
        <Box sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }} component="form" name='formAchados' noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '70vw', justifyContent: 'space-between' }}>
            <Typography variant="h5" sx={{ pt: 3, pb: 3, color: '#1e293b' }}>Atualizar Achado</Typography>
            <IconButton onClick={closeModal} sx={{
              '&:hover': {
                bgcolor: '#1e293b', color: '#ffffff',
              }
            }}>
              <CloseIcon />
            </IconButton>
          </Box>
          {topico ? (<Grid item xs={12} sm={4} sx={{ mb: 2 }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={arrayTopicoAchado}
              clearOnBlur
              defaultValue={arrayTopicoAchado.find(item => item.id === topico?.id)}
              getOptionLabel={(option: TopicoAchado) => option.topico}
              onChange={(event, value) => setValue('topico_id', value?.id ?? '')}
              renderInput={(params) => <TextField variant='filled' {...params} label="Topico" />}
            />
            {errors.topico_id && (
              <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                {errors.topico_id.message}
              </Typography>
            )}
          </Grid>) : (<></>)}

          <Grid item xs={12} sm={4} sx={{ mt: 3 }}>
            <TextField
              variant='filled'
              defaultValue={achado.achado}
              autoComplete="given-name"
              type="text"
              required
              fullWidth
              id="achado"
              label="Proposta de Achado"
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
          </Grid>
          <Grid item xs={12} sm={4}>
            {user?.cargo === 'Diretor' ? (<ToggleButtonGroup
              color="primary"
              value={situacaoAchado}
              exclusive
              onChange={handleChangeSituacaoAchado}
              aria-label="Platform"

            >
              <ToggleButton value='Pendente' >Pendente</ToggleButton>
              <ToggleButton value='Aprovado' >Aprovado</ToggleButton>
            </ToggleButtonGroup>) : (
              <input type="hidden"{...register('situacaoAchado')} value="false" />
            )}
          </Grid>
          <Grid item xs={12} sm={4} sx={{ mt: 3 }}>
            <TextField
              variant='filled'
              autoComplete="given-name"
              defaultValue={achado.analise}
              type="text"
              multiline
              rows={4}
              fullWidth
              id="analise"
              label="Análise"
              error={errors?.analise?.type === 'required'}
              {...register('analise', {
                required: 'Campo obrigatório',
              })}
            />

            <MultiploAutoComplete beneficios={arrayBeneficio} beneficiosDoAchado={bda} />

          </Grid>
          <RegisterButton text="Atualizar" />
        </Box>
      )}
    </>
  );
}

export default FormUpdateAchados;
