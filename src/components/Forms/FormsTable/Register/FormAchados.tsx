import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Controller, useForm } from 'react-hook-form';
import { Achado, TopicoAchado, User } from '../../../../types/types'
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import { useContextTable } from '../../../../context/TableContext';
import { Autocomplete, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import RegisterButton from '../../../Buttons/RegisterButton';
import dataFake from '../../../../service/dataFake';
import { useState } from 'react';
import ButtonNovo from '../../../Buttons/ButtonNovo';

export interface FormAchadoProps {
closeModal:() => void;
user:User | undefined;
dataType:string;
}
const FormAchado:React.FC<FormAchadoProps> = ({closeModal, user, dataType}) => {

  const { control, register, handleSubmit, setValue, formState: { errors, isSubmitted }, reset } = useForm<Achado>({});
  //const { setArrayAchado } = useContextTable()
  const { saveAchado, getAchado } = dataFake()
  const [situacao, setSituacao] = useState<string | null>(null);
  const {arrayTopicoAchado} = useContextTable()

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newSituacao: string,
  ) => {
    if (newSituacao !== undefined) {
      setSituacao(newSituacao);
    }
  };

  const onSubmit = (data: Achado) => {
    // api.post('/achado', data).then(response => {
    //   const newAchado = response.data.achado;
    //   TypeAlert(response.data.message, 'success')
    //   reset()
    //   setArrayAchado(prevArray => [...prevArray, newAchado])
    // }).catch((error) => {
    //   TypeAlert(error.response.data.message, 'warning');
    // })
    
    if(getAchado(data.achado)){
      return
    }

    if(user?.cargo !== 'Diretor'){
      data.situacao = false
    }
    
    const dataWithSituacao = {
      ...data,
      situacao:situacao === 'Aprovado'? true : false
    }
    saveAchado(dataWithSituacao)
    TypeAlert('Achado adicionado', 'success');
    reset()
    closeModal()
  }

  return (
        <Box sx={{border:'1px solid #000', borderRadius:2, padding:'20px 20px 20px',boxShadow:'1px 2px 4px'}} component="form" name='formAchados' noValidate onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='h6' sx={{mb:2, color:'rgb(17 24 39)'}}>Cadastrar Novo Achado</Typography>
          <Grid item xs={12} sm={4} sx={{ mb: 2 }}>
            <Controller
            name="topico_id"
            control={control}
            defaultValue="" // valor inicial para evitar undefined
            rules={{ required: 'Campo obrigatório' }} // Validação do campo
            render={({ field }) => (
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={arrayTopicoAchado}
                getOptionLabel={(option: TopicoAchado) => option.topico}
                onChange={(event, value) => field.onChange(value?.id || '')} // Atualiza o valor do formulário
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tópico"
                    variant="filled"
                    error={!!errors.topico_id} // Mostra erro
                    helperText={errors.topico_id?.message} // Mostra a mensagem de erro
                  />
                )}
              />
            )}
          />
          </Grid>
          <ButtonNovo dataType={dataType} closeModal={closeModal} user={user}/>
          <Grid item xs={12} sm={4} sx={{mt:3}}>
            <TextField
              variant='filled'
              autoComplete="given-name"
              type="text"
              required
              multiline
              rows={4}
              fullWidth
              id="analise"
              label="Análise"
              autoFocus
              error={errors?.analise?.type === 'required'}
              {...register('analise', {
                required: 'Campo obrigatório',
              })}
            />
            {errors?.analise && (
              <Typography variant="caption" sx={{ color: 'red', ml: '10px', mb: 0 }}>
                {errors.analise?.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={4} sx={{mt:3}}>
            <TextField
              variant='filled'
              autoComplete="given-name"
              type="text"
              required
              fullWidth
              id="achado"
              label="Proposta de Achado"
              autoFocus
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
  )
}

export default FormAchado;


