import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { IconButton } from '@mui/material';
import RegisterButton from '../../../Buttons/RegisterButton';
import { Processo, User } from '../../../../types/types';
import CloseIcon from '@mui/icons-material/Close';
import DateSelectorProcesso from '../../../Inputs/DatePickerProcesso';
import SelectInput from '../../../Inputs/SelectInput';

export interface FormProcessoProps {
    closeModal: () => void;
    user: User | undefined;
    dataType: string;
}


const FormProcesso: React.FC<FormProcessoProps> = ({ closeModal }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<Processo>({});

    const onSubmit = (data: Processo) => {
        console.log(data)
    }

    return (
        <Box sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }} component="form" name='formProcesso' noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '70vw', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ pt: 3, pb: 3, color: '#1e293b' }}>Cadastrar Processo</Typography>
                <IconButton onClick={closeModal} sx={{
                    '&:hover': {
                        bgcolor: '#1e293b', color: '#ffffff',
                    }
                }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Grid container spacing={2} sx={{ pb: 1 }}>
                <Grid item xs={12} sx={{pb:1}}>
                    <TextField
                        variant='filled'
                        required
                        fullWidth
                        placeholder='xxxxx'
                        autoFocus
                        id="numero"
                        label='Número'
                        type="string"
                        error={!!errors?.numero}
                        {...register('numero', {
                            required: 'Campo obrigatório',
                            pattern: {
                                value: /^\d{5}$/,
                                message: 'Número de processo inválido'
                            }
                        })}
                    />
                    {errors?.numero && (
                        <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                            {errors.numero.message}
                        </Typography>
                    )}
                </Grid>

                <Grid item xs={6} sm={4} md={2}>
                    <DateSelectorProcesso
                        id='exercicio'
                        register={register}
                        errors={errors}
                        label='Exercício'
                    />
                </Grid>

                <Grid item xs={6} sm={4} md={2} >
                    <SelectInput
                        id={'julgado'}
                        register={register}
                        errors={errors}
                        label={"Status do Julgado"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography>Campo de Análise</Typography>
                    <TextField
                        variant='filled'
                        autoComplete="given-name"
                        type="text"
                        multiline
                        rows={4}
                        fullWidth
                        id="analiseDefesa"
                        label="Análise da defesa"
                        error={errors?.analiseDefesa?.type === 'required'}
                        {...register('analiseDefesa', {
                            required: 'Campo obrigatório',
                        })}
                    />
                </Grid>
            </Grid>

            <RegisterButton text="Registrar" />
        </Box>
    )
}

export default FormProcesso;


