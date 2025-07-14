import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useMemo } from 'react';
import { formateDateToPtBr } from '../../hooks/DateFormate';
import { useContextTable } from '../../context/TableContext';
import { Coleta, Processo, TopicoAchado } from '../../types/types';

export interface SearchComponentProps {
    searchTerm: string;
    setSearchTerm: (e: string) => void;
    setRows: React.Dispatch<React.SetStateAction<any[]>>;
    createRows: (data: any[]) => any[];
    dataType: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ dataType, setRows, createRows, searchTerm, setSearchTerm }) => {

    const { arrayAchado, arrayTopicoAchado, arrayProcesso, arrayColeta } = useContextTable();

    const filteredData = useMemo(() => {
        const termo = searchTerm.toLowerCase().trim();
        switch (dataType) {
            case "tema":
                if (!termo) return arrayTopicoAchado;
                return arrayTopicoAchado.filter((tema: TopicoAchado) => {
                    const textoTema = tema.tema?.toLowerCase().includes(termo);
                    let textoSituacao = false;
                    if (termo === "aprovado") textoSituacao = tema.situacao === true;
                    else if (termo === "pendente") textoSituacao = tema.situacao === false;
                    return textoTema || textoSituacao;
                });
            case "achado":
            default:
                if (!termo) return arrayAchado;
                return arrayAchado.filter(achado => {
                    const textoAchado = achado.achado?.toLowerCase().includes(termo);
                    const textoTema = achado.tema_id?.toLowerCase().includes(termo) || false;
                    const dataFormatada = formateDateToPtBr(achado.data?.toString() ?? "");
                    const textoData = dataFormatada.toLowerCase().includes(termo);
                    let textoSituacao = false;
                    if (termo === "aprovado") textoSituacao = achado.situacaoAchado === true;
                    else if (termo === "pendente") textoSituacao = achado.situacaoAchado === false;
                    const textoCriterio = achado.criterioGeral?.toLowerCase().includes(termo);
                    const textGravidade = achado.gravidade?.toLowerCase().includes(termo);
                    return textoAchado || textoTema || textoSituacao || textoData || textoCriterio || textGravidade;
                });
            case "processo":
                if (!termo) return arrayProcesso;
                return arrayProcesso.filter((processo: Processo) => {
                    const textoNumero = processo.numero?.toLowerCase().includes(termo);
                    const textoExercicio = processo.exercicio?.toLowerCase().includes(termo);
                    const textoJulgado = processo.julgado?.toLowerCase().includes(termo);
                    const textoUnidade = processo.unidadeGestora?.toLowerCase().includes(termo);
                    const textoDiretoria = processo.diretoria?.toLowerCase().includes(termo);
                    return textoNumero || textoExercicio || textoJulgado || textoUnidade || textoDiretoria;
                });
            case "relacionamentos":
                if (!termo) return arrayColeta;
                return arrayColeta.filter((coleta: Coleta) => {
                    const textoQuantitativo = coleta.quantitativo?.toString().toLowerCase().includes(termo);
                    const textoUnidade = coleta.unidade?.toLowerCase().includes(termo);
                    const textoSanado = coleta.sanado?.toLowerCase().includes(termo);
                    const textoValorFinanceiro = coleta.valorFinanceiro?.toString().toLowerCase().includes(termo);
                    const textoColetador = coleta.coletadorId?.toLowerCase().includes(termo);
                    const textoTema = coleta.temaId?.toLowerCase().includes(termo);
                    const textoAchado = coleta.achadoId?.toLowerCase().includes(termo);
                    const textoProcesso = coleta.processoId?.toLowerCase().includes(termo);
                    return (
                        textoQuantitativo ||
                        textoUnidade ||
                        textoSanado ||
                        textoValorFinanceiro ||
                        textoColetador ||
                        textoTema ||
                        textoAchado ||
                        textoProcesso
                    );
                });
        }
    }, [arrayAchado, arrayTopicoAchado, arrayProcesso, searchTerm, dataType]);

    useEffect(() => {
        setRows(createRows(filteredData));
    }, [filteredData, setRows, createRows]);

    return (
        <>
            <TextField
                fullWidth
                sx={{ borderRadius: 2 }}
                variant="outlined"
                placeholder="Buscar termo..."
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