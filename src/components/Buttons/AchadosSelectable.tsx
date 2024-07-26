import { MenuItem, Select, SelectChangeEvent, styled } from "@mui/material"
import React, { ReactEventHandler, useState } from 'react'

interface selectProps {
    stateType: string;
    setStateType:(value:string) => void;
}

const StyledSelect = styled(Select)({
    ml: '20px',
    mb: '10px'
})

const AchadosSelectable: React.FC<selectProps> = ({ stateType, setStateType }) => {

    const options = ['achados','nat-achados', 'area-achados', 'div-achados' ];

    const handleType = (event: {target:{value:unknown}}) => {
        setStateType(event.target.value as string);
      };

    return (
        <StyledSelect
            value={stateType}
            onChange={handleType}
        >
            {options.map(option => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </StyledSelect>
    )
}

export default AchadosSelectable