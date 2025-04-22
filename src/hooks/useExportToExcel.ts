import * as  XLSX from 'xlsx';
import useFetchTema from '../components/Forms/FormsTable/Create/FormTemaPasta/useFetchTema';
import { TopicoAchado } from '../types/types';




const useExportToExcel = () => {
    const { getAllTemas } = useFetchTema();
    const exportToExcel = async (dataType: string, fileName: 'data.xlsx') => {

        if (dataType === 'tema') {
            try {
                const temas = await getAllTemas();

                if (!temas || temas.length === 0) {
                    console.log("Nenhum tema encontrado.");
                    return;
                };

                const exportData = temas.map((tema:TopicoAchado) => ({
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
        }
    }



    return {
        exportToExcel,
    }
}

export default useExportToExcel;