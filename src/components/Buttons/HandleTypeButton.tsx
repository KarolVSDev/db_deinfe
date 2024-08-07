import { Box, Button } from '@mui/material'
import React from 'react'

interface HandleModalButtonProps {
    handleModal:() => void;
}

const HandleModalButton:React.FC<HandleModalButtonProps> = ({handleModal}) => {
    return (
        <Box sx={{ mt: 4 }}>
            <Button onClick={handleModal}  sx={{ width: '100%' }} variant={'contained'}>Tabela de relações</Button>
        </Box>
    )
}

export default HandleModalButton