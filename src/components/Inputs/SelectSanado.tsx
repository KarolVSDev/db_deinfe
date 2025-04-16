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
    sanado: string[];
}

const SelectSanado: React.FC<SelectSanadoProps> = ({ label, id, register, errors, sanado }) => {

    return (
        <div>
            <FormControl variant="filled" sx={{  minWidth: 180 }}>
                <InputLabel id={`${id}-label`}>{label}</InputLabel>
                <Select
                    labelId={`${id}-label`}
                    id={id}
                    {...register(id, { required: "Este campo é obrigatório" })}
                    defaultValue={sanado}
                >
                    <MenuItem value="">
                        <em>Selecione...</em>
                    </MenuItem>
                    {sanado.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                {errors?.[id] && (
                    <FormHelperText sx={{ color: 'red', ml: '10px' }}>{errors[id]?.message}</FormHelperText>
                )}
            </FormControl>
        </div>
    );
}

export default SelectSanado;