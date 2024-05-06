import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio/Radio';
import validator from 'validator'
import { useForm } from 'react-hook-form';
import IconButton from '@mui/material/IconButton/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import {PessoaFisica, User} from '../../types/types'
import { api } from '../../service/api';
import { TypeInfo } from '../../hooks/TypeAlert';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CloseIcon from '@mui/icons-material/Close';


interface SignUpProps {
  closeModal: () => void;
}

const FormPessoaFisica:React.FC<SignUpProps> = ({closeModal}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { register, handleSubmit,formState: { errors } } = useForm<PessoaFisica>({});
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit = (data:PessoaFisica) => {
    api.post('/pessoafisica',data).then(response => {
      closeModal()
      TypeInfo(response.data.message, 'success')
    }).catch((error) => {
      TypeInfo(error.response.data.message, 'warning');
    })
  }

  const handleModalClose:any = () => {
    closeModal()
  }

  return (
      <Container  maxWidth="xs"  sx={{ height:'95vh'}} >
        <CssBaseline />
            <IconButton onClick={handleModalClose} sx={{ml:35, mb:0,mr:0,'&:hover': {
                bgcolor: '#1e293b', color:'#ffffff', 
              }}}>
              <CloseIcon />
            </IconButton>
        <Box
          sx={{
           
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor:'rgb(17 24 39)','&:hover': {
                  bgcolor: '#1e293b', 
                } }}>
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro de Usuário
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3}}>
            <Grid container sx={{display:'flex', flexDirection:'row', gap:2}} spacing={1}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  type="text"
                  required
                  fullWidth
                  id="nome"
                  label="Nome Completo"
                  autoFocus
                  error= {errors?.nome?.type === 'required'}
                  {...register('nome', {required:true})}
                />
              </Grid>
                {errors?.nome?.type === 'required' && (
                  <Typography variant="caption" sx={{ color: 'red', ml:'10px'}}>Campo obrigatório</Typography>
                )}
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  type="email"
                  autoFocus
                  error= {!!errors?.email}
                  {...register("email", {required:'Campo obrigatório', validate:(value) => validator.isEmail(value) || 'Insira um E-mail válido'})}
                />
              </Grid>     
                  {errors?.email && (
                    <Typography variant="caption" sx={{ color: 'red', ml:'10px'}}>
                      {errors.email.message}
                    </Typography>
                  )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="cpf"
                  label="CPF"
                  type="text"
                  error={!!errors?.cpf}
                  {...register('cpf', {required:'Campo obrigatório'})}
                />
              </Grid>
                {errors?.cpf && (
                  <Typography variant="caption" sx={{ color: 'red', ml:'10px'}}>
                  {errors.cpf.message}
                </Typography>
                )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor:'rgb(17 24 39)','&:hover': {
                bgcolor: '#1e293b', 
              } }}
            >
              Registrar
            </Button>
          </Box>
        </Box>
      </Container>
  )
}

export default FormPessoaFisica;
