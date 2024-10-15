import React, { useState } from 'react'
import { api } from '../service/api'
import { AllUsers } from '../types/types'
import { useAuth } from '../context/AuthContext'

const useFetchUsers = () => {

    const [users, setUsers] = useState<AllUsers[]>()
    const{user, setUser} = useAuth()
    const [email] = useState(localStorage.getItem('email'))

    const getUsers = () => {
        api.get('/usuario').then((response) => {
            setUsers(response.data)
        }).catch((error) => {
            console.error('erro ao trazer os dados', error)
        })
    }

    const getUser = async () => {
      await api.get(`/usuario/login/${email}`).then((response) => {
        let data = response.data;
        delete data.createAt;
        delete data.updateAt;
        setUser(data)
      }).catch((error) => {
        console.error('Erro ao buscar dados de usuário', error)
      })
    }


  return{
    getUsers,
    users,
    getUser
  }
}

export default useFetchUsers