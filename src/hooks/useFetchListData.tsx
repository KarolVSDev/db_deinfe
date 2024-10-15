import { api } from "../service/api";
import { TypeAlert, TypeInfo } from "./TypeAlert";
import { GridRowId } from "@mui/x-data-grid";
import { useContextTable } from "../context/TableContext";
import dataFake from "../service/dataFake";

const useFetchListData = () => {

  const { setArrayAchado,
    setArrayTopicoAchado, setArrayDivAchado, setArrayAreaAchado,
    //setNatAchadoUp, setAreaAchadoUp, setDivAchadoUp, setAchadoUp, 
    arrayTopicoAchado
} = useContextTable();



  const getAllAchados = async () => {
    try {
      const response = await api.get('/achado');
      setArrayAchado(response.data)
    } catch (error: any) {
      TypeInfo(error.response.data.message, 'error')
    }
  }

  const getAllTopcioAchado = async () => {
    try {
      //const response = await api.get('/nat-achado');
      //setArrayTopicoAchado(response.data)
      return arrayTopicoAchado
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
    }).catch((error) => {
      console.log(error)
      TypeAlert(error.response.data.message, 'error')
    })
  }


  // const getNatAchadoRelation = async (id: GridRowId | undefined) => {
  //   await api(`nat-achado/relation/${id}`).then(response => {
  //     const natAchadoR = response.data;
  //     setNatAchadoUp(natAchadoR)
  //   }).catch((error: any) => {
  //     TypeAlert(error, 'error')
  //   })
  // }

  // const getAreaAchadoRelation = async (id: GridRowId | undefined) => {
  //   await api(`area-achado/relation/${id}`).then(response => {
  //     const areaAchadoR = response.data.result;
  //     setAreaAchadoUp(areaAchadoR)
  //   }).catch((error: any) => {
  //     TypeAlert(error, 'error')
  //   })
  // }

  // const getDivAchadoRelation = async (id: GridRowId | undefined) => {
  //   await api(`div-area-achado/relation/${id}`).then(response => {
  //     const divAchadoR = response.data.result;
  //     setDivAchadoUp(divAchadoR)
  //   }).catch((error: any) => {
  //     TypeAlert(error, 'error')
  //   })
  // }

  // const getAchadoRelation = async (id: GridRowId | undefined) => {
  //   await api(`achado/relation/${id}`).then(response => {
  //     const achadoR = response.data;
  //     setAchadoUp(achadoR)
  //   }).catch((error: any) => {
  //     TypeAlert(error, 'error')
  //   })
  // }


  return {
    getAllAchados,
    getAllTopcioAchado,
    getAllDivAchado,
    getAllAreaAchado,
    onDelete,
    // getNatAchadoRelation,
    // getAreaAchadoRelation,
    // getDivAchadoRelation,
    // getAchadoRelation

  }
}

export default useFetchListData;