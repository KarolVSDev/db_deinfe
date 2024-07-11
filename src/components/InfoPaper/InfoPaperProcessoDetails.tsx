import { Box, Button, Chip, Collapse, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { ProcessoDetails } from '../../types/types';
import { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import useFetchListData from '../../hooks/useFetchListData';
import { GridRowId } from '@mui/x-data-grid';
import ModalShowDetailProcesso from '../Modais/DataTableModals/ModalShowDetailProcesso';


interface DetailsProps {
    processoDetails: ProcessoDetails | undefined;
}

const stylePaper = {
    p: 2,
    width: '100%',
    minHeight: '110px',
    position: 'relative',
};


const InfoPaperProcessoDetails: React.FC<DetailsProps> = ({ processoDetails }) => {

    const [openApensados, setOpenApensados] = useState(false);
    const [openInteressados, setOpenInteressados] = useState(false);
    const {onDelete} = useFetchListData(processoDetails?.id)
    const [openModal, setOpenModal] = useState(false)
    const [buttonType, setButtonType] = useState('')
    const [typeId, setTypeId] = useState('')

    const handleApensadosClick = () => {
        setOpenApensados(!openApensados);
    };

    const handleInteressadosClick = () => {
        setOpenInteressados(!openInteressados)
    }

    const handleDelete = (id:string, state:string) => {
        onDelete(id, state)
    }

    const handleModal = (valueButton:string) => {
        setButtonType(valueButton)
        setOpenModal(true)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

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

   

    return (
        <Box >
            {processoDetails && (
                <Grid container spacing={3} sx={{ pb: 1, mt: 1 }}>
                    <Grid item xs={12} sm={12} >
                        <Paper sx={stylePaper} elevation={3}>
                            <Typography variant='h6' sx={{ color: '#991b1b', fontWeight: 'bold' }}>Detalhes do processo:</Typography>
                            <Typography sx={{ fontSize: 15 }}><strong>Relator(a):</strong> {processoDetails.relator.nome}</Typography>
                            <Typography sx={{ fontSize: 15 }}><strong>Procurador(a):</strong> {processoDetails.procurador.nome}</Typography>
                            <Typography sx={{ fontSize: 15 }}><strong>Advogado(a):</strong> {processoDetails.advogado.nome}</Typography>
                            <Typography sx={{ fontSize: 15 }}><strong>Unidade Gestora:</strong> {processoDetails.jurisd.nome}</Typography>
                            {processoDetails.apensados && processoDetails.apensados.length !== 0 && (
                                <Box sx={{ mt: 2 }}>
                                    <Button  onClick={() => handleModal('apenso')}>Processos Apensados</Button>
                                    <Button  onClick={() => handleModal('interesse')}>Interessados</Button>
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            )}
            <ModalShowDetailProcesso id={typeId} dataType={buttonType} open={openModal} onClose={handleClose}            
            />
        </Box>

    );
}

export default InfoPaperProcessoDetails;
