import { Box, Skeleton, Typography } from '@mui/material'
import React from 'react'

export interface DataTableSkeletonProps {
  visibleColumns:number;
}

const DataTableSkeleton:React.FC<DataTableSkeletonProps> = ({visibleColumns}) => {
  return (
    <Box sx={{display:"flex", width:"100%"}}> 
      {Array.from({length:visibleColumns}).map((_, index) => (
        <Skeleton
            key={index}
            variant="rectangular"
            width="100%"
            height={50}
            sx={{
                flex:1,
                mx:1,
                borderRadius:1
            }}
        />
      ))}
    </Box>
  )
}

export default DataTableSkeleton