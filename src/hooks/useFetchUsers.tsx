import React, { useState } from 'react'
import { api } from '../service/api'
import { AllUsers } from '../types/types'

const useFetchUsers = () => {

    const [users, setUsers] = useState<AllUsers[]>()

    const getUsers = () => {
        api.get('/usuario').then((response) => {
            setUsers(response.data)
        }).catch((error) => {
            console.error('erro ao trazer os dados', error)
        })
    }
  return{
    getUsers,
    users
  }
}

export default useFetchUsers