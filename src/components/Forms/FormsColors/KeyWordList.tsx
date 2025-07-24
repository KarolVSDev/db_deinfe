import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useContextTable } from '../../../context/TableContext';
import { useEffect, useMemo, useState } from 'react';
import useFetchKeyWord from './useFetchKeyWord';
import DeleteVerification from '../../Dialog/VerificationStep';
import ColorCircleCopy from './ColorCircleCopy';
import { Box, IconButton, InputAdornment, keyframes, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import Helper from '../../Dialog/Helper';

const grow = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
`;

export default function KeyWordList() {
    const { arrayKeyWord, setArrayKeyWord } = useContextTable();
    const { escutarKeyWords } = useFetchKeyWord();
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [selectedKey, setSelectedKey] = useState('')
    const [dataType] = useState('keyword')
    const [searchTerm, setSearchTerm] = useState('')

    const arrayKeyWordFiltrado = useMemo(() => {
        if (!searchTerm.trim()) return arrayKeyWord;

        const termo = searchTerm.toLowerCase().trim();

        return arrayKeyWord.filter(keyword => {
            // Busca no campo 'label' (texto)
            const textoLabel = keyword.label.toLowerCase().includes(termo);

            // Busca no campo 'type'
            const textoType = keyword.type.toLowerCase().includes(termo);

            // Retorna true se qualquer um dos campos corresponder
            return textoLabel || textoType;
        });
    }, [arrayKeyWord, searchTerm]);




    useEffect(() => {
        const unsubscribe = escutarKeyWords((keywords) => {
            setArrayKeyWord(keywords);
        });
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const handleDelete = async (id: string) => {
        setSelectedKey(id);
        setOpenModalDelete(true);
    }

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
        setSelectedKey('');
    };

    return (
        <>{arrayKeyWord && arrayKeyWord.length > 0 ? (

            <List sx={{ width: '100%', bgcolor: 'background.paper', p: 3 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Buscar por, palavra-chave ou tipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ p: 1, borderRadius: '5px' }}
                />
                {arrayKeyWordFiltrado.map((value, index) => (
                    <ListItem
                        key={index}
                        disableGutters
                    >
                        <ListItemText
                            primary={
                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                    <ColorCircleCopy color={value.color} />
                                    {value.label}
                                </span>
                            }
                            secondary={`tipo: ${value.type}`} />
                        <Helper title="Clique aqui para deletar o registro">
                            <IconButton color="error" onClick={() => handleDelete(value.id)}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        animation: `${grow} 0.2s ease-in-out forwards`
                                    }
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Helper>
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
        ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>

                <Typography>Sem palavra-chave</Typography>
            </Box>
        )}
        </>

    );
}
