import { Autocomplete, Box, Grid, IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useContextTable } from '../../../../context/TableContext';
import { Controller, useForm, UseFormRegister } from 'react-hook-form';
import { Achado, Beneficio, User } from '../../../../types/types';
import { api } from '../../../../service/api';
import { TypeAlert } from '../../../../hooks/TypeAlert';
import RegisterButton from '../../../Buttons/RegisterButton';
import React, { useEffect, useState } from 'react';
import useFetchListData from '../../../../hooks/useFetchListData';
import dataFake from '../../../../service/dataFake';
import ButtonNovo from '../../../Buttons/ButtonNovo';
import CloseIcon from '@mui/icons-material/Close';

export interface FormBeneficioProps {
    closeModal:() => void;
    user:User | undefined;
    dataType:string;
    }

const FormBeneficio:React.FC<FormBeneficioProps> = ({user, dataType, closeModal}) => {
    const { control, handleSubmit, register, formState: { errors }, setValue, reset } = useForm<Beneficio>({});
    const { setArrayBeneficio, arrayAchado } = useContextTable();
    //const {getAllNatAchado} = useFetchListData()
    const { saveBeneficio, getBeneficio } = dataFake()
    const [situacao, setSituacao] = useState<string | null>(null);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newSituacao: string,
      ) => {
        if (newSituacao !== undefined) {
          setSituacao(newSituacao);
        }
      };

    const onSubmit = (data: Beneficio) => {
        // api.post('/area-achado', data).then(response => {
        //     const newAreaAchado = response.data.areaAchado;
        //     TypeAlert(response.data.message, 'success');
        //     reset();
        //     setValue('natureza', '');
        //     setArrayAreaAchado(prevArray => [...prevArray, newAreaAchado])
        // }).catch((error) => {
        //     TypeAlert(error.response.data.message, 'warning');
        //     setValue('natureza', '');
        // });

        if(getBeneficio(data.beneficio)){
            return
        }

        if(user?.cargo !== 'Diretor'){
            data.situacao = false
        }
        const dataWithSituacao = {
            ...data,
            situacao:situacao === 'Aprovado'? true : false
        }
        saveBeneficio(dataWithSituacao)
        TypeAlert('Benefício adicionado', 'success');
        reset()
        closeModal()

    };

    return (
        <Box sx={{border:'1px solid #000', borderRadius:2, padding:'20px 20px 20px',boxShadow:'1px 2px 4px'}} component="form" name='formBeneficio' noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{display:'flex', alignItems:'center', width:'426.95px', justifyContent:'space-between'}}>
                <Typography variant="h5" sx={{ pt: 3, pb: 3, color: '#1e293b' }}>Cadastrar Novo Benefício</Typography>
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
                name="achado_id"
                control={control}
                defaultValue="" 
                rules={{ required: 'Campo obrigatório' }} 
                render={({ field }) => (
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={arrayAchado}
                    getOptionLabel={(option: Achado) => option.achado}
                    onChange={(event, value) => field.onChange(value?.id || '')} 
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Achado"
                        variant="filled"
                        error={!!errors.achado_id} // Mostra erro
                        helperText={errors.achado_id?.message} // Mostra a mensagem de erro
                    />
                    )}
                />
                )}
                />
            </Grid>
            <ButtonNovo dataType={dataType} closeModal={closeModal} user={user}/>
            <Grid item xs={12} sm={4} sx={{mt:3}}>
                <TextField
                    variant='filled'
                    required
                    autoFocus
                    fullWidth
                    id="beneficio"
                    label='Benefício'
                    type="text"
                    error={!!errors?.beneficio}
                    {...register('beneficio', {
                        required: 'Campo obrigatório'
                    })}
                />

                {errors?.beneficio && (
                    <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                        {errors.beneficio.message}
                    </Typography>
                )}
            </Grid>
            <Grid item xs={12} sm={4}>
            {user?.cargo ==='Diretor'? (<ToggleButtonGroup
                  color="primary"
                  value={situacao}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                >
                  <ToggleButton value='Pendente' >Pendente</ToggleButton>
                  <ToggleButton value='Aprovado' >Aprovado</ToggleButton>
                </ToggleButtonGroup>):(
                <input type="hidden"{...register('situacao')} value="false" />
              )}
          </Grid>
            <RegisterButton text="Registrar" />
        </Box>
    );
}

export default FormBeneficio;
