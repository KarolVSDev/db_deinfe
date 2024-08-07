import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import {
    Jurisd, PessoaFisica, Relator, Procurador, Processo, Apenso, NatAchado, DivAchado, AreaAchado,
    Interessado, Achado, NatAchadoUp, AreaAchadoUp, DivAchadoUp,
    AchadoUp
} from "../types/types";


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
    arrayAchado: Achado[];
    arrayRelations: PessoaFisica[];
    arrayRelationpp: Interessado[];
    arrayInteressados: Interessado[];
    natAchadoUp: NatAchadoUp | undefined;
    areaAchadoUp: AreaAchadoUp | undefined;
    divAchadoUp: DivAchadoUp | undefined;
    achadoUp: AchadoUp | undefined;
    handleLocalization: {};
    setArrayPessoaFisica: Dispatch<SetStateAction<PessoaFisica[]>>;
    setArrayJurisd: Dispatch<SetStateAction<Jurisd[]>>;
    setArrayProcesso: Dispatch<SetStateAction<Processo[]>>;
    setArrayProcurador: Dispatch<SetStateAction<Procurador[]>>;
    setArrayRelator: Dispatch<SetStateAction<Relator[]>>;
    setArrayNatAchado: Dispatch<SetStateAction<NatAchado[]>>;
    setNatAchadoUp: Dispatch<SetStateAction<NatAchadoUp | undefined>>;
    setAreaAchadoUp: Dispatch<SetStateAction<AreaAchadoUp | undefined>>;
    setDivAchadoUp: Dispatch<SetStateAction<DivAchadoUp | undefined>>;
    setAchadoUp: Dispatch<SetStateAction<AchadoUp | undefined>>;
    setArrayAreaAchado: Dispatch<SetStateAction<AreaAchado[]>>;
    setArrayDivAchado: Dispatch<SetStateAction<DivAchado[]>>;
    setArrayAchado: Dispatch<SetStateAction<Achado[]>>;

}

interface Props {
    children: React.ReactNode;
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
    const [natAchadoUp, setNatAchadoUp] = useState<NatAchadoUp>()
    const [areaAchadoUp, setAreaAchadoUp] = useState<AreaAchadoUp>()
    const [divAchadoUp, setDivAchadoUp] = useState<DivAchadoUp>()
    const [achadoUp, setAchadoUp] = useState<AchadoUp>()

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



    return (
        <TableContext.Provider value={{
            arrayPessoaFisica,
            arrayJurisd,
            arrayRelator,
            arrayProcurador,
            arrayProcesso,
            arrayApenso,
            arrayNatAchado,
            natAchadoUp,
            areaAchadoUp,
            divAchadoUp,
            achadoUp,
            arrayAreaAchado,
            arrayDivAchado,
            arrayAchado,
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
            setArrayAreaAchado,
            setArrayDivAchado,
            setArrayAchado,
            setNatAchadoUp,
            setAreaAchadoUp,
            setDivAchadoUp,
            setAchadoUp
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
