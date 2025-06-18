import { Autocomplete, Divider, Paper, TextField } from "@mui/material";
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
import Loader from "../../../../Loader/Loader";
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
    const { getAllProcessos } = useFetchProcesso();
    const { getAllTemas } = useFetchTema();
    const { arrayAchado, arrayProcesso, arrayTopicoAchado, filteredAchados, setFilteredAchados } = useContextTable();
    const [achadoLabel, setAchadoLabel] = useState<string | null>();
    const [displayValue, setDisplayValue] = useState('');
    const fieldValue = watch('valorFinanceiro');
    const [_selectedTemaId, setSelectedTemaId] = useState<string>('');
    const [temaSelected, setTemaSelected] = useState<boolean>(true);
    const [achadoTemaId, setAchadoTemaId] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await getAllAchados();
            await getAllTemas();
            await getAllProcessos();
        }
        fetchData();
        filterAchadosByTema(_selectedTemaId)
    }, [])

    // Atualiza o valor formatado quando o valor do campo muda
    useEffect(() => {
        if (fieldValue !== undefined) {
            setDisplayValue(formatCurrency(fieldValue.toString()));
        }
    }, [fieldValue]);

    const filterAchadosByTema = (temaId: string) => {
        const filtered = arrayAchado
        .filter(achado => achado.tema_id === temaId);
        filtered.sort((a,b) => a.achado.localeCompare(b.achado));
        setFilteredAchados(filtered);
        return
    }


    const handleSelectAchado = (achado: Achado) => {
        if (achado.id) {
            setValue('achadoId', achado.id, { shouldValidate: true });
            setAchadoLabel(achado.achado)
            setAchadoTemaId(achado.tema_id)
        }
    };

    const handleTemaChange = (
        _event: React.SyntheticEvent<Element, Event>,
        value: TopicoAchado | null,
        _reason: AutocompleteChangeReason,
        _details?: AutocompleteChangeDetails<TopicoAchado>
    ) => {
        const temaId = value?.id || '';

        if (!temaId) {
            setAchadoLabel(null);
            setValue('achadoId', ''); // Limpa também o valor do formulário
        }

        if (temaId !== achadoTemaId) {
            setAchadoLabel(null);
            setValue('achadoId', ''); // Limpa também o valor do formulário
        }

        if (temaId !== undefined) {
            setTemaSelected(false);
        } else {
            setTemaSelected(true);
        }

        setValue('temaId', temaId); // Atualiza o formulário
        setSelectedTemaId(temaId); // Salva no estado
        filterAchadosByTema(temaId); // Filtra os achados
    };


    const onSubmit = async (data: Coleta) => {
        try {
            setLoading(true)
            const formData = {
                ...data,
                coletadorId: user.id
            }

            const Coleta = await addColeta(formData);
            if (Coleta) {
                TypeAlert("Coleta adicionada", "success");
                reset()
                closeModal()
            }
        } catch (error) {
            TypeAlert("Erro ao tentar adicionar a coleta", "error")
            console.log("Erro no Submit", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }} component="form" name='formColeta' id='formColeta' noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '70vw', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ pt: 3, pb: 3, color: '#1e293b' }}>Formulários de registro e relacionamentos de Temas, Achados e Processos</Typography>
                <IconButton onClick={closeModal} sx={{
                    '&:hover': {
                        bgcolor: '#1e293b', color: '#ffffff',
                    }
                }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Grid item xs={12} sm={4} sx={{ mb: 2 }} >
                <Divider textAlign="center" sx={{ my: 4, color: "#777" }}>Seção de Formulários</Divider>
                <GroupButtonColeta />
                <Divider textAlign="center" sx={{ my: 4, color: "#777" }}>Seção de relação Tema - Achado - Processo</Divider>
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
                                    placeholder="Selecione um tema"
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
                {achadoLabel &&
                    <Paper sx={{ mb: 2 }}>
                        <Typography sx={{ mt: 2, pl: 2, pt: 1, fontWeight: 'bold' }}>Achado:</Typography>
                        <Typography sx={{ p: 2, pt: 0 }}>{achadoLabel}</Typography>
                    </Paper>
                }
                <ModalListAchados temaSelected={temaSelected} arrayFiltrado={filteredAchados} onSelectAchado={handleSelectAchado} />
            </Grid >

            <Grid item xs={12} sm={4} sx={{ mb: 2 }}>
                <Controller
                    name="processoId"
                    control={control}
                    rules={{ required: 'Campo obrigatório' }}
                    render={({ field }) => (
                        <Autocomplete
                            disablePortal
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
                                    placeholder="Selecione um processo"
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
                        id="unidade"
                        label="Unidade"
                        type="text"
                        error={!!errors?.unidade}
                        {...register('unidade')}
                    />

                    <TextField variant="filled"
                        sx={{ width: "15%" }}
                        id="quantitativo"
                        label="Quantitativo"
                        type="number"
                        error={!!errors?.quantitativo}
                        {...register('quantitativo')}
                    />

                </Box>
            </Grid>
            {loading ?
                <Box sx={{ display: 'flex', justifyContent: 'start', mt: 3 }}>
                    <Loader />
                </Box> :
                <RegisterButton text="Atualizar" />
            }
        </Box >
    )
}

export default FormColeta;