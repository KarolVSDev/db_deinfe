import { Autocomplete, Box, Grid, IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useContextTable } from '../../../../../context/TableContext';
import { Controller, useForm } from 'react-hook-form';
import { Achado, BeneficioComAchado, TopicoAchado, User } from '../../../../../types/types';
import { TypeAlert } from '../../../../../hooks/TypeAlert';
import RegisterButton from '../../../../Buttons/RegisterButton';
import { GridRowId } from '@mui/x-data-grid';
import useFetchListData from '../../../../../hooks/useFetchListData';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DateSelector from '../../../../Inputs/DatePicker';
import RadioInput from '../../../../Inputs/RadioInput';
import ToggleButtonsCriterios from '../../../../Inputs/ToggleInputs/ToggleInputCriterio';
import TextFieldComponent from '../../../../Inputs/TextField';
import Loader from '../../../../Loader/Loader';
import AchadoSkeleton from './AchadoSkeleton';
import useFetchAchado from './useFetchAchado';
import { formatCurrency } from '../../../../../hooks/DateFormate';

export interface FormUpdateAchadoProps {
  closeModal: () => void;
  user: User | undefined;
  id: GridRowId | undefined;
  dataType: string;
}
const FormUpdateAchados: React.FC<FormUpdateAchadoProps> = ({ closeModal, id, user }) => {
  const [tema, setTema] = useState<TopicoAchado>({ id: '', tema: '', situacao: false })
  const [achado, setAchado] = useState<Achado>()
  const { arrayTopicoAchado, arrayBeneficio } = useContextTable()
  const [_situacaoAchado, setSituacaoAchado] = useState<string | null>(null);
  const { getAllTemas, getAllBeneficios } = useFetchListData()
  const { getAchadoById, updateAchado } = useFetchAchado()
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { control, handleSubmit, register, formState: { errors }, setValue, reset, watch } = useForm<BeneficioComAchado>({
    defaultValues: {
      tema_id: tema.id, // Inicialize o id do tópico
      achado: achado?.achado || '', // Inicialize com o achado, caso disponível
      analise: achado?.analise || '', // Inicialize a análise, caso disponível
      valorFinanceiro: achado?.valorFinanceiro || 0,
      beneficios: [], // Inicialize a lista de benefícios
      situacaoAchado: achado?.situacaoAchado || false, // Inicialize com o estado padrão
      criterioEstadual: achado?.criterioEstadual,
      criterioGeral: achado?.criterioGeral,
      criterioMunicipal: achado?.criterioMunicipal
    },
  });
  const gravidade = watch('gravidade', achado?.gravidade);
  const fieldValue = watch('valorFinanceiro');
  const [displayValue, setDisplayValue] = useState('');
  const [situacaoBeneficio, setSituacaoBeneficio] = useState<string | null>(null);

  const [alignment, setAlignment] = useState<keyof BeneficioComAchado>('criterioGeral');

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsLoading(true)
        try {
          if (arrayTopicoAchado.length === 0) {
            const fetchTemas = async () => {
              await getAllTemas();
              await getAllBeneficios()
            }
            fetchTemas()

          }
          // Aguarda a resolução da promessa
          const result = await getAchadoById(id);

          if (result) {
            setAchado(result.achado)
            setTema(result.tema)
            // Reseta o formulário com os dados do achado
            reset({
              id: result.achado.id || '',
              tema_id: result.tema?.id || '',
              achado: result.achado?.achado || '',
              analise: result.achado?.analise || '',
              beneficios: result.beneficios || [],
              valorFinanceiro: result.achado.valorFinanceiro || 0,
              situacaoAchado: result.achado?.situacaoAchado || false,
              criterioMunicipal: result.achado.criterioMunicipal || '',
              criterioEstadual: result.achado.criterioEstadual || '',
              criterioGeral: result.achado.criterioGeral || '',
              tema: result.tema || '',
            });

            // Define o alinhamento com base nos critérios
            if (result.achado.criterioMunicipal) {
              setAlignment('criterioMunicipal');
            } else if (result.achado.criterioEstadual) {
              setAlignment('criterioEstadual');
            } else {
              setAlignment('criterioGeral');
            }
          }
        } catch (error) {
          console.error('Erro ao buscar o achado:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData(); // Chama a função assíncrona
  }, [id, reset, arrayTopicoAchado.length, arrayBeneficio.length]);


  useEffect(() => {
    if (achado?.situacaoAchado === true) {
      setSituacaoAchado("Aprovado")
    } else {
      setSituacaoAchado("Pendente")
    }
  }, [])

  // Atualiza o valor formatado quando o valor do campo muda
  useEffect(() => {
    if (fieldValue !== undefined) {
      setDisplayValue(formatCurrency(fieldValue.toString()));
    }
  }, [fieldValue]);

  const handleChangeSituacaoBeneficio = (
    _: React.MouseEvent<HTMLElement>,
    newSituacao: string | null
  ) => {
    if (newSituacao !== null) {
      setSituacaoBeneficio(newSituacao);
    }
  };



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
    setLoading(true)
    console.log(data)
    try {
      if (id) {
        const idString = id?.toString()
        await updateAchado(idString, data)
        reset()
        TypeAlert("Achado atualizado", "success")
        closeModal()
        setLoading(false)
      }
    } catch (error) {
      TypeAlert("Erro ao tentar atualizar o Achado", "error")
    }

  }


  return (
    <>
      {isLoading ? (
        <AchadoSkeleton isLoading={isLoading} />
      ) : (
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
              name="tema_id"
              control={control}
              defaultValue={tema.id || ''}
              rules={{ required: "Selecione um tema" }}
              render={({ field }) => (
                <Autocomplete
                  options={arrayTopicoAchado}
                  getOptionLabel={(option: TopicoAchado) => option.tema}
                  defaultValue={arrayTopicoAchado.find(item => item.id === field.value) || null}
                  onChange={(_, value) => field.onChange(value?.id || '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tema"
                      variant="filled"
                      error={!!errors.tema_id}
                      helperText={errors.tema_id?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4} sx={{ mt: 3 }}>
            <TextField
              variant='filled'
              defaultValue={achado?.achado}
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
            {user?.cargo === 'chefe' ? (<Controller
              name="situacaoAchado"
              defaultValue={achado?.situacaoAchado}
              control={control}
              render={({ field }) => (
                <ToggleButtonGroup
                  color="primary"
                  value={field.value}
                  exclusive
                  onChange={(_, newValue) => field.onChange(newValue)}
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
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
              <TextField
                variant="filled"
                sx={{ mt: 3 }}
                placeholder="R$ 0,00"
                autoFocus
                id="valorFinanceiro"
                label="Valor Financeiro"
                error={!!errors?.valorFinanceiro}
                value={displayValue}
                inputProps={{
                  inputMode: 'numeric',
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const rawValue = e.target.value.replace(/\D/g, '');
                  // Converte para número antes de setar o valor
                  setValue('valorFinanceiro', Number(rawValue), { shouldValidate: true });
                }}
              // Remove o spread do register para evitar conflito com onChange
              />
              {errors?.valorFinanceiro && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.valorFinanceiro.message}
                </Typography>
              )}
              <DateSelector id='data' register={register} errors={errors} label='Data de registro' dataAchado={achado?.data} />

              <RadioInput id={'gravidade'}
                label='Gravidade'
                errors={errors}
                value={gravidade}
                setValue={setValue} />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <ToggleButtonsCriterios alignment={alignment} onChange={setAlignment} />
          </Grid>
          <Grid item xs={12}>
            <TextFieldComponent id={alignment}
              label={getTextFieldLabel()}
              register={register}
              errors={errors}
              criterioMuni={achado?.criterioMunicipal}
              criterioEst={achado?.criterioEstadual}
              criterioGeral={achado?.criterioGeral} />
          </Grid>

          <Grid item xs={12} sm={4} sx={{ mt: 3 }}>
            <TextField
              variant='filled'
              autoComplete="given-name"
              defaultValue={achado?.analise}
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
              <Typography variant='h6' sx={{ mb: 2, color: 'rgb(17 24 39)' }}>Adicionar um Beneficio</Typography>
              <TextField
                variant='filled'
                fullWidth
                id="beneficio"
                label='Proposta de Benefício'
                type="text"
                error={!!errors?.beneficio}
                {...register('beneficio')}
              />

            </Grid>

            <Grid item xs={12} sm={4}>
              {user?.cargo === 'chefe' ? (<ToggleButtonGroup
                color="primary"
                value={situacaoBeneficio}
                exclusive
                onChange={handleChangeSituacaoBeneficio}
                aria-label="Platform"

              >
                <ToggleButton value='Pendente' >Pendente</ToggleButton>
                <ToggleButton value='Aprovado' >Aprovado</ToggleButton>
              </ToggleButtonGroup>) : (
                <input type="hidden"{...register('situacaoBeneficio')} value="false" />
              )}
            </Grid>

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
                    onChange={(_, value) => field.onChange(value)} // Atualiza o estado do formulário
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
