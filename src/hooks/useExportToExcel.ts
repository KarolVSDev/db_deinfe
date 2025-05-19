import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import useFetchTema from '../components/Forms/FormsTable/Create/FormTemaPasta/useFetchTema';
import useFetchAchado from '../components/Forms/FormsTable/Create/FormAchadoPasta/useFetchAchado';
import useFetchProcesso from '../components/Forms/FormsTable/Create/FormProcessoPasta/useFetchProcesso';
import { useContextTable } from '../context/TableContext';
import { TypeInfo } from './TypeAlert';





const useExportToExcel = () => {
    const { getAllTemas } = useFetchTema();
    const { getAllAchados } = useFetchAchado();
    const { getAllProcessos } = useFetchProcesso();
    const { arrayColeta } = useContextTable();

    const exportToExcel = async (dataType: string, fileName: 'data.xlsx') => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet(dataType);

        let headers: string[] = [];
        let rows: any[] = [];

        try {
            switch (dataType) {

                case 'tema': {
                    try {
                        const temas = await getAllTemas();

                        if (!temas || temas.length === 0) {
                            console.log("Nenhum tema encontrado.");
                            TypeInfo("Não há dados para exportar", "info");
                            return;
                        };

                        headers = ['Tema', 'Situação'];
                        rows = temas.map((tema) => [
                            tema.tema,
                            tema.situacao ? 'Aprovado' : 'Pendente']);

                    } catch (error) {
                        console.error("erro ao tentar exportar os temas: ", error)
                    }

                    break;
                }

                case 'achado': {

                    try {
                        const achado = await getAllAchados();
                        const temas = await getAllTemas();

                        if (!achado || achado.length === 0) {
                            console.log("Nenhum achado encontrado.");
                            TypeInfo("Não há dados para exportar", "info");
                            return;
                        };

                        if (!temas || temas.length === 0) {
                            console.log("Nenhum tema encontrado.");
                            TypeInfo("Não há dados para exportar", "info");
                            return;
                        }

                        const temaMap = new Map(temas.map((tema) => [tema.id, tema.tema]));

                        headers = ['Temas', 'Achado', 'Análise', 'Data', 'Gravidade', 'Critério Geral', 'Critério Municipal', 'Critério Estadual', 'Situação Achado'];
                        rows = achado.map((achado) => [
                            temaMap.get(achado.tema_id) || 'Tema não encontrado',
                            achado.achado,
                            achado.analise,
                            achado.data,
                            achado.gravidade,
                            achado.criterioGeral,
                            achado.criterioMunicipal,
                            achado.criterioEstadual,
                            achado.situacaoAchado === true ? 'Aprovado' : 'Pendente'
                        ]);
                    } catch (error) {
                        console.error("erro ao tentar exportar os achados: ", error)
                    }

                    break;
                }

                case 'processo': {
                    try {
                        const processos = await getAllProcessos();

                        if (!processos || processos.length === 0) {
                            console.log("Nenhum processo encontrado.");
                            TypeInfo("Não há dados para exportar", "info");
                            return;
                        };

                        headers = ['Número', 'Exercício', 'Unidade Gestora', 'Diretoria', 'Julgado'];
                        rows = processos.map((processos) => [
                            processos.numero,
                            processos.exercicio,
                            processos.unidadeGestora,
                            processos.diretoria,
                            processos.julgado
                        ]);
                    } catch (error) {
                        console.error("erro ao tentar exportar os processos: ", error)
                    }
                    break;
                };

                case 'coleta': {
                    try {

                        if (!arrayColeta || arrayColeta.length === 0) {
                            console.log("Nenhuma coleta encontrada.");
                            TypeInfo("Não há dados para exportar", "info");
                            return;
                        };

                        headers = ['Processo ID', 'Tema ID', 'Achado ID', 'Valor Fianceiro', 'Quantitativo', 'Unidade', 'Coletador ID', 'Sanado'];
                        rows = arrayColeta.map((coleta) => [
                            coleta.processoId,
                            coleta.temaId,
                            coleta.achadoId,
                            coleta.valorFinanceiro,
                            coleta.quantitativo,
                            coleta.unidade,
                            coleta.coletadorId,
                            coleta.sanado
                        ])
                    } catch (error) {
                        console.error("erro ao tentar exportar os processos: ", error)
                    }
                    break;
                };

                default:
                    console.warn('Tipo de dado não reconhecido: ', dataType);
                    break;
            }

            sheet.addTable({
                name: `Tabela_${dataType}`,
                ref: 'A1',
                headerRow: true,
                style: {
                    theme: 'TableStyleMedium2',
                    showRowStripes: true,
                },
                columns: headers.map((header) => ({ name: header })),
                rows: rows,
            });

            const buffer = await workbook.xlsx.writeBuffer();
            saveAs(new Blob([buffer]), fileName);
        } catch (error) {
            console.error(`Erro ao exportar dados de ${dataType}:`, error);
        }
    };

    return {
        exportToExcel
    };

}

export default useExportToExcel