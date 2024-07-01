import { useState, useEffect } from "react";
import { api } from "../service/api";
import { Interessado, Jurisd, ListData, PessoaJurisd, Processo, ProcessoUpdate } from "../types/types";
import { TypeAlert, TypeInfo } from "./TypeAlert";
import { GridRowId } from "@mui/x-data-grid";
import { formateDateToPtBr } from "./DateFormate";



const useFetchListData = (id: GridRowId | undefined) => {
  const [arrayInteressado, setArrayInteressado] = useState<Interessado[]>([]);
  const [arrayPessoaJurisd, setArrayPessoaJurisd] = useState<PessoaJurisd[]>([]);
  const [arrayJurisd, setArrayJurisd] = useState<Jurisd[]>([]);
  const [arrayProcesso, setArrayProcesso] = useState<Processo[]>([]);
  const [arrayListData, setArrayListData] = useState<ListData[]>([])



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
        label: item.cargo,
        value: item.mandato,
        id: item.id
      }))
      setArrayListData(data);
    } catch (error: any) {
      TypeInfo(error, 'error');
    }
  };

  const onDelete = (id: string, type: string) => {
    console.log(id, type)
      api.delete(`/${type}/${id}`).then(() => {
        const updatedList = arrayListData.filter(item => item.id !== id);
        setArrayListData(updatedList)
      }).catch((error) => {
        TypeAlert(error.response.data.messsage, 'error')
      })
  }

  const getProcessoByPessoa = async (id: GridRowId | undefined) => {
    try {
      const response = await api.get(`/processo/pessoa/${id}`);
      const data = response.data.map((item: Processo) => ({
        id: item.id,
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


  useEffect(() => {
    if (id) {
      getIntByPessoa()
      getJurisdByPessoa()
      getProcessoByPessoa(id)
      getProcessoByJurisd(id)
      getProcessoByProc(id)
      getProcessoByRelator(id)
    }
  }, [id])

  return {
    arrayListData,
    getIntByPessoa,
    getJurisdByPessoa,
    onDelete,
    arrayProcesso,
    getProcessoByPessoa,
    getProcessoByJurisd,
    getProcessoByProc,
    getProcessoByRelator
  }


}

export default useFetchListData;