import React, { useState } from 'react'
import { api } from '../service/api'
import { AllUsers, User } from '../types/types'
import { useAuth } from '../context/AuthContext'
import { db } from '../service/firebase.config'
import { doc, setDoc } from 'firebase/firestore'
import { TypeAlert } from './TypeAlert'

const useFetchUsers = () => {

    const [users, setUsers] = useState<AllUsers[]>()
    const{user, setUser} = useAuth()
    const [email] = useState(localStorage.getItem('email'))
    

    const addUser = (user:User) => {
      const userRef = doc(db,'usuarios', user.id);
      setDoc(userRef, {
        nome:user.nome,
        email:user.email,
        cargo:user.cargo,
        ativo:user.ativo
      })
      .then(() => {
        TypeAlert('Usuário cadastrado', 'success')
      })
      .catch((error) => {
        TypeAlert('Erro ao cadastrar usuário', 'error')
      })
    }

    const getUsers = () => {
        api.get('/usuario').then((response) => {
            setUsers(response.data)
        }).catch((error) => {
            console.error('erro ao trazer os dados', error)
        })
    }

    const getUser = async () => {

      // await api.get(`/usuario/login/${email}`).then((response) => {
      //   let data = response.data;
      //   delete data.createAt;
      //   delete data.updateAt;
      //   setUser(data)
      // }).catch((error) => {
      //   console.error('Erro ao buscar dados de usuário', error)
      // })
    }

  return{
    addUser,
    getUsers,
    users,
    getUser
  }
}

export default useFetchUsers