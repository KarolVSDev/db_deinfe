import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { TopicoAchado } from "../../../../../types/types";
import { db } from "../../../../../service/firebase.config";
import { TypeAlert } from "../../../../../hooks/TypeAlert";
import { useContextTable } from "../../../../../context/TableContext";


const useFetchTema = () => {

    const { setArrayTopicoAchado } = useContextTable();

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
            const q = query(temasRef, orderBy("tema", "asc"));
            const querySnapshot = await getDocs(q);

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
            const docSnap = await getDoc(docRef);

            if (docSnap.exists() && docSnap.id === id) {
                TypeAlert("O Tema já existe no banco de dados", "error")
                return false
            }

            await updateDoc(docRef, data);
            TypeAlert("O Tema foi atualizado", "success")
            return true
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

    return {
        setTema, escutarTemas, getAllTemas, getTemaByName, getTemaById, updateTema, deleteTema
    }
}

export default useFetchTema