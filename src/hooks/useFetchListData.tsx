import { api } from "../service/api";
import { TypeAlert, TypeInfo } from "./TypeAlert";
import { useContextTable } from "../context/TableContext";
import { TopicoAchado } from "../types/types";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../service/firebase.config";

const useFetchListData = () => {

  const { setArrayAchado,
    setArrayTopicoAchado,
    arrayTopicoAchado,
  } = useContextTable();


  const setTema = async (data: TopicoAchado) => {
    try {
      const colecaoRef = collection(db, "tema");

      const docRef = await addDoc(colecaoRef, {
        tema: data.tema,
        situacao: data.situacao
      })
      console.log("Documento inserido com sucesso! ID:", docRef.id);
      TypeAlert('Tema adicionado', 'success');
    } catch (error) {
      console.error("Erro ao inserir o documento")
    }
  }

  const escutarTemas = (callback: (temas: TopicoAchado[]) => void) => {
    try {
      const colecaoRef = collection(db, "tema");

      const unsubscribe = onSnapshot(colecaoRef, (querySnapshot) => {
        const temas = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          tema: doc.data().tema,
          situacao: doc.data().situacao
        })) as TopicoAchado[];
        callback(temas)
      })

      return unsubscribe;
    } catch (error) {
      console.error("Erro ao escutar temas: ", error)
      throw error;
    }
  }

  const getTemaByName = async (temaString: string) => {
    try {
      const temasRef = collection(db, "tema");
      const q = query(temasRef, where("tema", "==", temaString))
      const querySnapshot = await getDocs(q)
      if(!querySnapshot.empty) {
        console.log(temaString)
        TypeAlert("O tema já existe no banco de dados", "info")
        return true
      } 
      return false
    } catch (error) {
      console.error("Erro ao buscar o tema: ", error)
      return false
    }
  }

  const updateTema = async (id: string, data: Partial<TopicoAchado>) => {
    try {
      const docRef = doc(db, "tema", id);
      await updateDoc(docRef, data);
      console.log("Tema atualizado com sucesso!")
      TypeAlert("O Tema foi atualizado", "success")
    } catch (error) {
      console.error("Erro ao tentar atualizar o Tema", error);
      throw error;
    }

  }

  const deleteTema = async (id: string) => {
    try {
      const docRef = doc(db, "tema", id);
      await deleteDoc(docRef);
      console.log("Documento deletado da coleçao Tema")
      TypeAlert("O tema foi excluído", "success")
    } catch (error) {
      console.error("Erro ao tentar deletar o dado: ", error);
      throw error;
    }
  }
  const getAllAchados = async () => {
    try {
      const response = await api.get('/achado');
      setArrayAchado(response.data)
    } catch (error: any) {
      TypeInfo(error.response.data.message, 'error')
    }
  }

  const getAllTopcioAchado = async () => {
    try {
      //const response = await api.get('/nat-achado');
      //setArrayTopicoAchado(response.data)
      return arrayTopicoAchado
    } catch (error: any) {
      TypeInfo(error.response.data.message, 'error');
    }
  };


  return {
    getAllAchados,
    getAllTopcioAchado,
    setTema,
    getTemaByName,
    escutarTemas,
    deleteTema,
    updateTema
  }
}

export default useFetchListData;