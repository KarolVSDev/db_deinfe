import { Button, styled } from '@mui/material'
import React from 'react'
import { GridRowId } from '@mui/x-data-grid';

interface buttonInterface {
    type: string;
    id: GridRowId | undefined;
    handleDelete: () => void;
}

const StyledButtonDelete = styled(Button)({
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: '0 30px',
})

const DeleteDataButton: React.FC<buttonInterface> = ({ type, id, handleDelete }) => {

    return (
        <StyledButtonDelete onClick={handleDelete} ></StyledButtonDelete>
    )
}

export default DeleteDataButton