import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useContextTable } from '../../../context/TableContext';
import { useEffect, useMemo, useState } from 'react';
import useFetchKeyWord from './useFetchKeyWord';
import Helper from '../../Dialog/Helper';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteVerification from '../../Dialog/VerificationStep';
import ColorCircleCopy from './ColorCircleCopy';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function KeyWordList() {
    const { arrayKeyWord, setArrayKeyWord } = useContextTable();
    const { escutarKeyWords } = useFetchKeyWord();
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [selectedKey, setSelectedKey] = useState('')
    const [dataType] = useState('keyword')
    const[searchTerm, setSearchTerm] = useState('')

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
        setSelectedKey(id)
        setOpenModalDelete(true)
    }

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
    };

    return (
        <>{arrayKeyWord && arrayKeyWord.length > 0? (

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
                            primary={
                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                    <ColorCircleCopy color={value.color} />
                                    {value.label}
                                </span>
                            }
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
        ):(
            <Box sx={{display:'flex', justifyContent:'center', my:2}}>

                <Typography>Sem palavra-chave</Typography>
            </Box>
        )}
        </>

    );
}
