import { Grid, TextField } from "@mui/material";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BeneficioComAchado } from "../../types/types";


export interface TextFieldProps {
    id:keyof BeneficioComAchado;
    label:string;
    register: UseFormRegister<BeneficioComAchado>;
    errors:FieldErrors<FieldValues>;
}

const TextFieldComponent:React.FC<TextFieldProps> = ({id, label, register, errors}) => {

    return (
        <Grid item xs={12} sm={4} >
            <TextField
                variant="filled"
                autoComplete="given-name"
                type="text"
                multiline
                fullWidth
                id={id}
                label={label}
                error={!!errors?.criterioMunicipal}
                helperText={errors?.criterioMunicipal?.message as string}
             
                {...register(id as keyof BeneficioComAchado, {
                    validate: (value) => {
                        if (typeof value !== "string") {
                            return true; // Se não for string, não executa a validação
                        }
                        const sqlInjectionPattern = /(\b(SELECT|UPDATE|DELETE|INSERT|WHERE|DROP|UNION|EXEC|OR|AND|--|;|')\b)/i;
                        if (sqlInjectionPattern.test(value)) {
                            return "Entrada inválida: possível tentativa de injeção de SQL.";
                        }
                        return true;
                    },
                })}
            />
        </Grid>
    )
}

export default TextFieldComponent;

