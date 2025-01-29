import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridRowId } from '@mui/x-data-grid';
import { TopicoAchado } from '../../types/types';
import dataFake from '../../service/dataFake';
import { useState } from 'react';
import Loader from '../Loader/Loader';



export interface VerificationProps {
    selectedRow: GridRowId;
    onClose: () => void;
    open: boolean;
    dataType: string;
}

const DeleteVerification: React.FC<VerificationProps> = ({ selectedRow, onClose, open, dataType }) => {
    const { deleteTopico, deleteAchado, deleteBeneficio } = dataFake()
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        if (dataType === 'topico') {
            setLoading(true)
            try {
                await new Promise(resolve => setTimeout(resolve, 1000))
                deleteTopico(selectedRow)
                setLoading(false)
            } catch (error) {
                console.error("Erro ao tentar excluir o Tópico", error)
            }
        } else if (dataType === 'achado') {
            setLoading(true)
            try {
                await new Promise(resolve => setTimeout(resolve, 1000))
                deleteAchado(selectedRow)
                setLoading(false)
            } catch (error) {
                console.error("Erro ao tentar excluir o Achado", error)
            }
        } else if (dataType === 'beneficio') {
            setLoading(true)
            try {
                await new Promise(resolve => setTimeout(resolve, 1000))
                deleteBeneficio(selectedRow)
                setLoading(false)
            } catch (error) {
                console.error("Erro ao tentar excluir o Benefício", error)
            }
        }
        onClose()
    };
    const handleClose = () => {
        onClose()
    };


    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Você tem certeza dessa ação?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Essa ação vai excluir o registro da tabela.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    {loading ? <Box sx={{display:"flex", justifyContent:"start", pl:3}}><Loader/></Box>:
                    <Button color="error" onClick={handleDelete} autoFocus>Excluir
                    </Button>}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default DeleteVerification
