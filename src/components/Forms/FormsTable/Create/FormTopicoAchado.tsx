import { Autocomplete, Box, Grid, IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { TopicoAchado, User } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { useContextTable } from '../../../../context/TableContext';
import dataFake from '../../../../service/dataFake'
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export interface FormTopicoAchadoProps {
  closeModal: () => void;
  user: User | undefined;
}

const FormTopicoAchado: React.FC<FormTopicoAchadoProps> = ({ closeModal, user }) => {
  const { handleSubmit, register, formState: { errors }, reset, setValue } = useForm<TopicoAchado>({});
  //const { setArrayTopicoAchado } = useContextTable()
  const { saveTopico, getTopico } = dataFake()
  const [situacao, setSituacao] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false)

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newSituacao: string,
  ) => {
    if (newSituacao !== undefined) {
      setSituacao(newSituacao);
    }
  };

  const onSubmit = (data: TopicoAchado) => {
    // api.post('/nat-achado', data).then(response => {
    //   const newTopicoAchado = response.data.natachado
    //   console.log(newTopicoAchado)
    //   
    //   setArrayTopicoAchado(prevArray => [...prevArray, newTopicoAchado])
    // }).catch((error) => {
    //   TypeAlert(error.response.data.message, 'warning');
    // });
    if (getTopico(data.topico)) {
      return;
    }
    if (user?.cargo !== 'Diretor') {
      data.situacao = false;
    }
    const dataWithSituacao = {
      ...data,
      situacao: situacao === 'Aprovado' ? true : false
    }
    saveTopico(dataWithSituacao, setLoaded)
    TypeAlert('Tópico adicionado', 'success');
    reset()
    closeModal()
  };

  return (
    <Box sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }} component="form" name='formTopicoAchado' noValidate onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '70vw', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ pt: 3, pb: 3, color: '#1e293b' }}>Cadastrar Novo Tópico</Typography>
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
          id="topico"
          label='Proposta de Tópico'
          type="text"
          error={!!errors?.topico}
          {...register('topico', {
            required: 'Campo obrigatório'
          })}
        />

        {errors?.topico && (
          <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
            {errors.topico.message}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={4}>
        {user?.cargo === 'Diretor' ? (<ToggleButtonGroup
          color="primary"
          value={situacao}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value='Pendente' >Pendente</ToggleButton>
          <ToggleButton value='Aprovado' >Aprovado</ToggleButton>
        </ToggleButtonGroup>) : (
          <input type="hidden"{...register('situacao')} value="false" />
        )}
      </Grid>
      <RegisterButton text="Registrar" />
    </Box>
  );
}

export default FormTopicoAchado;
