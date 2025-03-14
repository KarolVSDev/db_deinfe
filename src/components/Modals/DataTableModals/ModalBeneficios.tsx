import { Backdrop, Box, Button, Fade, IconButton, List, ListItem, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react'
import dataFake from '../../../service/dataFake';
import { Achado, Beneficio } from '../../../types/types';
import ArticleIcon from '@mui/icons-material/Article';
import Divider from '@mui/material/Divider';
import useFetchListData from '../../../hooks/useFetchListData';
import Loader from '../../Loader/Loader';
import BeneficioSkeleton from '../../Skeletons/BeneficioSkeleton';


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

export interface ModalBeneficiosProps {
  Id: string
  headerId: string
}

const ModalBeneficios: React.FC<ModalBeneficiosProps> = ({ Id, headerId }) => {
  const { getAchadoByBeneficio } = dataFake()
  const { processAchadoBeneficio } = useFetchListData()
  const [beneficios, setBeneficios] = useState<Beneficio[]>([])
  const [achados, setAchados] = useState<Achado[]>([])
  const [open, setOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false)
  const handleClose = () => setOpen(false);
  const handleOpen = async () => {
    if (headerId === "beneficios") {
      setIsloading(true)
      await processAchadoBeneficio(Id).then((beneficios) => {
        if (beneficios) {
          setBeneficios(beneficios as Beneficio[])
        }
      })
    } else {
      setAchados(getAchadoByBeneficio(Id))
    }
    setIsloading(false)
    setOpen(true)
  };

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" sx={{ borderColor: '#1e293b', color: '#1e293b', '&:hover': { color: '#fff', borderColor: '#475569', bgcolor: '#1e293b' } }}>Exibir</Button>
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
          {isLoading ? (
            <BeneficioSkeleton isLoading={isLoading} />
          ) : (
            <Box sx={style}>
              {headerId === "beneficios" && (
                beneficios.length > 0 ? (
                  <List sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                      <Typography variant='h6'>Lista de Benefícios:</Typography>
                      <IconButton onClick={handleClose} sx={{
                        '&:hover': {
                          bgcolor: '#1e293b', color: '#ffffff',
                        }
                      }}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    {
                      beneficios.map(beneficio => (
                        <>
                          <ListItem sx={{ width: '70vw', maxWidthwidth: '70vw' }}><ArticleIcon sx={{ mr: 2 }} /> {beneficio.beneficio}</ListItem>
                          <Divider />
                        </>
                      ))
                    }
                  </List>
                ) : (
                  <Typography sx={{ border: '1px solid #000', borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }}>Não há Benefício relacionado à este Achado</Typography>
                )
              )}

              {headerId === "achados" && (
                achados.length > 0 ? (
                  <List sx={{ borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                      <Typography variant='h6'>Lista de Achados:</Typography>
                      <IconButton onClick={handleClose} sx={{
                        '&:hover': {
                          bgcolor: '#1e293b', color: '#ffffff',
                        }
                      }}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    {achados.map(achado => (
                      <>
                        <ListItem sx={{ width: '70vw', maxWidthwidth: '70vw' }}><ArticleIcon sx={{ mr: 2 }} /> {achado.achado}</ListItem>
                        <Divider />
                      </>
                    ))}
                  </List>
                ) : (
                  <Typography sx={{ border: '1px solid #000', borderRadius: 2, padding: '20px 20px 20px', boxShadow: '1px 2px 4px' }}>Não há Achado relacionado à este Benefício</Typography>
                )
              )}


            </Box>
          )}

        </Fade>
      </Modal>
    </>
  )
}

export default ModalBeneficios