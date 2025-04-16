import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../../service/firebase.config";
import { Coleta } from "../../../../../types/types";

const useFetchColeta = () => {
    const addColeta = async (data:Coleta) => {
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

    return {
        addColeta
    }
}
export default useFetchColeta;