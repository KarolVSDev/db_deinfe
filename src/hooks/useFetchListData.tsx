import { TypeAlert } from "./TypeAlert";
import { useContextTable } from "../context/TableContext";
import { AchadoBeneficio, Beneficio, BeneficioUpdate, TopicoAchado } from "../types/types";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../service/firebase.config";
import { GridRowId } from "@mui/x-data-grid";

const useFetchListData = () => {

  const { setArrayTopicoAchado, setArrayBeneficio, arrayBeneficio } = useContextTable();

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
        console.log("Tema não existe no banco")
      }
    } catch (error) {
      console.error("Erro ao tentar resgatar o tema: ", error)
      throw error
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
      const achadoRef = collection(db, "achado");
      const q = query(achadoRef, where("tema_id", "==", id));
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        TypeAlert("Esse tema está relacionado a um ou mais registros de achados. Altere o tema desse(s) achado(s) antes de excluir este registro.", "info")
        return
      } else {
        const docRef = doc(db, "tema", id);
        await deleteDoc(docRef);
        console.log("Documento deletado da coleçao Tema")
        TypeAlert("O tema foi excluído", "success")
        return
      }
    } catch (error) {
      console.error("Erro ao tentar deletar o dado: ", error);
      throw error;
    }
  }

  const getAchadoByBeneficioId = async (achadoIds: { achado_id: string }[]) => {
    try {
      const achados = [];

      // Itera sobre os IDs e busca cada documento
      for (const { achado_id } of achadoIds) {
        const achadooRef = doc(db, "achado", achado_id); // Acessa o documento pelo ID
        const achadoSnapshot = await getDoc(achadooRef);

        // Se o documento existir, adiciona os dados ao array
        if (achadoSnapshot.exists()) {
          achados.push({ id: achadoSnapshot.id, ...achadoSnapshot.data() });
        } else {
          console.log(`Documento com ID ${achado_id} não encontrado.`);
        }
      }

      return achados; // Retorna os dados dos achados encontrados
    } catch (error) {
      console.error("Erro ao tentar resgatar os benefícios:", error);
      throw error;
    }
  };


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

  const getBeneficioWithAchados = async (beneficioId: GridRowId) => {
    try {
      const parsedBeneficioId = beneficioId.toString();
      const beneficio = arrayBeneficio.find((b) => b.id === beneficioId)

      const achadoIds = await getDocsByBeneficioId(parsedBeneficioId)
      if (achadoIds && achadoIds.length > 0) {
        const achados = await getAchadoByBeneficioId(achadoIds);
        if (beneficio) {
          const beneficioComAchados = {
            id: beneficio.id,
            beneficio: beneficio.beneficio,
            situacaoBeneficio: beneficio.situacaoBeneficio,
            achados: achados
          }

          return beneficioComAchados;
        } else {
          console.log("Não foi encontrado o benefício no arrayBeneficio")
        }

      }
    } catch (error) {
      console.error("Erro ao tentar resgatar o benefício: ", error)
      throw error;
    }
  }


  const escutarBeneficios = (callback: (beneficios: Beneficio[]) => void) => {
    try {
      const colecaoRef = collection(db, "beneficio");

      // Escuta mudanças em tempo real na coleção "tema"
      const unsubscribe = onSnapshot(colecaoRef, (querySnapshot) => {
        const beneficios = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          beneficio: doc.data().beneficio,
          situacaoBeneficio: doc.data().situacaoBeneficio,
        })) as Beneficio[];

        callback(beneficios); // Chama a função de callback com os temas atualizados
      });

      return unsubscribe; // Retorna a função para parar de escutar as mudanças
    } catch (error) {
      console.error("Erro ao escutar temas: ", error);
      throw error;
    }
  };

  const updateBeneficio = async (id: GridRowId, data: BeneficioUpdate) => {
    const idString = id.toString();
    const { achados, ...beneficio } = data;
    try {
      if (beneficio.id) {
        const beneficioRefRef = doc(db, "beneficio", beneficio.id)
        await updateDoc(beneficioRefRef, beneficio)
        console.log("Beneficio Atualizado")

      } else {
        console.log("Erro ao tentar atualizar o Benefício")
      }

      const currentAchados = await getRelationsByBeneficioId(idString);
      const currentAchadoIds = currentAchados?.map((b) => b.achado_id);
      const newAchados = achados.map((achado) => achado.id);


      const achadosToAdd = newAchados.filter(
        (id) => !currentAchadoIds.includes(id)
      );

      const achadosToRemove = currentAchados?.filter(
        (b) => !newAchados?.includes(b.achado_id)
      );

      console.log(achadosToAdd)
      console.log(achadosToRemove)

      const achadoBeneficioRef = collection(db, "achadoBeneficio");

      if (achadosToAdd) {
        for (const achadoId of achadosToAdd) {
          try {
            await addDoc(achadoBeneficioRef, {
              achado_id: achadoId,
              beneficio_id: idString,
            });
          } catch (error) {
            console.error("Erro ao tentar adicionar novas relações de achadoBeneficio", error)
            throw error
          }
        }
      }

      //Excluir relações
      if (achadosToRemove) {
        for (const achado of achadosToRemove) {
          const docRef = doc(db, "achadoBeneficio", achado.id);
          await deleteDoc(docRef);
        }
      }
    } catch (error) {

    }
  }

  const getBeneficioByName = async (beneficioString: string, idCurrent?: GridRowId) => {
    try {
      const currentDocId = idCurrent?.toString();
      const beneficioRef = collection(db, "beneficio");
      const q = query(beneficioRef, where("beneficio", "==", beneficioString));
      const querySnapshot = await getDocs(q);

      // Se não há documentos com esse benefício, retorna false
      if (querySnapshot.empty) {
        return false;
      }

      // Se não foi passado um currentDocId (caso de criação)
      if (!currentDocId) {
        TypeAlert("Este benefício já existe na coleção", "info");
        return true;
      }

      // Verifica se existe em documentos que NÃO são o atual
      const existsInOtherDocs = querySnapshot.docs.some(doc => doc.id !== currentDocId);

      if (existsInOtherDocs) {
        TypeAlert("Este benefício já existe em outro documento", "info");
        return true
      }

      return existsInOtherDocs; // Só retorna true se existir em OUTRO documento

    } catch (error) {
      console.error("Erro ao verificar o benefício: ", error);
      TypeAlert("Erro ao verificar o benefício", "error");
      return false;
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

  const getRelationsByBeneficioId = async (beneficio_id: string) => {
    try {
      const relationRef = collection(db, "achadoBeneficio");
      const q = query(relationRef, where("beneficio_id", "==", beneficio_id));
      const querySnapshot = await getDocs(q)
      const relacoes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        achado_id: doc.data().achado_id
      }))
      return relacoes
    } catch (error) {
      console.error("Erro ao tentar resgatar os benefícios:", error);
      throw error;
    }
  };

  const deleteBeneficio = async (id: string) => {
    try {
      //deleta as relações da entidade pai 
      deleteRelacao(id)
      //deleta o benefício
      const docRef = doc(db, "beneficio", id);
      await deleteDoc(docRef);
      //feedback para o usuário 
      TypeAlert("O Beneficio foi excluído", "success")
      console.log(`Benefício ${id} e suas relações foram deletadas `)
    } catch (error) {
      console.error("Erro ao deletar benefício:", error);
      TypeAlert("Erro ao excluir o benefício", "error");
    }
  }

  //CRUD da entidade pai de achado e beneficio, AchadoBeneficio
  const setAchadoBeneficio = async (objeto: AchadoBeneficio) => {
    try {
      const achadoBeneficioRef = collection(db, "achadoBeneficio");
      const docRef = await addDoc(achadoBeneficioRef, objeto);
      console.log("A relação entre o achado e o(s) benefício(s) foi criada")
      console.log({ id: docRef.id })
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

  const getDocsByBeneficioId = async (beneficioId: string) => {
    try {
      const beneficioAchadoRef = collection(db, "achadoBeneficio");
      const q = query(beneficioAchadoRef, where("beneficio_id", "==", beneficioId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return querySnapshot.docs.map((doc) => ({
          id: doc.id,
          achado_id: doc.data().achado_id
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

  const processoBeneficioAchado = async (beneficioId: string) => {
    try {
      // 1. Chama a função e aguarda o retorno
      const achadoIds = await getDocsByBeneficioId(beneficioId);
      // 2. Verifica se há IDs retornados
      if (achadoIds && achadoIds.length > 0) {
        // 3. Passa os IDs para a função getBeneficioByAchadoId
        const achados = await getAchadoByBeneficioId(achadoIds);
        return achados;
      } else {
        console.log("Nenhum achado encontrado para o beneficio ID:", beneficioId);
        return null;
      }
    } catch (error) {
      console.error("Erro ao processar achadoBeneficio:", error);
      throw error;
    }
  };

  const deleteRelacao = async (beneficioId?: GridRowId, achadoId?: GridRowId) => {
    try {
      if (beneficioId) {
        const relacaoRef = collection(db, "achadoBeneficio");
        const q = query(relacaoRef, where("beneficio_id", "==", beneficioId));
        const querySnapshot = await getDocs(q);

        const deletePromises = querySnapshot.docs.map(async (doc) => {
          await deleteDoc(doc.ref);
        });

        await Promise.all(deletePromises);
        console.log(`Todas as relações com beneficio_id ${beneficioId} foram deletadas`);
      }

      if (achadoId) {
        const relacaoRef = collection(db, "achadoBeneficio");
        const q = query(relacaoRef, where("achado_id", "==", achadoId));
        const querySnapshot = await getDocs(q);

        // Deleta cada documento encontrado
        const deletePromises = querySnapshot.docs.map(async (doc) => {
          await deleteDoc(doc.ref);
        });

        await Promise.all(deletePromises);
        console.log(`Todas as relações com achado_id ${achadoId} foram deletadas`);
      }

      return { success: true, message: "Relações deletadas com sucesso" };

    } catch (error) {
      console.error("Erro ao tentar excluir a relação: ", error);
      throw error;
    }
  }

  return {
    setTema, getAllTemas, getTemaByName, escutarTemas, deleteTema, updateTema, getTemaById,
    setBeneficio, setAchadoBeneficio, getAllBeneficios, getDocsByAchadoId,
    processAchadoBeneficio, escutarBeneficios, getBeneficioByName,
    processoBeneficioAchado, getBeneficioWithAchados, updateBeneficio, deleteBeneficio, deleteRelacao
  };
}

export default useFetchListData;