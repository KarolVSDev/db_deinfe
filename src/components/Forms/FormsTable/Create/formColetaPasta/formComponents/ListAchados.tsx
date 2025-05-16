import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Achado } from '../../../../../../types/types';
import { useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';

export interface ListAchadosProps {
    arrayDeAchados: Achado[];
    onAchadoSelected?: (achado: Achado) => void;
}

const ListAchados: React.FC<ListAchadosProps> = ({ arrayDeAchados, onAchadoSelected }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const achadosFiltrados = useMemo(() => {
        if (!searchTerm) return arrayDeAchados;

        return arrayDeAchados.filter(achado =>
            achado.achado.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [arrayDeAchados, searchTerm])

    const handleListItemClick = (
        _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        achado: Achado,
    ) => {
        setSelectedIndex(index);
        if (onAchadoSelected && achado) {
            onAchadoSelected(achado);
        }

    };

    return (
        <Box sx={{ width: '100%', minWidth: 460, bgcolor: 'background.paper' }}>
            <List component="nav" aria-label="lista de achados">
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Buscar achado..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 2, p: 1, borderRadius: '5px' }}
                />
                {achadosFiltrados.map((achado, index) => (
                    <ListItemButton
                        selected={selectedIndex === index}
                        onClick={(event) => handleListItemClick(event, index, achado)}
                    >
                        <ListItemText
                            primary={achado.achado}
                        />
                    </ListItemButton>
                ))}
            </List>
            {achadosFiltrados.length === 0 && (
                <ListItemText
                    primary="Esse achado ainda não existe!"
                    sx={{ textAlign: "center", p:1}}
                />
            )}
        </Box>
    );
}

export default ListAchados;
