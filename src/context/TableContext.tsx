import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { TopicoAchado, Achado, Beneficio, AchadoBeneficio, Processo,} from "../types/types";


interface TableContextType {
    arrayTopicoAchado: TopicoAchado[];
    arrayAchado: Achado[];
    arrayBeneficio: Beneficio[];
    arrayAchadoBeneficio: AchadoBeneficio[];
    arrayProcesso: Processo[];
    handleLocalization: {};
    setArrayTopicoAchado: Dispatch<SetStateAction<TopicoAchado[]>>;
    setArrayAchado: Dispatch<SetStateAction<Achado[]>>;
    setArrayBeneficio: Dispatch<SetStateAction<Beneficio[]>>;
    setArrayAchadoBeneficio: Dispatch<SetStateAction<AchadoBeneficio[]>>;
    setArrayProcesso: Dispatch<SetStateAction<Processo[]>>;
}

interface Props {
    children: React.ReactNode;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider: React.FC<Props> = ({ children }) => {
    const [arrayTopicoAchado, setArrayTopicoAchado] = useState<TopicoAchado[]>([]);
    const [arrayBeneficio, setArrayBeneficio] = useState<Beneficio[]>([]);
    const [arrayAchado, setArrayAchado] = useState<Achado[]>([]);
    const [arrayAchadoBeneficio, setArrayAchadoBeneficio] = useState<AchadoBeneficio[]>([]);
    const [arrayProcesso, setArrayProcesso] = useState<Processo[]>([]);

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
            arrayTopicoAchado,
            arrayAchado,
            arrayBeneficio,
            arrayAchadoBeneficio,
            arrayProcesso,
            handleLocalization,
            setArrayTopicoAchado,
            setArrayAchado,
            setArrayBeneficio,
            setArrayAchadoBeneficio,
            setArrayProcesso,
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
