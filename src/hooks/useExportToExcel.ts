import * as  XLSX from 'xlsx';
import useFetchTema from '../components/Forms/FormsTable/Create/FormTemaPasta/useFetchTema';
import useFetchAchado from '../components/Forms/FormsTable/Create/FormAchadoPasta/useFetchAchado';
import useFetchProcesso from '../components/Forms/FormsTable/Create/FormProcessoPasta/useFetchProcesso';
import { TopicoAchado } from '../types/types';




const useExportToExcel = () => {
    const { getAllTemas } = useFetchTema();
    const { getAllAchados } = useFetchAchado();
    const { getAllProcessos } = useFetchProcesso();
    const exportToExcel = async (dataType: string, fileName: 'data.xlsx') => {

        switch (dataType) {

            case 'tema':
                try {
                    const temas = await getAllTemas();

                    if (!temas || temas.length === 0) {
                        console.log("Nenhum tema encontrado.");
                        return;
                    };

                    const exportData = temas.map((tema: TopicoAchado) => ({
                        tema: tema.tema,
                        situacao: tema.situacao === true ? 'Aprovado' : 'Pendente',
                    }));

                    const wb = XLSX.utils.book_new();
                    const ws = XLSX.utils.json_to_sheet(exportData);
                    XLSX.utils.book_append_sheet(wb, ws, 'Temas');
                    XLSX.writeFile(wb, fileName)
                } catch (error) {
                    console.error("erro ao tentar exportar os temas: ", error)
                }

                break;

            case 'achado':

                try {
                    const achado = await getAllAchados();

                    if (!achado || achado.length === 0) {
                        console.log("Nenhum achado encontrado.");
                        return;
                    };

                    const exportData = achado.map((achado) => ({
                        achado: achado.achado,
                        data: achado.data,
                        gravidade: achado.gravidade,
                        criterioMunicipal: achado.criterioMunicipal,
                        criterioEstadual: achado.criterioEstadual,
                        criterioGeral: achado.criterioGeral,
                        situacaoAchado: achado.situacaoAchado === true ? 'Aprovado' : 'Pendente',
                        analise: achado.analise,
                        tema_id: achado.tema_id
                    }));

                    const wb = XLSX.utils.book_new();
                    const ws = XLSX.utils.json_to_sheet(exportData);
                    XLSX.utils.book_append_sheet(wb, ws, 'Achado');
                    XLSX.writeFile(wb, fileName)
                } catch (error) {
                    console.error("erro ao tentar exportar os achados: ", error)
                }

                break;

            case 'processo':
                try {
                    const processos = await getAllProcessos();

                    if (!processos || processos.length === 0) {
                        console.log("Nenhum processo encontrado.");
                        return;
                    };

                    const exportData = processos.map((processos) => ({
                        numero: processos.numero,
                        exercicio: processos.numero,
                        julgado: processos.julgado,
                        unidadeGestora: processos.unidadeGestora,
                        diretoria: processos.diretoria
                    }));

                    const ws = XLSX.utils.json_to_sheet(exportData);
                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, 'processo');
                    XLSX.writeFile(wb, fileName)

                } catch (error) {
                    console.error("erro ao tentar exportar os processos: ", error)
                }



                break;



            default:
                break;
        }
    }

    return {
        exportToExcel,
    }
}

export default useExportToExcel;