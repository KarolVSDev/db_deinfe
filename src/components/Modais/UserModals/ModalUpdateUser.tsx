import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import UpdateUserForm from '../../Forms/FormsUser/UpdateUserForm';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  height: '95vh',
  scrollbarWidth: 'thin',
};

interface UpdateUser {
  userId: string;
}
const ModalUpdateUser: React.FC<UpdateUser> = ({ userId }) => {
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
      <Button onClick={handleOpen} variant='outlined' color='secondary' sx={{ mb: 1 }}>
        Atualizar
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
              ml: 38, mr: 0, '&:hover': {
                bgcolor: '#1e293b', color: '#ffffff',
              }
            }}>
              <CloseIcon />
            </IconButton>
            <UpdateUserForm closeModal={handleSubmit} userId={userId} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalUpdateUser;