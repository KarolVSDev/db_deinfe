import { Button, styled, } from '@mui/material';
import React from 'react'
import { User } from '../../types/types';
import ModalAddData from '../Modals/DataTableModals/ModalAddDataTable';

export interface ButtonNovoProps {
    dataType: string;
    closeModal: () => void;
    user: User | undefined;
}

const StyledButtonNovo = styled(Button)({
    border: 0,
    borderRadius: 3,
    color: 'white',
    backgroundColor: "#1976d2", '&:hover': {
        backgroundColor: "#1663b0"
    },
    height: 40,
    width: 30,
    padding: '0 30px',
    marginBottom: '10px'
})


const ButtonNovo: React.FC<ButtonNovoProps> = ({ dataType, closeModal, user }) => {

    if (dataType === 'achado') {
        dataType = 'tema'
    }
    if (dataType === 'beneficio') {
        dataType = 'achado'
    }

    return (
        <ModalAddData dataType={dataType} user={user} />
    )
}

export default ButtonNovo