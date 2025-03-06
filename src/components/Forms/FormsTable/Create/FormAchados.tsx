import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { Achado, BeneficioComAchado, TopicoAchado, User } from '../../../../types/types'
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import { useContextTable } from '../../../../context/TableContext';
import { Autocomplete, Grid, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import RegisterButton from '../../../Buttons/RegisterButton';
import dataFake from '../../../../service/dataFake';
import { useState } from 'react';
import ButtonNovo from '../../../Buttons/ButtonNovo';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldComponent from '../../../Inputs/TextField';
import ToggleButtonsCriterios from '../../../Inputs/ToggleInputs/ToggleInputCriterio';
import RadioInput from '../../../Inputs/RadioInput';
import DateSelector from '../../../Inputs/DatePicker';
import Loader from '../../../Loader/Loader';



export interface FormAchadoProps {
  closeModal: () => void;
  user: User | undefined;
  dataType: string;
}

const FormAchado: React.FC<FormAchadoProps> = ({ closeModal, user, dataType }) => {

  const { control, register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm<BeneficioComAchado>({
    defaultValues: {
      gravidade: 'Baixa'
    }
  });
  const { saveAchado, saveBeneficio, verifyAchado, saveAchadoBeneficio, verifyBeneficio } = dataFake()
  const [situacaoAchado, setSituacaoAchado] = useState<string | null>(null);
  const [situacaoBeneficio, setSituacaoBeneficio] = useState<string | null>(null);
  const { arrayTopicoAchado, arrayBeneficio, setArrayAchado } = useContextTable()
  const [alignment, setAlignment] = useState<keyof BeneficioComAchado>('criterioGeral');
  const [loading, setLoading] = useState(false);
  const gravidade = watch('gravidade', 'Baixa');

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
  console.log(user)

  const onSubmit = async (data: BeneficioComAchado) => {
    // api.post('/achado', data).then(response => {
    //   const newAchado = response.data.achado;
    //   TypeAlert(response.data.message, 'success')
    //   reset()
    //   setArrayAchado(prevArray => [...prevArray, newAchado])
    // }).catch((error) => {
    //   TypeAlert(error.response.data.message, 'warning');
    // })

    setLoading(true)
    //bloco que manipula e salva o achado

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      if (verifyAchado(data.achado)) {
        return;
      }

      if (data.beneficios?.length === 0 && !data.beneficio) {
        // Se não houver benefícios, apenas salva o achado
        const { beneficio, beneficios, ...dataSemBeneficio } = data;

        if (user?.cargo !== 'chefe') {
          data.situacaoAchado = false;
          data.situacaoBeneficio = false;
        }

        const dataWithSituacao = {
          ...dataSemBeneficio,
          situacaoAchado: situacaoAchado === 'Aprovado' ? true : false,
        };



        saveAchado(dataWithSituacao);


        TypeAlert('Achado adicionado', 'success');
        reset();
        closeModal();
        return; // Interrompe o processo aqui se não houver benefício
      }

      // Caso haja benefício, ou se o array de benefícios não estiver vazio, o fluxo continua
      if (data.beneficio) {
        // Verifique se o benefício já existe antes de continuar
        if (verifyBeneficio(data.beneficio)) {
          return;
        }

        if (user?.cargo !== 'Diretor') {
          data.situacaoAchado = false;
          data.situacaoBeneficio = false;
        }

        const dataWithSituacao = {
          ...data,
          situacaoAchado: situacaoAchado === 'Aprovado' ? true : false,
        };

        const retornoAchado = saveAchado(dataWithSituacao);

        // Bloco que manipula e salva o beneficio
        const objBeneficio = { beneficio: data.beneficio, situacaoBeneficio: data.situacaoBeneficio };

        const objBeneficioWithSituacao = {
          ...objBeneficio,
          situacaoBeneficio: situacaoBeneficio === "Aprovado" ? true : false,
        };

        const retornoBeneficio = saveBeneficio(objBeneficioWithSituacao);

        // Bloco que manipula e salva o AchadoBeneficio
        if ((retornoAchado && retornoBeneficio) || (data.beneficios && data.beneficios.length > 0)) {
          const objAchadoBeneficio = { achado_id: retornoAchado.id, beneficio_id: retornoBeneficio.id };
          console.log("teste de entrada")
          // Caso haja múltiplos benefícios
          if (data.beneficios && data.beneficios.length > 0) {
            const { beneficios, beneficio, situacaoBeneficio, ...dataSemBeneficios } = data;

            if (retornoBeneficio) {
              beneficios.push(retornoBeneficio)
            }

            beneficios.forEach((beneficio) => {
              const objAchadoBeneficio = { achado_id: retornoAchado.id, beneficio_id: beneficio.id };
              saveAchadoBeneficio(objAchadoBeneficio);
            });
          } else if (data.beneficios && data.beneficios.length === 0) {
            saveAchadoBeneficio(objAchadoBeneficio)
          }
        }
      } else if (!data.beneficio && (data.beneficios && data.beneficios?.length > 0)) {
        const { beneficios, beneficio, situacaoBeneficio, ...dataSemBeneficios } = data;

        const dataWithSituacao = {
          ...data,
          situacaoAchado: situacaoAchado === 'Aprovado' ? true : false,
        };

        const retornoAchado = saveAchado(dataWithSituacao);

        beneficios.forEach((beneficio) => {
          const objAchadoBeneficio = { achado_id: retornoAchado.id, beneficio_id: beneficio.id };
          saveAchadoBeneficio(objAchadoBeneficio);
        });
      }

      TypeAlert('Achado adicionado', 'success');
      reset();
      closeModal();
    } catch (error) {
      TypeAlert("Erro ao tentar adicionar o achado", "error");
      console.error(error)
    }


  }


  return (
    <Box sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }} component="form" name='formAchados' noValidate onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '70vw', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ pt: 3, pb: 3, color: '#1e293b' }}>Cadastrar Novo Achado</Typography>
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
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => (
            <Autocomplete
              disablePortal
              autoFocus
              id="combo-box-demo"
              options={arrayTopicoAchado}
              getOptionLabel={(option: TopicoAchado) => option.topico}
              onChange={(event, value) => field.onChange(value?.id || '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tópico"
                  variant="filled"
                  focused={true}
                  error={!!errors.topico_id}
                  helperText={errors.topico_id?.message}
                />
              )}
            />
          )}
        />
      </Grid>
      <ButtonNovo dataType={dataType} closeModal={closeModal} user={user} />
      <Grid item xs={12} sm={4} sx={{ mt: 3 }}>
        <TextField
          variant='filled'
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
        {user?.cargo === 'chefe' ? (<ToggleButtonGroup
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

      <DateSelector id='data' register={register} errors={errors} label='Data de registro' />

      <RadioInput id={'gravidade'}
        label='Gravidade'
        errors={errors}
        value={gravidade}
        setValue={setValue} />

      <Grid item xs={12} sm={4} sx={{ mt: 3 }}>

        <Grid item xs={12}>
          <ToggleButtonsCriterios alignment={alignment} onChange={setAlignment} />
        </Grid>
        <Grid item xs={12}>
          <TextFieldComponent id={alignment} label={getTextFieldLabel()} register={register} errors={errors} />
        </Grid>

        <Grid item xs={12} sm={4} sx={{ mt: 3 }}>
          <Typography>Campo de Análise</Typography>
          <TextField
            variant='filled'
            autoComplete="given-name"
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
        </Grid>

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
        {errors?.analise && (
          <Typography variant="caption" sx={{ color: 'red', ml: '10px', mb: 0 }}>
            {errors.analise?.message}
          </Typography>
        )}

      </Grid>
      <Grid item xs={12} sm={4} sx={{ mt: 3 }}>
        <Typography variant='h6' sx={{ mb: 2, color: 'rgb(17 24 39)' }}>Relacionar Beneficio(s)</Typography>
        <Controller
          name="beneficios"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Autocomplete
              multiple
              id="beneficios"
              options={arrayBeneficio}
              getOptionLabel={(option) => option.beneficio}
              filterSelectedOptions
              value={field.value || []}
              onChange={(event, value) => field.onChange(value)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Relação de Benefícios"
                  placeholder="Selecione os benefícios"
                  variant="filled"
                  error={!!errors.beneficios}
                  helperText={errors.beneficios?.message}
                />
              )}
            />
          )}
        />
      </Grid>
      {loading ? <Box sx={{ display: "flex", justifyContent: "start", mt: 3 }}><Loader />
      </Box> :
        <RegisterButton text="Registrar" />
      }
    </Box>
  )
}

export default FormAchado;