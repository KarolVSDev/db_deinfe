import React, { useState } from 'react'
import useFetchListData from './useFetchListData';
import { GridRowId } from '@mui/x-data-grid';

const useHandleTarget = (id:GridRowId | undefined, type:string) => {
    const [buttonType, setButtonType] = useState<string>('interessado')
    const {getIntByPessoa, getJurisdByPessoa} = useFetchListData(id, type)

    const handleTarget = () => {
        setButtonType(type)
        if (type === 'interessado') {
          getIntByPessoa()
        }
        if (type === 'pessoajurisd') {
          getJurisdByPessoa()
        }
      }
    return {
        handleTarget
    }
}

export default useHandleTarget