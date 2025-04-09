// import { TextField } from "@mui/material";
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import { useForm } from 'react-hook-form';
// import { FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
// import RegisterButton from "../../../../Buttons/RegisterButton";
// import { Processo, User, Diretoria, Coleta } from '../../../../../types/types';
// import CloseIcon from '@mui/icons-material/Close';
// import SelectInput from "@mui/material/Select/SelectInput";
// import { useEffect, useState } from "react";
// import useFetchColeta from './useFetchColeta'
// import { TypeAlert } from "../../../../../hooks/TypeAlert";

// export interface FormColetaProps {
//     closeModal: () => void;
//     user: User | undefined;
//     dataType: string;
// }

// const FormColeta: React.FC<FormColetaProps> = ({ closeModal }) => {

//     const { register, handleSubmit, reset, formState: { errors } } = useForm<Coleta>({});
//     const { addColeta } = useFetchColeta();

//     const onSubmit = async (data: Coleta) => {
//         const Coleta = await addColeta(data);
//         if (Coleta) {
//             TypeAlert("Coleta adicionado", "success");
//             reset()
//             closeModal()
//         } else {
//             TypeAlert("Erro ao tentar adicionar o coleta", "error")
//             reset()
//             closeModal()
//         }
//     }

//     return (
//         <Box sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }} component="form" name='formColeta' noValidate onSubmit={handleSubmit(onSubmit)}>
//             <Box sx={{ display: 'flex', alingItems: 'center', width: '70vw', justifyContent: 'space-between' }}>
//                 <Typography variant='h5' sx={{ pt: 3, pb: 3, color: '#1e293b' }}>Cadastrar Coleta</Typography>
//                 <IconButton onClick={closeModal} sx={{
//                     '&:hover': {
//                         bgcolor: '#1e293b', color: '#ffffff',
//                     }
//                 }}>
//                     <CloseIcon />
//                 </IconButton>
//             </Box>

//             <Grid container spacing={2} sx={{ pb: 1 }}>
//                 <Grid item xs={12} sx={{ pb: 1 }}>
//                     <TextField
//                         variant="filled"
//                         required
//                         fullWidth
//                         placeholder="xxxx"
//                         autoFocus
//                         id="responsavel"
//                         label='Responsavel'
//                         type="string"
//                         error={!!errors?.responsavel}
//                         {...register('responsavel', {
//                             required: 'Campo obrigatório',
//                             pattern: {
//                                 value:
//                                     message:
//                             }
//                         })}
//                     />
//                     {erros?.responsavel && (
//                         <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
//                             {erros.responsavel.message}
//                         </Typography>
//                     )}
//                 </Grid>

//                 <Grid item xs={12}>
//                     <TextField variant="filled"
//                         required
//                         fullWidth
//                         autoFocus
//                         id="coletador"
//                         label="Coletador"
//                         type="string"
//                         error={!!erros?.coletador}
//                         {...register('coletador', {
//                             required: 'Campo obrigatorio',
//                         })}
//                     />
//                     {erros?.coletador && (
//                         <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
//                             {erros.coletador.message}
//                         </Typography>
//                     )}
//                 </Grid>

//                 <Grid item xs={12}>
//                     <TextField variant="filled"
//                         required
//                         fullWidth
//                         autoFocus
//                         id="achado"
//                         label="achado"
//                         type="string"
//                         error={!!erros?.achado}
//                         {...register('achado', {
//                             required: 'Campo obrigatorio',
//                         })}
//                     />
//                     {erros?.achado && (
//                         <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
//                             {erros.achado.message}
//                         </Typography>
//                     )}
//                 </Grid>

//                 <Grid item xs={12}>
//                     <TextField variant="filled"
//                         required
//                         fullWidth
//                         autoFocus
//                         id="valorFinanceiroAchado"
//                         label="valorFinanceiroAchado"
//                         type="string"
//                         error={!!erros?.valorFinanceiroAchado}
//                         {...register('valorFinanceiroAchado', {
//                             required: 'Campo obrigatorio',
//                         })}
//                     />
//                     {erros?.valorFinanceiroAchado && (
//                         <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
//                             {erros.valorFinanceiroAchado.message}
//                         </Typography>
//                     )}
//                 </Grid>

//                 <Grid item xs={12}>
//                     <TextField variant="filled"
//                         required
//                         fullWidth
//                         autoFocus
//                         id="quantidadeAchado"
//                         label="quantidadeAchado"
//                         type="string"
//                         error={!!erros?.quantidadeAchado}
//                         {...register('quantidadeAchado', {
//                             required: 'Campo obrigatorio',
//                         })}
//                     />
//                     {erros?.quantidadeAchado && (
//                         <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
//                             {erros.quantidadeAchado.message}
//                         </Typography>
//                     )}
//                 </Grid>

//                 <Grid item xs={12}>
//                     <TextField variant="filled"
//                         required
//                         fullWidth
//                         autoFocus
//                         id="unidades"
//                         label="unidades"
//                         type="string"
//                         error={!!erros?.unidades}
//                         {...register('unidades', {
//                             required: 'Campo obrigatorio',
//                         })}
//                     />
//                     {erros?.unidades && (
//                         <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
//                             {erros.unidades.message}
//                         </Typography>
//                     )}
//                 </Grid>

//                 <Grid item xs={12}>
//                     <TextField variant="filled"
//                         required
//                         fullWidth
//                         autoFocus
//                         id="situacaoAchado"
//                         label="situacaoAchado"
//                         type="string"
//                         error={!!erros?.situacaoAchado}
//                         {...register('situacaoAchado', {
//                             required: 'Campo obrigatorio',
//                         })}
//                     />
//                     {erros?.situacaoAchado && (
//                         <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
//                             {erros.situacaoAchado.message}
//                         </Typography>
//                     )}
//                 </Grid>

//                 <Grid item xs={12}>
//                     <TextField variant="filled"
//                         required
//                         fullWidth
//                         autoFocus
//                         id="beneficio"
//                         label="beneficio"
//                         type="string"
//                         error={!!erros?.beneficio}
//                         {...register('beneficio', {
//                             required: 'Campo obrigatorio',
//                         })}
//                     />
//                     {erros?.beneficio && (
//                         <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
//                             {erros.beneficio.message}
//                         </Typography>
//                     )}
//                 </Grid>

//                 <Grid item xs={12}>
//                     <TextField variant="filled"
//                         required
//                         fullWidth
//                         autoFocus
//                         id="valorBeneficio"
//                         label="valorBeneficio"
//                         type="string"
//                         error={!!erros?.valorBeneficio}
//                         {...register('valorBeneficio', {
//                             required: 'Campo obrigatorio',
//                         })}
//                     />
//                     {erros?.valorBeneficio && (
//                         <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
//                             {erros.valorBeneficio.message}
//                         </Typography>
//                     )}
//                 </Grid>

//             </Grid>
//             <RegisterButton text="Registrar" />
//         </Box >
//     )
// }

// export default FormColeta;