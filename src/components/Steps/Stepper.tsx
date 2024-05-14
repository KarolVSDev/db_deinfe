import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Importar os formulários que deseja controlar
import FormPessoaFisica from '../Forms/FormPessoaFisica';
import FormPessoaJurisd from '../Forms/FormPessoaJurisd';
import FormProcesso from '../Forms/FormProcesso';
import FormInteresse from '../Forms/FormInteresse';

interface ModalProps {
  closeModal: () => void;
}

const StepperFormsAddData: React.FC<ModalProps> = ({closeModal}) =>  {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleModalClose: any = () => {
    closeModal()
  }

  return (
    <div>
      <IconButton onClick={handleModalClose} sx={{
        ml: 85, mb: 0, mr: 0, '&:hover': {
          bgcolor: '#1e293b', color: '#ffffff',
        }
      }}>
        <CloseIcon />
      </IconButton>
      <Stepper activeStep={activeStep} alternativeLabel sx={{mb:4}}>
        <Step>
          <StepLabel>Regitro de Pessoa Física</StepLabel>
        </Step>
        <Step>
          <StepLabel>Registro de Pessoa Jurisdicionada</StepLabel>
        </Step>
        <Step>
          <StepLabel>Registro de Processo</StepLabel>
        </Step>
        <Step>
          <StepLabel>Registro de Interesse</StepLabel>
        </Step>
      </Stepper>
      {activeStep === 0 && <FormPessoaFisica />} 
      {activeStep === 1 && <FormPessoaJurisd />} 
      {activeStep === 2 && <FormProcesso />} 
      {activeStep === 3 && <FormInteresse />} 
      
      <Box sx={{mt:4}}>
        {activeStep !== 0 && (
          <Button onClick={handleBack}>Voltar</Button>
        )}
        {activeStep !== 3 ? (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Próximo
          </Button>
        ) : (
          <Button variant="contained" color="primary">
            Concluir
          </Button>
        )}
      </Box>
    </div>
  );
}

export default StepperFormsAddData;

