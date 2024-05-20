import { Box, Grid, TextField, Typography } from '@mui/material';
import { useContextTable } from '../../context/TableContext';
import { useForm } from 'react-hook-form';
import { NatAchado } from '../../types/types';
import { api } from '../../service/api';
import { TypeInfo } from '../../hooks/TypeAlert';
import RegisterButton from '../Buttons/RegisterButton';


const FormNatAchado = () => {
    const { handleSubmit, register, formState: { errors }, reset} = useForm<NatAchado>({});

    const onSubmit = (data: NatAchado) => {
        api.post('/nat-achado', data).then(response => {
          TypeInfo(response.data.message, 'success');
          reset()
        }).catch((error) => {
          TypeInfo(error.response.data.message, 'warning');
        });

    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={3}>
              <TextField
                variant='filled'
                required
                fullWidth
                autoFocus
                id="descricao"
                label='Natureza do Achado'
                type="text"
                error={!!errors?.descricao}
                {...register('descricao', {
                  required: 'Campo obrigatório', pattern:{
                    value:/^[A-Za-z]+$/,
                    message:'Valor do campo inválido'
                  }
                })}
              />

              {errors?.descricao && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.descricao.message}
                </Typography>
              )}
              
            </Grid>
            <RegisterButton/>
        </Box>
    );
}

export default FormNatAchado;
