import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Beneficio } from '../../types/types';
import { Grid } from '@mui/material';


export interface MulttiploAutoCompleteProps {
  beneficios: Beneficio[];
  beneficiosDoAchado: Beneficio[];
}


const MultiploAutoComplete: React.FC<MulttiploAutoCompleteProps> = ({beneficios,beneficiosDoAchado}) => {
  console.log(beneficios)
  console.log(beneficiosDoAchado)
 

  return (

    <Grid item xs={12} sm={4} sx={{ mt: 3 }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={teste1}
        getOptionLabel={(option) => option.label}
        defaultValue={teste1.filter(item => teste12.some(item2 => item.id === item2.id))}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Relação de Benefícios"
            placeholder="selecionados"
            variant='filled'
          />
        )}
      />

    </Grid>
  );
}

export default MultiploAutoComplete;