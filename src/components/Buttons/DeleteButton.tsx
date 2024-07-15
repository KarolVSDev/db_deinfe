import { Button, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { ProcessoDetails } from '../../types/types';
interface buttonInterface {
    stateType: string;
    handleDelete: (type: string, id: string) => void;
    details: ProcessoDetails;
}

const StyledButtonDelete = styled(Button)({
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: '0 30px',
})

const DeleteDataButton: React.FC<buttonInterface> = ({ handleDelete, details, stateType }) => {

    const [idState, setIdState] = useState<string>()


    useEffect(() => {
        if (details.apensados) {
            details.apensados.forEach(apenso => setIdState(apenso.id));
        } else if (details?.interessados) {
            details.interessados.forEach(interesse => setIdState(interesse.id));
        }
    });


    return (
        <StyledButtonDelete onClick={handleDelete(stateType, idState)}><DeleteIcon sx={{
            color: '#c23232',
            '& .MuiChip-deleteIcon': {
                color: '#c23232',
                '&:hover': {
                    color: '#b12a2c',
                },
            },
        }} /></StyledButtonDelete>
    )
}

export default DeleteDataButton