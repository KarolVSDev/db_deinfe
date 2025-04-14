import * as  XLSX from 'xlsx';
import useFetchListData from './useFetchListData';




const useExportToExcel = () => {
    const { getAllTemas } = useFetchListData();
    const exportToExcel = async (dataType: string, fileName: 'data.xlsx') => {

        if (dataType === 'tema') {
            try {
                const temas = await getAllTemas();

                if (!temas || temas.length === 0) {
                    console.log("Nenhum tema encontrado.");
                    return;
                };

                const exportData = temas.map((tema) => ({
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