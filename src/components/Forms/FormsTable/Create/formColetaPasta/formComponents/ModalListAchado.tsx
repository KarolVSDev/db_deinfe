import { Backdrop, Box, Button, Fade, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react'
import { Achado } from '../../../../../../types/types';
import ListAchados from './ListAchados';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    overflowY: 'auto',
    height: 'fit-content',
    maxHeight: '95vh',
    scrollbarWidth: 'thin',
    background: 'linear-gradient(90deg, #e2e8f0, #f1f5f9)',
    borderRadius: '10px',
};

export interface ModalListAchadoProps {
    arrayFiltrado: Achado[];
    onSelectAchado: (achado: Achado) => void;
}

const ModalListAchados: React.FC<ModalListAchadoProps> = ({ arrayFiltrado, onSelectAchado }) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const handleSelect = (achado: Achado) => {
        onSelectAchado(achado);
    };

    return (
        <>
            <Button onClick={handleOpen} variant="outlined" >Selecionar Achado</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>

                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1 }}>
                                <Typography variant='h6'>Lista de Achados:</Typography>
                                <IconButton onClick={handleClose} sx={{
                                    '&:hover': {
                                        bgcolor: '#1e293b', color: '#ffffff',
                                    }
                                }}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                            <ListAchados arrayDeAchados={arrayFiltrado} onAchadoSelected={handleSelect} />

                        </>
                    </Box>
                </Fade>

            </Modal>
        </>
    )
}

export default ModalListAchados;