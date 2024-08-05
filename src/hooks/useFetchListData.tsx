import { useState, useEffect } from "react";
import { api } from "../service/api";
import { dataRelation, Interessado, jurisdRelation, ListData, PessoaJurisd, Processo, ProcessoDetails, ProcessoUpdate, Procurador } from "../types/types";
import { TypeAlert, TypeInfo } from "./TypeAlert";
import { GridRowId } from "@mui/x-data-grid";
import { formateDateToPtBr } from "./DateFormate";
import { useContextTable } from "../context/TableContext";



const useFetchListData = () => {

  const [arrayProcessos] = useState<Processo[]>([]);
  const [arrayListData, setArrayListData] = useState<ListData[]>([])
  const [processoDetails, setProcessoDetails] = useState<ProcessoDetails>()
  const [processoPrincipal, setProcessoPincipal] = useState<ProcessoUpdate | { message: string }>()
  const [jurisdPrincipal, setJurisdPrincipal] = useState<string | { message: string }>()
  const [pessoaRelation, setPessoaRelation] = useState<dataRelation>()
  const [jurisdRelation, setJurisdRelation] = useState<jurisdRelation>()
  const { setArrayProcesso,
    arrayProcesso, setArrayPessoaFisica, setArrayJurisd,
    setArrayProcurador, setArrayRelator, setArrayAchado,
    setArrayNatAchado, setArrayDivAchado, setArrayAreaAchado,
     setNatAchadoUp, setAreaAchadoUp, setDivAchadoUp, setAchadoUp } = useContextTable();


  const getAllPessoaFisica = async () => {
    try {
      const response = await api.get('/pessoafisica');
      setArrayPessoaFisica(response.data);
    } catch (error: any) {
      TypeInfo(error.response.data.message, 'error');
      return [];
    }
  };

  const getAllJurisd = async () => {
    try {
      const response = await api.get('/jurisd');
      setArrayJurisd(response.data);
    } catch (error: any) {
      TypeInfo(error.response.data.message, 'error');
      return [];
    }
  };

  const getAllProcesso = async () => {
    try {
      const response = await api.get('/processo');
      setArrayProcesso(response.data)
    } catch (error: any) {
      TypeInfo(error.response.data.message, 'error')
    }
  };

  const getAllProcurador = async () => {
    try {
      const response = await api.get('/procurador');
      setArrayProcurador(response.data);
    } catch (error: any) {
      TypeInfo(error.response.data.message, 'error')
    }
  };

  const getAllRelator = async () => {
    try {
      const response = await api.get('/relator');
      setArrayRelator(response.data);
    } catch (error: any) {
      TypeInfo(error.response.data.message, 'error')
    }
  };

  const getAllAchados = async () => {
    try {
      const response = await api.get('/achado');
      setArrayAchado(response.data)
    } catch (error: any) {
      TypeInfo(error.response.data.message, 'error')
    }
  }

  const getAllNatAchado = async () => {
    try {
      const response = await api.get('/nat-achado');
      setArrayNatAchado(response.data)
    } catch (error: any) {
      TypeInfo(error.response.data.message, 'error');
    }
  };

  const getAllDivAchado = async () => {
    try {
      const response = await api.get('/div-area-achado');
      setArrayDivAchado(response.data)
    } catch (error: any) {
      TypeInfo(error.response.data.message, 'error')
    }
  };

  const getAllAreaAchado = async () => {
    try {
      const response = await api.get('/area-achado');
      setArrayAreaAchado(response.data)
    } catch (error: any) {
      TypeInfo(error.response.data.message, 'error')
    }
  };

  const getJurisdByPessoa = async (id: GridRowId | undefined) => {
    try {
      const response = await api.get(`/pessoajurisd/pessoa/${id}`);
      const data = response.data.result.map((item: PessoaJurisd) => ({
        id: item.id,
        type: 'pessoajurisd',
        value1: item.cargo,
      }))
      setArrayListData(data);
    } catch (error: any) {
      TypeInfo(error, 'error');
    }
  };

  const getPessoaJByJurisd = async (id: GridRowId | undefined) => {
    try {
      const response = await api.get(`/pessoajurisd/jurisd/${id}`);
      const data = response.data.result.map((item: PessoaJurisd) => ({
        id: item.id,
        type: 'pessoajurisd',
        value1: item.cargo,
      }))
      setArrayListData(data);
    } catch (error: any) {
      TypeInfo(error, 'error');
    }
  };

  const onDelete = (id: string, type: string) => {
    api.delete(`/${type}/${id}`).then(() => {
      if (type === 'apenso' || type === 'jurisd-jurisd') {
        TypeAlert('Relação removida', 'success')
      } else {
        TypeAlert('Dado removido', 'success')
      }
      const updatedList = arrayListData.filter(item => item.id !== id);
      const updatedList2 = arrayProcesso.filter(item => item.id !== id);
      setArrayListData(updatedList)
      setArrayProcesso(updatedList2)
    }).catch((error) => {
      console.log(error)
      TypeAlert(error.response.data.message, 'error')
    })
  }

  const getProcessoByPessoa = async (id: GridRowId | undefined) => {
    try {
      const response = await api.get(`/processo/pessoa/${id}`);
      const data = response.data.map((item: Processo) => ({
        id: item.id,
        type: 'processo',
        value1: item.numero,
        value2: item.ano,
        value3: item.natureza,
        value4: item.exercicio,
        value5: item.objeto,
        value6: formateDateToPtBr(item.arquivamento)
      })
      )
      setArrayListData(data)
    } catch (error: any) {
      TypeInfo('error processo', 'error');
    }
  };

  const getProcessoByJurisd = async (id: GridRowId | undefined) => {
    try {
      const response = await api.get(`/processo/jurisd/${id}`);
      const data = response.data.map((item: Processo) => ({
        id: item.id,
        type: 'processo',
        value1: item.numero,
        value2: item.ano,
        value3: item.natureza,
        value4: item.exercicio,
        value5: item.objeto,
        value6: formateDateToPtBr(item.arquivamento)
      })
      )
      setArrayListData(data)
    } catch (error: any) {
      TypeInfo('error processo', 'error');
    }
  };

  const getProcessoByProc = async (id: GridRowId | undefined) => {
    try {
      const response = await api.get(`/processo/procurador/${id}`);
      const data = response.data.map((item: Processo) => ({
        id: item.id,
        type: 'procurador',
        value1: item.numero,
        value2: item.ano,
        value3: item.natureza,
        value4: item.exercicio,
        value5: item.objeto,
        value6: formateDateToPtBr(item.arquivamento)
      })
      )
      setArrayListData(data)
    } catch (error: any) {
      TypeInfo('error processo', 'error');
    }
  };

  const getProcessoByRelator = async (id: GridRowId | undefined) => {
    try {
      const response = await api.get(`/processo/relator/${id}`);
      const data = response.data.map((item: Processo) => ({
        id: item.id,
        type: 'relator',
        value1: item.numero,
        value2: item.ano,
        value3: item.natureza,
        value4: item.exercicio,
        value5: item.objeto,
        value6: formateDateToPtBr(item.arquivamento)
      })
      )
      setArrayListData(data)
    } catch (error: any) {
      TypeInfo('error processo', 'error');
    }
  };

  const getApensoByApensado = async (id: GridRowId | undefined) => {
    const processoPrincipal = await api.get(`/apenso/apensado/${id}`);
    return processoPrincipal.data
  }

  const getJurisdPrincipal = async (id: GridRowId | undefined) => {
    const jurisdPrincipal = await api.get(`/jurisd-jurisd/subordinado/${id}`);
    return setJurisdPrincipal(jurisdPrincipal.data)
  }

  const getOneProcessoDetails = async (id: GridRowId | undefined) => {
    try {
      const response = await api.get(`/processo/relations/${id}`)
      const data = response.data
      if (data) {
        const processoPincipal = await getApensoByApensado(id)
        setProcessoPincipal(processoPincipal)
        setProcessoDetails(data)
      }
    } catch (error: any) {
      TypeAlert(error.response.data.message, 'error')
    }
  }

  const setPessoaRelations = async (id: GridRowId | undefined) => {
    await api.get(`/pessoafisica/relations/${id}`).then(response => {
      const pessoarelations = response.data;
      setPessoaRelation(pessoarelations)
    }
    ).catch((error: any) => {
      TypeAlert(`Erro ao fazer relação ${error}`, 'error')
    })
  }

  const setJurisdRelations = async (id: GridRowId | undefined) => {
    await api.get(`/jurisd/relations/${id}`).then(response => {
      const jurisdrelations = response.data;
      setJurisdRelation(jurisdrelations)
    }
    ).catch((error: any) => {
      TypeAlert(`Erro ao fazer relação ${error}`, 'error')
    })
  }

  const getNatAchadoRelation = async (id: GridRowId | undefined) => {
    await api(`nat-achado/relation/${id}`).then(response => {
      const natAchadoR = response.data;
      setNatAchadoUp(natAchadoR)  
    }).catch((error:any) => {
      TypeAlert(error, 'error')
    })
  }

  const getAreaAchadoRelation = async (id: GridRowId | undefined) => {
    await api(`area-achado/relation/${id}`).then(response => {
      const areaAchadoR = response.data.result;
      setAreaAchadoUp(areaAchadoR)  
    }).catch((error:any) => {
      TypeAlert(error, 'error')
    })
  }

  const getDivAchadoRelation = async (id: GridRowId | undefined) => {
    await api(`div-area-achado/relation/${id}`).then(response => {
      const divAchadoR = response.data.result;
      setDivAchadoUp(divAchadoR)  
    }).catch((error:any) => {
      TypeAlert(error, 'error')
    })
  }

  const getAchadoRelation = async (id: GridRowId | undefined) => {
    await api(`achado/relation/${id}`).then(response => {
      const achadoR = response.data;
      setAchadoUp(achadoR)  
    }).catch((error:any) => {
      TypeAlert(error, 'error')
    })
  }
 

  return {
    arrayListData,
    processoDetails,
    processoPrincipal,
    pessoaRelation,
    jurisdRelation,
    jurisdPrincipal,
    arrayProcessos,
    getAllPessoaFisica,
    getAllJurisd,
    getAllProcesso,
    getAllProcurador,
    getAllRelator,
    getAllAchados,
    getAllNatAchado,
    getAllDivAchado,
    getAllAreaAchado,
    getJurisdByPessoa,
    getPessoaJByJurisd,
    onDelete,
    getProcessoByPessoa,
    getProcessoByJurisd,
    getProcessoByProc,
    getProcessoByRelator,
    getOneProcessoDetails,
    setPessoaRelations,
    setJurisdRelations,
    getJurisdPrincipal,
    getNatAchadoRelation,
    getAreaAchadoRelation,
    getDivAchadoRelation,
    getAchadoRelation
    
  }


}

export default useFetchListData;