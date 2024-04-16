import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../service/api";

interface TableContextType{
    teste:() => any
}

interface Props{
    children:React.ReactNode
}

const TableContext = createContext<TableContextType | undefined>(undefined)

export const TableProvider: React.FC <Props>= ({children})  => {

    const teste = () => {
        console.log('teste de contexto ')
    }

    
    return (
        <TableContext.Provider value={{teste}}>
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