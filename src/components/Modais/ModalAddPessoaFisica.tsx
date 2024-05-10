import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import SignUp from '../Forms/RegisterForm';
import { useEffect, useState} from 'react';
import UpdateUserForm from '../Forms/UpdateUserForm';
import FormPessoaFisica from '../Forms/FormPessoaFisica';
import PessoaFisicaStepper from '../Steps/Stepper';
import Stepper from '../Steps/Stepper';
import StepperFormsAddData from '../Steps/Stepper';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 780,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY:'auto',
  height:'95vh', 
  scrollbarWidth:'thin',
};

export default function ModalPessoaFisica() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    setOpen(false)
  }

  useEffect(() => {

  }, [open])

  return (
    <div>
        <Button onClick={handleOpen}variant='contained'sx={{mb:2}} >
                Add Pessoa Física +
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
            <StepperFormsAddData closeModal = {handleSubmit}/>
            {/* <FormPessoaFisica  closeModal = {handleSubmit}/> */}
            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

