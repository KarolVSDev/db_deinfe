import { GridColDef } from "@mui/x-data-grid";
import { useCallback } from "react";
import * as  XLSX from 'xlsx';
import { ApensoProcesso, ApensoProcessoPai, dataRelation, InteressadoPessoa, jurisdRelation, ListData, PessoaJurisd, ProcessoDetails } from "../types/types";
import { formateDateToPtBr } from "./DateFormate";


interface GridState {
    columns: GridColDef[];
    rows: any[];
}

const useExportToExcel = () => {
    const exportToExcel = (gridState: GridState, fileName: 'data.xlsx') => {
        const { columns, rows } = gridState;
        const exportRows = rows.map((row) => {
            const { id, ...exportRow } = row;
            return exportRow;
        })

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exportRows);
        XLSX.utils.book_append_sheet(wb, ws, 'Data');
        XLSX.writeFile(wb, fileName)
    }

    const exportProcessoToExcel = useCallback((data: ProcessoDetails, fileName: string) => {
        const exportData = {
            numero: data.numero,
            ano: data.ano,
            natureza: data.natureza,
            exercicio: data.exercicio,
            objeto: data.objeto,
            arquivamento: data.arquivamento,
            advogado: data.advogado.nome,
            jurisd: data.jurisd.nome,
            relator: data.relator.nome,
            procurador: data.procurador.nome,
            processoPrincipal: data.processoPrincipal?.toString()
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

    const exportJurisdToExcel = useCallback((data: jurisdRelation, fileName: string) => {
        const exportData = {
            nome: data.nome,
            sigla: data.sigla,
            cnpj: data.cnpj,
            ug: data.ug,
            cep: data.cep,
            logradouro: data.logradouro,
            complemento: data.complemento,
            numero: data.numero,
            cidade: data.cidade,
            uf: data.uf,
            telefone1: data.telefone1,
            telefone2: data.telefone2,
            email: data.email,
            site: data.site,
            cargoGestor: data.cargoGestor,
            normaCriacao: data.normaCriacao,
            dataCriacao: formateDateToPtBr(data.dataCriacao),
            normaExtincao: data.normaExtincao,
            dataExtincao: formateDateToPtBr(data.dataExtincao),
            poder: data.poder,
            ativo: data.ativo,
            jurisdPrincipal:data.jurisdPrincipal
        };

        // Criar planilha principal
        const mainSheet = XLSX.utils.json_to_sheet([exportData]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, mainSheet, 'Unidade Gestora');

        // Criar planilha para processos
        if (data.processos && data.processos.length > 0) {
            const processosData = data.processos.map((processo: ApensoProcesso) => ({
                numero: processo.numero,
                ano: processo.ano,
                natureza: processo.natureza,
                exercicio: processo.exercicio,
                objeto: processo.objeto,
                arquivamento: formateDateToPtBr(processo.arquivamento),
            }));

            const apensadosSheet = XLSX.utils.json_to_sheet(processosData);
            XLSX.utils.book_append_sheet(wb, apensadosSheet, 'Processos');
        }

        // Criar planilha para jurisdicionados
        if (data.pessoaJurisds && data.pessoaJurisds.length > 0) {
            const pessoaJurisdsData = data.pessoaJurisds.map((jurisdicionado: PessoaJurisd) => ({
                cargo: jurisdicionado.cargo,
                mandato: jurisdicionado.mandato,
                normaNomeacao: jurisdicionado.normaNomeacao,
                dataNomeacao: formateDateToPtBr(jurisdicionado.dataNomeacao),
                normaExoneracao: jurisdicionado.normaExoneracao,
                dataExoneracao:formateDateToPtBr(jurisdicionado.dataExoneracao),
                gestor: jurisdicionado.gestor,
            }));

            const interessadosSheet = XLSX.utils.json_to_sheet(pessoaJurisdsData);
            XLSX.utils.book_append_sheet(wb, interessadosSheet, 'Jurisdicionados');
        }

        // Escrever o arquivo
        XLSX.writeFile(wb, fileName);
    }, []);

    const exportPessoaToExcel = useCallback((data: dataRelation | undefined, fileName: string) => {
        if (data) {
            const exportData = {
                nome: data.nome,
                cpf: data.cpf,
                rg: data.rg,
                profissao: data.profissao,
                genero: data.genero,
                cep: data.cep,
                logradouro: data.logradouro,
                complemento: data.complemento,
                numero: data.numero,
                cidade: data.cidade,
                uf: data.uf,
                telefone1: data.telefone1,
                telefone2: data.telefone1,
                ramal: data.ramal,
                email: data.email,
                ativo: data.ativo
            }

            const mainSheet = XLSX.utils.json_to_sheet([exportData])
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, mainSheet, 'Pessoa Física')


            if (data.processos && data.processos.length > 0) {
                const processosData = data.processos.map(processo => ({
                    numero: processo.numero,
                    ano: processo.ano,
                    natureza: processo.natureza,
                    exercicio: processo.exercicio,
                    objeto: processo.objeto,
                    arquivamento: formateDateToPtBr(processo.arquivamento)
                }))

                const processosSheet = XLSX.utils.json_to_sheet(processosData)
                XLSX.utils.book_append_sheet(wb, processosSheet, 'Processos')
            }

            if (data.pessoaJurisds && data.pessoaJurisds.length > 0) {
                const pessoaJurisdsData = data.pessoaJurisds.map(pessoaJurisd => ({
                    cargo: pessoaJurisd.cargo,
                    ano: pessoaJurisd.mandato,
                    normaNomeacao: pessoaJurisd.normaNomeacao,
                    dataNomeacao: formateDateToPtBr(pessoaJurisd.dataNomeacao),
                    normaExoneracao: pessoaJurisd.normaExoneracao,
                    dataExoneracao: formateDateToPtBr(pessoaJurisd.dataExoneracao),
                    gestor: pessoaJurisd.gestor
                }))

                const pessoaJurisdsSheet = XLSX.utils.json_to_sheet(pessoaJurisdsData)
                XLSX.utils.book_append_sheet(wb, pessoaJurisdsSheet, 'Pessoa Jurisdicionada')
            }

            XLSX.writeFile(wb, fileName)
        }

    }, [])

    const exportListData = useCallback((data: ListData[] | undefined, fileName: string) => {
        if (data) {
            const exportData = data.map(processo => ({
                numero: processo.value1,
                ano: processo.value2,
                natureza: processo.value3,
                exercicio: processo.value4,
                objeto: processo.value5,
                arquivamento: formateDateToPtBr(processo.value6)
            }));
            const processoSheet = XLSX.utils.json_to_sheet(exportData)
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, processoSheet, 'Processos')
            XLSX.writeFile(wb, fileName)
        }
    }, [])

    return { exportToExcel, exportProcessoToExcel, exportPessoaToExcel, exportListData, exportJurisdToExcel }
}

export default useExportToExcel;