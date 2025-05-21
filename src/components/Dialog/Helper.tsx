import { Box, Typography } from "@mui/material"
import { ReactNode, useState, useEffect, useDebugValue } from "react"
import Tooltip from "@mui/material/Tooltip";

type HelperProps = {
    children: React.ReactElement;
    title: string;
}

const Helper = ({ children, title }: HelperProps) => {

    return <Tooltip title={title}
        enterDelay={500}>
        {children}
    </Tooltip>

}

export default Helper;