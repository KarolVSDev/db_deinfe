import { Chip, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { GridRowId } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Interessado } from '../../types/types';
import { TypeAlert, TypeInfo } from '../../hooks/TypeAlert';
import { api } from '../../service/api';
import DeleteIcon from '@mui/icons-material/Delete';

interface PaperIntProps {
    id: GridRowId | undefined;
}

const stylePaper = {
    p: 2,
    width: '100%',
    minHeight: '110px',
    position: 'relative', // Defina a posição como relative
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

const InfoPaperIntetessado: React.FC<PaperIntProps> = ({ id }) => {

    const [arrayInteressado, setArrayInteressado] = useState<Interessado[]>([]);

    const getIntByPessoa = async () => {
        try {
            const response = await api.get(`/interessado/pessoa/${id}`);
            setArrayInteressado(response.data);
        } catch (error: any) {
            TypeInfo(error.response.data.message, 'error');
        }
    }   

    useEffect(() => {
        getIntByPessoa();
    }, [id]);

    function handleDelete(idInt: string): void {
        try {
            api.delete(`/interessado/${idInt}`).then(response => {
                getIntByPessoa()
            })
        } catch (error:any) {
            TypeAlert(error.response.data.message, 'error')
        }
    }

    return (
        <Grid container spacing={3} sx={{ pb: 1, mt:2 }}>
            {arrayInteressado.map((interessado) => (
                <Grid item xs={12} sm={6} key={interessado.id}>
                    <Paper sx={stylePaper} elevation={3}>
                        <Typography ><strong>Interesse:</strong> {interessado.interesse}</Typography>
                        <Stack>
                            <Chip
                                label="Remover Interesse"
                                onDelete={() => handleDelete(interessado.id)}
                                deleteIcon={<DeleteIcon />}
                                variant='outlined'
                                sx={styleChip}
                            />
                        </Stack>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}

export default InfoPaperIntetessado;
