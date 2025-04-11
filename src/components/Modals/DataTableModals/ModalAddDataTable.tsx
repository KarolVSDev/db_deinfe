
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import FormTopicoAchado from '../../Forms/FormsTable/Create/FormTopicoAchado';
import FormAchado from '../../Forms/FormsTable/Create/FormAchadoPasta/FormAchados';
import FormBeneficio from '../../Forms/FormsTable/Create/FormBeneficio';
import SaveIcon from '@mui/icons-material/Save';
import { User } from '../../../types/types';
import FormProcesso from '../../Forms/FormsTable/Create/FormProcessoPasta/FormProcesso';
import FormColeta from '../../Forms/FormsTable/Create/formColetaPasta/FormColeta';

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

export interface ModalAddDataProps {
  dataType: string;
  user: User | undefined;
  closeModal?:() => void;
}


const ModalAddData: React.FC<ModalAddDataProps> = ({ dataType, user, closeModal }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true)



  useEffect(() => {

    if (dataType === 'pesquisa') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }

  }, [open, dataType])



  return (
    <div>
      <Button onClick={handleOpen} disabled={isDisabled} variant='contained'  >
        <SaveIcon sx={{ mr: 1 }} /> Cadastrar {dataType}
      </Button>
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
            {(dataType === 'tema') && (<FormTopicoAchado closeModal={handleClose} user={user} />)}
            {(dataType === 'achado') && (<FormAchado closeModal={handleClose} user={user} dataType={dataType} />)}
            {(dataType === 'beneficio') && (<FormBeneficio closeModal={handleClose} user={user} dataType={dataType} />)}
            {(dataType === 'processo') && (<FormProcesso closeModal={handleClose} user={user} dataType={dataType} />)}
            {(dataType === 'coleta') && (<FormColeta closeModal={handleClose} user={user} dataType={dataType} />)}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalAddData;

