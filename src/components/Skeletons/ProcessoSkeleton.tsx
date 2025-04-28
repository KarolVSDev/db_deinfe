import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export interface ProcessoSkeletonProps {
  isLoading: boolean;
}

const ProcessoSkeleton: React.FC<ProcessoSkeletonProps> = ({ isLoading }) => {
  return (
    <Box sx={{ width: '70vw' }}>
      <Typography variant='h2'>{isLoading && <Skeleton sx={{ ml: 1, mr: 3, mt: 2, width: '15vw' }} />}</Typography>
      <Typography variant='h2'>{isLoading && <Skeleton sx={{ ml: 1, mr: 3, mt: 2 }} />}</Typography>
      <Typography variant='h2'>{isLoading && <Skeleton sx={{ ml: 1, mr: 3 }} />}</Typography>
      <Typography variant='h2'>{isLoading && <Skeleton sx={{ ml: 1, mr: 3 }} />}</Typography>
      <Box sx={{display:"flex", flexDirection:"row", gap:2, mb:2}}>
        <Skeleton sx={{ ml: 1, mr: 3, width: '15vw', height: '4vw' }} />
        <Skeleton sx={{ ml: 1, mr: 3, width: '15vw', height: '4vw' }} />
      </Box>
      <Skeleton sx={{ ml: 1, mr: 3, width: '15vw', height: '4vw' }} />
    </Box>
  );
}

export default ProcessoSkeleton;
