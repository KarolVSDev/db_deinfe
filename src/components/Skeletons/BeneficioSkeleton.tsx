import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export interface BeneficioSkeletonProps {
  isLoading:boolean;
}

const BeneficioSkeleton:React.FC<BeneficioSkeletonProps> = ({isLoading}) => {
  return (
    <Box sx={{ width: '70vw' }}>
      <Typography variant='h2'>{isLoading && <Skeleton sx={{ml:1, mr:3, width:'25vw', mt:2}} />}</Typography> 
      <Typography variant='h1'>{isLoading && <Skeleton sx={{ml:1, mr:3, height:'120px'}} />}</Typography>
      <Typography variant='h2'>{isLoading && <Skeleton sx={{ml:1, mr:3, width:'25vw'}} />}</Typography>
      <Typography variant='h1'>{isLoading && <Skeleton sx={{ml:1, mr:3, height:'90px'}} />}</Typography>
      <Skeleton sx={{ml:1, mr:3, width:'15vw', height:'5vw'}}/>
    </Box>
  );
}

export default BeneficioSkeleton;
