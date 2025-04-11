import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export interface BeneficioSkeletonProps {
  isLoading: boolean;
}

const BeneficioSkeleton: React.FC<BeneficioSkeletonProps> = ({ isLoading }) => {
  return (
    <Box sx={{ width: '70vw' }}>
      <Typography variant='h3'>{isLoading && <Skeleton sx={{ ml: 1, mr: 3, width: '15vw', mt: 2 }} />}</Typography>
      <Typography variant='h3'>{isLoading && <Skeleton sx={{ ml: 1, mr: 3, height: '10vh' }} />}</Typography>
      <Skeleton sx={{ ml: 1, mr: 3, height: '75px', width: '10vw', mt: '-30px' }} />
      <Typography variant='h3'>{isLoading && <Skeleton sx={{ ml: 1, mr: 3, width: '15vw' }} />}</Typography>
      <Typography variant='h3'>{isLoading && <Skeleton sx={{ ml: 1, mr: 3, height: '4vw' }} />}</Typography>
      <Skeleton sx={{ ml: 1, mr: 3, width: '15vw', height: '4vw' }} />
    </Box>
  );
}

export default BeneficioSkeleton;
