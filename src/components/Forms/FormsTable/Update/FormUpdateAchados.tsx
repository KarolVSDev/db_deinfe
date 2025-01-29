import { Autocomplete, AutocompleteGetTagProps, Box, Grid, IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { Controller, useForm } from 'react-hook-form';
import { Achado, AchadoComTopico, Beneficio, BeneficioComAchado, TopicoAchado, User } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { GridRowId } from '@mui/x-data-grid';
import useFetchListData from '../../../../hooks/useFetchListData';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import dataFake from '../../../../service/dataFake';
import DateSelector from '../../../Inputs/DatePicker';
import RadioInput from '../../../Inputs/RadioInput';
import ToggleButtonsCriterios from '../../../Inputs/ToggleInputs/ToggleInputCriterio';
import TextFieldComponent from '../../../Inputs/TextField';
import Loader from '../../../Loader/Loader';

export interface FormUpdateAchadoProps {
  closeModal: () => void;
  user: User | undefined;
  id: GridRowId | undefined;
  dataType: string;
}
const FormUpdateAchados: React.FC<FormUpdateAchadoProps> = ({ closeModal, id, user, dataType }) => {
  const [achadoComTopico, setAchadoComTopico] = useState<AchadoComTopico>()
  const [topico, setTopico] = useState<TopicoAchado>({ id: '', topico: '', situacao: false })
  const [achado, setAchado] = useState<Achado>()
  const [openModal, setOpenModal] = useState(false)
  const { arrayAchado, arrayTopicoAchado, arrayBeneficio } = useContextTable()
  const [situacaoAchado, setSituacaoAchado] = useState<string | null>(null);
  const [situacaoBeneficio, setSituacaoBeneficio] = useState<string | null>(null);
  const { getBeneficiosByAchado, updateAchado, getAchadoComTopico } = dataFake()
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, register, formState: { errors }, setValue, reset, watch } = useForm<BeneficioComAchado>({
    defaultValues: {
      topico_id: topico.id, // Inicialize o id do tópico
      achado: achado?.achado || '', // Inicialize com o achado, caso disponível
      analise: achado?.analise || '', // Inicialize a análise, caso disponível
      beneficios: [], // Inicialize a lista de benefícios
      situacaoAchado: achado?.situacaoAchado || false, // Inicialize com o estado padrão
      criterioEstadual: achado?.criterioEstadual,
      criterioGeral: achado?.criterioGeral,
      criterioMunicipal: achado?.criterioMunicipal
    },
  });
  const gravidade = watch('gravidade', achado?.gravidade);

  const getAchado = () => {
    // api.get(`achado/${id}`).then(response => {
    //   console.log(response.data)
    //   setAchado(response.data)
    // }).catch((error) => {
    //   console.log(error)
    //   TypeAlert('Erro ao Resgata Achado', 'error')
    // })
  }
  const [alignment, setAlignment] = useState<keyof BeneficioComAchado>('criterioGeral');

  useEffect(() => {
    if (id) {
      const result = getAchadoComTopico(id);
      if (result) {
        setAchadoComTopico(result);
        reset({
          id: result.achado.id || '',
          topico_id: result.topico?.id || '',
          achado: result.achado?.achado || '',
          analise: result.achado?.analise || '',
          beneficios: result.beneficios || [],
          situacaoAchado: result.achado?.situacaoAchado || false,
          criterioMunicipal: result.achado.criterioMunicipal || '',
          criterioEstadual: result.achado.criterioEstadual || '',
          criterioGeral: result.achado.criterioGeral || '',
        });

        if (result.achado.criterioMunicipal) {
          setAlignment('criterioMunicipal')
        } else if (result.achado.criterioEstadual) {
          setAlignment('criterioEstadual')
        } else {
          setAlignment('criterioGeral')
        }
      }
    }
  }, [id, reset]);


  useEffect(() => {
    setAchado(achadoComTopico?.achado)
  })

  useEffect(() => {

    if (achado?.situacaoAchado === true) {
      setSituacaoAchado("Aprovado")
    } else {
      setSituacaoAchado("Pendente")
    }
  }, [])



  const getTextFieldLabel = () => {
    switch (alignment) {
      case 'criterioMunicipal':
        return 'Criterio Municipal';
      case 'criterioEstadual':
        return 'Criterio Estadual';
      case 'criterioGeral':
        return 'Criterio Geral';
      default:
        return 'criterioGeral'
    }

  }

  const onSubmit = async (data: BeneficioComAchado) => {
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
    // closeModal()
    // }).catch((error) => {
    //  TypeAlert(error.response.data.message, 'warning');

    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      updateAchado(data)
      reset()
      TypeAlert("Achado atualizado", "success")
      closeModal()
    } catch (error) {
      TypeAlert("Erro ao tentar atualizar o Achado", "error")
    }

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
          <Grid item xs={12} sm={4} sx={{ mb: 2 }}>
            <Controller
              name="topico_id"
              control={control}
              defaultValue={topico.id || ''}
              rules={{ required: "Selecione um tópico" }}
              render={({ field }) => (
                <Autocomplete
                  options={arrayTopicoAchado}
                  getOptionLabel={(option: TopicoAchado) => option.topico}
                  defaultValue={arrayTopicoAchado.find(item => item.id === field.value) || null}
                  onChange={(event, value) => field.onChange(value?.id || '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tópico"
                      variant="filled"
                      error={!!errors.topico_id}
                      helperText={errors.topico_id?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

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
            {user?.cargo === 'Diretor' ? (<Controller
              name="situacaoAchado"
              defaultValue={achado.situacaoAchado}
              control={control}
              render={({ field }) => (
                <ToggleButtonGroup
                  color="primary"
                  value={field.value}
                  exclusive
                  onChange={(event, newValue) => field.onChange(newValue)}
                  aria-label="Situacao do Achado"
                >
                  <ToggleButton value={false}>Pendente</ToggleButton>
                  <ToggleButton value={true}>Aprovado</ToggleButton>
                </ToggleButtonGroup>
              )}
            />) : (
              <input type="hidden"{...register('situacaoAchado')} value="false" />
            )}
          </Grid>

          <DateSelector id='data' register={register} errors={errors} label='Data de registro' dataAchado={achado.data} />

          <RadioInput id={'gravidade'}
            label='Gravidade'
            errors={errors}
            value={gravidade}
            setValue={setValue} />

          <Grid item xs={12}>
            <ToggleButtonsCriterios alignment={alignment} onChange={setAlignment} />
          </Grid>
          <Grid item xs={12}>
            <TextFieldComponent id={alignment}
              label={getTextFieldLabel()}
              register={register}
              errors={errors}
              criterioMuni={achado.criterioMunicipal}
              criterioEst={achado.criterioEstadual}
              criterioGeral={achado.criterioGeral} />
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

            <Grid item xs={12} sm={4} sx={{ mt: 3 }}>
              <Typography variant='h6' sx={{ mb: 2, color: 'rgb(17 24 39)' }}>Relacionar Benefício(s)</Typography>
              <Controller
                name="beneficios" // O nome do campo no objeto `data` que será enviado
                control={control} // Controle do `react-hook-form`
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    id="beneficios"
                    options={arrayBeneficio}
                    getOptionLabel={(option) => option.beneficio}
                    filterSelectedOptions
                    value={field.value || []} // Sincroniza o valor com o formulário
                    onChange={(event, value) => field.onChange(value)} // Atualiza o estado do formulário
                    isOptionEqualToValue={(option, value) => option.id === value.id} // Compara pelo `id`
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Relação de Benefícios"
                        placeholder="Selecione os benefícios"
                        variant="filled"
                        error={!!errors.beneficios} // Exibe erro se houver
                        helperText={errors.beneficios?.message} // Mensagem de erro
                      />
                    )}
                  />
                )}
              />
            </Grid>
          </Grid>
          {loading ? <Box sx={{ display: "flex", justifyContent: "start", mt: 3 }}>
            <Loader />
          </Box> :
            <RegisterButton text="Atualizar" />
          }
        </Box>
      )}
    </>
  );
}

export default FormUpdateAchados;
