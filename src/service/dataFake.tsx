import { faker } from "@faker-js/faker"
import { Achado, Beneficio, TopicoAchado } from "../types/types"
import { useContextTable } from "../context/TableContext";
import { TypeAlert, TypeInfo } from "../hooks/TypeAlert";
import { GridRowId } from "@mui/x-data-grid";


const dataFake = () => {
    const { setArrayTopicoAchado,
        arrayTopicoAchado, setArrayAchado,
        arrayAchado, setArrayBeneficio, arrayBeneficio, arrayAchadoBeneficio, setArrayAchadoBeneficio } = useContextTable()


    //mocks de topico
    const saveTopico = (data: any) => {
        const newData = {
            id: faker.string.uuid(),
            ...data

        }
        setArrayTopicoAchado((prevData) => [...prevData, newData])
        console.log('dados salvos', newData)
        console.log('Dados do Array', [...arrayTopicoAchado, newData])
    }
    const getTopico = (topico: string): boolean => {
        const texto = arrayTopicoAchado.find(item => item.topico === topico)
        if (texto) {
            TypeAlert('O Tópico já existe no banco de dados', 'info')
            return true
        }
        return false
    }

    const getArrayTopicos = () => {
        return arrayTopicoAchado
    }

    const deleteTopico = (idTopico: GridRowId) => {
        console.log(idTopico)
        const achado = arrayAchado.find(achado => achado.topico_id === idTopico)
        if (achado) {
            TypeInfo(`Esse Topico está relacionado à um Achado e não pode ser excluído.\n Você pode alterar os topicos dos achados relacionados ou excluí-los.`, "info")
            return
        } else {
            const updatedArrayTopicoAchado = arrayTopicoAchado.filter(topico => topico.id !== idTopico)
            console.log(updatedArrayTopicoAchado)
            setArrayTopicoAchado(updatedArrayTopicoAchado)
            TypeAlert("Topico excluído", 'success')
        }
    }

    //mocks de achado
    const verifyAchado = (achado: string): boolean => {
        const texto = arrayAchado.find(item => item.achado === achado)
        if (texto) {
            TypeAlert('O Achado já existe no banco de dados', 'info')
            return true
        }
        return false
    }
    const getAchado = (achado: string): Achado | undefined => {
        const objeto = arrayAchado.find(item => item.id === achado)
        try {
            if (objeto) {
                return objeto
            }
        } catch (error) {
            console.log('Achado não encontrado', error)
        }
    }

    const getAchadoByString = (achado: string): Achado | undefined => {
        const objeto = arrayAchado.find(item => item.achado === achado)
        try {
            if (objeto) {
                return objeto
            }
        } catch (error) {
            console.log('Achado não encontrado', error)
            return undefined
        }
    }

    const saveAchado = (data: Achado) => {

        const newData = {
            ...data,
            id: faker.string.uuid(),

        }
        setArrayAchado((prevData) => [...prevData, newData])
        console.log('dados salvos', newData)
        console.log('Dados do Array', [...arrayAchado, newData])
        return newData
    }

    const AchadoFormatado = (achados: Achado[], topicos: TopicoAchado[]) => {
        return achados.map((achado) => {
            const topicoEncontrado = topicos.find(topico => topico.id === achado.topico_id);
            return {
                ...achado,
                topico_id: topicoEncontrado ? topicoEncontrado.topico : 'Topico não encontrado'
            }
        })
    }

    const getBeneficiosByAchado = (achadoId: string): Beneficio[] => {
        const arrayFiltrado = arrayAchadoBeneficio.filter(item => item.achado_id === achadoId)
        const beneficios = arrayBeneficio.filter(beneficio =>
            arrayFiltrado.some(filtro => filtro.beneficio_id === beneficio.id)
        )
        return beneficios
    }

    const deleteAchado = (idAchado: GridRowId) => {
        console.log(idAchado)
        const relacaoBeneficios = arrayAchadoBeneficio.find(relacao => relacao.achado_id === idAchado);
        if (relacaoBeneficios) {
            TypeInfo('Esse Achado está relacionado à pelo menos um Benefício. Para excluir esse registro é preciso primeiramente alterar os benefícios relacionados a ele.', 'info')
            return
        }else{
            const achadoBeneficioupdated = arrayAchadoBeneficio.filter(relacao => relacao.achado_id !== idAchado);
            setArrayAchadoBeneficio(achadoBeneficioupdated) 
            console.log(achadoBeneficioupdated)
            const arrayAchadoUpdated = arrayAchado.filter(achado => achado.id !== idAchado)
            setArrayAchado(arrayAchadoUpdated)
            console.log(arrayAchadoUpdated)
            return
        }
    }
    //mocks de beneficio
    const saveBeneficio = (data: any) => {
        const newData = {
            id: faker.string.uuid(),
            ...data

        }

        setArrayBeneficio((prevData) => [...prevData, newData])
        console.log('dados salvos', newData)
        console.log('Dados do Array', [...arrayBeneficio, newData])
        return newData
    }

    const verifyBeneficio = (beneficio: string | undefined): boolean => {
        const texto = arrayBeneficio.find(item => item.beneficio === beneficio)
        if (texto) {
            TypeAlert('O Beneficio já existe no banco de dados', 'info')
            return true
        }
        return false

    }
    //mocks de AchadoBeneficio
    const getAchadoByBeneficio = (Id: string): Achado[] => {
        const arrayFiltrado = arrayAchadoBeneficio.filter(item => item.beneficio_id === Id)
        const achados = arrayAchado.filter(achado =>
            arrayFiltrado.some(filtro => filtro.achado_id === achado.id)
        )
        console.log(achados)
        return achados
    }

    const deleteByBeneficio = (beneficio_id: GridRowId) => {
        setArrayAchadoBeneficio(prevArray => prevArray.filter(achadoBeneficio => achadoBeneficio.beneficio_id !== beneficio_id))
        localStorage.set
    }
    const deleteByAchado = (achado_id: GridRowId) => {
        setArrayAchadoBeneficio(prevArray => prevArray.filter(achadoBeneficio => achadoBeneficio.achado_id !== achado_id))
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
    const saveAchadoBeneficio = (data: any) => {
        const newData = {
            id: faker.string.uuid(),
            ...data

        }
        setArrayAchadoBeneficio((prevData) => [...prevData, newData])
        localStorage.set
        console.log('dados salvos', newData)
        console.log('Dados do Array', [...arrayAchadoBeneficio, newData])
    }


    return {
        saveTopico, saveAchado,
        saveBeneficio, AchadoFormatado,
        getTopico, verifyAchado,
        verifyBeneficio, getAchado,
        getAchadoByString, saveAchadoBeneficio, getBeneficiosByAchado,
        getAchadoByBeneficio, deleteByBeneficio, deleteByAchado, getArrayTopicos, deleteTopico, deleteAchado
        //BeneficioFormatado, 
    }

}

export default dataFake