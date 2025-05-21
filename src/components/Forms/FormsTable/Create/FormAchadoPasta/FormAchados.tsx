import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { Achado, TopicoAchado, User } from '../../../../../types/types'
import { TypeAlert } from '../../../../../hooks/TypeAlert';
import { useContextTable } from '../../../../../context/TableContext';
import { Autocomplete, Grid, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import RegisterButton from '../../../../Buttons/RegisterButton';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldComponent from '../../../../Inputs/TextField';
import ToggleButtonsCriterios from '../../../../Inputs/ToggleInputs/ToggleInputCriterio';
import RadioInput from '../../../../Inputs/RadioInput';
import DateSelector from '../../../../Inputs/DatePicker';
import Loader from '../../../../Loader/Loader';
import useFetchAchado from './useFetchAchado';
import ModalTema from '../FormTemaPasta/ModalTema';
import useFetchTema from '../FormTemaPasta/useFetchTema';

export interface FormAchadoProps {
  closeModal: () => void;
  user: User;
  dataType: string;
}

const FormAchado: React.FC<FormAchadoProps> = ({ closeModal, user }) => {

  const { control, register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm<Achado>({
    defaultValues: {
      gravidade: 'Baixa'
    }
  });
  const { getAllTemas } = useFetchTema();
  const { getAchadobyName } = useFetchAchado();
  const { setAchado } = useFetchAchado();
  const [situacaoAchado, setSituacaoAchado] = useState<string | null>(null);
  const { arrayTopicoAchado } = useContextTable()
  const [alignment, setAlignment] = useState<keyof Achado>('criterioGeral');
  const [loading, setLoading] = useState(false);
  const gravidade = watch('gravidade', 'Baixa');

  useEffect(() => {
    getAllTemas()
  })



  const handleChangeSituacaoAchado = (
    _: React.MouseEvent<HTMLElement>,
    newSituacao: string | null
  ) => {
    if (newSituacao !== null) {
      setSituacaoAchado(newSituacao);
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


  const onSubmit = async (data: Achado) => {
    setLoading(true)
    //bloco que manipula e salva o achado

    try {
      const achadoExiste = await getAchadobyName(data.achado, data.tema_id);
      if (achadoExiste) {
        setLoading(false)
        return
      }

      if (user?.cargo !== 'chefe') {
        data.situacaoAchado = false;
      }

      const dataWithSituacao = {
        ...data,
        situacaoAchado: situacaoAchado === 'Aprovado' ? true : false,
      };

      await setAchado(dataWithSituacao);
      TypeAlert("Achado adicionado", "success");
      reset();
      closeModal();
      return;
    } catch (error) {
      TypeAlert("Erro ao tentar adicionar o achado", "error");
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <Box sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }} component="form" name='formAchados' id='formAchados' noValidate onSubmit={(e) => {
      e.preventDefault();
      e.stopPropagation();
      handleSubmit(onSubmit)(e);
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '70vw', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ pt: 3, pb: 3, color: '#1e293b' }}>Cadastrar Achado</Typography>
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
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => (
            <Autocomplete
              disablePortal
              autoFocus
              id="autocomplete-tema_id"
              options={arrayTopicoAchado}
              getOptionLabel={(option: TopicoAchado) => option.tema}
              onChange={(_, value) => field.onChange(value?.id || '')}
              ListboxProps={{
                style: {
                  maxHeight: '200px',
                  overflow: 'auto',
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tema"
                  variant="filled"
                  focused={true}
                  error={!!errors.tema_id}
                  helperText={errors.tema_id?.message}
                />
              )}
            />
          )}
        />
      </Grid>

      <ModalTema dataType='tema' user={user} />
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
          id="situacaoAchado"
          color="primary"
          value={situacaoAchado}
          exclusive
          onChange={handleChangeSituacaoAchado}
          aria-label="Situação do Achado"

        >
          <ToggleButton value='Pendente' >Pendente</ToggleButton>
          <ToggleButton value='Aprovado' >Aprovado</ToggleButton>
        </ToggleButtonGroup>) : (
          <input id="situacaoAchado" type="hidden"{...register('situacaoAchado')} value="false" />
        )}
      </Grid>

      <Grid item xs={12} sm={4}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <DateSelector id='data' register={register} errors={errors} label='Data de registro' />
          <RadioInput id={'gravidade'}
            label='Gravidade'
            errors={errors}
            value={gravidade}
            setValue={setValue} />
        </Box>
      </Grid>

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
            autoComplete="analise"
            type="text"
            multiline
            rows={4}
            fullWidth
            id="analise"
            label="Análise"
            placeholder='Use # + barra de espaço para indicar um título. Ex: # Título'
            {...register('analise')}
          />
        </Grid>
      </Grid>
      {loading ? <Box sx={{ display: "flex", justifyContent: "start", mt: 3 }}><Loader />
      </Box> :
        <RegisterButton text="Registrar" />
      }
    </Box>
  )
}

export default FormAchado;