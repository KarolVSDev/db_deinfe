import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormTopicoAchado from '../Forms/FormsTable/Register/FormTopicoAchado';
import FormAreaAchado from '../Forms/FormsTable/Register/FormAreaAchado';
import FormDivAchado from '../Forms/FormsTable/Register/FormDivAchado';
import FormAchado from '../Forms/FormsTable/Register/FormAchados';

const steps = [
  {
    label: 'Registro de Tópico',
    component: <FormTopicoAchado />
  },
  {
    label: 'Registro da Área do Achado',
    component: <FormAreaAchado />
  },
  {
    label: 'Registro da Divisão do Achado',
    component: <FormDivAchado />
  },
  {
    label: 'Registro do Achado',
    component: <FormAchado />
  }
];

export interface StepperProps {
  onCloseModal: Boolean;
}

export default function StepperV({ }) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 3 ? (
                  <Typography variant="caption">último passo</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.component}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finalizar' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Voltar
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>Formulários de registro de Achado finalizados</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Resetar
          </Button>
        </Paper>
      )}
    </Box>
  );
}
