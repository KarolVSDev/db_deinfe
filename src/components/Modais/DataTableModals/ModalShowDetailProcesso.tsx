import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FormUpdatePF from '../../Forms/FormsTable/Update/FormUpdatePF';
import { GridRowId } from '@mui/x-data-grid';
import FormUpdateJurisd from '../../Forms/FormsTable/Update/FormUpdateJurisd';
import FormUpdateProcesso from '../../Forms/FormsTable/Update/FormUpdateProcesso';
import FormUpdateProcurador from '../../Forms/FormsTable/Update/FormUpdateProcurador';
import FormUpdateRelator from '../../Forms/FormsTable/Update/FormUpdateRelator';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  height: '95vh',
  scrollbarWidth: 'thin',
  background: 'linear-gradient(90deg, #e2e8f0, #f1f5f9)'
};

interface ModalShowDetailProps {
  id: GridRowId;
  dataType: string;
  open: boolean;
  onClose: () => void;
}

const ModalShowDetailProcesso: React.FC<ModalShowDetailProps> = ({ id, dataType, open, onClose }) => {


  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
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
            <IconButton onClick={onClose} sx={{
              ml: 80, mr: 0, '&:hover': {
                bgcolor: '#1e293b', color: '#ffffff',
              }
            }}>
              <CloseIcon />
            </IconButton>
            {dataType}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalShowDetailProcesso;