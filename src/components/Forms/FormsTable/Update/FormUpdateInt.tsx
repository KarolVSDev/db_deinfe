import { Box, Grid, TextField, Typography} from '@mui/material';
import { useForm } from 'react-hook-form';
import { InteressadoUpdate } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { GridRowId } from '@mui/x-data-grid';
import {  useState } from 'react';

interface FormIntProps {
  idPessoa?: GridRowId | undefined;
  idInteresse?: string;
  interesseCont?: string;
}

const FormUpdateInt: React.FC<FormIntProps> = ({ idPessoa, idInteresse, interesseCont}) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<InteressadoUpdate>({});
  const [interesse, setInteresse] = useState({})

  const onSubmit = (data: InteressadoUpdate) => {
    api.patch(`/interessado/pessoa/${idPessoa}`, data).then(response => {
      TypeAlert(response.data.message, 'success');
    }).catch((error) => {
      TypeAlert(error.response.data.message, 'warning');
    });
  };
  
  return (
      <Box component="form" name='formInteresse' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <Grid item xs={3}>
          <TextField
            key={idInteresse}
            variant='filled'
            required
            fullWidth
            id="outlined-helperText"
            label="Interesse"
            type="text"
            defaultValue={interesseCont}
            error={!!errors?.interesse}
            {...register('interesse', {
              required: 'Campo obrigatório',
            })}
          />
          {errors?.interesse && (
            <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
              {errors.interesse.message}
            </Typography>
          )}
        </Grid>
        <RegisterButton text="Atualizar"/>
      </Box>
  );
}

export default FormUpdateInt;
