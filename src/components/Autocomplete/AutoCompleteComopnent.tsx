import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Beneficio } from '../../types/types';
import { Grid } from '@mui/material';


export interface MulttiploAutoCompleteProps {
  beneficios: Beneficio[];
  beneficiosDoAchado?: Beneficio[];
}


const MultiploAutoComplete: React.FC<MulttiploAutoCompleteProps> = ({ beneficios, beneficiosDoAchado }) => {
  
  // const indicesCorrespondentes = beneficiosDoAchado?.map(beneficioDoAchado => 
  //   beneficios.findIndex(beneficio => beneficio.id === beneficioDoAchado.id)
  // );


  // const beneficiosSelecionados = indicesCorrespondentes
  //   .map(index => beneficios[index])
  //   .filter(beneficio => beneficio !== undefined);
  // console.log(beneficiosSelecionados)

  return (

    <Grid item xs={12} sm={4} sx={{ mt: 3 }}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={beneficios}
          // defaultValue={beneficiosSelecionados}
          getOptionLabel={(option) => option.beneficio}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              //defaultValue={beneficiosSelecionados.map(item => item.beneficio)}
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