import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ModalProps {
  children:React.ReactNode
  title:string
}

const InnerAccordion: React.FC<ModalProps> = ({ children, title}) =>  {
  const [expanded2, setExpanded2] = React.useState(true);

  const handleExpansion = () => {
    setExpanded2((prevExpanded) => !prevExpanded);
  };

  return (
    <>
      <Accordion
        expanded={expanded2}
        onChange={handleExpansion}
        sx={{
          width: '100%',  background: 'linear-gradient(90deg, #e2e8f0, #f1f5f9)',
          
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default InnerAccordion;

