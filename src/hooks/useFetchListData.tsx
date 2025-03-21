import { api } from "../service/api";
import { TypeAlert, TypeInfo } from "./TypeAlert";
import { useContextTable } from "../context/TableContext";
import { Achado, AchadoBeneficio, AchadoComTopico, Beneficio, BeneficioComAchado, TopicoAchado } from "../types/types";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../service/firebase.config";
import { GridRowId } from "@mui/x-data-grid";

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
      console.log("Tema inserido com sucesso! ID:", docRef.id);
      TypeAlert('Tema adicionado', 'success');
    } catch (error) {
      console.error("Erro ao inserir o documento")
    }
  }

  const escutarTemas = (callback: (temas: TopicoAchado[]) => void) => {
    try {
      const colecaoRef = collection(db, "tema");
  
      // Escuta mudanças em tempo real na coleção "tema"
      const unsubscribe = onSnapshot(colecaoRef, (querySnapshot) => {
        const temas = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          tema: doc.data().tema,
          situacao: doc.data().situacao,
        })) as TopicoAchado[];
  
        callback(temas); // Chama a função de callback com os temas atualizados
      });
  
      return unsubscribe; // Retorna a função para parar de escutar as mudanças
    } catch (error) {
      console.error("Erro ao escutar temas: ", error);
      throw error;
    }
  };

  

  const getAllTemas = async () => {
    try {
      const temasRef = collection(db, "tema");
      const querySnapshot = await getDocs(temasRef);
  
      if (!querySnapshot.empty) {
        const temas = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          tema: doc.data().tema,
          situacao: doc.data().situacao,
        })) as TopicoAchado[];
  
        setArrayTopicoAchado(temas); // Atualiza o estado com os temas
        return temas
      } else {
        console.log("Nenhum tema encontrado.");
      }
    } catch (error) {
      console.error("Erro ao tentar resgatar os Temas:", error);
    }
  };

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

  const getTemaById = async (temaId: string) => {
    try {
      const temaRef = doc(db, "tema", temaId);
      const docRef = await getDoc(temaRef);

      if (docRef.exists()) {
        return { id: docRef.id, ...docRef.data() } as TopicoAchado
      } else {
        console.log("Tema não encontrado")
      }
    } catch (error) {
      console.error("Erro ao tentar resgatar o tema: ", error)
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

  const escutarAchados = async (callback: (achados: Achado[]) => void) => {
    try {
      const colecaoRef = collection(db, "achado");
  
      const unsubscribe = onSnapshot(colecaoRef, (querySnapshot) => {
        const achados = querySnapshot.docs.map((doc) => {
          const achadoData = doc.data();
          
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
            tema_id: achadoData.tema_id,
          };
        }) as Achado[];

        console.log(arrayTopicoAchado)
  
        callback(achados); // Passa a lista de achados atualizada para o callback
      });
  
      return unsubscribe; // Retorna a função para parar de escutar as mudanças
    } catch (error) {
      console.error("Erro ao escutar achados: ", error);
      throw error;
    }
  };

  const updateAchado = async (idAchado: string, data: Partial<BeneficioComAchado>) => {

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

      //Lógica para atualizar os benefícios
      const currentBeneficios = await getDocsByAchadoId(idAchado);

      // Extrair os IDs dos benefícios atuais e dos novos benefícios
      const currentBeneficioIds = currentBeneficios?.map((b) => b.beneficio_id);
      const newBeneficioIds = data.beneficios?.map((b) => b.id);

      const beneficiosToAdd = newBeneficioIds?.filter(
        (id) => !currentBeneficioIds?.includes(id)
      );

      const beneficiosToRemove = currentBeneficios?.filter(
        (b) => !newBeneficioIds?.includes(b.beneficio_id)
      );

      const achadoBeneficioRef = collection(db, "achadoBeneficio");

      // Adicionar novas relações
      if (beneficiosToAdd) {
        for (const beneficioId of beneficiosToAdd) {
          try {
            await addDoc(achadoBeneficioRef, {
              achado_id: idAchado,
              beneficio_id: beneficioId,
            });
          } catch (error) {
            console.error("Erro ao tentar adicionar novas relações de achadoBeneficio", error)
            throw error
          }
        }
      } 

      //Excluir relacções
      if (beneficiosToRemove) {
        for (const beneficio of beneficiosToRemove) {
          const docRef = doc(db, "achadoBeneficio", beneficio.id);
          await deleteDoc(docRef);
        }
      }

    } catch (error) {

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
  const getBeneficioByAchadoId = async (beneficioIds: { beneficio_id: string }[]) => {
    try {
      const beneficios = [];

      // Itera sobre os IDs e busca cada documento
      for (const { beneficio_id } of beneficioIds) {
        const beneficioRef = doc(db, "beneficio", beneficio_id); // Acessa o documento pelo ID
        const beneficioSnapshot = await getDoc(beneficioRef);

        // Se o documento existir, adiciona os dados ao array
        if (beneficioSnapshot.exists()) {
          beneficios.push({ id: beneficioSnapshot.id, ...beneficioSnapshot.data() });
        } else {
          console.log(`Documento com ID ${beneficio_id} não encontrado.`);
        }
      }

      return beneficios; // Retorna os dados dos benefícios encontrados
    } catch (error) {
      console.error("Erro ao tentar resgatar os benefícios:", error);
      throw error;
    }
  };

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
          id: doc.id,
          beneficio_id: doc.data().beneficio_id
        }))
      }
    } catch (error) {
      console.error("Erro ao tentar resgatar os ids de achadoBeneficio", error);
      throw error;
    }
  }

  const processAchadoBeneficio = async (achadoId: string) => {
    try {
      // 1. Chama a função e aguarda o retorno
      const beneficioIds = await getDocsByAchadoId(achadoId);
      // 2. Verifica se há IDs retornados
      if (beneficioIds && beneficioIds.length > 0) {
        // 3. Passa os IDs para a função getBeneficioByAchadoId
        const beneficios = await getBeneficioByAchadoId(beneficioIds);
        return beneficios;
      } else {
        console.log("Nenhum benefício encontrado para o achado ID:", achadoId);
        return null;
      }
    } catch (error) {
      console.error("Erro ao processar achadoBeneficio:", error);
      throw error;
    }
  };

  const getAllAchados = async () => {
    try {
      const response = await api.get('/achado');
      setArrayAchado(response.data)
    } catch (error: any) {
      TypeInfo(error.response.data.message, 'error')
    }
  }



  return {
    getAllAchados, setTema, getAllTemas, getTemaByName, escutarTemas, deleteTema, updateTema, setAchado,
    getAhcadobyName, setBeneficio, setAchadoBeneficio, getAllBeneficios, escutarAchados,
    processAchadoBeneficio, getAchadoById, updateAchado
  };
}

export default useFetchListData;