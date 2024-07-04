import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { ListData } from '../../types/types';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';


interface PaperIntProps {
    arrayData: ListData[];
    handleDelete: (id: string, type: string) => void
    stateType: string;
}

const stylePaper = {
    p: 2,
    width: '100%',
    minHeight: '50px',
    position: 'relative',
};

const styleChip = {
    position: 'relative',
    bottom: 0,
    left: 0,
    color: '#c23232',
    '& .MuiChip-deleteIcon': {
        color: '#c23232',
        '&:hover': {
            color: '#b12a2c',
        },
    },
};

const InfoPaperProcessos: React.FC<PaperIntProps> = ({ arrayData, handleDelete, stateType }) => {
    return (
        <Box >
            <Grid container spacing={3} sx={{ pb: 1, mt: 1 }}>
                {arrayData.map((item) => (
                    <Grid item xs={12} sm={6} key={item.id}>
                        <Paper key={item.id} sx={stylePaper} elevation={3}>
                            <Stack sx={{cursor:'pointer'}} direction='row' alignItems='center' justifyContent="space-between">
                                {item.type === 'processo' && (
                                    <Typography > Nº processo: {item.value1}</Typography>
                                )}
                                {item.type === 'pessoajurisd' && (
                                    <Typography > Cargo: {item.value1}</Typography>
                                )}
                                <Chip
                                    label={'remover'}
                                    onDelete={() => handleDelete(item.id, stateType)}
                                    deleteIcon={<DeleteIcon />}
                                    variant='outlined'
                                    sx={styleChip}
                                />
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default InfoPaperProcessos;
