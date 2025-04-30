import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import useFetchTema from '../components/Forms/FormsTable/Create/FormTemaPasta/useFetchTema';
import useFetchAchado from '../components/Forms/FormsTable/Create/FormAchadoPasta/useFetchAchado';
import useFetchProcesso from '../components/Forms/FormsTable/Create/FormProcessoPasta/useFetchProcesso';
import { useContextTable } from '../context/TableContext';





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
                            return;
                        };

                        headers = ['Tema', 'Situação'];
                        rows = temas.map((tema) => [tema.tema, tema.situacao ? 'Aprovado' : 'Pendente']);

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
                            return;
                        };

                        if (!temas || temas.length === 0) {
                            console.log("Nenhum tema encontrado.");
                            return;
                        }

                        const temaMap = new Map(temas.map((tema) => [tema.id, tema.tema]));

                        headers = ['Achado', 'Data', 'Gravidade', 'Critério Municipal', 'Critério Estadual', 'Critério Geral', 'Situação Achado', 'Análise', 'Temas'];
                        rows = achado.map((achado) => [
                            achado.achado,
                            achado.data,
                            achado.gravidade,
                            achado.criterioMunicipal,
                            achado.criterioEstadual,
                            achado.criterioGeral,
                            achado.situacaoAchado === true ? 'Aprovado' : 'Pendente',
                            achado.analise,
                            temaMap.get(achado.tema_id) || 'Tema não encontrado'
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
                            return;
                        };

                        headers = ['Número', 'Exercício', 'Julgado', 'Unidade Gestora', 'Diretoria'];
                        rows = processos.map((processos) => [
                            processos.numero,
                            processos.exercicio,
                            processos.julgado,
                            processos.unidadeGestora,
                            processos.diretoria
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