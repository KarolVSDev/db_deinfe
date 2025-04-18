import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from '../../../../../../context/AuthContext';
import ModalColeta from './ModalColeta';
import { useState } from 'react';



const GroupButtonColeta = () => {
    const itens = ['Tema', 'Achado', 'Processo']
    const { user } = useAuth()
    const [modalOpen, setModalOpen] = useState(false);
    const [dataType, setDataType] = useState('');

    const handleClose = () => {
        setModalOpen(false)
    }

    const handleModalForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.textContent?.replace(/^\w+\s/, '');
        if (value) {
            setDataType(value);
            setModalOpen(true);
        }
    }
    return (
        <>
            <ButtonGroup variant="contained" aria-label="Basic button group">
                {itens.map((item) => (
                    <Button onClick={(e) => handleModalForm(e)}><SaveIcon sx={{ mr: 0.5 }} />{item}</Button>
                ))}
            </ButtonGroup>
            <ModalColeta
                dataType={dataType}
                open={modalOpen}
                onClose={handleClose}
                user={user}
            />
        </>
    );
}

export default GroupButtonColeta;
