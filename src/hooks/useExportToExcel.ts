import { GridColDef } from "@mui/x-data-grid";
import { useCallback } from "react";
import * as  XLSX from 'xlsx';
import { ApensoProcessoPai, InteressadoPessoa, ProcessoDetails } from "../types/types";
import { formateDateToPtBr } from "./DateFormate";

interface GridState {
    columns:GridColDef[];
    rows:any[];
}

const useExportToExcel = () => {
    const exportToExcel = (gridState:GridState, fileName:'data.xlsx') => {
        const {columns, rows} = gridState;
        const exportRows = rows.map((row) => {
            const {id, ...exportRow} = row;
            return exportRow;
        })

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exportRows);
        XLSX.utils.book_append_sheet(wb, ws, 'Data');
        XLSX.writeFile(wb, fileName)
    }

    const exportProcessoToExcel = useCallback((data: ProcessoDetails, fileName: string = 'export.xlsx') => {
        const exportData = {
          numero: data.numero,
          ano: data.ano,
          natureza: data.natureza,
          exercicio: data.exercicio,
          objeto: data.objeto,
          arquivamento: formateDateToPtBr(data.arquivamento),
          advogado: data.advogado.nome,
          jurisd: data.jurisd.nome,
          relator: data.relator.nome,
          procurador: data.procurador.nome,
          processoPrincipal:data.processoPrincipal?.toString()
        };
    
        // Criar planilha principal
        const mainSheet = XLSX.utils.json_to_sheet([exportData]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, mainSheet, 'Processo');
    
        // Criar planilha para apensos
        if (data.apensados && data.apensados.length > 0) {
            const apensadosData = data.apensados.map((apensado: ApensoProcessoPai) => ({
                numero: apensado.apensado.numero,
                ano: apensado.apensado.ano,
                natureza: apensado.apensado.natureza,
                exercicio: apensado.apensado.exercicio,
                objeto: apensado.apensado.objeto,
                arquivamento: formateDateToPtBr(apensado.apensado.arquivamento),
            }));
        
            const apensadosSheet = XLSX.utils.json_to_sheet(apensadosData);
            XLSX.utils.book_append_sheet(wb, apensadosSheet, 'Apensos');
        }
    
        // Criar planilha para interessados
        if (data.interessados && data.interessados.length > 0) {
            const interessadosData = data.interessados.map((interessado: InteressadoPessoa) => ({
                interesse: interessado.interesse,
                nome: interessado.pessoa.nome,
                cpf: interessado.pessoa.cpf,
                rg: interessado.pessoa.rg,
                profissao: interessado.pessoa.profissao,
                genero: interessado.pessoa.genero,
                cep: interessado.pessoa.cep,
                logradouro: interessado.pessoa.logradouro,
                complemento: interessado.pessoa.complemento,
                numero: interessado.pessoa.numero,
                cidade: interessado.pessoa.cidade,
                uf: interessado.pessoa.uf,
                telefone1: interessado.pessoa.telefone1,
                telefone2: interessado.pessoa.telefone2,
                ramal: interessado.pessoa.ramal,
                email: interessado.pessoa.email,
                ativo: interessado.pessoa.ativo,
            }));
        
          const interessadosSheet = XLSX.utils.json_to_sheet(interessadosData);
          XLSX.utils.book_append_sheet(wb, interessadosSheet, 'Interessados');
        }
    
        // Escrever o arquivo
        XLSX.writeFile(wb, fileName);
      }, []);

    return {exportToExcel, exportProcessoToExcel}
}

export default useExportToExcel;