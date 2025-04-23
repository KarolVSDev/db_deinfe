import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../service/firebase.config";
import { Coleta } from "../../../../../types/types";
import useFetchAchado from "../FormAchadoPasta/useFetchAchado";
import useFetchTema from "../FormTemaPasta/useFetchTema";
import useFetchProcesso from "../FormProcessoPasta/useFetchProcesso";
import { ColetaTransformada } from "../../../../../types/types";
import useFetchUsers from "../../../../../hooks/useFetchUsers";
import { TypeAlert } from "../../../../../hooks/TypeAlert";
import { useContextTable } from "../../../../../context/TableContext";

const useFetchColeta = () => {

    const { getAllAchados } = useFetchAchado();
    const { getAllTemas } = useFetchTema();
    const { getAllProcessos } = useFetchProcesso();
    const { getUsers } = useFetchUsers();
    const {setArrayColeta} = useContextTable();

    const addColeta = async (data: Coleta) => {
        try {
            const coletaRef = collection(db, 'coleta');
            await addDoc(coletaRef, data);
            console.log('Coleta cadastrada com sucesso');
            return true
        } catch (error) {
            console.error('Erro ao cadastrar coleta', error);
            return false
        }
    };

    //READ
    const escutarColeta = async (callback: (achados: ColetaTransformada[]) => void) => {
        try {
            const colecaoRef = collection(db, "coleta");

            const unsubscribe = onSnapshot(colecaoRef, async (querySnapshot) => {
                // Mapeia os documentos para objetos Coleta
                const coletas: Coleta[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    temaId: doc.data().temaId,
                    achadoId: doc.data().achadoId,
                    processoId: doc.data().processoId,
                    coletadorId: doc.data().coletadorId,
                    valorFinanceiro: doc.data().valorFinanceiro,
                    sanado: doc.data().sanado,
                    unidade: doc.data().unidade,
                    quantitativo: doc.data().quantitativo,
                }));

                // Transforma os IDs em valores legíveis
                const coletasTransformadas = await editorDeArrayColeta(coletas);
                setArrayColeta(coletasTransformadas);
                callback(coletasTransformadas);
            });

            return unsubscribe;
        } catch (error) {
            console.error("Erro ao escutar coletas: ", error);
            throw error;
        }
    };

    const editorDeArrayColeta = async (coletaData: Coleta[]): Promise<ColetaTransformada[]> => {
        const achados = await getAllAchados();
        const temas = await getAllTemas();
        const processos = await getAllProcessos();
        const usuarios = await getUsers();

        if (!achados || !temas || !processos || !usuarios) {
            throw new Error("Não foi possível obter todos os dados necessários");
        }

        const achadosMap = new Map(achados.map(achado => [achado.id, achado.achado]));
        const temasMap = new Map(temas.map(tema => [tema.id, tema.tema]));
        const processoMap = new Map(processos.map(processo => [processo.id, processo.numero]));
        const usuariosMap = new Map(usuarios.map(usuario => [usuario.id, usuario.nome]));

        return coletaData.map(item => {
            const novaColeta: ColetaTransformada = {
                ...item,
                achadoId: item.achadoId && achadosMap.has(item.achadoId)
                    ? achadosMap.get(item.achadoId)!
                    : item.achadoId,
                processoId: item.processoId && processoMap.has(item.processoId)
                    ? processoMap.get(item.processoId)!
                    : item.processoId,
                temaId: item.temaId && temasMap.has(item.temaId)
                    ? temasMap.get(item.temaId)!
                    : item.temaId,
                coletadorId: item.coletadorId && usuariosMap.has(item.coletadorId)
                    ? usuariosMap.get(item.coletadorId)!
                    : item.coletadorId
            };

            // Se não tem temaId mas tem achadoId, busca do achado
            if (!novaColeta.temaId && item.achadoId) {
                const achado = achados.find(a => a.id === item.achadoId);
                if (achado?.tema_id && temasMap.has(achado.tema_id)) {
                    novaColeta.temaId = temasMap.get(achado.tema_id)!;
                }
            }

            return novaColeta;
        });
    };

    const getColetaById = async (id: string): Promise<Coleta | null> => {
        try {
            const docRef = doc(db, "coleta", id);
            const docSnap = await getDoc(docRef);
            
            if(docSnap.exists()) {
                return {id: docSnap.id, ...docSnap.data()} as Coleta;;
            } 
        } catch (error) {
            console.error("Erro ao buscar coleta por ID: ", error);
        } 
        return null;
    }

    //DELETE
    const deleteColeta = async (id: string) => {
        try {
            const docRef = doc(db, "coleta", id);
            await deleteDoc(docRef);
            console.log("Documento deletado da coleçao Coleta")
            TypeAlert("O registro foi excluído", "success")
            return
        } catch (error) {
            console.error("Erro ao tentar deletar o registro: ", error);
            throw error;
        }
    }
    return {
        addColeta, escutarColeta, deleteColeta, getColetaById
    }
}
export default useFetchColeta;