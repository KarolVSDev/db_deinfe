import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useContextTable } from '../../../context/TableContext';
import { useEffect, useState } from 'react';
import useFetchKeyWord from './useFetchKeyWord';
import Helper from '../../Dialog/Helper';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteVerification from '../../Dialog/VerificationStep';

export default function KeyWordList() {
    const { arrayKeyWord, setArrayKeyWord } = useContextTable();
    const { escutarKeyWords } = useFetchKeyWord();
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [selectedKey, setSelectedKey] = useState('')
    const [dataType] = useState('keyword')


    useEffect(() => {
        const unsubscribe = escutarKeyWords((keywords) => {
            setArrayKeyWord(keywords);
        });
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const handleDelete = async (id: string) => {
        setSelectedKey(id)
        setOpenModalDelete(true)
    }

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
    };

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper', p: 3 }}>
            {arrayKeyWord.map((value, index) => (
                <ListItem
                    key={index}
                    disableGutters
                    secondaryAction={
                        //eu tenho que componentizar esse helper, ele está em uso no Datatable também
                        <Helper title="Clique aqui para deletar o registro">
                            <IconButton color="error" onClick={() => handleDelete(value.id)}>
                                <DeleteIcon sx={{ fontSize: '30px', mb: 1, animation: 'flipInX 0.5s ease-in-out' }} />
                            </IconButton>
                        </Helper>
                    }
                >
                    <ListItemText
                        primary={value.label}
                        secondary={`tipo: ${value.type}`} />
                </ListItem>
            ))}
            {selectedKey !== null && (
                <DeleteVerification
                    selectedRow={selectedKey}
                    dataType={dataType}
                    onClose={handleCloseModalDelete}
                    open={openModalDelete}
                />
            )}
        </List>

    );
}
