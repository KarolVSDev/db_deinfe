import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import Radio from '@mui/material/Radio/Radio';

import { useForm } from 'react-hook-form';


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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  
  const {register, handleSubmit , formState:{errors}, watch} = useForm()
  

  const onSbmit = (data:any) => {
    console.log(data)
  }
  };



  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro de Usuário
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onsubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="nome"
                  type="text"
                  required
                  fullWidth
                  id="nome"
                  label="Nome Completo"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  type="email"
                  autoFocus
                />
              </Grid>     
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="cargo"
                  label="Cargo"
                  name="cargo"
                  type="text"
                />
              </Grid>
                
              <Grid >
                <Grid sx={{display:'flex', flexDirection:'row', ml:"10px", mt:"5px", alignContent:''}}>
                  <FormLabel id="demo-radio-buttons-group-label" sx={{mt:"8px"}}>Ativo:</FormLabel>
                  <RadioGroup
                      aria-labelledby="radio-buttons-ativo-inativo"
                      defaultValue="S"
                      name="radio-buttons-group"
                      aria-required
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
                  name="senha"
                  label="senha"
                  type="senha"
                  id="senha"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
               
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
    </ThemeProvider>
  )
}