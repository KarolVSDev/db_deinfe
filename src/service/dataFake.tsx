import { faker } from "@faker-js/faker"
import { TopicoAchado } from "../types/types"
import { useContextTable } from "../context/TableContext";


const dataFake = () => {
    const {setArrayTopicoAchado, arrayTopicoAchado} = useContextTable()

    //register mock topico
    const saveTopico =  (data:any) => {
        const newData = {
            id: faker.string.uuid(),
            ...data

        }
        setArrayTopicoAchado((prevData) => [...prevData, newData])
        localStorage.set
        console.log('dados salvos', newData)
        console.log('Dados do Array', [...arrayTopicoAchado, newData])
    }


  return {saveTopico}
  
}

export default dataFake