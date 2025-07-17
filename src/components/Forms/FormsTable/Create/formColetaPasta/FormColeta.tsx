import { Autocomplete, Divider, TextField } from "@mui/material";
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
import useFetchTema from "../FormTemaPasta/useFetchTema";
import ModalListAchados from "./formComponents/ModalListAchado";
import Loader from "../../../../Loader/Loader";
import ModalUpdatePF from "../../../../Modals/DataTableModals/ModalUpdateForms";
import { GridRowId } from "@mui/x-data-grid";
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

            <Grid item xs={12}  sx={{ mb: 2 }} >
                <Divider textAlign="center" sx={{ my: 4, color: "#777" }}>Seção de Formulários</Divider>
                <GroupButtonColeta />
                <Divider textAlign="center" sx={{ my: 4, color: "#777" }}>Seção de relação Tema - Achado - Processo</Divider>
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
                {achado &&
                    <AchadoPaper handleCloseModal={handleCloseModal} user={user} dataType={dataTypeLocal} achado={achado} handleUpdate={handleUpdate} stateModal={openModal} />
                }
                <ModalListAchados onSelectAchado={handleSelectAchado} />
            </Grid >

            <Grid item xs={12} sx={{ mb: 2 }}>
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

            <Grid item xs={12}  sx={{ mb: 2 }}>
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