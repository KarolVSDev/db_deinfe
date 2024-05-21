import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import validator from 'validator'
import { useForm } from 'react-hook-form';
import { Jurisd, PessoaFisica } from '../../types/types'
import { api } from '../../service/api';
import { TypeInfo } from '../../hooks/TypeAlert';
import RegisterButton from '../Buttons/RegisterButton';
import formatDate from '../../hooks/DateFormate';


const FormJurisd = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<Jurisd>({});



  const onSubmit = (data: Jurisd) => {
    let dataC;
    let dataE;
    dataC = formatDate(data.dataCriacao)
    dataE = formatDate(data.dataExtincao)
    data.dataCriacao = dataC;
    data.dataExtincao = dataE;
      api.post('/jurisd', data).then(response => {
        TypeInfo(response.data.message, 'success')
      }).catch((error) => {
        TypeInfo(error.response.data.message, 'warning');
      })
  }

  return (
    <Container maxWidth="xs" sx={{ mb: 2 }} >
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Box component="form"  name='formJurisd' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, width: '700px', p: 2 }}>
          <Grid container spacing={3} sx={{ pb: 1 }} >
            <Grid item xs={3} >
              <TextField
                variant='filled'
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
                variant='filled'
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

            <Grid item xs={3} >
              <TextField
                variant='filled'
                autoComplete="given-name"
                required
                fullWidth
                id="sigla"
                label="Sigla"
                type="sigla"
                autoFocus
                error={!!errors?.sigla}
                {...register("sigla", {
                  required: 'Campo obrigatório', pattern: {
                    value: /^[A-Z]+$/,
                    message: 'Sigla inválida'
                  }
                })}
              />

              {errors?.sigla && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.sigla.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant='filled'
                required
                placeholder='xx.xxx.xxx/xxxx-xx'
                fullWidth
                id="cnpj"
                label="CNPJ"
                type="text"
                error={!!errors?.cnpj}
                {...register('cnpj', {
                  required: 'Campo obrigatório',
                  pattern: {
                    value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
                    ,
                    message: 'CNPJ inválido'
                  }
                })}
              />

              {errors?.cnpj && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.cnpj.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant='filled'
                required
                fullWidth
                id="ug"
                label="UG"
                type="text"
                error={!!errors?.ug}
                {...register('ug', {
                  required: 'Campo obrigatório',
                  pattern: {
                    value: /^\d{7}$/,
                    message: 'Unidade gestora inválida'
                  },
                })}
              />
              {errors?.ug && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.ug.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant='filled'
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
                variant='filled'
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
                variant='filled'
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
                variant='filled'
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
                variant='filled'
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
                variant='filled'
                required
                fullWidth
                placeholder='(xx)xxxxx-xxxx'
                id="telefone1"
                label="Telefone 1"
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
                variant='filled'
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
                variant='filled'
                required
                fullWidth
                placeholder='Ex:Servidor'
                id="site"
                label="Site"
                type="text"
                error={!!errors?.site}
                {...register('site', {
                  required: 'Campo obrigatório',
                  pattern: {
                    value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,})?$/,
                    message: 'Site inválido'
                  }
                })}
              />
              {errors?.site && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.site.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant='filled'
                required
                fullWidth
                id="cargoGestor"
                label="Cargo do Gestor"
                type="text"
                error={!!errors?.cargoGestor}
                {...register('cargoGestor', {
                  required: 'Campo obrigatório', pattern: {
                    value: /^([A-Z][a-zÀ-ú]*)(\s[A-Z][a-zÀ-ú]*)*$/,
                    message: 'Cargo inválido'
                  }
                })}
              />

              {errors?.cargoGestor && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.cargoGestor.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant='filled'
                required
                fullWidth
                id="normaCriacao"
                label="Norma da Criação"
                type="text"
                error={!!errors?.normaCriacao}
                {...register('normaCriacao', { required: 'Campo obrigatório' })}
              />

              {errors?.normaCriacao && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.normaCriacao.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant='filled'
                required
                fullWidth
                id="dataCriacao"
                label="Data da Criação"
                type="text"
                error={!!errors?.dataCriacao}
                {...register('dataCriacao', {
                  required: 'Campo obrigatório',
                  pattern: {
                    value: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                    message: 'Data da criação inválida'
                  }
                })}
              />

              {errors?.dataCriacao && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.dataCriacao.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant='filled'
                required
                fullWidth
                id="normaExtincao"
                label="Norma da Extinção"
                type="text"
                error={!!errors?.normaExtincao}
                {...register('normaExtincao', { required: 'Campo obrigatório' })}
              />

              {errors?.normaExtincao && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.normaExtincao.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant='filled'
                required
                fullWidth
                id="dataExtincao"
                label="dataExtincao"
                type="text"
                error={!!errors?.dataExtincao}
                {...register('dataExtincao', {
                  required: 'Campo obrigatório',
                  pattern: {
                    value: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                    message: 'Data da extinção inválida'
                  }
                })}
              />

              {errors?.dataExtincao && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                  {errors.dataExtincao.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant='filled'
                autoComplete="given-name"
                type="text"
                required
                fullWidth
                id="poder"
                label="poder"
                autoFocus
                error={errors?.poder?.type === 'required'}
                {...register('poder', {
                  required: 'Campo obrigatório', pattern: {
                    value: /^[A-Z]$/,
                    message: 'Poder inválido'
                  },
                  maxLength: {
                    value: 1,
                    message: 'Poder inválido'
                  }
                })}
              />
              {errors?.poder && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px', mb: 0 }}>
                  {errors.poder?.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant='filled'
                autoComplete="given-name"
                type="text"
                required
                fullWidth
                id="numero"
                label="numero"
                autoFocus
                error={errors?.numero?.type === 'required'}
                {...register('numero', {
                  required: 'Campo obrigatório', pattern: {
                    value: /^\d+$/,
                    message: 'Número inválido'
                  },
                  maxLength: {
                    value: 6,
                    message: 'Número inválido'
                  }
                })}
              />
              {errors?.numero && (
                <Typography variant="caption" sx={{ color: 'red', ml: '10px', mb: 0 }}>
                  {errors.numero?.message}
                </Typography>
              )}
            </Grid>

          </Grid>
          <RegisterButton />
        </Box>
      </Box>
    </Container>
  )
}

export default FormJurisd;


