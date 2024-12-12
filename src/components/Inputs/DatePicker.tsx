import { useState } from "react";
import TextField from "@mui/material/TextField";
import { FormControl, FormHelperText, Grid } from "@mui/material";
import { BeneficioComAchado } from "../../types/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface DateInputProps {
  id: keyof BeneficioComAchado;
  label: string;
  register: UseFormRegister<BeneficioComAchado>;
  errors: FieldErrors<BeneficioComAchado>;
}

const DateSelector:React.FC<DateInputProps> = ({id, label, register, errors}) => {

  return (
    <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
      <FormControl error={!!errors?.[id]}>
        <TextField
          id={id}
          label={label}
          type="date"
          fullWidth
          variant="outlined"
          InputLabelProps={{
            shrink: true, // Faz a label ficar acima quando o campo é preenchido
          }}
          {...register(id, {
            required: "Este campo é obrigatório", // Validação de campo obrigatório
          })}
        />
        {errors?.[id] && (
          <FormHelperText>{errors[id]?.message}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
};

export default DateSelector;

