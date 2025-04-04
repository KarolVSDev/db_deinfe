import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../service/firebase.config"
import { Processo } from "../../../../../types/types"


const useFetchProcesso = () => {
    //CREATE
    const addProcesso = async (data: Processo): Promise<boolean> => {
        try {
            const processoRef = collection(db, "processo");
            const docRef = await addDoc(processoRef, data);
            console.log("Processo adicionado com sucesso", docRef.id);
            return true
        } catch (error) {
            console.error("Erro ao tentar adicionar o processo", error);
            throw error;
            
        }
    }

    //READ
    const escutarProcessos = (callback: (temas: Processo[]) => void) => {
        try {
          const colecaoRef = collection(db, "processo");

          const unsubscribe = onSnapshot(colecaoRef, (querySnapshot) => {
            const processos = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              numero: doc.data().numero,
              exercicio: doc.data().exercicio,
              unidadeGestora: doc.data().unidadeGestora,
              diretoria: doc.data().diretoria,
              julgado: doc.data().julgado,

            })) as Processo[];
    
            callback(processos); // Chama a função de callback com os processos atualizados
          });
    
          return unsubscribe; // Retorna a função para parar de escutar as mudanças
        } catch (error) {
          console.error("Erro ao escutar processos: ", error);
          throw error;
        }
      };

      //UPDATE
    return {
        addProcesso, escutarProcessos
    }
}

export default useFetchProcesso