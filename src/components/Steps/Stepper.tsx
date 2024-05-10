import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Importar os formulários que deseja controlar
import FormPessoaFisica from '../Forms/FormPessoaFisica';

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
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel>Regitro de Pessoa Física</StepLabel>
        </Step>
        <Step>
          <StepLabel>Passo 2</StepLabel>
        </Step>
        <Step>
          <StepLabel>Passo 3</StepLabel>
        </Step>
        <Step>
          <StepLabel>Passo 4</StepLabel>
        </Step>
      </Stepper>
      {activeStep === 0 && <FormPessoaFisica />} 
      
      <div>
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
      </div>
    </div>
  );
}

export default StepperFormsAddData;

