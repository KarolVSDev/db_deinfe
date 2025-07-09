// components/ColorPicker.tsx
import { useState } from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { KeyWord } from '../../../types/types';
import RegisterButton from '../../Buttons/RegisterButton';
import Loader from '../../Loader/Loader';
import useFetchKeyWord from './useFetchKeyWord';
import { ChromePicker } from 'react-color';

export interface ColorPickerComponentProps {
    handleExpanded: (expanded: boolean) => void;
}

export default function ColorPickerComponent({ handleExpanded }: ColorPickerComponentProps) {
    const [color, setColor] = useState<string>('#ffffff');
    const { handleSubmit, register, formState: { errors }, reset, setValue } = useForm<KeyWord>({});
    const [loading, setLoading] = useState(false);
    const { addKeyWord } = useFetchKeyWord();

    const onSubmit = async (data: KeyWord) => {
        try {
            setLoading(true)
            addKeyWord(data);
            reset();

        } catch (error) {
            console.error("Erro ao adicionar a palavra-chave:", error);
            setLoading(false)
        } finally {
            setLoading(false)
            setColor('#ffffff');
            handleExpanded(false);
        }
    }

    return (
        <Box sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }} component="form" name='formColor' id='formColor' noValidate onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit(onSubmit)(e);
        }}>
            <Typography variant="h6" gutterBottom>Inserir nova palavra-chave</Typography>
            <Grid item xs={12} sm={4} ></Grid>
            <Grid item xs={12} sm={4} sx={{ mb: 3 }}>
                <TextField
                    variant='filled'
                    required
                    fullWidth
                    autoFocus
                    id="label"
                    label='Palavra Chave'
                    type="text"
                    error={!!errors?.label}
                    {...register('label', {
                        required: 'Campo obrigatório'
                    })}
                    onBlur={(e) => {
                        const trimmed = e.target.value.trimEnd();
                        setValue('label', trimmed, { shouldValidate: true });
                    }}
                />

                {errors?.label && (
                    <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                        {errors.label.message}
                    </Typography>
                )}
            </Grid>
            <Grid item xs={12} sm={4} sx={{ mb: 3 }}>
                <TextField
                    variant='filled'
                    required
                    fullWidth
                    autoFocus
                    id="type"
                    label='Tipo'
                    type="text"
                    error={!!errors?.type}
                    {...register('type', {
                        required: 'Campo obrigatório'
                    })}
                />

                {errors?.type && (
                    <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                        {errors.type.message}
                    </Typography>
                )}
            </Grid>

            <Grid item xs={12} sm={4}>
                <Box display="flex" alignItems="center" gap={2}>
                    <ChromePicker
                        color={color}
                        onChange={(colorResult) => {
                            setColor(colorResult.hex);
                            setValue('color', colorResult.hex);
                        }}
                        disableAlpha
                    />

                </Box>
                {errors?.color && (
                    <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                        {errors.color.message}
                    </Typography>
                )}
            </Grid>
            {loading === false ? <RegisterButton text="Registrar" /> : <Loader />}

        </Box>
    );
}

