import { faker } from "@faker-js/faker"
import { Achado, Beneficio, TopicoAchado } from "../types/types"
import { useContextTable } from "../context/TableContext";
import { TypeAlert } from "../hooks/TypeAlert";


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
    const getTopico = (topico:string): boolean => {
        const texto = arrayTopicoAchado.find(item => item.topico === topico)
        if(texto){
            TypeAlert('O Tópico já existe no banco de dados', 'info')
            return true
        }
        return false
    }

    //register mock achado
    const getAchado = (achado:string): boolean => {
        const texto = arrayAchado.find(item => item.achado === achado)
        if(texto){
            TypeAlert('O Achado já existe no banco de dados', 'info')
            return true
        }
        return false
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

    const AchadoFormatado = (achados:Achado[], topicos:TopicoAchado[]) => {
        return achados.map((achado) => {
            const topicoEncontrado = topicos.find(topico => topico.id === achado.topico_id);
            return {
                ...achado,
                topico_id:topicoEncontrado? topicoEncontrado.topico : 'Topico não encontrado'
            }
        })
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

    const getBeneficio = (beneficio:string): boolean => {
        const texto = arrayBeneficio.find(item => item.beneficio === beneficio)
        if(texto){
            TypeAlert('O Beneficio já existe no banco de dados', 'info')
            return true
        }
        return false
    }
    const BeneficioFormatado = (beneficios:Beneficio[], achados:Achado[]) => {
        return beneficios.map((beneficio) => {
            const achadoEncontrado = achados.find(achado => achado.id === beneficio.achado_id);
            return {
                ...beneficio,
                achado_id:achadoEncontrado? achadoEncontrado.achado : 'Achado não encontrado'
            }
        })
    }


  return {saveTopico, saveAchado, 
    saveBeneficio, AchadoFormatado,
     BeneficioFormatado, getTopico, getAchado, getBeneficio}
  
}

export default dataFake