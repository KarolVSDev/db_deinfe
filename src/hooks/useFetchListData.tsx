import { useState, useEffect } from "react";
import { api } from "../service/api";
import { Interessado, PessoaJurisd, Processo } from "../types/types";
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
    const [arrayListData, setArrayListData] = useState<any>([])

    const getIntByPessoa = async () => {
        try {
          const response = await api.get(`/interessado/pessoa/${id}`);
          const data = response.data.map((item:any) => ({
            label:item.interesse,
            label2:'',
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
          const data = response.data.map((item:any) => ({
            label:item.cargo,
            label2:'',
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
        // arrayProcesso,
        getIntByPessoa,
        getJurisdByPessoa,
        // getProcessoByPessoa
      }


}

export default useFetchListData;