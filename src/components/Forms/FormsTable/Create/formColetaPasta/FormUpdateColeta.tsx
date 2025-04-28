import { Autocomplete, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Controller, useForm } from 'react-hook-form';
import { IconButton, } from '@mui/material';
import RegisterButton from "../../../../Buttons/RegisterButton";
import { Processo, Coleta, Achado, ColetaUpdate } from '../../../../../types/types';
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
import { GridRowId } from "@mui/x-data-grid";
import Loader from "../../../../Loader/Loader";
import ColetaSkeleton from "./formComponents/ColetaSkeleton";


export interface FormUpdateColetaProps {
    closeModal: () => void;
    dataType: string;
    id: GridRowId;
}

const FormUpdateColeta: React.FC<FormUpdateColetaProps> = ({ closeModal, id }) => {

    const [coleta, setColeta] = useState<ColetaUpdate>()

    const { register, handleSubmit, control, watch, setValue, reset, formState: { errors } } = useForm<Coleta>({
        defaultValues: {
            id: coleta?.coleta.id,
            achadoId: coleta?.achado.id,
            processoId: coleta?.processo.id,
            coletadorId: coleta?.coleta.coletadorId,
            valorFinanceiro: coleta?.coleta.valorFinanceiro,
            sanado: coleta?.coleta.sanado || '',
            unidade: coleta?.coleta.unidade,
            quantitativo: coleta?.coleta.quantitativo,
        },
    });
    const { updateColeta } = useFetchColeta();
    const { getAllAchados } = useFetchAchado();
    const { getAllProcessos } = useFetchProcesso();
    const { arrayAchado, arrayProcesso } = useContextTable();
    const [_, setAchadoId] = useState<string | undefined>()
    const [displayValue, setDisplayValue] = useState('');
    const fieldValue = watch('valorFinanceiro');
    const { getColetaById } = useFetchColeta();
    const [loading, setLoading] = useState(false);
    const [isloading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await getAllAchados();
            await getAllProcessos();
        }
        fetchData();
    }, [arrayAchado, arrayProcesso])


    useEffect(() => {
        setIsLoading(true);
        const fetchColeta = async () => {
            try {
                const registro = await getColetaById(id as string)
                if (!registro) {
                    console.error("Erro ao buscar o registro de coleta")
                    return
                }
                setColeta(registro)
                reset({
                    id: registro.coleta.id,
                    achadoId: registro.achado.id || '',
                    processoId: registro.processo.id || '',
                    coletadorId: registro.coleta.coletadorId || '',
                    valorFinanceiro: registro.coleta.valorFinanceiro || 0,
                    sanado: registro.coleta.sanado || '',
                    unidade: registro.coleta.unidade || '',
                    quantitativo: registro.coleta.quantitativo || 0,
                })
            } catch (error) {
                console.error("Erro ao carregar coleta:", error);
            } finally {
                setIsLoading(true);

            }

        }
        fetchColeta();
    }, [id])


    // Atualiza o valor formatado quando o valor do campo muda
    useEffect(() => {
        if (fieldValue !== undefined) {
            setDisplayValue(formatCurrency(fieldValue.toString()));
        }
    }, [fieldValue]);

    const onSubmit = async (data: Coleta) => {
        try {
            setLoading(true)
            updateColeta(data.id, data)
            TypeAlert("Coleta atualizada com sucesso!", "success")
            closeModal()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            TypeAlert("Erro ao atualizar coleta", "error")
            console.error("Erro ao atualizar coleta:", error);
            closeModal()
        }
    }

    return (
        <>
            {
                isloading ? (
                    <ColetaSkeleton isLoading={isloading} />
                ) : (
                    <Box sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }} component="form" name='formAchados' noValidate onSubmit={handleSubmit(onSubmit)} >
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
                                name="achadoId"
                                control={control}
                                rules={{ required: 'Campo obrigatório' }}
                                defaultValue={coleta?.achado.id || ''}
                                render={({ field }) => (
                                    <Autocomplete
                                        disablePortal
                                        autoFocus
                                        id="autocomplete-achado"
                                        options={arrayAchado}
                                        getOptionLabel={(option: Achado) => option.achado}
                                        defaultValue={arrayAchado.find(achado => achado.id === field.value || null)}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        onChange={(_, value) => { field.onChange(value?.id || ''); setAchadoId(value?.id) }}
                                        ListboxProps={{
                                            style: {
                                                maxHeight: '200px',
                                                overflow: 'auto',
                                            },
                                        }}
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
                                defaultValue={coleta?.processo.id || ""}
                                render={({ field }) => (
                                    <Autocomplete
                                        disablePortal
                                        autoFocus
                                        id="autocomplete-processo"
                                        options={arrayProcesso}
                                        getOptionLabel={(option: Processo) => option.numero}
                                        defaultValue={arrayProcesso.find(processo => processo.id === field.value || null)}
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
                                    sanado={coleta?.coleta.sanado as string}
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
                        {loading ?
                        <Box sx={{ display: 'flex', justifyContent: 'start', mt: 3 }}>
                            <Loader />
                        </Box> :
                        <RegisterButton text="Atualizar" />
                    }
                    </Box >
                )

            }
        </>


    )
}

export default FormUpdateColeta;