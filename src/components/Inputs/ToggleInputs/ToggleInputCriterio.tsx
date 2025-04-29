import React, { memo } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Grid, Typography } from '@mui/material';
import { Achado } from '../../../types/types';

export interface toggleComponentProps {
    alignment: keyof Achado; // Tipagem mais precisa
    onChange: (value: keyof Achado) => void;
}

const ToggleButtonsCriterios: React.FC<toggleComponentProps> = memo(({ alignment, onChange }) => {
    const handleAlignment = (_: React.MouseEvent<HTMLElement>, newAlignment: keyof Achado | null) => {
        if (newAlignment !== null) {
            onChange(newAlignment);
        }
    };

    return (
        <Grid item xs={12} sm={4} sx={{ mt: 3 }}>
            <Typography>Critérios</Typography>
            <ToggleButtonGroup
                value={alignment}
                exclusive
                id="toggleCriterio"
                onChange={handleAlignment}
                aria-label="toggleCriterio"
                color="primary"
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
        </Grid>
    );
});

export default ToggleButtonsCriterios;