import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { ListData, ProcessoDetails } from '../../types/types';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';


interface DetailsProps {
    processoDetails: ProcessoDetails | undefined;
}

const stylePaper = {
    p: 2,
    width: '100%',
    minHeight: '110px',
    position: 'relative',
};

const styleChip = {
    position: 'relative',
    bottom: 0,
    left: 0,
    m: 1,
    color: '#c23232',
    '& .MuiChip-deleteIcon': {
        color: '#c23232',
        '&:hover': {
            color: '#b12a2c',
        },
    },

};

const InfoPaperProcessoDetails: React.FC<DetailsProps> = ({ processoDetails }) => {
    console.log('renderizando o processoDetails', processoDetails)
    return (
        <Box >
            {processoDetails && (
                <Grid container spacing={3} sx={{ pb: 1, mt: 1 }}>
                    <Grid item xs={12} sm={12} >
                        <Paper sx={stylePaper} elevation={3}>
                            <Typography variant='h6' sx={{color:'#991b1b', fontWeight:'bold'}}>Detalhes do processo:</Typography>
                            <Typography><strong>Relator(a):</strong> {processoDetails.relator.nome}</Typography>
                            <Typography><strong>Procurador(a):</strong> {processoDetails.procurador.nome}</Typography>
                            <Typography><strong>Advogado(a):</strong> {processoDetails.advogado.nome}</Typography>
                            <Typography><strong>Unidade Gestora:</strong> {processoDetails.jurisd.nome}</Typography>
                            {/* <Typography><strong>Apensados:</strong> {processoDetails.apensados.}</Typography>
                            <Typography><strong>Interessados:</strong> {processoDetails.jurisd.nome}</Typography> */}
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Box>

    );
}

export default InfoPaperProcessoDetails;
