import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import validator from 'validator'
import { useForm } from 'react-hook-form';
import IconButton from '@mui/material/IconButton/IconButton';
import { PessoaFisica } from '../../types/types'
import { api } from '../../service/api';
import { TypeInfo } from '../../hooks/TypeAlert';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CloseIcon from '@mui/icons-material/Close';




interface SignUpProps {
  closeModal: () => void;
}

const FormPessoaFisica: React.FC<SignUpProps> = ({ closeModal }) => {

  const { register, handleSubmit, formState: { errors } } = useForm<PessoaFisica>({});



  const onSubmit = (data: PessoaFisica) => {
    api.post('/pessoafisica/create', data).then(response => {
      closeModal()
      TypeInfo(response.data.message, 'success')
    }).catch((error) => {
      TypeInfo(error.response.data.message, 'warning');
    })
  }

  const handleModalClose: any = () => {
    closeModal()
  }

  return (
    <Container maxWidth="xs" sx={{ height: '95vh' }} >
      <CssBaseline />
      <IconButton onClick={handleModalClose} sx={{
        ml: 65, mb: 0, mr: 0, '&:hover': {
          bgcolor: '#1e293b', color: '#ffffff',
        }
      }}>
        <CloseIcon />
      </IconButton>
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
          <HowToRegIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro de Pessao Física
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, width: '700px' }}>
          <Grid container spacing={3} sx={{pb:1}} >
            <Grid item xs={3} >
              <TextField
                autoComplete="given-name"
                type="text"
                required
                fullWidth
                id="nome"
                label="Nome Completo"
                autoFocus
                error={errors?.nome?.type === 'required'}
                {...register('nome', {
                  required: 'Campo obrigatório', pattern: {
                    value: /^([A-Z][a-zÀ-ú]*)(\s[A-Z][a-zÀ-ú]*)*$/,
                    message: 'Nome inválido'
                  }
                })}
              />
              {errors?.nome && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px', mb: 0 }}>
                  {errors.nome.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3} >
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="email"
                label="E-mail"
                type="email"
                autoFocus
                error={!!errors?.email}
                {...register("email", { required: 'Campo obrigatório', validate: (value) => validator.isEmail(value) || 'Insira um E-mail válido' })}
              />

              {errors?.email && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.email.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                placeholder='xxx.xxx.xxx-xx'
                id="cpf"
                label="CPF"
                type="text"
                error={!!errors?.cpf}
                {...register('cpf', {
                  required: 'Campo obrigatório',
                  pattern: {
                    value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                    message: 'CPF inválido'
                  }
                })}
              />

              {errors?.cpf && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.cpf.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                placeholder='xxxxxxx-x'
                id="rg"
                label="RG"
                type="text"
                error={!!errors?.rg}
                {...register('rg', {
                  required: 'Campo obrigatório',
                  pattern: {
                    value: /^\d{1,2}\d{3}\d{3}-\d$/,
                    message: 'RG inválido'
                  },

                })}
              />

              {errors?.rg && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.rg.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                placeholder='Ex:Servidor'
                id="profissao"
                label="Profissão"
                type="text"
                error={!!errors?.profissao}
                {...register('profissao', { required: 'Campo obrigatório',  pattern: {
                  value: /^([A-Z][a-zÀ-ú]*)(\s[A-Z][a-zÀ-ú]*)*$/,
                  message: 'Profissão inválida'
                } })}
              />

              {errors?.profissao && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.profissao.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                placeholder='M ou F'
                id="genero"
                label="Gênero"
                type="text"
                error={!!errors?.genero}
                {...register('genero', {
                  required: 'Campo obrigatório', pattern: {
                    value: /^[MF]$/,
                    message: 'Gênero inválido'
                  }
                })}
              />

              {errors?.genero && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.genero.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                placeholder='xxxxx-xxx'
                id="cep"
                label="CEP"
                type="text"
                error={!!errors?.cep}
                {...register('cep', {
                  required: 'Campo obrigatório', pattern: {
                    value: /^\d{5}-\d{3}$/,
                    message: 'CEP inválido'
                  }
                })}
              />

              {errors?.cep && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.cep.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                id="logradouro"
                label="Logradouro"
                type="text"
                error={!!errors?.logradouro}
                {...register('logradouro', { required: 'Campo obrigatório' })}
              />

              {errors?.logradouro && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.logradouro.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3} >
              <TextField
                fullWidth
                required
                id="complemento"
                label="Complemento"
                type="text"
                error={!!errors?.complemento}
                {...register('complemento', { required: 'Campo obrigatório' })}
              />
              {errors?.complemento && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.complemento.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                id="numero"
                label="Número"
                type="text"
                error={!!errors?.numero}
                {...register('numero', { required: 'Campo obrigatório' })}
              />

              {errors?.numero && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.numero.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                placeholder='Ex:Rio De Janeiro'
                id="cidade"
                label="Cidade"
                type="text"
                error={!!errors?.cidade}
                {...register('cidade', {
                  required: 'Campo obrigatório',
                  pattern: {
                    value: /^([A-Z][a-zÀ-ú]*)(\s[A-Z][a-zÀ-ú]*)*$/,
                    message: 'Cidade inválida'
                  }
                })}
              />

              {errors?.cidade && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.cidade.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3} >
              <TextField
                required
                fullWidth
                placeholder='AM'
                id="uf"
                label="UF"
                type="text"
                error={!!errors?.uf}
                {...register('uf', {
                  required: 'Campo obrigatório', pattern: {
                    value: /^[A-Z]{2}$/,
                    message: 'UF inválido'
                  }
                })}
              />

              {errors?.uf && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.uf.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                placeholder='(xx)xxxxx-xxxx'
                id="telefone1"
                label="Telelfone 1"
                type="text"
                error={!!errors?.telefone1}
                {...register('telefone1', {
                  required: 'Campo obrigatório',
                  pattern: {
                    value: /^\(\d{2}\)\d{4,5}-\d{4}$/,
                    message: 'Telefone inválido'

                  }
                })}
              />

              {errors?.telefone1 && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.telefone1.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                placeholder='(xx)xxxxx-xxxx'
                id="telefone2"
                label="Telefone 2"
                type="text"
                error={!!errors?.telefone2}
                {...register('telefone2', {
                  required: 'Campo obrigatório',
                  pattern: {
                    value: /^\(\d{2}\)\d{4,5}-\d{4}$/,
                    message: 'Telefone inválido'

                  }
                })}
              />
              {errors?.telefone2 && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.telefone2.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                id="ramal"
                label="Ramal"
                type="text"
                error={!!errors?.ramal}
                {...register('ramal', {
                  required: 'Campo obrigatório',
                  pattern: {
                    value: /^\d{2}$/,
                    message: 'Ramal inválido'
                  }
                })}
              />

              {errors?.ramal && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.ramal.message}
                </Typography>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: 'rgb(17 24 39)', '&:hover': {
                  bgcolor: '#1e293b',
                }, width: '400px', m: 'auto', mt: 3,
              }}
            >
              Registrar
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default FormPessoaFisica;


