import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';

export interface ColetaSkeletonProps {
  isLoading: boolean;
}

const ColetaSkeleton: React.FC<ColetaSkeletonProps> = ({ isLoading }) => {
  const theme = useTheme();
  return (
    <Box sx={{backgroundColor:theme.palette.background.paper , width: '70vw' }}>
      <Typography variant='h2'>{isLoading && <Skeleton sx={{ ml: 1, mr: 3, width: '25%' }} />}</Typography>
      <Typography variant='h4'>{isLoading && <Skeleton sx={{ ml: 1, mr: 3, height: 70 }} />}</Typography>
      <Skeleton sx={{ ml: 1, width: '15vw', height: '4vw' }} />
      <Typography variant='h4'>{isLoading && <Skeleton sx={{ ml: 1, mr: 3, height: 70 }} />}</Typography>
      <Typography variant='h4'>{isLoading && <Skeleton sx={{ ml: 1, mr: 3, height: 70 }} />}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mb: 2 }}>
        <Skeleton sx={{ ml: 1, width: '11vw', height: '6vw' }} />
        <Skeleton sx={{ ml: 0, width: '11vw', height: '6vw' }} />
        <Skeleton sx={{ ml: 0, width: '11vw', height: '6vw' }} />
        <Skeleton sx={{ ml: 0, width: '11vw', height: '6vw' }} />
      </Box>
      <Skeleton sx={{ ml: 1, mr: 3, width: '15vw', height: '5vw' }} />
    </Box>
  );
}

export default ColetaSkeleton;
