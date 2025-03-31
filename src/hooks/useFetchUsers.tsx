import { AllUsers, User, UserUpdate } from '../types/types'
import { useAuth } from '../context/AuthContext'
import { db } from '../service/firebase.config'
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { TypeAlert } from './TypeAlert'

const useFetchUsers = () => {


  const { setUsers } = useAuth()
  const { setUser } = useAuth()


  const addUser = (user: User) => {
    const userRef = doc(db, 'usuario', user.id);
    setDoc(userRef, {
      nome: user.nome,
      email: user.email,
      cargo: user.cargo,
      ativo: user.ativo
    })
      .then(() => {
        TypeAlert('Usuário cadastrado', 'success')
      })
      .catch((error) => {
        TypeAlert('Erro ao cadastrar usuário', 'error')
        console.error(error)
      })
  }

  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'usuario'))
      const usuarios: AllUsers[] = [];
      console.log(usuarios)
      querySnapshot.forEach((doc) => {
        usuarios.push({ id: doc.id, ...doc.data() } as AllUsers)
      });
      setUsers(usuarios);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  const getUser = async () => {
    try {
      const email = localStorage.getItem('email');
      if (!email) {
        throw new Error("Email não encontrado no localStorage");
      };

      const q = query(collection(db, "usuario"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const userData = doc.data();

        // Criando o objeto com o ID incluído
        const userWithId = {
          id: doc.id, // Aqui garantimos que o ID está incluído
          ...userData
        };

        console.log("Usuário salvo no contexto:", userWithId);
        setUser(userWithId as UserUpdate);

        return userWithId; // Opcional: retornar o usuário com ID
      } else {
        console.log("Nenhum documento encontrado com o email fornecido.");
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error; // Melhor propagar o erro para tratamento superior
    }
  };

  const updateUser = async (id: string, data: Partial<UserUpdate>) => {
    try {
      const userRef = doc(db, "usuario", id);

      await updateDoc(userRef, data);

      const updatedDoc = await getDoc(userRef);
      if (updatedDoc.exists()) {
        const updatedUser = {
          id: updatedDoc.id,
          ...updatedDoc.data()
        }
        setUser(updatedUser as UserUpdate)
        return
      }
    } catch (error) {
      console.error("Erro ao atualizar o usuário: ", error);
      throw error;
    }

  }

  return {
    addUser,
    getUsers,
    getUser,
    updateUser
  }
}

export default useFetchUsers