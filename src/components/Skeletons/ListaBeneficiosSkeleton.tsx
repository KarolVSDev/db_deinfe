import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export interface ListaBeneficiosProps {
  isLoading:boolean;
}

const ListaBeneficios:React.FC<ListaBeneficiosProps> = ({isLoading}) => {
  return (
    <Box sx={{ width: '70vw' }}>
      <Typography variant='h4'>{isLoading && <Skeleton sx={{ml:1, mr:3, width:'10vw', mt:2}} />}</Typography> 
      <Typography variant='h4'>{isLoading && <Skeleton sx={{ml:1, mr:3, height:'3vw'}} />}</Typography>
      <Typography variant='h4'>{isLoading && <Skeleton sx={{ml:1, mr:3, heitgh:'10vw'}} />}</Typography>
      <Typography variant='h4'>{isLoading && <Skeleton sx={{ml:1, mr:3, height:'3vw'}} />}</Typography>
      <Skeleton sx={{ml:1, mr:3, height:'3vw'}}/>
    </Box>
  );
}

export default ListaBeneficios;
