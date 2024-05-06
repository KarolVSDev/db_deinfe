
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { PessoaFisica } from '../../types/types';
import { useEffect } from 'react';

interface Props {
  onOptionSelected: (option: PessoaFisica | null) => void;
  data: PessoaFisica[];
}

export default function SearchParams({data, onOptionSelected}: Props) {

  
  useEffect(() => {

  },[data])

  return (
    <Autocomplete 
      disablePortal
      id="combo-box-demo"
      options={data}
      getOptionLabel={(option:PessoaFisica) => option.nome}
      onChange={(event, value) => onOptionSelected(value)}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField  {...params} label="Filtrar por pessoa" />}
    />
  );
}
