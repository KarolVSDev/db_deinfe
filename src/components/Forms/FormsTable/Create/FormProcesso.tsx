import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import RegisterButton from '../../../Buttons/RegisterButton';
import { Processo, User } from '../../../../types/types';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

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
            <Grid container spacing={3} sx={{ pb: 1 }} >
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant='filled'
                        required
                        fullWidth
                        placeholder='Muni'
                        id="exercicio"
                        label="Exercício"
                        type="text"
                        error={!!errors?.exercicio}
                        {...register('exercicio', {
                            required: 'Campo obrigatório',
                            maxLength: {
                                value: 4,
                                message: 'Tamanho inválido'
                            },
                            minLength: {
                                value: 4,
                                message: 'Tamanho inválido'
                            },
                            pattern: {
                                value: /^([A-Z][a-zÀ-ú]*)(\s[A-Z][a-zÀ-ú]*)*$/,
                                message: 'Exercício inválido'
                            }
                        })}
                    />

                    {errors?.exercicio && (
                        <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                            {errors.exercicio.message}
                        </Typography>
                    )}
                </Grid>
            </Grid>
            <RegisterButton text="Registrar" />
        </Box>
    )
}

export default FormProcesso;


