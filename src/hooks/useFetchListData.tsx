import { useState, useEffect } from "react";
import { api } from "../service/api";
import { dataRelation, Interessado, ListData, PessoaJurisd, Processo, ProcessoDetails, ProcessoUpdate, Procurador } from "../types/types";
import { TypeAlert, TypeInfo } from "./TypeAlert";
import { GridRowId } from "@mui/x-data-grid";
import { formateDateToPtBr } from "./DateFormate";
import { useContextTable } from "../context/TableContext";



const useFetchListData = (id: GridRowId | undefined) => {
  
  const [arrayProcessos] = useState<Processo[]>([]);
  const [arrayListData, setArrayListData] = useState<ListData[]>([])
  const [processoDetails, setProcessoDetails] = useState<ProcessoDetails>()
  const [processoPrincipal, setProcessoPincipal] = useState<ProcessoUpdate | {message:string}>()
  const [pessoaRelation, setPessoaRelation] = useState<dataRelation>()
  const {setArrayProcesso, arrayProcesso} = useContextTable();
  const [procuradorRelation, setProcuradorRelation] = useState<Procurador>()
  


  const getIntByPessoa = async () => {
    try {
      const response = await api.get(`/interessado/pessoa/${id}`);
      const data = response.data.map((item: Interessado) => ({
        label: item.interesse,
        value: item.interesse,
        id: item.id
      }))
      setArrayListData(data);
    } catch (error: any) {
      TypeInfo(error.response.data.message, 'error');
    }
  };

  const getJurisdByPessoa = async () => {
    try {
      const response = await api.get(`/pessoajurisd/pessoa/${id}`);
      const data = response.data.result.map((item: PessoaJurisd) => ({
        id: item.id,
        type:'pessoajurisd',
        value1: item.cargo,
      }))
      setArrayListData(data);
    } catch (error: any) {
      TypeInfo(error, 'error');
    }
  };

  const getPessoaJByJurisd = async () => {
    try {
      const response = await api.get(`/pessoajurisd/jurisd/${id}`);
      const data = response.data.result.map((item: PessoaJurisd) => ({
        id: item.id,
        type:'pessoajurisd',
        value1: item.cargo,
      }))
      setArrayListData(data);
    } catch (error: any) {
      TypeInfo(error, 'error');
    }
  };

  const onDelete = (id: string, type: string) => {
      api.delete(`/${type}/${id}`).then(() => {
        console.log(type, id)
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
        type:'processo',
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
        type:'processo',
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
        type:'procurador',
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
        type:'relator',
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

  const getOneProcessoDetails = async (id: GridRowId | undefined) => {
    try {
      const response = await api.get(`/processo/relations/${id}`)
      const data = response.data
      if(data){
        const processoPincipal = await  getApensoByApensado(id)
        setProcessoPincipal(processoPincipal)
        setProcessoDetails(data)
      }
    } catch (error: any) {
      TypeAlert(error.response.data.message, 'error')
    }
  }

  const setPessoaRelations = async () => {
    await api.get(`/pessoafisica/relations/${id}`).then(response => {
      const pessoarelations = response.data;
      setPessoaRelation(pessoarelations)
    }
    ).catch((error: any) => {
      TypeAlert(`Erro ao fazer relação ${error}`, 'error')
    })
  }

  

  useEffect(() => {
    if (id) {
      getIntByPessoa()
      getJurisdByPessoa()
      getPessoaJByJurisd()
      getProcessoByPessoa(id)
      getProcessoByJurisd(id)
      getProcessoByProc(id)
      getProcessoByRelator(id)
      getOneProcessoDetails(id)
    }
  }, [id])

  return {
    arrayListData,
    processoDetails,
    processoPrincipal,
    pessoaRelation,
    getIntByPessoa,
    getJurisdByPessoa,
    getPessoaJByJurisd,
    onDelete,
    arrayProcessos,
    getProcessoByPessoa,
    getProcessoByJurisd,
    getProcessoByProc,
    getProcessoByRelator,
    getOneProcessoDetails,
    setPessoaRelations
  }


}

export default useFetchListData;