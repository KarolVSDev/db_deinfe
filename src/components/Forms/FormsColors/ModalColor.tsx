import { Backdrop, Box, Button, Divider, Fade, IconButton, ListItemButton, ListItemIcon, ListItemText, Modal, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react'
import KeyIcon from '@mui/icons-material/Key';
import AccordionTransition from '../../Accordion/Accordion';
import KeyWordList from './KeyWordList';
import Helper from '../../Dialog/Helper';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
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


const ModalColor = () => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);


    return (
        <>
            <Helper title='Clique para gerenciar palavras-chave'>
                <Button onClick={handleOpen} variant="outlined">
                    <KeyIcon fontSize="small" sx={{ mr: .5 }} />
                    Palavras-Chave
                </Button>
            </Helper>
            <Modal
                aria-labelledby="transition-modal-color"
                aria-describedby="transition-modal-description-color"
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
                    <Paper sx={style}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <ListItemButton component="a" href="#customized-list">
                                <ListItemIcon sx={{ fontSize: 20 }}><KeyIcon fontSize="large" /></ListItemIcon>
                                <ListItemText
                                    sx={{ my: 0 }}
                                    primary="Gerenciar palavras-chave"
                                    primaryTypographyProps={{
                                        fontSize: 20,
                                        fontWeight: 'medium',
                                        letterSpacing: 0,
                                    }}
                                />
                            </ListItemButton>
                            <IconButton onClick={handleClose} sx={{
                                m: 2,
                                '&:hover': {
                                    bgcolor: '#1e293b', color: '#ffffff',
                                }
                            }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Divider />
                        <Box >
                            <AccordionTransition />
                            <Divider />
                            <KeyWordList />
                        </Box>


                    </Paper>
                </Fade>

            </Modal>
        </>
    )
}

export default ModalColor;