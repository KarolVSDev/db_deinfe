import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import {
    Jurisd, PessoaFisica, Relator, Procurador, Processo, Apenso, NatAchado, DivAchado, AreaAchado,
    Interessado, Achado, NatAchadoUp, AreaAchadoUp, DivAchadoUp,
    AchadoUp,
    ProcessoDetails,
    ProcessoUpdate, jurisdRelation
} from "../types/types";


interface TableContextType {
    arrayProcesso: Processo[];
    arrayNatAchado: NatAchado[];
    arrayAreaAchado: AreaAchado[];
    arrayDivAchado: DivAchado[];
    arrayAchado: Achado[];
    natAchadoUp: NatAchadoUp | undefined;
    areaAchadoUp: AreaAchadoUp | undefined;
    divAchadoUp: DivAchadoUp | undefined;
    achadoUp: AchadoUp | undefined;
    processoDetails:ProcessoDetails | undefined;
    processoPrincipal:ProcessoUpdate | { message: string} | undefined;
    handleLocalization: {};
    setArrayProcesso: Dispatch<SetStateAction<Processo[]>>;
    setArrayNatAchado: Dispatch<SetStateAction<NatAchado[]>>;
    setNatAchadoUp: Dispatch<SetStateAction<NatAchadoUp | undefined>>;
    setAreaAchadoUp: Dispatch<SetStateAction<AreaAchadoUp | undefined>>;
    setDivAchadoUp: Dispatch<SetStateAction<DivAchadoUp | undefined>>;
    setAchadoUp: Dispatch<SetStateAction<AchadoUp | undefined>>;
    setArrayAreaAchado: Dispatch<SetStateAction<AreaAchado[]>>;
    setArrayDivAchado: Dispatch<SetStateAction<DivAchado[]>>;
    setArrayAchado: Dispatch<SetStateAction<Achado[]>>;
    setProcessoDetails: Dispatch<SetStateAction<ProcessoDetails | undefined>>;
    setProcessoPincipal: Dispatch<SetStateAction<ProcessoUpdate | { message: string} | undefined>>;
    

}

interface Props {
    children: React.ReactNode;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider: React.FC<Props> = ({ children }) => {
    const [arrayProcesso, setArrayProcesso] = useState<Processo[]>([]);
    const [arrayNatAchado, setArrayNatAchado] = useState<NatAchado[]>([]);
    const [arrayAreaAchado, setArrayAreaAchado] = useState<AreaAchado[]>([]);
    const [arrayDivAchado, setArrayDivAchado] = useState<DivAchado[]>([]);
    const [arrayAchado, setArrayAchado] = useState<Achado[]>([]);
    const [natAchadoUp, setNatAchadoUp] = useState<NatAchadoUp>()
    const [areaAchadoUp, setAreaAchadoUp] = useState<AreaAchadoUp>()
    const [divAchadoUp, setDivAchadoUp] = useState<DivAchadoUp>()
    const [achadoUp, setAchadoUp] = useState<AchadoUp>()
    const [processoDetails, setProcessoDetails] = useState<ProcessoDetails>()
    const [processoPrincipal, setProcessoPincipal] = useState<ProcessoUpdate | { message: string }>()
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
            arrayProcesso,
            arrayNatAchado,
            natAchadoUp,
            areaAchadoUp,
            divAchadoUp,
            achadoUp,
            arrayAreaAchado,
            arrayDivAchado,
            arrayAchado,
            processoDetails,
            processoPrincipal,
            handleLocalization,
            setArrayProcesso,
            setArrayNatAchado,
            setArrayAreaAchado,
            setArrayDivAchado,
            setArrayAchado,
            setNatAchadoUp,
            setAreaAchadoUp,
            setDivAchadoUp,
            setAchadoUp,
            setProcessoDetails,
            setProcessoPincipal,
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
