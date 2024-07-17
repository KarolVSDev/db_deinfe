import { Button, styled } from '@mui/material'
import React from 'react'
import useFetchListData from '../../hooks/useFetchListData';
import { GridRowId } from '@mui/x-data-grid';

interface buttonInterface {
    name: string;
    id: GridRowId | undefined;
    handleClick: () => void;
}

const StyledButton = styled(Button)({
    background: 'linear-gradient(45deg, #334155 30%, #64748b 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 40,
    padding: '0 30px',
})

const GetDataButton: React.FC<buttonInterface> = ({ name, id, handleClick }) => {

    return (
        <StyledButton  onClick={handleClick} >{name}</StyledButton>
    )
}

export default GetDataButton