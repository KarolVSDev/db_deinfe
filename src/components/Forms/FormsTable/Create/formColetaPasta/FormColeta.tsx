import { Autocomplete, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Controller, useForm } from 'react-hook-form';
import RegisterButton from "../../../../Buttons/RegisterButton";
import { Processo, User, Coleta, Achado } from '../../../../../types/types';
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
import ModalListAchados from "./formComponents/ModalListAchado";
import Loader from "../../../../Loader/Loader";
import ModalUpdatePF from "../../../../Modals/DataTableModals/ModalUpdateForms";
import { GridRowId } from "@mui/x-data-grid";
import CloseIconComponent from "../../../../Inputs/CloseIcon";
import AchadoPaper from "./formComponents/AchadoPaper";
export interface FormColetaProps {
    closeModal: () => void;
    user: User;
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
    const { arrayProcesso } = useContextTable();
    const [achado, setAchado] = useState<Achado | null>();
    const [displayValue, setDisplayValue] = useState('');
    const fieldValue = watch('valorFinanceiro');
    const [_achadoTemaId, setAchadoTemaId] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const [dataType, setDataType] = useState<string>('')
    const { getAchadoById } = useFetchAchado();
    const theme = useTheme();
    const [dataTypeLocal] = useState('achado')

    useEffect(() => {
        const fetchData = async () => {
            await getAllAchados();
            await getAllTemas();
            await getAllProcessos();
        }
        fetchData();
    }, [])

    // Atualiza o valor formatado quando o valor do campo muda
    useEffect(() => {
        if (fieldValue !== undefined) {
            setDisplayValue(formatCurrency(fieldValue.toString()));
        }
    }, [fieldValue]);


    const handleSelectAchado = (achado: Achado) => {
        if (achado.id) {
            setValue('achadoId', achado.id, { shouldValidate: true });
            setAchado(achado)
            setDataType('achado')
            setAchadoTemaId(achado.tema_id)
        }
    };

    const handleUpdate = async () => {
        setOpenModal(true)
    }

    const handleCloseModal = async () => {
        setOpenModal(false);
        if (achado?.id) {
            const updatedAchado = await getAchadoById(achado.id);
            if (updatedAchado) setAchado(updatedAchado.achado)
        }
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
            <CloseIconComponent closeModal={closeModal} textType='Cadastro de proposta de Coleta' />
            <Grid item xs={12} sx={{ mb: 2 }} >
                <Divider textAlign="center" sx={{ my: 4, color: theme.palette.text.primary }}>Seção de Formulários</Divider>
                <GroupButtonColeta />
                <Divider textAlign="center" sx={{ my: 4, color: theme.palette.text.primary }}>Seção de relação Tema - Achado - Processo</Divider>
            </Grid>


            <Grid item xs={12} sx={{ mb: 2 }}>
                {achado &&
                    <AchadoPaper handleCloseModal={handleCloseModal} user={user} dataType={dataTypeLocal} achado={achado} handleUpdate={handleUpdate} stateModal={openModal} />
                }
            </Grid >

            <ModalListAchados onSelectAchado={handleSelectAchado} />
            <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
                {/* Processo - Ocupa metade da linha */}
                <Grid item xs={12} md={6}>
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
                                isOptionEqualToValue={(option, value) => option.id === value.id}
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
                                        fullWidth
                                    />
                                )}
                            />
                        )}
                    />
                </Grid>

                {/* Sanado - Ocupa metade da linha */}
                <Grid item xs={12} md={6}>
                    <SelectSanado
                        id={"sanado"}
                        label={"Sanado"}
                        register={register}
                        errors={errors}

                    />
                </Grid>
            </Grid>

            {/* Segunda linha com 2 campos */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
                {/* Valor Financeiro - Ocupa metade da linha */}
                <Grid item xs={12} md={6}>
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
                            setValue('valorFinanceiro', Number(rawValue), { shouldValidate: true });
                        }}
                        fullWidth
                    />
                </Grid>

                {/* Unidade - Ocupa metade da linha */}
                <Grid item xs={12} md={6}>
                    <TextField
                        variant="filled"
                        id="unidade"
                        label="Unidade"
                        type="text"
                        error={!!errors?.unidade}
                        {...register('unidade')}
                        fullWidth
                    />
                </Grid>
            </Grid>

            {/* Terceira linha com 2 campos */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
                {/* Quantitativo - Ocupa metade da linha */}
                <Grid item xs={12} md={6}>
                    <TextField
                        variant="filled"
                        id="quantitativo"
                        label="Quantitativo"
                        type="number"
                        error={!!errors?.quantitativo}
                        {...register('quantitativo')}
                        fullWidth
                    />
                    {errors?.quantitativo && (
                        <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                            {errors.quantitativo.message}
                        </Typography>
                    )}
                </Grid>

                {/* Situação Encontrada - Ocupa metade da linha */}
                <Grid item xs={12} md={6}>
                    <TextField
                        variant="filled"
                        id="comentario"
                        multiline
                        label="Comentário"
                        type="text"
                        error={!!errors?.comentario}
                        {...register('comentario')}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                {/* Situação Encontrada - Ocupa toda a linha */}
                <Grid item xs={12} md={6}>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group-tipo-financeiro">Tipo Financeiro</FormLabel>
                        <Controller
                            name='tipo_financeiro'
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-controlled-radio-buttons-group-tipo-financeiro"
                                    name="tipo_financeiro"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value === 'true')}
                                >
                                    <FormControlLabel value={true} control={<Radio />} label="Sim" />
                                    <FormControlLabel value={false} control={<Radio />} label="Não" />
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        variant="filled"
                        id="situacao_encontrada"
                        multiline
                        label="Situação Encontrada"
                        type="text"
                        error={!!errors?.situacao_encontrada}
                        {...register('situacao_encontrada')}
                        fullWidth
                    />
                </Grid>
            </Grid>
            {loading ?
                <Box sx={{ display: 'flex', justifyContent: 'start', mt: 3 }}>
                    <Loader />
                </Box> :
                <RegisterButton text="Registrar" />
            }
            {achado?.id !== null && (
                <ModalUpdatePF
                    id={achado?.id as GridRowId}
                    dataType={dataType}
                    open={openModal}
                    user={user}
                    onClose={handleCloseModal}
                />
            )}
        </Box >
    )
}

export default FormColeta;