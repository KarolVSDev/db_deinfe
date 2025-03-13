import { api } from "../service/api";
import { TypeAlert, TypeInfo } from "./TypeAlert";
import { useContextTable } from "../context/TableContext";
import { Achado, AchadoBeneficio, Beneficio, TopicoAchado } from "../types/types";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../service/firebase.config";

const useFetchListData = () => {

  const { setArrayAchado,
    setArrayTopicoAchado,
    arrayTopicoAchado, setArrayBeneficio
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

  const getAllTemas = async () => {
    try {
      const temasRef = collection(db, "tema");
      await getDocs(temasRef).then((querySnapshot) => {
        const temas = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          tema: doc.data().tema,
          situacao: doc.data().situacao,
        })) as TopicoAchado[];
        setArrayTopicoAchado(temas);

      })
    } catch (error) {
      console.error("Erro ao tentar resgatar os Temas", error)
    }
  }

  const getTemaByName = async (temaString: string) => {
    try {
      const temasRef = collection(db, "tema");
      const q = query(temasRef, where("tema", "==", temaString))
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
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

  //CRUD de achados
  const setAchado = async (data: Achado) => {
    try {
      const colecaoRef = collection(db, "achado");
      const docRef = await addDoc(colecaoRef, data)
      console.log("Achado adicionado", docRef.id)
      return docRef.id
    } catch (error) {
      console.error("Erro ao tentar criar o novo achado", error);
      throw error;
    }
  }

  const getAhcadobyName = async (achadoName: string) => {
    try {
      const achadoRef = collection(db, "achado");
      const q = query(achadoRef, where("achado", "==", achadoName));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        TypeAlert('O achado já existe no banco de dados', 'info');
        return true
      }
      return false
    } catch (error) {
      console.error("Erro ao buscar o achado: ", error);
      return false
    }
  }

  const escutarAchados = (callback: (achados: Achado[]) => void) => {
    try {
      const colecaoRef = collection(db, "achado");

      const unsubscribe = onSnapshot(colecaoRef, (querySnapshot) => {
        const achados = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          achado: doc.data().achado,
          analise: doc.data().analise,
          criterioEstadual: doc.data().criterioEstadual,
          criterioGeral: doc.data().criterioGeral,
          criterioMunicipal: doc.data().criterioMunicipal,
          data: doc.data().data,
          gravidade: doc.data().gravidade,
          situacaoAchado: doc.data().situacaoAchado,
          tema_id: doc.data().tema_id,
        })) as Achado[];
        callback(achados)
      });

      return unsubscribe;
    } catch (error) {
      console.error("Erro ao escutar temas: ", error)
      throw error;
    }
  }


  //CRUD de benefício

  const setBeneficio = async (data: Beneficio) => {
    try {
      const beneficioRef = collection(db, "beneficio");
      const docRef = await addDoc(beneficioRef, data);
      console.log("Benefício adicionado", docRef.id);
      return { id: docRef.id, ...data }
    } catch (error) {
      console.error("Erro ao tentar adicionar o benefício", error)
    }
  }

  const getAllBeneficios = async () => {
    try {
      const beneficiosRef = collection(db, "beneficio");
      await getDocs(beneficiosRef).then((querySnapshot) => {
        const beneficios = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          beneficio: doc.data().beneficio,
          situacaoBeneficio: doc.data().situacaoBeneficio
        })) as Beneficio[];
        setArrayBeneficio(beneficios)
      })
    } catch (error) {
      console.error("Erro ao tentar resgatar os Beneficios", error)
    }
  }

  const getBeneficioByAchadoId = async (achadoId: string) => {
    try {
      const beneficiosId = await getDocsByAchadoId(achadoId)
      console.log(beneficiosId)
      if (!beneficiosId || beneficiosId.length === 0) {
        console.log("Nenhum benefício encontrado para o achadoId:", achadoId);
        return [];
      }
      const beneficioRef = collection(db, "beneficio");

      const promises = beneficiosId.map(async (beneficioId) => {
        const q = query(beneficioRef, where("beneficio_id", "==", beneficioId));
        const querySnapshot = getDocs(q);

        return (await querySnapshot).docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
      })

      const resultados = await Promise.all(promises)
      const beneficioArray = resultados.flat();
      console.log(beneficioArray)
      return beneficioArray as Beneficio[];
    } catch (error) {
      console.error("Erro ao buscar benefícios:", error);
      throw error;
    }

  }

  //CRUD da entidade pai de achado e beneficio, AchadoBeneficio

  const setAchadoBeneficio = async (objeto: AchadoBeneficio) => {
    try {
      const achadoBeneficioRef = collection(db, "achadoBeneficio");
      const docRef = await addDoc(achadoBeneficioRef, objeto);
      console.log("A relação entre o achado e o(s) benefício(s) foi criada")
      return docRef
    } catch (error) {
      console.error("Erro ao tentar criar a relação na entidade pai", error)
    }
  }

  const getDocsByAchadoId = async (achadoId: string) => {
    try {
      const achadoBeneficioRef = collection(db, "achadoBeneficio");
      const q = query(achadoBeneficioRef, where("achado_id", "==", achadoId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return querySnapshot.docs.map((doc) => ({
          beneficio_id: doc.data().beneficio_id
        }))
      }
    } catch (error) {
      console.error("Erro ao tentar resgatar os ids de achadoBeneficio", error);
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



  return {
    getAllAchados,
    setTema,
    getAllTemas,
    getTemaByName,
    escutarTemas,
    deleteTema,
    updateTema,
    setAchado,
    getAhcadobyName,
    setBeneficio,
    setAchadoBeneficio,
    getAllBeneficios,
    escutarAchados,
    getBeneficioByAchadoId
  }
}

export default useFetchListData;