import { Autocomplete, Box, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { TopicoAchado, User } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { useContextTable } from '../../../../context/TableContext';
import dataFake from '../../../../service/dataFake'
import { useState } from 'react';

export interface FormTopicoAchadoProps {
  closeModal:() => void;
  user:User | undefined;
}

const FormTopicoAchado:React.FC<FormTopicoAchadoProps> = ({closeModal, user}) => {
  const { handleSubmit, register, formState: { errors }, reset, setValue } = useForm<TopicoAchado>({});
  //const { setArrayTopicoAchado } = useContextTable()
  const { saveTopico } = dataFake()
  const [situacao, setSituacao] = useState<string | null>(null);

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
    if(user?.cargo !== 'Diretor'){
      data.situacao = false;
    }
    const dataWithSituacao = {
      ...data,
      situacao:situacao === 'Aprovado'? true : false
    }
    saveTopico(dataWithSituacao)
    TypeAlert('Tópico adicionado', 'success');
    reset()
    closeModal()
    console.log(data)

  };

  return (
    <Box component="form" name='formTopicoAchado' noValidate onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h6' sx={{mb:2, color:'rgb(17 24 39)'}}>Registro de Tópico</Typography>
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

        {user?.cargo ==='Diretor'? (<ToggleButtonGroup
             color="primary"
             value={situacao}
             exclusive
             onChange={handleChange}
             aria-label="Platform"
           >
             <ToggleButton value='Pendente' >Pendente</ToggleButton>
             <ToggleButton value='Aprovado' >Aprovado</ToggleButton>
           </ToggleButtonGroup>):(
          <input type="hidden"{...register('situacao')} value="false" />
        )}

      </Grid>
      <RegisterButton text="Registrar" />
    </Box>
  );
}

export default FormTopicoAchado;
