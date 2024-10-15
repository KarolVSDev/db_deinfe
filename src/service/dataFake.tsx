import { faker } from "@faker-js/faker"
import { TopicoAchado } from "../types/types"
import { useContextTable } from "../context/TableContext";


const dataFake = () => {
    const {setArrayTopicoAchado, 
        arrayTopicoAchado, setArrayAchado, 
        arrayAchado, setArrayBeneficio, arrayBeneficio} = useContextTable()
    

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

    const saveAchado =  (data:any) => {
        const newData = {
            id: faker.string.uuid(),
            ...data

        }
        setArrayAchado((prevData) => [...prevData, newData])
        localStorage.set
        console.log('dados salvos', newData)
        console.log('Dados do Array', [...arrayAchado, newData])
    }

    const saveBeneficio =  (data:any) => {
        const newData = {
            id: faker.string.uuid(),
            ...data

        }
        setArrayBeneficio((prevData) => [...prevData, newData])
        localStorage.set
        console.log('dados salvos', newData)
        console.log('Dados do Array', [...arrayBeneficio, newData])
    }


  return {saveTopico, saveAchado, saveBeneficio}
  
}

export default dataFake