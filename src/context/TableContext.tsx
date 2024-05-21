import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../service/api";
import { TypeInfo } from "../hooks/TypeAlert";
import { Jurisd, PessoaFisica, Relator, Procurador, Processo, Apenso, NatAchado, DivAchado, AreaAchado } from "../types/types";

interface TableContextType {
    arrayPessoaFisica: PessoaFisica[];
    arrayJurisd: Jurisd[];
    arrayRelator: Relator[];
    arrayProcurador: Procurador[];
    arrayProcesso: Processo[];
    arrayApenso: Apenso[];
    arrayNatAchado: NatAchado[];
    arrayAreaAchado:AreaAchado[];
    arrayDivAchado:DivAchado[];
    arrayRelations:PessoaFisica[];
    getAllPessoaFisica: () => void;
}

interface Props {
    children: React.ReactNode;
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

    const getAllPessoaFisica = async () => {
        try {
            const response = await api.get('/pessoafisica');
            setArrayPessoaFisica(response.data);
        } catch (error: any) {
            TypeInfo(error.response.data.message, 'error');
            return [];
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

    const getAllProccesso = async () => {
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
        } catch (error:any) {
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



    useEffect(() => {
        getAllPessoaFisica()
        getAllJurisd()
        getAllRelator()
        getAllProcurador()
        getAllProccesso()
        getAllNatAchado()
        getAllAreaAchado()
        getAllDivAchado()
        getRelationPF()
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
            getAllPessoaFisica
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
