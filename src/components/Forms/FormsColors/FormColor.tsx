// components/ColorPicker.tsx
import { useState } from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { KeyWord } from '../../../types/types';
import RegisterButton from '../../Buttons/RegisterButton';

export default function ColorPickerComponent() {
    const [color, setColor] = useState<string>('#ffffff');
    const { handleSubmit, register, formState: { errors }, reset, setValue} = useForm<KeyWord>({});

    const onSubmit = async (data: KeyWord) => {
        // Aqui você pode lidar com o envio do formulário
        console.log(data);
    }

    return (
        <Box sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }} component="form" name='formColor' id='formColor' noValidate onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit(onSubmit)(e);
        }}>
            <Typography variant="h6" gutterBottom>Inserir nova palavra chave</Typography>
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
                <TextField
                    label="Selecione uma cor"
                    value={color}
                    fullWidth
                    InputProps={{
                        style: {
                            color: color,
                            backgroundColor: `${color}10`
                        },
                        inputProps: {
                            type: 'color',
                            pattern: '^#[0-9A-Fa-f]{6}$',
                            title: 'Por favor, insira um valor hexadecimal válido (ex: #RRGGBB)'
                        }
                    }}
                    onChange={(e) => setValue('color', e.target.value)}
                />
                {errors?.color && (
                    <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                        {errors.color.message}
                    </Typography>
                )}
            </Grid>
            <RegisterButton text="Registrar" />
        </Box>
    );
}