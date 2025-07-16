import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
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
        deleteKeyword
    }

}

export default useFetchKeyWord;