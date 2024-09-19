import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {NatAchadoUp, AreaAchadoUp, DivAchadoUp, AchadoUp } from '../../../types/types';
import useFetchListData from '../../../hooks/useFetchListData';
import DataProcessoDetails from '../../DataTable/DataProcessoDetails';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  maxWidth: 1200,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  height: 'fit-content',
  scrollbarWidth: 'thin',
  background: 'linear-gradient(90deg, #e2e8f0, #f1f5f9)'
};

interface ModalShowDetailProps {
  dataType: string;
  open: boolean;
  onClose: () => void;
  natAchadoRelations?: NatAchadoUp;
  areaAchadoRelations?: AreaAchadoUp;
  divAchadoRelation?: DivAchadoUp;
  achadoRelation?: AchadoUp;
}

const ModalShowDetails: React.FC<ModalShowDetailProps> = ({
  dataType,
  open,
  onClose,
  natAchadoRelations,
  areaAchadoRelations,
  divAchadoRelation,
  achadoRelation }) => {

  const { onDelete } = useFetchListData()

  const handleDelete = (id: string, type: string) => {
    if (id) {
      onDelete(id, type)
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
              <IconButton onClick={onClose} sx={{
                mb: 2, '&:hover': {
                  bgcolor: '#1e293b', color: '#ffffff',
                }
              }}>
                <CloseIcon />
              </IconButton>
            </Box>
            {<DataProcessoDetails
              dataType={dataType}
              natAchadoRelations={natAchadoRelations}
              areaAchadoRelations={areaAchadoRelations}
              divAchadoRelation={divAchadoRelation}
              achadoRelation={achadoRelation}
            />}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalShowDetails;