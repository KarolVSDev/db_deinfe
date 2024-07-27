import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState, useReducer } from "react";
import { api } from "../service/api";
import { TypeInfo } from "../hooks/TypeAlert";
import { Jurisd, PessoaFisica, Relator, Procurador, Processo, Apenso, NatAchado, DivAchado, AreaAchado, Interessado, ProcessoUpdate, Achado } from "../types/types";


interface TableContextType {
    arrayPessoaFisica: PessoaFisica[];
    arrayJurisd: Jurisd[];
    arrayRelator: Relator[];
    arrayProcurador: Procurador[];
    arrayProcesso: Processo[];
    arrayApenso: Apenso[];
    arrayNatAchado: NatAchado[];
    arrayAreaAchado: AreaAchado[];
    arrayDivAchado: DivAchado[];
    arrayRelations: PessoaFisica[];
    arrayRelationpp: Interessado[];
    arrayInteressados: Interessado[];
    handleLocalization: {};
    setArrayPessoaFisica: Dispatch<SetStateAction<PessoaFisica[]>>;
    setArrayJurisd: Dispatch<SetStateAction<Jurisd[]>>;
    setArrayProcesso: Dispatch<SetStateAction<Processo[]>>;
    setArrayProcurador: Dispatch<SetStateAction<Procurador[]>>;
    setArrayRelator: Dispatch<SetStateAction<Relator[]>>;
    setArrayNatAchado: Dispatch<SetStateAction<NatAchado[]>>;
    getAllNatAchado: () => void;
    getAllAreaAchado: () => void;
    getAllDivAchado: () => void;
    getAllAchados: () => void;
}

