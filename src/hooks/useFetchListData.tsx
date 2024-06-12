import { useState, useEffect } from "react";
import { api } from "../service/api";
import { Interessado, ListData, PessoaJurisd, Processo } from "../types/types";
import { TypeInfo } from "./TypeAlert";
import { GridRowId } from "@mui/x-data-grid";

interface ArrayData {
    label: string;
    label2:string;
    value: string;
    id: string;
  }

const useFetchListData = (id:GridRowId | undefined) => {
    const [arrayInteressado, setArrayInteressado] = useState<Interessado[]>([]);
    const [arrayPessoaJurisd, setArrayPessoaJurisd] = useState<PessoaJurisd[]>([]);
    const [arrayProcesso, setArrayProcesso] = useState<Processo[]>([]);
    const [arrayListData, setArrayListData] = useState<ListData[]>([])

    const getIntByPessoa = async () => {
        try {
          const response = await api.get(`/interessado/pessoa/${id}`);
          const data = response.data.map((item:Interessado) => ({
            label:item.interesse,
            value:item.interesse,
            id:item.id
          }))
          setArrayListData(data);
        } catch (error: any) {
          TypeInfo(error.response.data.message, 'error');
        }
      };
    
      const getJurisdByPessoa = async () => {
        try {
          const response = await api.get(`/pessoajurisd/pessoa/${id}`);
          const data = response.data.result.map((item:PessoaJurisd) => ({
            label:item.cargo,
            value:item.mandato,
            id:item.id
          }))
          setArrayListData(data);
        } catch (error: any) {
          TypeInfo(error, 'error');
        }
      };

    //   const getProcessoByPessoa = async () => {
    //     try {
    //       const response = await api.get(`/processo/pessoa/${id}`);
    //       setArrayPessoaJurisd(response.data);
    //     } catch (error: any) {
    //       TypeInfo('error processo', 'error');
    //     }
    //   };

      useEffect(() => {
        if(id){
            getIntByPessoa()
            getJurisdByPessoa()
            // getProcessoByPessoa()
        }
      },[id])

      return {
        arrayListData,
        getIntByPessoa,
        getJurisdByPessoa,
        // arrayProcesso,
        // getProcessoByPessoa
      }


}

export default useFetchListData;