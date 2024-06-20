import { useState, useEffect } from "react";
import { api } from "../service/api";
import { Interessado, Jurisd, ListData, PessoaJurisd, Processo, ProcessoUpdate } from "../types/types";
import { TypeAlert, TypeInfo } from "./TypeAlert";
import { GridRowId } from "@mui/x-data-grid";
import { formatToInputDate } from "./DateFormate";



const useFetchListData = (id: GridRowId | undefined) => {
  const [arrayInteressado, setArrayInteressado] = useState<Interessado[]>([]);
  const [arrayPessoaJurisd, setArrayPessoaJurisd] = useState<PessoaJurisd[]>([]);
  const [arrayJurisd, setArrayJurisd] = useState<Jurisd[]>([]);
  const [arrayProcesso, setArrayProcesso] = useState<Processo[]>([]);
  const [arrayListData, setArrayListData] = useState<ListData[]>([])
  const [processo, setProcesso] = useState<ProcessoUpdate>()

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
    api.delete(`/${type}/${id}`).then(() => {
      switch (type) {
        case 'interessado':
          getIntByPessoa()
          break;
        case 'jurisd':
          getJurisdByPessoa()
          break
        default:
          break;
      }
    }).catch((error) => {
      TypeAlert(error.response.data.messsage, 'error')
    })
  }

  //   const getProcessoByPessoa = async () => {
  //     try {
  //       const response = await api.get(`/processo/pessoa/${id}`);
  //       setArrayPessoaJurisd(response.data);
  //     } catch (error: any) {
  //       TypeInfo('error processo', 'error');
  //     }
  //   };

  const getOneProcesso = async (id: GridRowId) => {
    try {
      const response = await api.get(`/processo/${id}`)
      const data = response.data

      if (data.arquivamento) {
        data.arquivamento = formatToInputDate(new Date(data.arquivamento));
      }
      setProcesso(data)
    } catch (error: any) {
      TypeAlert(error.response.data.message, 'error')
    }
  }

  useEffect(() => {
    if (id) {
      getIntByPessoa()
      getJurisdByPessoa()
      // getProcessoByPessoa()
    }
  }, [id])

  return {
    arrayListData,
    processo,
    getIntByPessoa,
    getJurisdByPessoa,
    onDelete,
    getOneProcesso
    // arrayProcesso,
    // getProcessoByPessoa
  }


}

export default useFetchListData;