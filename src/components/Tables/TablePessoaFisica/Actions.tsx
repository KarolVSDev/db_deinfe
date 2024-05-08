import BadgeIcon from '@mui/icons-material/Badge';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button } from '@mui/material';
import { api } from '../../../service/api';
import { TypeInfo } from '../../../hooks/TypeAlert';
import { useState } from 'react';

interface ActionProps {
    userId:string | undefined;
}


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

const Actions = ({userId}:ActionProps) => {
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    //lógica para deletar Pessoa física
    const handleDelete = () => {
        console.log(userId)
        api.delete(`/pessoafisica/${userId}`).then(response => {
            TypeInfo(response.data.message, 'success')
        }).catch((error) => {
            TypeInfo(error.response.data.message, 'warning')
        })
    }
 
  return (
    <Box component='div' sx={{display:'flex', flexDirection:'row'}}>
        <Button onClick={handleOpen} sx={{ '&:hover':{bgcolor:'#BCABAE'}}}>
            <BadgeIcon sx={{color:'#7b1fa2'}}/>
        </Button>
        

        <Button onClick={handleDelete} sx={{ '&:hover':{bgcolor:'#BCABAE'}}}>
            <DeleteIcon sx={{color:'#c62828'}}/>
        </Button>
    </Box>
  )
}

export default Actions