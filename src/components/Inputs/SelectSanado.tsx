import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Coleta } from '../../types/types';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormHelperText } from '@mui/material';

export interface SelectSanadoProps {
    id: keyof Coleta;
    register: UseFormRegister<Coleta>;
    errors: FieldErrors<Coleta>;
    label: string
    defaultValue?: string;
}

const SelectSanado: React.FC<SelectSanadoProps> = ({ label, id, register, errors, defaultValue }) => {

    return (
        <div>
            <FormControl fullWidth variant="filled" >
                <InputLabel id={`${id}-label`}>{label}</InputLabel>
                <Select
                    labelId={`${id}-label`}
                    id={id}
                    defaultValue={defaultValue || ''}
                    {...register(id)}
                    error={!!errors[id]}
                >
                    <MenuItem value="">
                        <em>Selecione...</em>
                    </MenuItem>
                    <MenuItem value="sanado">Sanado</MenuItem>
                    <MenuItem value="não sanado">Não Sanado</MenuItem>
                </Select>
                {errors?.[id] && (
                    <FormHelperText sx={{ color: 'red', ml: '10px' }}>{errors[id]?.message}</FormHelperText>
                )}
            </FormControl>
        </div>
    );
}

export default SelectSanado;