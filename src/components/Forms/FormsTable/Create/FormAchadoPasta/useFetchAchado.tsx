import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { Achado } from "../../../../../types/types";
import { db } from "../../../../../service/firebase.config";
import { useContextTable } from "../../../../../context/TableContext";
import { TypeAlert } from "../../../../../hooks/TypeAlert";
import { GridRowId } from "@mui/x-data-grid";
import useFetchListData from "../../../../../hooks/useFetchListData";


const useFetchAchado = () => {

    const {setArrayAchado} = useContextTable()
    const {getTemaById, processAchadoBeneficio} = useFetchListData();

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
            console.log("Nenhum tema encontrado.");
          }
        } catch (error) {
          console.error("Erro ao tentar resgatar os Temas:", error);
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
        
              const beneficios = await processAchadoBeneficio(idAchado) || [];
        
              const achadoCompleto = {
                achado: achado,
                tema: tema,
                beneficios: beneficios
              }
        
              return achadoCompleto;
        
            } catch (error) {
              console.error("Erro ao tentar resgatar o achado: ", error)
              throw error;
            }
          }


    return {
        setAchado, getAllAchados, getAchadobyName, getAchadoById,
    }
}

export default useFetchAchado;

