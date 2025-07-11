import React from 'react'
import { Achado, User } from '../../../../../../types/types';
import { Box, Divider, IconButton, Paper, Typography } from '@mui/material';
import Helper from '../../../../../Dialog/Helper';
import HighlightedText from '../../../../../DataTable/HighLightMidleware';
import ModalColor from '../../../../FormsColors/ModalColor';
import EditIcon from '@mui/icons-material/Edit';
import ModalUpdatePF from '../../../../../Modals/DataTableModals/ModalUpdateForms';
import { GridRowId } from '@mui/x-data-grid';

export interface AchadoPaperProps {
    achado: Achado;
    handleUpdate: () => void;
    stateModal: boolean;
    dataType:string;
    user:User;
    handleCloseModal:() => void;
}

const AchadoPaper: React.FC<AchadoPaperProps> = ({ achado, handleUpdate, dataType, stateModal, user, handleCloseModal }) => {

    return (
        <Paper sx={{ mb: 2 }}>
            <Typography sx={{ mt: 2, pl: 2, pt: 1, fontWeight: 'bold' }}>Achado:</Typography>
            <Typography sx={{ p: 2, pt: 0 }}><HighlightedText text={achado.achado} /></Typography>

            <Divider />
            <Box sx={{ bgColor: '#f1f5f9' }}>
                <Helper title="Clique aqui para editar o registro">
                    <IconButton sx={{ mx: 1 }} color="primary" onClick={() => handleUpdate()}>
                        <EditIcon sx={{ fontSize: '30px', mb: 1, animation: 'flipInX 0.5s ease-in-out' }} />
                    </IconButton>
                </Helper>
                <ModalColor />
            </Box>
            {achado?.id !== null && (
                <ModalUpdatePF
                    id={achado?.id as GridRowId}
                    dataType={dataType}
                    open={stateModal}
                    user={user}
                    onClose={handleCloseModal}
                />
            )}
        </Paper>
    )
}

export default AchadoPaper