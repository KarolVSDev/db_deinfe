import { Box, Chip, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { GridRowId } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Interessado, PessoaJurisd } from '../../types/types';
import { TypeAlert, TypeInfo } from '../../hooks/TypeAlert';
import { api } from '../../service/api';
import DeleteIcon from '@mui/icons-material/Delete';

interface PaperIntProps {
    arrayData:{label:string, labels2:string, value:string, id:string}[];
    handleDelete:(id:GridRowId | undefined) => void
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

const InfoPaperIntetessado: React.FC<PaperIntProps> = ({ arrayData, handleDelete}) => {

    

    return (
        <Box >
            <Grid container spacing={3} sx={{ pb: 1, mt:1 }}>
                {arrayData.map((item) => (
                    <Grid item xs={12} sm={6} key={item.id}>
                        <Paper sx={stylePaper} elevation={3}>
                            <Typography > {item.value}</Typography>
                            <Stack>
                                <Chip
                                    label="Remover Interesse"
                                    onDelete={() => handleDelete(item.id)}
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
