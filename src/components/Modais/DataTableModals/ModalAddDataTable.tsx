import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import SignUp from '../../Forms/FormsUser/RegisterForm';
import { useEffect, useState } from 'react';
import UpdateUserForm from '../../Forms/FormsUser/UpdateUserForm';
import FormPessoaFisica from '../../Forms/FormsTable/Register/FormPessoaFisica';
import PessoaFisicaStepper from '../../Accordion/Accordion';
import Stepper from '../../Accordion/Accordion';
import StepperFormsAddData from '../../Accordion/Accordion';
import AccordionComponent from '../../Accordion/Accordion';
import FormPessoaJurisd from '../../Forms/FormsTable/Register/FormPessoaJurisd';
import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FormProcesso from '../../Forms/FormsTable/Register/FormProcesso';
import FormInteresse from '../../Forms/FormsTable/Register/FormInteresse';
import FormApenso from '../../Forms/FormsTable/Register/FormApenso';
import InnerAccordion from '../../Accordion/InnerAccordion';
import FormJurisd from '../../Forms/FormsTable/Register/FormJurisd';
import FormJurisd_Jurisd from '../../Forms/FormsTable/Register/FormJurisd_Jurisd';
import StepperV from '../../Stepper/Stepper';


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
  overflowY: 'auto',
  height: '95vh',
  scrollbarWidth: 'thin',
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
      <Button onClick={handleOpen} variant='contained'  >
        Adicionar Registro
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
            <IconButton onClick={handleClose} sx={{
              ml: 85, mb: 4, mr: 0, '&:hover': {
                bgcolor: '#1e293b', color: '#ffffff',
              }
            }}>
              <CloseIcon />
            </IconButton>
            <AccordionComponent title={'Registro de Pessoa Física'}>
              <FormPessoaFisica />
              <InnerAccordion title={'Registro de Interessado'}>
                <FormInteresse />
              </InnerAccordion>
            </AccordionComponent>
            <AccordionComponent title={'Registro de Pessoa Jurisdicionada'}>
              <FormPessoaJurisd />
            </AccordionComponent>
            <AccordionComponent title={'Registro de Processo'}>
              <FormProcesso />
              <InnerAccordion title='Registro de Apenso'>
                <FormApenso />
              </InnerAccordion>
            </AccordionComponent>
            <AccordionComponent title={'Registro de Unidade Gestora'}>
              <FormJurisd />
              <InnerAccordion title={"Registro de relação entre U.G's"}>
                <FormJurisd_Jurisd />
              </InnerAccordion>
            </AccordionComponent>
            <AccordionComponent title={'Registro de Achados'}>
              <StepperV />
            </AccordionComponent>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

