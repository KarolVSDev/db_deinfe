import { Autocomplete, Divider, Paper, TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Controller, useForm } from 'react-hook-form';
import { IconButton, } from '@mui/material';
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
import EditIcon from '@mui/icons-material/Edit';
import Helper from "../../../../Dialog/Helper";
import ModalUpdatePF from "../../../../Modals/DataTableModals/ModalUpdateForms";
import { GridRowId } from "@mui/x-data-grid";
import ModalColor from "../../../FormsColors/ModalColor";
import HighlightedText from "../../../../DataTable/HighLightMidleware";
import CloseIconComponent from "../../../../Inputs/CloseIcon";
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
            console.log("Achado selecionado:", achado);
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
            <Grid item xs={12} sm={4} sx={{ mb: 2 }} >
                <Divider textAlign="center" sx={{my: 4 , color:theme.palette.text.primary}}>Seção de Formulários</Divider>
                <GroupButtonColeta />
                <Divider textAlign="center" sx={{ my: 4, color: theme.palette.text.primary }}>Seção de relação Tema - Achado - Processo</Divider>
            </Grid>

            <Grid item xs={12} sm={4} sx={{ mb: 2 }}>
                {achado &&
                    <Paper sx={{ mb: 2 }}>
                        <Typography sx={{ mt: 2, pl: 2, pt: 1, fontWeight: 'bold' }}>Achado:</Typography>
                        <Typography sx={{ p: 2, pt: 0 }}><HighlightedText text={achado.achado} /></Typography>

                        <Divider />
                        <Box sx={{ bgColor: '#f1f5f9' }}>
                            <Helper title="Clique aqui para editar o registro">
                                <IconButton sx={{ mx: 1 }} color="primary" onClick={() => handleUpdate()}>
                                    <EditIcon sx={{ fontSize: '30px', mb: 1, animation: 'flipInX 0.5s ease-in-out' }} />
                                </IconButton>
                            </Helper>
                            <ModalColor />
                        </Box>
                    </Paper>
                }
                <ModalListAchados onSelectAchado={handleSelectAchado} />
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