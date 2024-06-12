import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import {  ListData } from '../../types/types';
import DeleteIcon from '@mui/icons-material/Delete';


interface PaperIntProps {
    arrayData:ListData[];
    handleDelete:(id:string, type:string) => void
    stateType:string;
}

const stylePaper = {
    p: 2,
    width: '100%',
    minHeight: '110px',
    position: 'relative', 
};

const styleChip = {
    position: 'absolute',
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

const InfoPaperIntetessado: React.FC<PaperIntProps> = ({ arrayData, handleDelete, stateType}) => {
    return (
        <Box >
            <Grid container spacing={3} sx={{ pb: 1, mt:1 }}>
                {arrayData.map((item) => (
                    <Grid item xs={12} sm={6} key={item.id}>
                        <Paper sx={stylePaper} elevation={3}>
                            <Typography > {item.label}</Typography>
                            {item.label !== item.value && (
                                <Typography > {item.value}</Typography>
                            )}
                            <Stack>
                                <Chip
                                    label={`Remover registro`}
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

export default InfoPaperIntetessado;
