import { GridColDef } from "@mui/x-data-grid";
import { useCallback } from "react";
import * as  XLSX from 'xlsx';
import { AchadoUp, ApensoProcesso, ApensoProcessoPai, AreaAchadoUp, dataRelation, DivAchadoUp, InteressadoPessoa, jurisdRelation, ListData, NatAchadoUp, NatRelation, PessoaJurisd, ProcessoDetails } from "../types/types";
import { formateDateToPtBr } from "./DateFormate";
import useFormData from "./useFormData";


interface GridState {
    columns: GridColDef[];
    rows: any[];
}

const useExportToExcel = () => {

    const {transformNat, transformAreaAchado, transformDivAchado, transformAchado} = useFormData()

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
            jurisdPrincipal: data.jurisdPrincipal
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
                dataExoneracao: formateDateToPtBr(jurisdicionado.dataExoneracao),
                gestor: jurisdicionado.gestor,
            }));

            const pessoaJurisdSheet = XLSX.utils.json_to_sheet(pessoaJurisdsData);
            XLSX.utils.book_append_sheet(wb, pessoaJurisdSheet, 'Jurisdicionados');
        }

        //criar planilha de subordinados
        if (data.jurisdJurisds && data.jurisdJurisds.length > 0) {
            const jurisdJurisds = data.jurisdJurisds.map(subordinado => ({
                nome: subordinado.subordinado.nome,
                sigla: subordinado.subordinado.sigla,
                cnpj: subordinado.subordinado.cnpj,
                ug: subordinado.subordinado.ug,
                cep: subordinado.subordinado.cep,
                logradouro: subordinado.subordinado.logradouro,
                complemento: subordinado.subordinado.complemento,
                numero: subordinado.subordinado.numero,
                cidade: subordinado.subordinado.cidade,
                uf: subordinado.subordinado.uf,
                telefone1: subordinado.subordinado.telefone1,
                telefone2: subordinado.subordinado.telefone2,
                email: subordinado.subordinado.email,
                site: subordinado.subordinado.site,
                cargoGestor: subordinado.subordinado.cargoGestor,
                normaCriacao: subordinado.subordinado.normaCriacao,
                dataCriacao: formateDateToPtBr(subordinado.subordinado.dataCriacao),
                normaExtincao: subordinado.subordinado.normaExtincao,
                dataExtincao: formateDateToPtBr(subordinado.subordinado.dataExtincao),
                poder: subordinado.subordinado.poder,
                ativo: subordinado.subordinado.ativo,
            }));

            const subordinadoSheets = XLSX.utils.json_to_sheet(jurisdJurisds);
            XLSX.utils.book_append_sheet(wb, subordinadoSheets, 'Subordinados')
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

    const exportNatRelations = useCallback((data: NatAchadoUp, fileName: string) => {
        const exportData = transformNat(data, false)
        const natRelationSheet = XLSX.utils.json_to_sheet(exportData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, natRelationSheet, 'Tabela de Relações por Natureza')
        XLSX.writeFile(wb, fileName)
    }, [])

    const exportAreaRelations = useCallback((data: AreaAchadoUp, fileName: string) => {
        const exportData = transformAreaAchado(data, false)
        const natRelationSheet = XLSX.utils.json_to_sheet(exportData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, natRelationSheet, 'Tabela de Relações por Área')
        XLSX.writeFile(wb, fileName)
    }, [])

    const exportDivRelations = useCallback((data: DivAchadoUp, fileName: string) => {
        const exportData = transformDivAchado(data, false)
        const natRelationSheet = XLSX.utils.json_to_sheet(exportData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, natRelationSheet, 'Tabela de Relações por Divisão')
        XLSX.writeFile(wb, fileName)
    }, [])

    const exportAchadoRelations = useCallback((data: AchadoUp, fileName: string) => {
        const exportData = transformAchado(data, false)
        const natRelationSheet = XLSX.utils.json_to_sheet(exportData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, natRelationSheet, 'Tabela de Relações por Achado')
        XLSX.writeFile(wb, fileName)
    }, [])

    return {
        exportToExcel,
        exportProcessoToExcel,
        exportPessoaToExcel,
        exportListData,
        exportJurisdToExcel,
        exportNatRelations,
        exportAreaRelations,
        exportDivRelations,
        exportAchadoRelations
    }
}

export default useExportToExcel;