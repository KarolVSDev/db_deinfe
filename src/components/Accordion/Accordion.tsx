import  { useState} from 'react';
import { Accordion, AccordionSlots, AccordionSummary, AccordionDetails, Typography, Fade } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ModalProps {
  children:React.ReactNode
  title:string
}

const AccordionComponent: React.FC<ModalProps> = ({ children, title}) =>  {
  const [expanded, setExpanded] = useState(false);


  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade as AccordionSlots['transition'] }}
        slotProps={{ transition: { timeout: 500 } }}
        sx={{
          width: '100%', p:2,background: 'linear-gradient(90deg, #e2e8f0, #f1f5f9)',
          '& .MuiAccordion-region': {height: expanded ? 'auto' : 0},
          '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' }, boxShadow:'1px 1px 3px '
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

export default AccordionComponent;

