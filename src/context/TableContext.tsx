import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../service/api";
import { TypeInfo } from "../hooks/TypeAlert";
import { Jurisd, PessoaFisica, Relator, Procurador, Processo, Apenso, NatAchado, DivAchado, AreaAchado, Interessado } from "../types/types";
import { GridRowId } from "@mui/x-data-grid";

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
    handleLocalization: {}
    getAllPessoaFisica: () => void;
    getAllJurisd: () => void;
    getAllProcesso: () => void;
    getAllProcurador: () => void;
    getAllRelator:() => void;
}

interface Props {
    children: React.ReactNode;
    getAllJurisd: () => Jurisd;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider: React.FC<Props> = ({ children }) => {

    const [arrayPessoaFisica, setArrayPessoaFisica] = useState([]);
    const [arrayJurisd, setArrayJurisd] = useState([]);
    const [arrayRelator, setArrayRelator] = useState([]);
    const [arrayProcurador, setArrayProcurador] = useState([]);
    const [arrayProcesso, setArrayProcesso] = useState([]);
    const [arrayApenso, setArrayApenso] = useState([]);
    const [arrayNatAchado, setArrayNatAchado] = useState([]);
    const [arrayAreaAchado, setArrayAreaAchado] = useState([]);
    const [arrayDivAchado, setArrayDivAchado] = useState([]);
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

    const getAllApenso = async () => {
        try {
            const response = await api.get('/apenso');
            setArrayApenso(response.data);
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
        } catch (error) {

        }
    };

    const getRelationPF = async () => {
        try {
            const response = await api.get('/pessoafisica/relations');
            setArrayRelations(response.data);
        } catch (error: any) {
            TypeInfo(error.response.data.message, 'error');
            return [];
        }
    };

    const getRelationI = async () => {
        try {
            const response = await api.get('/interessado/relationpp');
            setArrayRelationpp(response.data)
        } catch (error: any) {
            TypeInfo(error.response.data.message, 'error')
        }
    }

    const getIntByPessoa = async (id: any) => {
        try {
            const response = await api.get(`/interessado/pessoa/${id}`)
            setArrayInteressados(response.data)
        } catch (error: any) {
            TypeInfo(error.response.data.message, 'error')
        }
    }



    useEffect(() => {
        getAllPessoaFisica()
        getAllJurisd()
        getAllRelator()
        getAllProcurador()
        getAllProcesso()
        getAllNatAchado()
        getAllAreaAchado()
        getAllDivAchado()
        getRelationPF()
        getRelationI()
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
            getAllPessoaFisica,
            getAllJurisd,
            getAllProcesso,
            getAllProcurador,
            getAllRelator
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
