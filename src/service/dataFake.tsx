import { faker } from "@faker-js/faker"
import { Achado, Beneficio, TopicoAchado } from "../types/types"
import { useContextTable } from "../context/TableContext";
import { TypeAlert } from "../hooks/TypeAlert";
import { GridRowId } from "@mui/x-data-grid";


const dataFake = () => {
    const {setArrayTopicoAchado, 
        arrayTopicoAchado, setArrayAchado, 
        arrayAchado, setArrayBeneficio, arrayBeneficio, arrayAchadoBeneficio,setArrayAchadoBeneficio} = useContextTable()
    

    //mocks de topico
    const saveTopico =  (data:any) => {
        const newData = {
            id: faker.string.uuid(),
            ...data

        }
        setArrayTopicoAchado((prevData) => [...prevData, newData])
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

    //mocks de achado
    const verifyAchado = (achado:string): boolean => {
        const texto = arrayAchado.find(item => item.achado === achado)
        if(texto){
            TypeAlert('O Achado já existe no banco de dados', 'info')
            return true
        }
        return false
    }
    const getAchado = (achado:string):Achado | undefined => {
        const objeto = arrayAchado.find(item => item.id === achado)
        try {
            if(objeto){
                return objeto
            }
        } catch (error) {
            console.log('Achado não encontrado', error)
        }
    }

    const getAchadoByString = (achado:string): Achado | undefined=> {
        const objeto = arrayAchado.find(item => item.achado === achado)
        try {
            if(objeto){
                return objeto
            }
        } catch (error) {
            console.log('Achado não encontrado', error)
            return undefined
        }
    }

    const saveAchado =  (data:Achado) => {
        
        const newData = {
            ...data,
            id: faker.string.uuid(),

        }
        setArrayAchado((prevData) => [...prevData, newData])
        console.log('dados salvos', newData)
        console.log('Dados do Array', [...arrayAchado, newData])
        return newData
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

    const getBeneficiosByAchado = (achadoId:string):Beneficio[] => {
        const arrayFiltrado = arrayAchadoBeneficio.filter(item => item.achado_id === achadoId)
        const beneficios = arrayBeneficio.filter(beneficio => 
            arrayFiltrado.some(filtro => filtro.beneficio_id === beneficio.id)
        )
        return beneficios
    }

    //mocks de beneficio
    const saveBeneficio =  (data:any) => {
        const newData = {
            id: faker.string.uuid(),
            ...data

        }
        
        setArrayBeneficio((prevData) => [...prevData, newData])
        console.log('dados salvos', newData)
        console.log('Dados do Array', [...arrayBeneficio, newData])
        return newData
    }

    const verifyBeneficio = (beneficio:string): boolean => {
        const texto = arrayBeneficio.find(item => item.beneficio === beneficio)
        if(texto){
            TypeAlert('O Beneficio já existe no banco de dados', 'info')
            return true
        }
        return false
    }

    const getAchadoByBeneficio = (Id:string):Achado[] => {
        const arrayFiltrado = arrayAchadoBeneficio.filter(item => item.beneficio_id === Id)
        const achados = arrayAchado.filter(achado => 
            arrayFiltrado.some(filtro => filtro.achado_id === achado.id)
        )
        console.log(achados)
        return achados
    }
    // const BeneficioFormatado = (beneficios:Beneficio[], achados:Achado[]) => {
    //     return beneficios.map((beneficio) => {
    //         const achadoEncontrado = achados.find(achado => achado.id === beneficio.achado_id);
    //         return {
    //             ...beneficio,
    //             achado_id:achadoEncontrado? achadoEncontrado.achado : 'Achado não encontrado'
    //         }
    //     })
    // }

    //mock relacao AchadoBeneficio
    const saveAchadoBeneficio =  (data:any) => {
        const newData = {
            id: faker.string.uuid(),
            ...data

        }
        setArrayAchadoBeneficio((prevData) => [...prevData, newData])
        localStorage.set
        console.log('dados salvos', newData)
        console.log('Dados do Array', [...arrayAchadoBeneficio, newData])
    }


  return {saveTopico, saveAchado, 
    saveBeneficio, AchadoFormatado,
    getTopico, verifyAchado, 
    verifyBeneficio, getAchado, getAchadoByString,saveAchadoBeneficio, getBeneficiosByAchado, getAchadoByBeneficio
    //BeneficioFormatado, 
    }
  
}

export default dataFake