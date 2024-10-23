import { Button, styled } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
interface buttonInterface {
    stateType: string;
    itemId:string;
}

const StyledButtonDelete = styled(Button)({
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: '0 30px',
})

const ShowBeneficios: React.FC<buttonInterface> = ({ itemId, stateType }) => {

    console.log(itemId, stateType)
    return (
        <StyledButtonDelete>Delete<DeleteIcon sx={{
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

export default ShowBeneficios