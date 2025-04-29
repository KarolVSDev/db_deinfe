import { Box, Grid, IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';  
import { TopicoAchado, User } from '../../../../../types/types';
import RegisterButton from '../../../../Buttons/RegisterButton';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Loader from '../../../../Loader/Loader';
import useFetchTema from './useFetchTema';

export interface FormTopicoAchadoProps {
  closeModal: () => void;
  user: User | undefined;
}

const FormTopicoAchado: React.FC<FormTopicoAchadoProps> = ({ closeModal, user }) => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm<TopicoAchado>({});
  const [situacao, setSituacao] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const { getTemaByName } = useFetchTema();
  const { setTema  } = useFetchTema();

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newSituacao: string,
  ) => {
    if (newSituacao !== undefined) {
      setSituacao(newSituacao);
    }
  };

  const onSubmit = async (data: TopicoAchado) => {
    const temaExiste = await getTemaByName(data.tema)

    if (temaExiste) {
      return;
    } else {
      setLoading(true)

      try {
        if (user?.cargo !== 'chefe') {
          data.situacao = false;
        }
        const dataWithSituacao = {
          ...data,
          situacao: situacao === 'Aprovado' ? true : false
        }
        setTema(dataWithSituacao)
        reset()
        closeModal()
      } catch (error) {
        console.error("Erro no tryCacht do submit de topico: ", error)
      } finally {
        setLoading(false)
      }
    }



  };

  return (
    <Box sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }} component="form" id="formTopcioAchado" name='formTopicoAchado' noValidate  onSubmit={(e) => {
      e.preventDefault();
      e.stopPropagation();
      handleSubmit(onSubmit)(e);
    }}>
      <Box  sx={{ display: 'flex', alignItems: 'center', width: '70vw', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ pt: 3, pb: 3, color: '#1e293b' }}>Cadastrar Tema</Typography>
        <IconButton onClick={closeModal} sx={{
          '&:hover': {
            bgcolor: '#1e293b', color: '#ffffff',
          }
        }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Grid item xs={12} sm={4}>
        <TextField
          variant='filled'
          required
          fullWidth
          autoFocus
          id="tema"
          label='Proposta de Tema'
          type="text"
          error={!!errors?.tema}
          {...register('tema', {
            required: 'Campo obrigatório'
          })}
        />

        {errors?.tema && (
          <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
            {errors.tema.message}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={4}>
        {user?.cargo === 'chefe' ? (<ToggleButtonGroup
          color="primary"
          value={situacao}
          exclusive
          onChange={handleChange}
          aria-label="toggleSituacaoTema"
        >
          <ToggleButton value='Pendente' >Pendente</ToggleButton>
          <ToggleButton value='Aprovado' >Aprovado</ToggleButton>
        </ToggleButtonGroup>) : (
          <input type="hidden"{...register('situacao')} value="false" />
        )}
      </Grid>
      {loading ?
        <Box sx={{ display: 'flex', justifyContent: 'start', mt: 3 }}>
          <Loader />
        </Box> :
        <RegisterButton text="Registrar" />

      }
    </Box>
  );
}

export default FormTopicoAchado;
