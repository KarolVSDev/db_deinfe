import { faker } from "@faker-js/faker"
import { Achado, Beneficio, BeneficioComAchado, FormBeneficioType, TopicoAchado } from "../types/types"
import { useContextTable } from "../context/TableContext";
import { TypeAlert, TypeInfo } from "../hooks/TypeAlert";
import { GridRowId } from "@mui/x-data-grid";
import { promises } from "dns";


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
        console.log(texto)
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

    const getAchadoById = (idAchado: string) => {
        const objeto = arrayAchado.filter(item => item.id === idAchado)
        try {
            if (objeto) {
                return objeto
            }
        } catch (error) {
            console.log('Achados não encontrados', error)
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

    const getAchadoComTopico = (idAchado: GridRowId | undefined) => {
        const achado = arrayAchado.find(achado => achado.id === idAchado)
        const topico = arrayTopicoAchado.find(topico => topico.id === achado?.topico_id)
        const beneficios = getBeneficioByAchado(idAchado)
        console.log(beneficios)

        if (topico && achado) {
            const achadoComTopicoEBeneficio = {
                achado: achado,
                topico: topico,
                beneficios: beneficios
            }

            return achadoComTopicoEBeneficio;
        }

    }

    const updateAchado = (updateData: BeneficioComAchado) => {
        //atualiza o achado
        const { beneficios, situacaoBeneficio, beneficio, ...achado } = updateData;
        console.log(achado)
        try {
            setArrayAchado(prevArray => prevArray.map((item) => item.id === achado.id ? { ...item, ...achado } : item))
            //atualiza o arrayAchadoBeneficio
            if (beneficios) {
                updateAbByAchado(beneficios, achado.id)
                return
            }
            return
        } catch (error) {
            TypeAlert("Erro ao tentar atualizar o achado", "error")
        }
    }

    const deleteAchado = (idAchado: GridRowId) => {
        const relacaoBeneficios = arrayAchadoBeneficio.find(relacao => relacao.achado_id === idAchado);
        if (relacaoBeneficios) {
            TypeInfo('Esse Achado está relacionado à pelo menos um Benefício. Para excluir esse registro é preciso primeiramente alterar os benefícios relacionados a ele.', 'info')
            return
        } else {
            const achadoBeneficioupdated = arrayAchadoBeneficio.filter(relacao => relacao.achado_id !== idAchado);
            setArrayAchadoBeneficio(achadoBeneficioupdated)
            const arrayAchadoUpdated = arrayAchado.filter(achado => achado.id !== idAchado)
            setArrayAchado(arrayAchadoUpdated)
            TypeAlert('O achado foi excluído', 'success')
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

    const getBeneficio = (idBeneficio: GridRowId) => {
        try {
            const beneficio = arrayBeneficio.find(item => item.id === idBeneficio)
            if (beneficio) {
                const achadoBeneficio = arrayAchadoBeneficio.filter(item =>
                    item.beneficio_id === idBeneficio
                )
                if (achadoBeneficio) {
                    const achados = achadoBeneficio.map(item => getAchado(item.achado_id))
                    if (achados) {
                        const objetoCompleto = {
                            id: beneficio.id,
                            beneficio: beneficio.beneficio,
                            situacaoBeneficio: beneficio.situacaoBeneficio,
                            achados: achados
                        }
                        return objetoCompleto
                    }
                }
            }
        } catch (error) {
            console.log("Não foi possível achar o benefício", error)
        }
    }

    const updateBeneficio = (objeto: FormBeneficioType) => {
        console.log(objeto)
        const { achados } = objeto
        try {
            setArrayBeneficio(prevArray => prevArray.map(item => item.id === objeto.id ? { ...item, ...objeto } : item))
            if (achados) {
                updateAbByBeneficio(achados, objeto.id)
                return
            }
        } catch (error) {
            TypeAlert("Erro ao tentar atualizar o beneficio", "error")
        }

    }

    const deleteBeneficio = (idBeneficio: GridRowId) => {
        try {
            const arrayABAtualizado = arrayAchadoBeneficio.filter(objeto => objeto.beneficio_id !== idBeneficio)
            setArrayAchadoBeneficio(arrayABAtualizado)
            const arrayBeneficioAtualizado = arrayBeneficio.filter(beneficio => beneficio.id !== idBeneficio)
            setArrayBeneficio(arrayBeneficioAtualizado)
            TypeAlert('Benefício excluído', 'success')
        } catch (error) {
            console.log(error)
            TypeAlert('Erro ao tentar excluir o Benefício', 'error')
        }
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

    const getBeneficioByAchado = (idAchado: GridRowId | undefined) => {
        if (!idAchado) {
            console.log("ID de Achado inválido.");
            return [];
        }

        const achadoBeneficios = arrayAchadoBeneficio.filter(item => item.achado_id === idAchado);

        if (achadoBeneficios.length > 0) {
            const beneficios = achadoBeneficios.flatMap(achadoBeneficio => {
                return arrayBeneficio.filter(beneficio => beneficio.id === achadoBeneficio.beneficio_id)
            })
            return beneficios;
        } else {
            console.log("Consulta vazia");
            return [];
        }
    };

    const deleteByBeneficio = (beneficio_id: GridRowId) => {
        setArrayAchadoBeneficio(prevArray => prevArray.filter(achadoBeneficio => achadoBeneficio.beneficio_id !== beneficio_id))
        localStorage.set
    }
    const deleteByAchado = (achado_id: GridRowId) => {
        setArrayAchadoBeneficio(prevArray => prevArray.filter(achadoBeneficio => achadoBeneficio.achado_id !== achado_id))
    }

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

    const updateAbByAchado = (beneficios: Beneficio[], idAchado: string) => {
        setArrayAchadoBeneficio((prevArray) => {
            // Caso 1: Se benefícios estiver vazio, removemos todos os registros do idAchado
            if (beneficios.length === 0) {
                return prevArray.filter((item) => item.achado_id !== idAchado);
            }

            // Caso 2: Quando há benefícios passados, removemos os antigos e adicionamos os novos
            const updatedArray = prevArray
                .filter(
                    (item) =>
                        item.achado_id !== idAchado || // Mantenha os registros com achado_id diferente
                        beneficios.some((beneficio) => beneficio.id === item.beneficio_id) // Mantenha apenas os benefícios existentes
                )
                .concat(
                    beneficios
                        .filter(
                            (beneficio) =>
                                !prevArray.some(
                                    (item) =>
                                        item.achado_id === idAchado && item.beneficio_id === beneficio.id
                                ) // Adiciona apenas benefícios que ainda não estão no array
                        )
                        .map((beneficio) => ({
                            id: faker.string.uuid(), // Gerando um novo ID para o registro de relação
                            achado_id: idAchado,
                            beneficio_id: beneficio.id,
                        }))
                );

            return updatedArray;
        });


    };
    const updateAbByBeneficio = (achados: Achado[], idBeneficio: string) => {
        setArrayAchadoBeneficio((prevArray) => {
            // Caso 1: Se achados estiver vazio, removemos todos os registros do idBeneficio
            if (achados.length === 0) {
                return prevArray.filter((item) => item.beneficio_id !== idBeneficio);
            }

            // Caso 2: Quando há achados passados, removemos os antigos e adicionamos os novos
            const updatedArray = prevArray
                .filter(
                    (item) =>
                        item.beneficio_id !== idBeneficio || // Mantenha os registros com beneficio_id diferente
                        achados.some((achado) => achado.id === item.achado_id) // Mantenha apenas os achados existentes
                )
                .concat(
                    achados
                        .filter(
                            (achado) =>
                                !prevArray.some(
                                    (item) =>
                                        item.beneficio_id === idBeneficio && item.achado_id === achado.id
                                ) // Adiciona apenas achados que ainda não estão no array
                        )
                        .map((achado) => ({
                            id: faker.string.uuid(), // Gerando um novo ID para o registro de relação
                            achado_id: achado.id,
                            beneficio_id: idBeneficio,
                        }))
                );

            return updatedArray;
        });
    };


    return {
        saveTopico, saveAchado,
        saveBeneficio, AchadoFormatado,
        getTopico, verifyAchado,
        verifyBeneficio, getAchado,
        getAchadoByString, saveAchadoBeneficio, getBeneficiosByAchado,
        getAchadoByBeneficio, deleteByBeneficio,
        deleteByAchado, getArrayTopicos, deleteTopico, deleteAchado, updateAchado,
        getAchadoComTopico, getBeneficio, updateBeneficio, deleteBeneficio
        //BeneficioFormatado, 
    }

}

export default dataFake