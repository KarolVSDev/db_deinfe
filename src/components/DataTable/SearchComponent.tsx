import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useMemo } from 'react';
import { formateDateToPtBr } from '../../hooks/DateFormate';
import { useContextTable } from '../../context/TableContext';


export interface SearchComponentProps {
    searchTerm: string;
    setSearchTerm: (e: string) => void;
    setRows: React.Dispatch<React.SetStateAction<any[]>>;
    createRows: (data: any[]) => any[];
}

const SearchComponent: React.FC<SearchComponentProps> = ({ setRows, createRows, searchTerm, setSearchTerm }) => {

    const { arrayAchado } = useContextTable();

    const achadosFiltrados = useMemo(() => {
        if (!searchTerm.trim()) return arrayAchado;

        const termo = searchTerm.toLowerCase().trim();

        return arrayAchado.filter(achado => {
            // Busca no campo 'achado' (texto)
            const textoAchado = achado.achado.toLowerCase().includes(termo);

            // Busca no campo 'tema' (se existir)
            const textoTema = achado.tema_id?.toLowerCase().includes(termo) || false;

            //Busca na data (formata como dd/MM/yyyy e compara)
            const dataFormatada = formateDateToPtBr(achado.data.toString());
            const textoData = dataFormatada.toLowerCase().includes(termo);

            // Busca na situação (verifica se o texto é "aprovado" ou "pendente")
            const termoBool =
                termo === "aprovado" ? true :
                    termo === "pendente" ? false :
                        null;

            const textoSituacao =
                termoBool !== null ? achado.situacaoAchado === termoBool : // Compara boolean
                    ["aprovado", "pendente"].includes(termo) ? false : // Evita falsos positivos
                        false;

            // Retorna true se qualquer um dos campos corresponder
            return textoAchado || textoTema || textoSituacao || textoData;
        });
    }, [arrayAchado, searchTerm]);

    useEffect(() => {
        setRows(createRows(achadosFiltrados));
    }, [achadosFiltrados, setRows, createRows]);

    return (
        <>
            <TextField
                fullWidth
                sx={{ borderRadius: 2 }}
                variant="outlined"
                placeholder="Buscar achado..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}

            />
        </>
    )
}

export default SearchComponent