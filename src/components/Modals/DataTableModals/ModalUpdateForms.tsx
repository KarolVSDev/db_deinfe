import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { GridRowId } from '@mui/x-data-grid';
import FormUpdateAchados from '../../Forms/FormsTable/Update/FormUpdateAchados';
import FormUpdateTopicoAchado from '../../Forms/FormsTable/Update/formUpdateTopicoAchado';
import FormUpdateBeneficio from '../../Forms/FormsTable/Update/FormUpdateBeneficio';
import { Padding } from '@mui/icons-material';
import { User } from '../../../types/types';

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

interface ModalUpdateProps {
  id: GridRowId;
  dataType: string;
  open: boolean;
  onClose: () => void;
  user:User | undefined;
}


const ModalUpdatePF: React.FC<ModalUpdateProps> = ({ id, dataType, open, onClose, user}) => {

  const renderForm = () => {
    switch (dataType) {
      case 'topico':
        return <FormUpdateTopicoAchado closeModal={onClose} id={id} />

      case 'beneficio':
        return <FormUpdateBeneficio closeModal={onClose} id={id} user={user} dataType={dataType}/>

      case 'achado':
        return <FormUpdateAchados closeModal={onClose} id={id} user={user} dataType={dataType} />
    }
  }

  return (
    <Box >
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
        <Fade  in={open}>
          <Box sx={style}>
            {renderForm()}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default ModalUpdatePF;