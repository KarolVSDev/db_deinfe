import { Autocomplete, Paper, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Controller, useForm } from 'react-hook-form';
import { IconButton, } from '@mui/material';
import RegisterButton from "../../../../Buttons/RegisterButton";
import { Processo, User, Coleta, Achado, TopicoAchado } from '../../../../../types/types';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import useFetchAchado from "../FormAchadoPasta/useFetchAchado";
import { useContextTable } from "../../../../../context/TableContext";
import useFetchProcesso from "../FormProcessoPasta/useFetchProcesso";
import { formatCurrency } from "../../../../../hooks/DateFormate";
import SelectSanado from "../../../../Inputs/SelectSanado";
import useFetchColeta from "./useFetchColeta";
import { TypeAlert } from "../../../../../hooks/TypeAlert";
import GroupButtonColeta from "./formComponents/ButtonGroup";
import useFetchTema from "../FormTemaPasta/useFetchTema";
import { AutocompleteChangeReason, AutocompleteChangeDetails } from '@mui/material/Autocomplete';
import ModalListAchados from "./formComponents/ModalListAchado";
export interface FormColetaProps {
    closeModal: () => void;
    user: User;
    dataType: string;
}

const FormColeta: React.FC<FormColetaProps> = ({ closeModal, user }) => {

    const { register, handleSubmit, control, watch, setValue, reset, formState: { errors } } = useForm<Coleta>({
        defaultValues: {
            sanado: "",
        }
    });
    const { addColeta } = useFetchColeta();
    const { getAllAchados } = useFetchAchado();
    const {  escutarProcessos } = useFetchProcesso();
    const { getAllTemas } = useFetchTema();
    const { arrayAchado, arrayProcesso, arrayTopicoAchado, setArrayProcesso } = useContextTable();
    const [achadoLabel, setAchadoLabel] = useState<string>()
    const [displayValue, setDisplayValue] = useState('');
    const fieldValue = watch('valorFinanceiro');
    const [filteredAchados, setFilteredAchados] = useState<Achado[]>([])
    const [_selectedTemaId, setSelectedTemaId] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            await getAllAchados();
            await getAllTemas();
            await escutarProcessos((processo) => setArrayProcesso(processo));
        }
        fetchData();
        filterAchadosByTema(_selectedTemaId)
    }, [arrayTopicoAchado, arrayAchado, arrayProcesso])

    // Atualiza o valor formatado quando o valor do campo muda
    useEffect(() => {
        if (fieldValue !== undefined) {
            setDisplayValue(formatCurrency(fieldValue.toString()));
        }
    }, [fieldValue]);

    const filterAchadosByTema = (temaId: string) => {
        const filtered = arrayAchado.filter(achado => achado.tema_id === temaId);
        setFilteredAchados(filtered);
        return
    }


    const handleSelectAchado = (achado: Achado) => {
        if (achado.id) {
            setValue('achadoId', achado.id, { shouldValidate: true });
            setAchadoLabel(achado.achado)
        }
    };

    const handleTemaChange = (
        _event: React.SyntheticEvent<Element, Event>,
        value: TopicoAchado | null,
        _reason: AutocompleteChangeReason,
        _details?: AutocompleteChangeDetails<TopicoAchado>
    ) => {
        const temaId = value?.id || '';
        setValue('temaId', temaId); // Atualiza o formulário
        setSelectedTemaId(temaId); // Salva no estado
        filterAchadosByTema(temaId); // Filtra os achados
    };



    const onSubmit = async (data: Coleta) => {
        try {
            const formData = {
                ...data,
                coletadorId: user.id
            }

            const Coleta = await addColeta(formData);
            if (Coleta) {
                TypeAlert("Coleta adicionada", "success");
                reset()
                closeModal()
            } else {
                TypeAlert("Erro ao tentar adicionar a coleta", "error")
                reset()
                closeModal()
            }
        } catch (error) {
            console.log("Erro no Submit", error)
        }
    }

    return (
        <Box sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }} component="form" name='formColeta' id='formColeta' noValidate onSubmit={handleSubmit(onSubmit)}>
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

            <Grid item xs={12} sm={4} sx={{ mb: 2 }} >
                <GroupButtonColeta />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ mb: 2 }}>
                <Controller
                    name="temaId"
                    control={control}
                    rules={{ required: 'Campo obrigatório' }}
                    render={({ field }) => (
                        <Autocomplete
                            disablePortal
                            autoFocus
                            id="autocomplete-temaId"
                            options={arrayTopicoAchado}
                            getOptionLabel={(option: TopicoAchado) => option.tema}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            onChange={handleTemaChange}
                            value={arrayTopicoAchado.find(option => option.id === field.value) || null}
                            ListboxProps={{
                                style: {
                                    maxHeight: '200px',
                                    overflow: 'auto',
                                },
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tema"
                                    variant="filled"
                                    focused={true}
                                    error={!!errors.temaId}
                                    helperText={errors.temaId?.message}
                                />
                            )}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12} sm={4} sx={{ mb: 2 }}>
                <ModalListAchados arrayFiltrado={filteredAchados} onSelectAchado={handleSelectAchado} />
                {achadoLabel &&
                    <Paper>
                        <Typography sx={{ mt: 2, p: 2 }}>Achado: {achadoLabel}</Typography>
                    </Paper>
                }
            </Grid >

            <Grid item xs={12} sm={4} sx={{ mb: 2 }}>
                <Controller
                    name="processoId"
                    control={control}
                    rules={{ required: 'Campo obrigatório' }}
                    render={({ field }) => (
                        <Autocomplete
                            disablePortal
                            autoFocus
                            id="autocomplete-processo"
                            options={arrayProcesso}
                            getOptionLabel={(option: Processo) => option.numero}
                            isOptionEqualToValue={(option, value) => option.id === value.id} // eu uso essa opção pra comparar a opção com o valor real no array Compara por ID
                            onChange={(_, value) => field.onChange(value?.id || '')}
                            ListboxProps={{
                                style: {
                                    maxHeight: '200px',
                                    overflow: 'auto',
                                },
                            }}
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
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>

                    <SelectSanado
                        id={"sanado"}
                        label={"Sanado"}
                        register={register}
                        errors={errors}

                    />

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
                    />
                    {errors?.valorFinanceiro && (
                        <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                            {errors.valorFinanceiro.message}
                        </Typography>
                    )}

                    <TextField variant="filled"
                        autoFocus
                        id="unidade"
                        label="Unidade"
                        type="text"
                        error={!!errors?.unidade}
                        {...register('unidade')}
                    />

                    <TextField variant="filled"
                        autoFocus
                        sx={{ width: "15%" }}
                        id="quantitativo"
                        label="Quantitativo"
                        type="number"
                        error={!!errors?.quantitativo}
                        {...register('quantitativo')}
                    />

                </Box>
            </Grid>
            <RegisterButton text="Registrar" />
        </Box >
    )
}

export default FormColeta;