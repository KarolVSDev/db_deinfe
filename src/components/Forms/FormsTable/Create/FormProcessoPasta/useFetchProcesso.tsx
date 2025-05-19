import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../../../service/firebase.config"
import { Processo } from "../../../../../types/types"
import { TypeAlert } from "../../../../../hooks/TypeAlert";
import { useContextTable } from "../../../../../context/TableContext";


const useFetchProcesso = () => {

  const { setArrayProcesso } = useContextTable();
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
  const getProcessoById = async (id: string): Promise<Processo | null> => {
    try {
      const processoRef = doc(db, "processo", id);
      const docRef = await getDoc(processoRef);
      if (docRef.exists()) {
        return { id: docRef.id, ...docRef.data() } as Processo;
      } else {
        console.log("Processo não encontrado");
        return null;
      }
    } catch (error) {
      console.error("Erro ao tentar buscar o processo", error);
      return null;
    }
    
  }

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

const getAllProcessos = async () => {
  try {
    const processoRef = collection(db, "processo");
    const querySnapshot = await getDocs(processoRef);

    if (!querySnapshot.empty) {
      const processos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        numero: doc.data().numero,
        exercicio: doc.data().exercicio,
        julgado: doc.data().julgado,
        unidadeGestora: doc.data().unidadeGestora,
        diretoria: doc.data().diretoria,
      })) as Processo[];

      if(processos.length === 0) {
        console.log("Nenhum processo encontrado.")
      }

      setArrayProcesso(processos)
      return processos
    } 
  } catch (error) {
    console.error("Erro ao tentar resgatar os Processos:", error);
    return [];
  }
}

const getProcesso = async (id: string): Promise<Processo | null> => {
  try {
    const processoRef = doc(db, "processo", id);
    const processoDoc = await getDoc(processoRef);

    if (processoDoc.exists()) {
      return { id: processoDoc.id, ...processoDoc.data() } as Processo;
    } else {
      console.log("Processo não existe no banco");
      return null;
    }
  } catch (error) {
    console.error("Erro ao tentar buscar o processo: ", error);
    throw error;
  }
};

//UPDATE
const updateProcesso = async (id: string, data: Partial<Processo>) => {
  try {
    const docRef = doc(db, "processo", id);
    await updateDoc(docRef, data);
    console.log("Processo atualizado com sucesso!")
    TypeAlert("O Processo foi atualizado", "success")
  } catch (error) {
    console.error("Erro ao tentar atualizar o Processo", error);
    throw error;
  }
}

//DELETE
const deleteProcesso = async (id: string) => {
  try {
    const processoRef = doc(db, "processo", id);
    await deleteDoc(processoRef);
    TypeAlert("O Processo foi excluído", "success")
  } catch (error) {
    console.error("Erro ao tentar excluir o Processo", error);
    throw error;
  }
}
return {
  addProcesso, getProcessoById, escutarProcessos, getProcesso, updateProcesso, deleteProcesso, getAllProcessos
}
}

export default useFetchProcesso