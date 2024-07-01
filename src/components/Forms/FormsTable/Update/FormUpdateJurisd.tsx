import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import validator from 'validator'
import { useForm } from 'react-hook-form';
import { Jurisd } from '../../../../types/types'
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import { formatToInputDate } from '../../../../hooks/DateFormate';
import { GridRowId } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useContextTable } from '../../../../context/TableContext';
import InnerAccordion from '../../../Accordion/InnerAccordion';
import FormJurisd_Jurisd from '../Register/FormJurisd_Jurisd';
import InfoPaperProcessos from '../../../InfoPaper/InfoPaperProcessos';
import useFetchListData from '../../../../hooks/useFetchListData';


interface FormJurisdProps {
    id?: GridRowId;
    closeModal: () => void;
}

const FormUpdateJurisd: React.FC<FormJurisdProps> = ({ id, closeModal }) => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Jurisd>({});
    const [jurisd, setJurisd] = useState<Jurisd>()
    const { getAllJurisd } = useContextTable()
    const { arrayListData, onDelete, getProcessoByJurisd } = useFetchListData(id)
    const [buttonType, setButtonType] = useState<string>('processo')


    const handleDelete = (id: string, type: string) => {
        onDelete(id, type)
    }

    const getOneJurisd = async (id: GridRowId | undefined) => {
        try {
            const response = await api.get(`/jurisd/${id}`)
            let data = response.data

            if (data.dataCriacao) {
                data.dataCriacao = formatToInputDate(new Date(data.dataCriacao));
            }
            if (data.dataExtincao) {
                data.dataExtincao = formatToInputDate(new Date(data.dataExtincao));
            }
            setJurisd(data)
        } catch (error: any) {
            TypeAlert(error.response.data.message, 'error')
        }
    }

    useEffect(() => {
        if (id) {
            getOneJurisd(id)
            getProcessoByJurisd(id)
        }
    })

    const onSubmit = (data: Jurisd) => {
        api.patch(`/jurisd/update/${id}`, data).then(response => {
            TypeAlert(response.data.message, 'success')
            getAllJurisd()
            closeModal()
        }).catch((error) => {
            TypeAlert(error.response.data.message, 'warning');
        })
    }

    return (
        <Container maxWidth="xl" sx={{ mb: 2, background: 'linear-gradient(90deg, #e2e8f0, #f1f5f9)', height: 'fit-content', pb: 2 }}>
            {jurisd && (
                <Box component="form" name='formJurisd' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ textAlign: 'left', mb: 2 }}>
                    <Typography variant='h5' sx={{ pt: 3, pb: 3, color: '#1e293b', fontWeight: 'bold' }}>Atualizar Registro Unidade Gestora</Typography>
                    <Grid container spacing={3} sx={{ pb: 1 }} >
                        <Grid item xs={12} sm={4} >
                            <TextField
                                variant='filled'
                                autoComplete="given-name"
                                type="text"
                                required
                                fullWidth
                                id="nome"
                                label="Nome Completo"
                                autoFocus
                                defaultValue={jurisd.nome}
                                error={errors?.nome?.type === 'required'}
                                {...register('nome', {
                                    required: 'Campo obrigatório'
                                })}
                            />
                            {errors?.nome && (
                                <Typography variant="caption" sx={{ color: 'red', ml: '10px', mb: 0 }}>
                                    {errors.nome.message}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={4} >
                            <TextField
                                variant='filled'
                                autoComplete="given-name"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                type="email"
                                defaultValue={jurisd.email}
                                error={!!errors?.email}
                                {...register("email", { required: 'Campo obrigatório', validate: (value) => validator.isEmail(value) || 'Insira um E-mail válido' })}
                            />

                            {errors?.email && (
                                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                                    {errors.email.message}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={4} >
                            <TextField
                                variant='filled'
                                autoComplete="given-name"
                                required
                                fullWidth
                                id="sigla"
                                label="Sigla"
                                type="sigla"
                                defaultValue={jurisd.sigla}
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

                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant='filled'
                                required
                                placeholder='xx.xxx.xxx/xxxx-xx'
                                fullWidth
                                id="cnpj"
                                label="CNPJ"
                                type="text"
                                defaultValue={jurisd.cnpj}
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
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant='filled'
                                required
                                fullWidth
                                id="ug"
                                label="UG"
                                type="text"
                                defaultValue={jurisd.ug}
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
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant='filled'
                                required
                                fullWidth
                                placeholder='xxxxx-xxx'
                                id="cep"
                                label="CEP"
                                type="text"
                                defaultValue={jurisd.cep}
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

                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant='filled'
                                required
                                fullWidth
                                id="logradouro"
                                label="Logradouro"
                                type="text"
                                defaultValue={jurisd.logradouro}
                                error={!!errors?.logradouro}
                                {...register('logradouro', { required: 'Campo obrigatório' })}
                            />

                            {errors?.logradouro && (
                                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                                    {errors.logradouro.message}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={4} >
                            <TextField
                                variant='filled'
                                fullWidth
                                required
                                id="complemento"
                                label="Complemento"
                                type="text"
                                defaultValue={jurisd.complemento}
                                error={!!errors?.complemento}
                                {...register('complemento', { required: 'Campo obrigatório' })}
                            />
                            {errors?.complemento && (
                                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                                    {errors.complemento.message}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant='filled'
                                required
                                fullWidth
                                placeholder='Ex:Rio de Janeiro'
                                id="cidade"
                                label="Cidade"
                                type="text"
                                defaultValue={jurisd.cidade}
                                error={!!errors?.cidade}
                                {...register('cidade', {
                                    required: 'Campo obrigatório'
                                })}
                            />

                            {errors?.cidade && (
                                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                                    {errors.cidade.message}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={4} >
                            <TextField
                                variant='filled'
                                required
                                fullWidth
                                placeholder='AM'
                                id="uf"
                                label="UF"
                                type="text"
                                defaultValue={jurisd.uf}
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

                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant='filled'
                                required
                                fullWidth
                                placeholder='(xx)xxxxx-xxxx'
                                id="telefone1"
                                label="Telefone 1"
                                type="text"
                                defaultValue={jurisd.telefone1}
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
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant='filled'
                                required
                                fullWidth
                                placeholder='(xx)xxxxx-xxxx'
                                id="telefone2"
                                label="Telefone 2"
                                type="text"
                                defaultValue={jurisd.telefone2}
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

                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant='filled'
                                required
                                fullWidth
                                placeholder='www.exemplo.com.br'
                                id="site"
                                label="Site"
                                type="text"
                                defaultValue={jurisd.site}
                                error={!!errors?.site}
                                {...register('site', {
                                    required: 'Campo obrigatório',
                                })}
                            />
                            {errors?.site && (
                                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                                    {errors.site.message}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant='filled'
                                required
                                fullWidth
                                id="cargoGestor"
                                label="Cargo do Gestor"
                                type="text"
                                defaultValue={jurisd.cargoGestor}
                                error={!!errors?.cargoGestor}
                                {...register('cargoGestor', {
                                    required: 'Campo obrigatório'
                                })}
                            />

                            {errors?.cargoGestor && (
                                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                                    {errors.cargoGestor.message}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant='filled'
                                required
                                fullWidth
                                id="normaCriacao"
                                label="Norma da Criação"
                                type="text"
                                defaultValue={jurisd.normaCriacao}
                                error={!!errors?.normaCriacao}
                                {...register('normaCriacao', { required: 'Campo obrigatório' })}
                            />

                            {errors?.normaCriacao && (
                                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                                    {errors.normaCriacao.message}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant='filled'
                                required
                                fullWidth
                                id="dataCriacao"
                                label="Data da Criação"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                defaultValue={jurisd.dataCriacao}
                                error={!!errors?.dataCriacao}
                                {...register('dataCriacao', {
                                    required: 'Campo obrigatório',
                                })}
                            />

                            {errors?.dataCriacao && (
                                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                                    {errors.dataCriacao.message}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant='filled'
                                required
                                fullWidth
                                id="normaExtincao"
                                label="Norma da Extinção"
                                defaultValue={jurisd.normaExtincao}
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

                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant='filled'
                                required
                                fullWidth
                                id="dataExtincao"
                                label="Data Extinção"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                defaultValue={jurisd.dataExtincao}
                                error={!!errors?.dataExtincao}
                                {...register('dataExtincao', {
                                    required: 'Campo obrigatório',
                                })}
                            />

                            {errors?.dataExtincao && (
                                <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                                    {errors.dataExtincao.message}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant='filled'
                                autoComplete="given-name"
                                type="text"
                                required
                                fullWidth
                                id="poder"
                                label="Poder"
                                defaultValue={jurisd.poder}
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
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant='filled'
                                autoComplete="given-name"
                                type="text"
                                required
                                fullWidth
                                id="numero"
                                label="Número"
                                defaultValue={jurisd.numero}
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
                    <RegisterButton text="Atualizar" />
                </Box>

            )}
            <Box sx={{ mt: 2, textAlign: 'left' }}>
                <InnerAccordion title={'Adicionar Relação'}>
                    <FormJurisd_Jurisd />
                </InnerAccordion>
            </Box>
            <Box sx={{ border: '1px solid #ccc', mt: 2, p: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'start', gap: 1 }} >
                    <Typography variant='h6' sx={{ color: '#1e293b', fontWeight: 'bold' }}>Lista de Processos</Typography>
                </Box>
                <InfoPaperProcessos arrayData={arrayListData} handleDelete={handleDelete} stateType={buttonType} />
            </Box>
        </Container>
    )
}

export default FormUpdateJurisd;


