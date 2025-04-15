import { Autocomplete, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Controller, useForm } from 'react-hook-form';
import { IconButton, } from '@mui/material';
import RegisterButton from "../../../../Buttons/RegisterButton";
import { Processo, User, Coleta, Achado, AllUsers } from '../../../../../types/types';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import useFetchAchado from "../FormAchadoPasta/useFetchAchado";
import { useContextTable } from "../../../../../context/TableContext";
import useFetchProcesso from "../FormProcessoPasta/useFetchProcesso";
import useFetchUsers from "../../../../../hooks/useFetchUsers";
import { formatCurrency } from "../../../../../hooks/DateFormate";

export interface FormColetaProps {
    closeModal: () => void;
    user: User | undefined;
    dataType: string;
}

const FormColeta: React.FC<FormColetaProps> = ({ closeModal, user }) => {

    const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<Coleta>({});
    //const { addColeta } = useFetchColeta();
    const { getAllAchados } = useFetchAchado();
    const { getAllProcessos } = useFetchProcesso();
    const { getUsers } = useFetchUsers();
    const { arrayAchado, arrayProcesso, usuarios } = useContextTable();
    const [_, setAchadoId] = useState<string | undefined>()
    const [displayValue, setDisplayValue] = useState('');
    const fieldValue = watch('valorFinanceiro');

    useEffect(() => {
        const fetchData = async () => {
            await getAllAchados();
            await getAllProcessos();
            await getUsers();
        }
        fetchData();
    }, [arrayAchado, arrayProcesso, usuarios])

    // Atualiza o valor formatado quando o valor do campo muda
    useEffect(() => {
        if (fieldValue !== undefined) {
            setDisplayValue(formatCurrency(fieldValue.toString()));
        }
    }, [fieldValue]);

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
        const formData = {
            ...data,
            coletador: user?.id
        }
        console.log(formData)

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
                            isOptionEqualToValue={(option, value) => option.id === value.id} // eu uso essa opção pra comparar a opção com o valor real no array Compara por ID
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
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            onChange={(_, value) => { field.onChange(value?.id || ''); setAchadoId(value?.id) }}
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
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                    <TextField
                        variant="filled"
                        placeholder="R$ 0,00"
                        autoFocus
                        id="valorFinanceiro"
                        label="Valor Financeiro"
                        error={!!errors?.valorFinanceiro}
                        value={displayValue}
                        inputProps={{
                            inputMode: 'numeric',
                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const rawValue = e.target.value.replace(/\D/g, '');
                            // Converte para número antes de setar o valor
                            setValue('valorFinanceiro', Number(rawValue), { shouldValidate: true });
                        }}
                    // Remove o spread do register para evitar conflito com onChange
                    />
                    {errors?.valorFinanceiro && (
                        <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                            {errors.valorFinanceiro.message}
                        </Typography>
                    )}

                    <TextField variant="filled"
                        required
                        autoFocus
                        sx={{ width: "15%" }}
                        id="quantitativo"
                        label="Quantitativo"
                        type="number"
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

                    <TextField variant="filled"
                        required
                        autoFocus
                        id="unidade"
                        label="Unidade"
                        type="text"
                        error={!!errors?.unidade}
                        {...register('unidade', {
                            required: 'Campo obrigatorio',
                        })}
                    />
                    {errors?.unidade && (
                        <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                            {errors.unidade.message}
                        </Typography>
                    )}

                    <Controller
                        name="coletadorId"
                        control={control}
                        rules={{ required: 'Campo obrigatório' }}
                        render={({ field }) => (
                            <Autocomplete
                                disablePortal
                                autoFocus
                                sx={{ width: "30%" }}
                                id="combo-box-demo"
                                options={usuarios}
                                getOptionLabel={(option: AllUsers) => option.nome}
                                isOptionEqualToValue={(option, value) => option.id === value.id} // eu uso essa opção pra comparar a opção com o valor real no array
                                onChange={(_, value) => field.onChange(value?.id || '')}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Coletador"
                                        variant="filled"
                                        focused={true}
                                        error={!!errors.coletadorId}
                                        helperText={errors.coletadorId?.message}
                                    />
                                )}
                            />
                        )}
                    />


                </Box>
                <Grid item xs={12} sm={4}>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>

                    </Box>
                </Grid>
            </Grid>
            <RegisterButton text="Registrar" />
        </Box >
    )
}

export default FormColeta;