import { Backdrop, Box, Button, Fade, IconButton, List, ListItem, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react'
import dataFake from '../../../service/dataFake';
import { Achado, Beneficio } from '../../../types/types';
import ArticleIcon from '@mui/icons-material/Article';
import Divider from '@mui/material/Divider';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  height: 'fit-content',
  maxHeight: '95vh',
  scrollbarWidth: 'thin',
  background: 'linear-gradient(90deg, #e2e8f0, #f1f5f9)'
};

export interface ModalAnalisesProps {
  analise:string
}

const ModalAnalises:React.FC<ModalAnalisesProps> = ({analise}) => {
  const {getBeneficiosByAchado} = dataFake()
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const isTitle = (text: string) => text.startsWith('# ') && !text.includes('\n');
  

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" sx={{borderColor:'#1e293b', color:'#1e293b', '&:hover':{color:'#fff', borderColor:'#475569', bgcolor:'#1e293b'}}}>Exibir</Button>
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
                ml: 67, mb:2, mr: 0, '&:hover': {
                  bgcolor: '#1e293b', color: '#ffffff',
                }
              }}>
                <CloseIcon />
              </IconButton>
              {analise ? (
                <>
                  {analise.split('\n').map((line, index) => (
                  <Typography
                    key={index}
                    sx={{
                      border: '1px solid #000',
                      borderRadius: 2,
                      padding: '10px',
                      boxShadow: '1px 2px 4px',
                      textAlign: 'justify',
                      marginBottom: '8px', 
                      fontWeight: isTitle(line) ? 'bold' : 'normal'
                    }}
                    variant={isTitle(line) ? 'h6' : 'body1'}
                  >
                    {isTitle(line) ? line.substring(2) : line}
                  </Typography>
                ))}
                </>
                
              ):(
                <Typography sx={{border:'1px solid #000', borderRadius:2, padding:'20px 20px 20px',boxShadow:'1px 2px 4px'}}>Sem Análise</Typography>
              )}
              
            </Box>
          </Fade>
              
        </Modal>
    </>
  )
}

export default ModalAnalises