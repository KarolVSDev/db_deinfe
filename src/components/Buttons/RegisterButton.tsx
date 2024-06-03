import { Button } from '@mui/material'
import React from 'react'

interface ButtonProps {
  text:string;
}

const RegisterButton:React.FC<ButtonProps> = ({text}) => {
  return (
    <>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
            bgcolor: '#64748b', '&:hover': {
                bgcolor: '#475569',
            }, width: '200px', m: 'auto', mt: 3,
            }}
        >
            {text}
        </Button>
    </>
  )
}

export default RegisterButton