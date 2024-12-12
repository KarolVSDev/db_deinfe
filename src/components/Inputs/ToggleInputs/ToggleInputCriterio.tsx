import * as React from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';
import { BeneficioComAchado } from '../../../types/types';

export interface toggleComponentProps {
  alignment: string;
  onChange: (value:keyof BeneficioComAchado) => void;
}

const ToggleButtonsCriterios:React.FC<toggleComponentProps> = ({alignment, onChange}) => {

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: keyof BeneficioComAchado | null) => {
    if (newAlignment !== null) {
      onChange(newAlignment);
    }
  };

  return (
    <>
      <Typography>Critérios</Typography>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        color='primary'
      >
        <ToggleButton value="criterioMunicipal" aria-label="critério municipal">
          <Typography>Municipal</Typography>
        </ToggleButton>
        <ToggleButton value="criterioEstadual" aria-label="critério estadual">
          <Typography>Estadual</Typography>
        </ToggleButton>
        <ToggleButton value="criterioGeral" aria-label="critério geral">
          <Typography>Geral/Nacional</Typography>
        </ToggleButton>

      </ToggleButtonGroup>
    </>
  );
}

export default ToggleButtonsCriterios;
