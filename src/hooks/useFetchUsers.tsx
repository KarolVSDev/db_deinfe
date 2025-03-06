import React, { useState } from 'react'
import { api } from '../service/api'
import { AllUsers, User } from '../types/types'
import { useAuth } from '../context/AuthContext'
import { db } from '../service/firebase.config'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { TypeAlert } from './TypeAlert'

const useFetchUsers = () => {


  const { setUsers } = useAuth()
  const [email] = useState(localStorage.getItem('email'))
  const {setUser} = useAuth()


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
      })
  }

  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'usuario'))
      const usuarios: AllUsers[] = [];
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
      if(!email){
        throw new Error("Email não encontrado no localStorage")
      };

     const q  = query(collection(db, "usuario"), where("email", "==", email));
     const querySnapshot = await getDocs(q)

     if(!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        console.log(userData)
        setUser({id:doc.id, ...userData} as User)
      })
     }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    addUser,
    getUsers,
    getUser
  }
}

export default useFetchUsers