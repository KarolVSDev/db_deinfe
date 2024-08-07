import { Button } from '@mui/material'
import React from 'react'


interface ExportProps {
    handleExport:() => void;
}
const ButtonExport:React.FC<ExportProps> = ({handleExport}) => {
  return (
    <Button onClick={handleExport} variant="contained" sx={{ bgcolor: '#ff3d00', '&:hover': { bgcolor: '#b22a00' }, mt: 2, width:'100%' }}>Exportar</Button>
  )
}

export default ButtonExport