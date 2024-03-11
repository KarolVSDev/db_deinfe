import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import Radio from '@mui/material/Radio/Radio';
import validator, { isEmail } from 'validator'
import { useForm } from 'react-hook-form';
import yup from 'yup'


interface FormData{
  nome:string;
  email:string;
  cargo:string;
  ativo:string;
  senha:string;
  consfirmesenha:string
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Focus
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );  
}




export default function SignUp() {
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({});
  

  const onSubmit = (data:FormData) => {
    console.log(data)
  }

  return (
      <Container component="main" maxWidth="xs"  sx={{mt:'-90px'}} >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro de Usuário
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={1}>
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
                  id="cargo"
                  label="Cargo"
                  type="text"
                  error={!!errors?.cargo}
                  {...register('cargo', {required:'Campo obrigatório'})}
                />
              </Grid>
                {errors?.cargo && (
                  <Typography variant="caption" sx={{ color: 'red', ml:'10px'}}>
                  {errors.cargo.message}
                </Typography>
                )}
              <Grid >
                <Grid sx={{display:'flex', flexDirection:'row', ml:"10px"}}>
                  <FormLabel id="demo-radio-buttons-group-label" sx={{mt:"8px"}}>Ativo:</FormLabel>
                  <RadioGroup
                      aria-labelledby="radio-buttons-ativo-inativo"
                      defaultValue="S"
                      aria-required
                      {...register('ativo')}
                    > 
                      <Box sx={{display:'flex', flexDirection:'row', ml:"10px"}}>
                        <FormControlLabel value="S" control={<Radio />} label="SIM" />
                        <FormControlLabel value="n" control={<Radio />} label="NÃO" />
                      </Box>
                    </RadioGroup>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField  
                  required
                  fullWidth
                  label="senha"
                  type="password"
                  id="senha"
                  error={!!errors?.senha}
                  {...register('senha',{required:'Campo obrigatório',
                  minLength: 8 || 'A senha deve ter 8 caracteres no mínimo', 
                  pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/ || 'A senha deve conter letras maiúsculas, minúsculas números e um carcter especial #$%'})}
                  autoComplete="new-password"
                />
              </Grid>
              {errors?.senha && (
                <Typography variant="caption" sx={{ color: 'red', ml:'10px'}}>
                {errors.senha.message}
              </Typography>
              )}
              <Grid item xs={12}>
                <TextField  
                    required
                    fullWidth
                    label="confirmesenha"
                    type="password"
                    id="confirmesenha"
                    autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrar-se
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Já tem uma conta? Clique Aqui
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 1.5 }} />
      </Container>
  )
}

function yupResolver(schema: yup.ObjectSchema<{ nome: string; email: string | undefined; }, yup.AnyObject, { nome: undefined; email: undefined; }, "">): import("react-hook-form").Resolver<import("react-hook-form").FieldValues, any> | undefined {
  throw new Error('Function not implemented.');
}
