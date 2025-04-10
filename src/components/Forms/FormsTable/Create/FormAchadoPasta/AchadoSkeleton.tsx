import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export interface AchadoSkeletonProps {
  isLoading: boolean;
}

const AchadoSkeleton: React.FC<AchadoSkeletonProps> = ({ isLoading }) => {
  return (
    <Box sx={{ width: '70vw' }}>
      <Typography variant='h2'>{isLoading && <Skeleton sx={{ ml: 1, mr: 3, width: '25vw', mt: 2 }} />}</Typography>
      <Skeleton sx={{ ml: 1, mr: 3, height: '90px' }} />
      <Skeleton sx={{ ml: 1, mr: 3, height: '90px' }} />
      <Skeleton sx={{ ml: 1, mr: 3, height: '75px', width: '10vw' }} />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Skeleton sx={{ ml: 1, mr: 3, height: '75px', width: '12vw' }} />
        <Skeleton sx={{ ml: 1, mr: 3, height: '75px', width: '10vw' }} />
        <Skeleton sx={{ ml: 1, mr: 3, height: '75px', width: '15vw' }} />
      </Box>
      <Skeleton sx={{ ml: 1, mr: 3, height: '75px', width: '15vw' }} />
      <Skeleton sx={{ ml: 1, mr: 3, height: '120px' }} />
      <Skeleton sx={{ ml: 1, mr: 3, height: '150px' }} />
      <Typography variant='h2'>{isLoading && <Skeleton sx={{ ml: 1, mr: 3, width: '25vw', mt: 2 }} />}</Typography>
      <Skeleton sx={{ ml: 1, mr: 3, height: '90px' }} />
      <Skeleton sx={{ ml: 1, mr: 3, height: '75px', width: '10vw' }} />
      <Typography variant='h2'>{isLoading && <Skeleton sx={{ ml: 1, mr: 3, width: '25vw', mt: 2 }} />}</Typography>
      <Skeleton sx={{ ml: 1, mr: 3, height: '120px' }} />
      <Skeleton sx={{ ml: 1, mr: 3, width: '15vw', height: '5vw' }} />
    </Box>
  );
}

export default AchadoSkeleton;
