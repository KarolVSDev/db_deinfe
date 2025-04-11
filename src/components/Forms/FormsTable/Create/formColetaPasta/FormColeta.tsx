import { Autocomplete, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Controller, useForm } from 'react-hook-form';
import {  IconButton,} from '@mui/material';
import RegisterButton from "../../../../Buttons/RegisterButton";
import { Processo, User, Coleta, Achado } from '../../../../../types/types';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from "react";
import useFetchAchado from "../FormAchadoPasta/useFetchAchado";
import { useContextTable } from "../../../../../context/TableContext";
import useFetchProcesso from "../FormProcessoPasta/useFetchProcesso";

export interface FormColetaProps {
    closeModal: () => void;
    user: User | undefined;
    dataType: string;
}

const FormColeta: React.FC<FormColetaProps> = ({ closeModal }) => {

    const { register, handleSubmit, control, formState: { errors } } = useForm<Coleta>({});
    //const { addColeta } = useFetchColeta();
    const { getAllAchados } = useFetchAchado();
    const { getAllProcessos } = useFetchProcesso();
    const { arrayAchado, arrayProcesso } = useContextTable();

    useEffect(() => {
        const fetchData = async () => {
            await getAllAchados();
            await getAllProcessos();
        }
        fetchData();
    }, [arrayAchado, arrayProcesso])


    const onSubmit = async (data: Coleta) => {
        // const Coleta = await addColeta(data);
        // if (Coleta) {
        //     TypeAlert("Coleta adicionado", "success");
        //     reset()
        //     closeModal()
        // } else {
        //     TypeAlert("Erro ao tentar adicionar o coleta", "error")
        //     reset()
        //     closeModal()
        // }
        console.log(data)
    }

    return (
        <Box sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }} component="form" name='formAchados' noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '70vw', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ pt: 3, pb: 3, color: '#1e293b' }}>Cadastrar Coleta</Typography>
                <IconButton onClick={closeModal} sx={{
                    '&:hover': {
                        bgcolor: '#1e293b', color: '#ffffff',
                    }
                }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Grid item xs={12} sm={4} sx={{ mb: 2 }}>
                <Controller
                    name="achadoId"
                    control={control}
                    rules={{ required: 'Campo obrigatório' }}
                    render={({ field }) => (
                        <Autocomplete
                            disablePortal
                            autoFocus
                            id="combo-box-demo"
                            options={arrayAchado}
                            getOptionLabel={(option: Achado) => option.achado}
                            onChange={(_, value) => field.onChange(value?.id || '')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Achado"
                                    variant="filled"
                                    focused={true}
                                    error={!!errors.achadoId}
                                    helperText={errors.achadoId?.message}
                                />
                            )}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ mb: 2 }}>
                <Controller
                    name="processoId"
                    control={control}
                    rules={{ required: 'Campo obrigatório' }}
                    render={({ field }) => (
                        <Autocomplete
                            disablePortal
                            autoFocus
                            id="combo-box-demo"
                            options={arrayProcesso}
                            getOptionLabel={(option: Processo) => option.numero}
                            onChange={(_, value) => field.onChange(value?.id || '')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Processo"
                                    variant="filled"
                                    focused={true}
                                    error={!!errors.processoId}
                                    helperText={errors.processoId?.message}
                                />
                            )}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField variant="filled"
                    required
                    fullWidth
                    autoFocus
                    id="quantitativo"
                    label="Quantitativo"
                    type="string"
                    error={!!errors?.quantitativo}
                    {...register('quantitativo', {
                        required: 'Campo obrigatorio',
                    })}
                />
                {errors?.quantitativo && (
                    <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                        {errors.quantitativo.message}
                    </Typography>
                )}
            </Grid>

            <Grid item xs={12}>
                <TextField variant="filled"
                    required
                    fullWidth
                    autoFocus
                    id="beneficio"
                    label="beneficio"
                    type="string"
                    error={!!errors?.beneficio}
                    {...register('beneficio', {
                        required: 'Campo obrigatorio',
                    })}
                />
                {errors?.beneficio && (
                    <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                        {errors.beneficio.message}
                    </Typography>
                )}
            </Grid>


            <RegisterButton text="Registrar" />
        </Box >
    )
}

export default FormColeta;