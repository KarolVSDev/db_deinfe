import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../service/api";
import { TypeInfo } from "../hooks/TypeAlert";
import { Jurisd, PessoaFisica } from "../types/types";

interface TableContextType {
    arrayPessoaFisica:PessoaFisica[];
    arrayJurisd:Jurisd[];
}

interface Props {
    children: React.ReactNode;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider: React.FC<Props> = ({ children }) => {

    const [arrayPessoaFisica, setArrayPessoaFisica] = useState([])
    const [arrayJurisd, setArrayJurisd] = useState([])

    const getAllPessoaFisica = async () => {
        try {
            const response = await api.get('/pessoafisica');
            setArrayPessoaFisica(response.data);
        } catch (error:any) {
            TypeInfo(error.response.data.message, 'error');
            // Retorna uma array vazia no caso de erro
            return [];
        }
    }
    const getAllJurisd = async () => {
        try {
            const response = await api.get('/jurisd');
            setArrayJurisd(response.data);
        } catch (error:any) {
            TypeInfo(error.response.data.message, 'error');
            return [];
        }
    }

    useEffect(() => {
        getAllPessoaFisica()
        getAllJurisd()
    },[])

    return (
        <TableContext.Provider value={{ arrayPessoaFisica, arrayJurisd }}>
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
