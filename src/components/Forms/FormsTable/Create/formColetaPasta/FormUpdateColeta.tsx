import { Autocomplete, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Controller, useForm } from 'react-hook-form';
import { IconButton, } from '@mui/material';
import RegisterButton from "../../../../Buttons/RegisterButton";
import { Processo, User, Coleta, Achado } from '../../../../../types/types';
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
import ProcessoSkeleton from "../../../../Skeletons/ProcessoSkeleton";
import { isLocale } from "validator";

export interface FormUpdateColetaProps {
    closeModal: () => void;
    dataType: string;
    id: GridRowId;
}

const FormUpdateColeta: React.FC<FormUpdateColetaProps> = ({ closeModal, id }) => {

    const [coleta, setColeta] = useState<Coleta>()
  
    const { register, handleSubmit, control, watch, setValue, reset, formState: { errors } } = useForm<Coleta>({
        defaultValues: {
            id: coleta?.id,
            achadoId: coleta?.achadoId,
            processoId: coleta?.processoId,
            coletadorId: coleta?.coletadorId,
            valorFinanceiro: coleta?.valorFinanceiro,
            sanado: coleta?.sanado,
            unidade: coleta?.unidade,
            quantitativo: coleta?.quantitativo,
        },
    });
    const { addColeta } = useFetchColeta();
    const { getAllAchados } = useFetchAchado();
    const { getAllProcessos } = useFetchProcesso();
    const { arrayAchado, arrayProcesso } = useContextTable();
    const [_, setAchadoId] = useState<string | undefined>()
    const [displayValue, setDisplayValue] = useState('');
    const fieldValue = watch('valorFinanceiro');
    const [sanado] = useState<string>('');
    const { getColetaById } = useFetchColeta();
    
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
            const registro = await getColetaById(id as string)
            if(!registro) {
                console.error("Erro qo buscar o registro de coleta")
                return
            }
            setColeta(registro)
            reset({
                id:registro.id,
                achadoId: registro.achadoId || '',    
                processoId: registro.processoId || '',
                coletadorId: registro.coletadorId || '',
                valorFinanceiro: registro.valorFinanceiro || 0,
                sanado: registro.sanado || '',
                unidade: registro.unidade || '',
                quantitativo: registro.quantitativo || 0,
            })
        }
        fetchColeta();
        setIsLoading(false);
    }, [id])



    // Atualiza o valor formatado quando o valor do campo muda
    useEffect(() => {
        if (fieldValue !== undefined) {
            setDisplayValue(formatCurrency(fieldValue.toString()));
        }
    }, [fieldValue]);

    const onSubmit = async (data: Coleta) => {
        console.log
    }

    return (
        <>
            {
                isloading ? (
                    <ProcessoSkeleton isLoading={false} />
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
                                defaultValue={coleta?.achadoId || ''}
                                render={({ field }) => (
                                    <Autocomplete
                                        disablePortal
                                        autoFocus
                                        id="combo-box-demo"
                                        options={arrayAchado}
                                        getOptionLabel={(option: Achado) => option.achado}
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
                                render={({ field }) => (
                                    <Autocomplete
                                        disablePortal
                                        autoFocus
                                        id="combo-box-demo"
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
                                    sanado={sanado}
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
        </>


    )
}

export default FormUpdateColeta;