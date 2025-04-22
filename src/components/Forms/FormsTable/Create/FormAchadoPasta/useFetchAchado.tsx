import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { Achado } from "../../../../../types/types";
import { db } from "../../../../../service/firebase.config";
import { useContextTable } from "../../../../../context/TableContext";
import { TypeAlert } from "../../../../../hooks/TypeAlert";
import { GridRowId } from "@mui/x-data-grid";
import useFetchTema from "../FormTemaPasta/useFetchTema";


const useFetchAchado = () => {

  const { setArrayAchado } = useContextTable()
  const { getTemaById } = useFetchTema();

  //CREATE
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

  //READ
  const getAllAchados = async () => {
    try {
      const achadoRef = collection(db, "achado");
      const querySnapshot = await getDocs(achadoRef);

      if (!querySnapshot.empty) {
        const achados = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          achado: doc.data().achado,
          analise: doc.data().analise,
          criterioMunicipal: doc.data().criterioMunicipal,
          criterioEstadual: doc.data().criterioEstadual,
          criterioGeral: doc.data().criterioGeral,
          data: doc.data().data,
          gravidade: doc.data().gravidade,
          situacaoAchado: doc.data().situacaoAchado,
          tema_id: doc.data().tema_id
        })) as Achado[];

        setArrayAchado(achados); // Atualiza o estado com os achados
        return achados
      } else {
        console.log("Nenhum achado encontrado.");
      }
    } catch (error) {
      console.error("Erro ao tentar resgatar os Achados:", error);
    }
  };

  const getAchadobyName = async (achadoName: string) => {
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

  const getAchadoById = async (achadoId: GridRowId) => {
    try {
      const idAchado = achadoId.toString();
      const achadoRef = doc(db, "achado", idAchado);
      const docRef = await getDoc(achadoRef);
      const { id, ...achadoData } = docRef.data() as Achado;

      const achado = { id: docRef.id, id_tema: achadoData.tema_id, ...achadoData };
      const tema = await getTemaById(achado.tema_id)

      if (!tema) {
        throw new Error("Tema não encontrado");
      }

     

      const achadoCompleto = {
        achado: achado,
        tema: tema,
      }

      return achadoCompleto;

    } catch (error) {
      console.error("Erro ao tentar resgatar o achado: ", error)
      throw error;
    }
  }

  const escutarAchados = async (callback: (achados: Achado[]) => void) => {
    try {
      const temasRef = collection(db, "tema");
      const temasSnapshot = await getDocs(temasRef);
      const temasMap = new Map<string, any>();

      temasSnapshot.forEach((doc) => {
        temasMap.set(doc.id, doc.data());
      })

      const colecaoRef = collection(db, "achado");

      const unsubscribe = onSnapshot(colecaoRef, (querySnapshot) => {
        const achados = querySnapshot.docs.map((doc) => {
          const achadoData = doc.data();
          const tema = temasMap.get(achadoData.tema_id);

          return {
            id: doc.id,
            achado: achadoData.achado,
            analise: achadoData.analise,
            criterioEstadual: achadoData.criterioEstadual,
            criterioGeral: achadoData.criterioGeral,
            criterioMunicipal: achadoData.criterioMunicipal,
            data: achadoData.data,
            gravidade: achadoData.gravidade,
            situacaoAchado: achadoData.situacaoAchado,
            tema_id: tema.tema || "Tema não encontrado",
          };
        }) as Achado[];

        callback(achados); // Passa a lista de achados atualizada para o callback
      });

      return unsubscribe; // Retorna a função para parar de escutar as mudanças
    } catch (error) {
      console.error("Erro ao escutar achados: ", error);
      throw error;
    }
  };

  //UPDATE
  const updateAchado = async (idAchado: string, data: Partial<Achado>) => {

    const achado = {
      achado: data.achado,
      analise: data.analise,
      situacaoAchado: data.situacaoAchado,
      criterioMunicipal: data.criterioMunicipal,
      criterioEstadual: data.criterioEstadual,
      criterioGeral: data.criterioGeral,
      data: data.data,
      gravidade: data.gravidade,
      tema_id: data.tema_id
    }

    const filteredAchado = Object.fromEntries(
      Object.entries(achado).filter(([_, value]) => value !== undefined)
    );
    try {
      const achadoRef = doc(db, "achado", idAchado);
      await updateDoc(achadoRef, filteredAchado)
      console.log("Achado atualizado com sucesso!");
    } catch (error) {
    }
  };

  const deleteAchado = async (id: string) => {
    try {
      //deleta o achado
      const docRef = doc(db, "achado", id);
      await deleteDoc(docRef);
      //feedback para o usuário 
      TypeAlert("O Achado foi excluído", "success")
     
    } catch (error) {
      console.error("Erro ao excluir Achado:", error);
      TypeAlert("Erro ao excluir o benefício", "error");
    }
  }

  return {
    setAchado, getAllAchados, getAchadobyName, getAchadoById, escutarAchados, updateAchado, deleteAchado
  }
}

export default useFetchAchado;

