import { faker } from "@faker-js/faker"
import { TopicoAchado } from "../types/types"
import { useContextTable } from "../context/TableContext";


const dataFake = () => {
    const {setArrayTopicoAchado, arrayTopicoAchado} = useContextTable()
    const saveData =  (data:any) => {
        const newData = {
            id: faker.string.uuid(),
            ...data

        }
        setArrayTopicoAchado((prevData) => [...prevData, newData])
        console.log('dados salvos', newData)
        console.log('Dados do Array', [...arrayTopicoAchado, newData])
    }

    

  return {saveData}
  
}

export default dataFake