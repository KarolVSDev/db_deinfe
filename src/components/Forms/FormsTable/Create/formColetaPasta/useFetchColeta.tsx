import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../service/firebase.config";
import { Coleta } from "../../../../../types/types";
//import useFetchAchado from "../FormAchadoPasta/useFetchAchado";


const useFetchColeta = () => {

    //const { getAllAchados } = useFetchAchado();
    const addColeta = async (data: Coleta) => {
        try {
            const coletaRef = collection(db, 'coleta');
            await addDoc(coletaRef, data);
            console.log('Coleta cadastrada com sucesso');
            return true
        } catch (error) {
            console.error('Erro ao cadastrar coleta', error);
            return false
        }
    }

    const escutarColeta = async (callback: (achados: Coleta[]) => void) => {
        try {
            //const achados = await getAllAchados();

            const colecaoRef = collection(db, "coleta");

            const unsubscribe = onSnapshot(colecaoRef, (querySnapshot) => {
                const coletas = querySnapshot.docs.map((doc) => {
                    const coletaData = doc.data();
                    

                    return {
                        id: doc.id,
                        temaId: coletaData.temaId,
                        achadoId: coletaData.achadoId,
                        processoId: coletaData.processoId,
                        coletadorId: coletaData.coletadorId,
                        valorFinanceiro: coletaData.valorFinanceiro,
                        situacao: coletaData.sanado,
                        unidade: coletaData.unidade,
                        quantitativo: coletaData.quantitativo,
                    };
                }) as Coleta[];

                callback(coletas); // Passa a lista de achados atualizada para o callback
            });

            return unsubscribe; // Retorna a função para parar de escutar as mudanças
        } catch (error) {
            console.error("Erro ao escutar coletas: ", error);
            throw error;
        }
    };

    return {
        addColeta, escutarColeta
    }
}
export default useFetchColeta;