import { useState } from "react";
import { api } from "../service/api";
import { ListData, NatAchadoUp, Processo } from "../types/types";
import { TypeAlert, TypeInfo } from "./TypeAlert";
import { GridRowId } from "@mui/x-data-grid";

import { useContextTable } from "../context/TableContext";



const useFetchListData = () => {

  const [arrayProcessos] = useState<Processo[]>([]);
  const [arrayListData, setArrayListData] = useState<ListData[]>([])

  const { setArrayProcesso, arrayProcesso, setArrayAchado,
    setArrayNatAchado, setArrayDivAchado, setArrayAreaAchado,
    setNatAchadoUp, setAreaAchadoUp, setDivAchadoUp, setAchadoUp,
    setProcessoDetails, setProcessoPincipal } = useContextTable();


  const getAllProcesso = async () => {
    try {
      const response = await api.get('/processo');
      setArrayProcesso(response.data)
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


  const getNatAchadoRelation = async (id: GridRowId | undefined) => {
    await api(`nat-achado/relation/${id}`).then(response => {
      const natAchadoR = response.data;
      setNatAchadoUp(natAchadoR)
    }).catch((error: any) => {
      TypeAlert(error, 'error')
    })
  }

  const getAreaAchadoRelation = async (id: GridRowId | undefined) => {
    await api(`area-achado/relation/${id}`).then(response => {
      const areaAchadoR = response.data.result;
      setAreaAchadoUp(areaAchadoR)
    }).catch((error: any) => {
      TypeAlert(error, 'error')
    })
  }

  const getDivAchadoRelation = async (id: GridRowId | undefined) => {
    await api(`div-area-achado/relation/${id}`).then(response => {
      const divAchadoR = response.data.result;
      setDivAchadoUp(divAchadoR)
    }).catch((error: any) => {
      TypeAlert(error, 'error')
    })
  }

  const getAchadoRelation = async (id: GridRowId | undefined) => {
    await api(`achado/relation/${id}`).then(response => {
      const achadoR = response.data;
      setAchadoUp(achadoR)
    }).catch((error: any) => {
      TypeAlert(error, 'error')
    })
  }


  return {
    arrayProcessos,
    getAllProcesso,
    getAllAchados,
    getAllNatAchado,
    getAllDivAchado,
    getAllAreaAchado,
    onDelete,
    getOneProcessoDetails,
    getNatAchadoRelation,
    getAreaAchadoRelation,
    getDivAchadoRelation,
    getAchadoRelation

  }
}

export default useFetchListData;