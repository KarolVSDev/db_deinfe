import React, { useEffect } from 'react';
import { api } from '../../../service/api';
import { useState } from 'react';
import { UserUpdate } from '../../../types/types';
import { Avatar, Box, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TypeAlert, TypeInfo } from '../../../hooks/TypeAlert';
import env from '../../../service/env';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useLocation } from 'react-router-dom';


interface SignUpProps {
  closeModal: () => void;
  userId: string
}

const UpdateUserForm: React.FC<SignUpProps> = ({ closeModal, userId }) => {
  const location = useLocation();
  const [email] = useState(localStorage.getItem('email'))
  const [user, setUser] = useState<UserUpdate>()
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const { register, handleSubmit, formState: { errors } } = useForm<UserUpdate>({})


  const getUser = async () => {
    await api.get(`/usuario/login/${email}`).then((response) => {
      let data = response.data;
      delete data.createAt;
      delete data.updateAt;
      setUser(data)
    }).catch((error) => {
      console.error('Erro ao buscar dados de usuário', error)
    })
  }

  const getById = async (userId: string) => {
    await api.get(`/usuario/${userId}`).then(response => {
      let data = response.data
      setUser(data)
    }).catch((error) => {
      console.error('Erro ao buscar dados do usuário', error)
    })
  }

  const onSubmit = (data: UserUpdate) => {
    api.patch(`/usuario/${user?.id}`, data).then((response) => {
      TypeAlert(response.data.message, 'success')
      closeModal()
    }).catch((error: any) => {
      TypeAlert(error.response.data.message, 'warning')
    })
  }

  useEffect(() => {
    if (email === env.EMAIL_MASTER) {
      getById(userId)
    } else {
      getUser()
    }
  }, [email, userId])

  return (
    <div>
      {user && (
        <Box noValidate component='form' name='updateUserForm' onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{

              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{
              m: 1, bgcolor: 'rgb(17 24 39)', '&:hover': {
                bgcolor: '#1e293b',
              }
            }}>
              <ManageAccountsIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
              Atualizar Usuário
            </Typography>
            <Grid container spacing={1}>
              <Grid xs={12} sx={{ mb: 2 }}>
                <TextField
                  autoComplete="given-name"
                  type="text"
                  required
                  fullWidth
                  id="nome"
                  label="Nome Completo"
                  defaultValue={user.nome}
                  autoFocus
                  error={errors?.nome?.type === 'required'}
                  {...register('nome', { required: true })}
                />
                {errors?.nome?.type === 'required' && (
                  <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>Campo obrigatório</Typography>
                )}
              </Grid>

              <Grid xs={12} sx={{ mb: 2 }}>
                <TextField
                  autoComplete="given-name"
                  type="email"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  defaultValue={user.email}
                  autoFocus
                  error={!!errors?.email}
                  {...register("email", { required: 'Campo obrigatório', validate: (value) => validator.isEmail(value) || 'Insira um E-mail válido' })}
                />
                {errors?.email?.type === 'required' && (
                  <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                    E-mail é um campo obrigatório
                  </Typography>
                )}
                {errors?.email?.type === 'validate' && (
                  <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                    Por favor, insira um e-mail válido
                  </Typography>
                )}
              </Grid>

              <Grid xs={12} sx={{ mb: 2 }}>
                <TextField
                  autoComplete="given-name"
                  type="text"
                  required
                  fullWidth
                  id="cargo"
                  label="Cargo"
                  defaultValue={user.cargo}
                  autoFocus
                  error={!!errors?.cargo}
                  {...register('cargo', { required: true })}
                />
                {errors?.cargo && (
                  <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                    Campo obrigatório
                  </Typography>
                )}
              </Grid>

              <Grid sx={{ width: '100%' }}>
                <Grid sx={{ display: 'flex', flexDirection: 'row', ml: "10px" }}>
                  <FormLabel id="demo-radio-buttons-group-label" sx={{ mt: "8px" }}>Ativo:</FormLabel>
                  <RadioGroup
                    aria-labelledby="radio-buttons-ativo-inativo"
                    defaultValue="S"
                    aria-required
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'row', ml: "10px" }}>
                      <FormControlLabel {...register('ativo')} id='formRdio1' value="S" control={<Radio />} label="SIM" />
                      <FormControlLabel {...register('ativo')} id='formRdio2' value="N" control={<Radio />} label="NÃO" />
                    </Box>
                  </RadioGroup>
                </Grid>
              </Grid>

              <FormControl sx={{ width: '100%', mb: 2 }} variant="outlined" error={!!errors?.senhaAtual}>
                <InputLabel htmlFor="senhaAtual">Senha</InputLabel>
                <OutlinedInput
                  required
                  id="senhaAtual"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  label="Senha"
                  error={!!errors?.senhaAtual}
                  {...register('senhaAtual', {
                    required: 'Campo obrigatório',
                    minLength: {
                      value: 8,
                      message: 'A senha deve ter 8 caracteres no mínimo',
                    },
                    pattern: {
                      value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                      message: 'A senha deve conter letras maiúsculas, minúsculas, números e um caractere especial #$%'
                    }
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors?.senhaAtual?.type === 'required' && (
                  <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                    Senha é um campo obrigatório
                  </Typography>
                )}
                {errors?.senhaAtual?.type === 'minLength' && (
                  <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                    Senha deve ter pelo menos 8 Caracteres
                  </Typography>
                )}
                {errors?.senhaAtual?.type === 'pattern' && (
                  <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                    Senha senha deve conter letras maiúsculas, minúsculas e caracteres especiais
                  </Typography>
                )}
              </FormControl>

              <FormControl sx={{ width: '100%', mb: 2 }} variant="outlined" error={!!errors?.novaSenha}>
                <InputLabel htmlFor="novaSenha">Nova Senha</InputLabel>
                <OutlinedInput
                  required
                  id="novaSenha"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  label="novaSenha"
                  error={!!errors?.novaSenha}
                  {...register('novaSenha', {
                    required: 'Campo obrigatório',
                    minLength: {
                      value: 8,
                      message: 'A senha deve ter 8 caracteres no mínimo',
                    },
                    pattern: {
                      value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                      message: 'A senha deve conter letras maiúsculas, minúsculas, números e um caractere especial #$%'
                    },
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors?.novaSenha?.type === 'required' && (
                  <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                    Senha é um campo obrigatório
                  </Typography>
                )}
                {errors?.novaSenha?.type === 'minLength' && (
                  <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                    Senha deve ter pelo menos 8 Caracteres
                  </Typography>
                )}
                {errors?.novaSenha?.type === 'pattern' && (
                  <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                    Senha senha deve conter letras maiúsculas, minúsculas e caracteres especiais
                  </Typography>
                )}
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mb: 2, bgcolor: 'rgb(17 24 39)', '&:hover': {
                    bgcolor: '#1e293b',
                  }
                }}
              >
                Atualizar
              </Button>
              {location.pathname === '/dashboard/edituser' && (
                <Link href="/dashboard/table" variant="body2" sx={{ cursor: 'pointer' }}>
                  Voltar para Dashboard
                </Link>
              )}
            </Grid>
          </Box>
        </Box>
      )}
    </div>
  )
}

export default UpdateUserForm