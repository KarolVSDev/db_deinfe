import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { KeyWord } from "../../../types/types";
import { db } from "../../../service/firebase.config";
import { TypeAlert } from "../../../hooks/TypeAlert";

const useFetchKeyWord = () => {

    const addKeyWord = async (data: KeyWord) => {
        try {
            const colecaoRef = collection(db, "keyword");

            const querySnapshot = await getDocs(
                query(
                    colecaoRef,
                    where('label', '==', data.label),
                )
            );

            if (!querySnapshot.empty) {
                TypeAlert("Essa palavra-chave já foi registrada", "error");
                return false;
            }

            const docRef = await addDoc(colecaoRef, {
                label: data.label,
                type: data.type,
                color: data.color
            });
            TypeAlert("Uma nova palavra-chave foi adicionada", "success");
            return docRef.id;
        } catch (error) {
            console.error("Erro ao inserir a palavra-chave:", error);
            TypeAlert("Erro ao adicionar a palavra-chave", "error");
        }
    };

    //READ  
    const escutarKeyWords = (callback: (keywords: KeyWord[]) => void) => {
        try {
            const colecaoRef = collection(db, "keyword");

            // Escuta mudanças em tempo real na coleção "keyword"
            const unsubscribe = onSnapshot(colecaoRef, (querySnapshot) => {
                const keywords = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    label: doc.data().label,
                    type: doc.data().type,
                    color: doc.data().color,
                })) as KeyWord[];

                callback(keywords); // Chama a função de callback com os keywords atualizados
            });

            return unsubscribe; // Retorna a função para parar de escutar as mudanças
        } catch (error) {
            console.error("Erro ao escutar keywords: ", error);
            throw error;
        }
    };

    //UPDATE
    const updateKeyWord = async (data: KeyWord) => {
        try {
            const keywordRef = doc(db, 'keyword', data.id);

            //passo 1 - verificar se o documento atual mudou de label
            const currentDoc = await getDoc(keywordRef);
            if(currentDoc.data()?.label === data.label) {
                TypeAlert("Palavra-chave mantida sem alterações", "info");
                return true
            }

            //passo 2 - verificando se existe outra palavra-chave no banco com esse label
            const querySnapshot = await getDocs(
                query(
                    collection(db, 'keyword'),
                    where('label', "==", data.label),
                )
            );
    
            if (!querySnapshot.empty && querySnapshot.docs.some(doc => doc.id !== data.id)) {
                TypeAlert("Essa palavra-chave já foi registrada", "error");
                return false;
            }

            const updateData = {
                label:data.label
            }

            await updateDoc(keywordRef, updateData)
            TypeAlert("Palavra-chave atualizada com sucesso!", "success")
            return true
        } catch (error) {
            console.log("erro no método de update da palavra-chave: ", error)
            TypeAlert("Erro ao atualizar a palavra-chave, confira o log no console", "error")
            return false
        }

    }

    //DELETE
    const deleteKeyword = async (id: string) => {
        try {
            const keywordRef = doc(db, 'keyword', id);
            await deleteDoc(keywordRef);
            TypeAlert("A Palavra-Chave foi excluída", "success");
        } catch (error) {
            console.error("Erro ao tentar excluir a Palavra-Chave", error);
            TypeAlert("Erro ao excluir a palavra-chave", "error");
            throw error;
        }
    }


    return {
        addKeyWord,
        escutarKeyWords,
        updateKeyWord,
        deleteKeyword,
    }

}

export default useFetchKeyWord;