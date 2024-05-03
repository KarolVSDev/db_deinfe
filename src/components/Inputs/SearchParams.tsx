import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchParams(pesquisa:any) {

    
  
    
  return (
    <Autocomplete 
      disablePortal
      id="combo-box-demo"
      options={[]}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField  {...params} label="Pessoa Física" />}
    />
  );
}
