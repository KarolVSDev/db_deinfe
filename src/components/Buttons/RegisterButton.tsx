import { Button } from '@mui/material'
import React from 'react'

const RegisterButton = () => {
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
            Registrar
        </Button>
    </>
  )
}

export default RegisterButton