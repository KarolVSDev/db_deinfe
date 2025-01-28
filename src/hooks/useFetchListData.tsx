import { api } from "../service/api";
import { TypeAlert, TypeInfo } from "./TypeAlert";
import { GridRowId } from "@mui/x-data-grid";
import { useContextTable } from "../context/TableContext";
import dataFake from "../service/dataFake";

const useFetchListData = () => {

  const { setArrayAchado,
    setArrayTopicoAchado,
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

  const onDelete = (id: string, type: string) => {
    api.delete(`/${type}/${id}`).then(() => {
    }).catch((error) => {
      console.log(error)
      TypeAlert(error.response.data.message, 'error')
    })
  }


  return {
    getAllAchados,
    getAllTopcioAchado,
    onDelete,
  }
}

export default useFetchListData;