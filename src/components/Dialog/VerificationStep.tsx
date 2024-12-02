import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridRowId } from '@mui/x-data-grid';
import { TopicoAchado } from '../../types/types';
import dataFake from '../../service/dataFake';



export interface VerificationProps {
    selectedRow: GridRowId;
    onClose: () => void;
    open: boolean;
    dataType: string;
}

const DeleteVerification: React.FC<VerificationProps> = ({ selectedRow, onClose, open, dataType }) => {
    const { deleteTopico, deleteAchado } = dataFake()

    const handleDelete = () => {
        if (dataType === 'topico') {
            deleteTopico(selectedRow)
        }else if (dataType === 'achado'){
            deleteAchado(selectedRow)
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
                    <Button color="error" onClick={handleDelete} autoFocus>
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default DeleteVerification