interface Props {
    children: React.ReactNode;
    getAllJurisd: () => Jurisd;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider: React.FC<Props> = ({ children }) => {

    const [arrayPessoaFisica, setArrayPessoaFisica] = useState<PessoaFisica[]>([]);
    const [arrayJurisd, setArrayJurisd] = useState<Jurisd[]>([]);
    const [arrayRelator, setArrayRelator] = useState<Relator[]>([]);
    const [arrayProcurador, setArrayProcurador] = useState<Procurador[]>([]);
    const [arrayProcesso, setArrayProcesso] = useState<Processo[]>([]);
    const [arrayApenso, setArrayApenso] = useState<Apenso[]>([]);
    const [arrayNatAchado, setArrayNatAchado] = useState<NatAchado[]>([]);
    const [arrayAreaAchado, setArrayAreaAchado] = useState<AreaAchado[]>([]);
    const [arrayDivAchado, setArrayDivAchado] = useState<DivAchado[]>([]);
    const [arrayAchado, setArrayAchado] = useState<Achado[]>([]);
    const [arrayRelations, setArrayRelations] = useState([]);
    const [arrayRelationpp, setArrayRelationpp] = useState([]);
    const [arrayInteressados, setArrayInteressados] = useState([]);

    const handleLocalization = {
        columnHeaderSortIconLabel: 'ordenar',
        columnMenuSortAsc: 'Ordenar por ASC',
        columnMenuSortDesc: 'Ordenar por Desc',
        columnMenuFilter: 'Filtrar',
        columnMenuHideColumn: 'Esconder Coluna',
        columnMenuManageColumns: 'Gerenciar Colunas',
        columnsManagementSearchTitle: 'Pesquisar',
        checkboxSelectionHeaderName: 'Caixa de Seleção',
        columnsManagementShowHideAllText: 'Mostrar/Esconder Todos',
        columnsManagementReset: 'Resetar',
        filterPanelColumns: 'Colunas',
        filterPanelOperator: 'Operador',
        filterPanelInputLabel: 'Valor',
        filterOperatorContains: 'contém',
        filterOperatorEquals: 'igual a',
        filterOperatorStartsWith: 'começa com',
        filterOperatorEndsWith: 'termina com',
        filterOperatorIsEmpty: 'está vazio',
        filterOperatorIsNotEmpty: 'não está vazio',
        filterOperatorIsAnyOf: 'é qualquer um',
        noRowsLabel: 'sem dados',
        columnMenuUnsort: 'Desordenar',
        noResultsOverlayLabel: 'nenhum resultado encontrado',
        footerRowSelected: (count: number) =>
            count !== 1
                ? `${count.toLocaleString()} linhas selecionadas`
                : `${count.toLocaleString()} linha selecionada`,
    };

    const getAllPessoaFisica = async () => {
        try {
            const response = await api.get('/pessoafisica');
            setArrayPessoaFisica(response.data);
        } catch (error: any) {
            TypeInfo(error.response.data.message, 'error');
            return [];
        }
    };

    const getAllJurisd = async () => {
        try {
            const response = await api.get('/jurisd');
            setArrayJurisd(response.data);
        } catch (error: any) {
            TypeInfo(error.response.data.message, 'error');
            return [];
        }
    };

    const getAllRelator = async () => {
        try {
            const response = await api.get('/relator');
            setArrayRelator(response.data);
        } catch (error: any) {
            TypeInfo(error.response.data.message, 'error')
        }
    };

    const getAllProcurador = async () => {
        try {
            const response = await api.get('/procurador');
            setArrayProcurador(response.data);
        } catch (error: any) {
            TypeInfo(error.response.data.message, 'error')
        }
    };

    const getAllProcesso = async () => {
        try {
            const response = await api.get('/processo');
            setArrayProcesso(response.data)
        } catch (error: any) {
            TypeInfo(error.response.data.message, 'error')
        }
    };

    const getAllNatAchado = async () => {
        try {
            const response = await api.get('/nat-achado');
            setArrayNatAchado(response.data)
        } catch (error: any) {
            TypeInfo(error.response.data.message, 'error');
        }
    };

    const getAllAreaAchado = async () => {
        try {
            const response = await api.get('/area-achado');
            setArrayAreaAchado(response.data)
        } catch (error: any) {
            TypeInfo(error.response.data.message, 'error')
        }
    };

    const getAllDivAchado = async () => {
        try {
            const response = await api.get('/div-area-achado');
            setArrayDivAchado(response.data)
        } catch (error:any) {
            TypeInfo(error.response.data.message, 'error')
        }
    };

    const getAllAchados = async () => {
        try {
            const response = await api.get('/achado');
            setArrayAchado(response.data)
        } catch (error:any) {
            TypeInfo(error.response.data.message, 'error')
        }
    }

    const getRelationPF = async () => {
        try {
            const response = await api.get('/pessoafisica/relations');
            setArrayRelations(response.data);
        } catch (error: any) {
            TypeInfo(error.response.data.message, 'error');
            return [];
        }
    };

    useEffect(() => {
        getAllJurisd()
        getAllPessoaFisica()
        getAllRelator()
        getAllProcurador()
        getAllProcesso()
        getAllNatAchado()
        getAllAreaAchado()
        getAllDivAchado()
        getRelationPF()
        getAllNatAchado()
        getAllAreaAchado()
        getAllDivAchado()
        getAllAchados()
    }, [])

    
 
    return (
        <TableContext.Provider value={{
            arrayPessoaFisica,
            arrayJurisd,
            arrayRelator,
            arrayProcurador,
            arrayProcesso,
            arrayApenso,
            arrayNatAchado,
            arrayAreaAchado,
            arrayDivAchado,
            arrayRelations,
            arrayRelationpp,
            arrayInteressados,
            handleLocalization,
            setArrayPessoaFisica,
            setArrayJurisd,
            setArrayProcesso,
            setArrayRelator,
            setArrayProcurador,
            setArrayNatAchado,
            getAllNatAchado,
            getAllAreaAchado,
            getAllDivAchado,
            getAllAchados,
        }}>
            {children}
        </TableContext.Provider>
    )
};


export const useContextTable = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error("useContextTable precisa ser usado dentro de um TableProvider");
    }
    return context;
}
