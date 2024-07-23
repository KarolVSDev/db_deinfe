import { Box, Button, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { dataRelation, ListData, ProcessoDetails, ProcessoUpdate } from '../../types/types';
import { useState } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import useExportToExcel from '../../hooks/useExportToExcel';
import ModalShowDetails from '../Modais/DataTableModals/ModalShowDetails';

interface DetailsProps {
    pessoaRelation?: dataRelation | undefined;
    arrayListData?:ListData[];
}

const stylePaper = {
    p: 2,
    width: '100%',
    minHeight: '110px',
    position: 'relative',
};


const InfoPaperDetails: React.FC<DetailsProps> = ({ pessoaRelation, arrayListData }) => {

    const [openModal, setOpenModal] = useState(false)
    const [buttonType, setButtonType] = useState('')
    const { exportPessoaToExcel, exportListData } = useExportToExcel()

    const handleModal = (valueButton: string) => {
        setButtonType(valueButton)
        setOpenModal(true)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    const handleExport = () => {
        exportPessoaToExcel(pessoaRelation, 'pessoafisica.xlsx')
        exportListData(arrayListData, 'Processos.xlsx')
    }

    const styleChip = {
        position: 'relative',
        bottom: 0,
        left: 0,
        color: '#c23232',
        '& .MuiChip-deleteIcon': {
            color: '#c23232',
            '&:hover': {
                color: '#b12a2c',
            },
        },
    };

    return (
        <Box>
            {pessoaRelation && (
                <Grid container spacing={3} sx={{ pb: 1, mt: 1 }}>
                    <Grid item xs={12} sm={12} >
                        <Paper sx={stylePaper} elevation={3}>
                            <Typography variant='h6' sx={{ color: '#991b1b', fontWeight: 'bold', mb:2 }}>Dados relacionados a {pessoaRelation.nome}:</Typography>

                            {pessoaRelation.processos && pessoaRelation.processos.length !== 0 && (
                                <Box >
                                    <Button variant='outlined' onClick={() => handleModal('processo')}>Relação de Processos</Button>
                                </Box>
                            )}
                            {pessoaRelation.pessoaJurisds && pessoaRelation.pessoaJurisds.length !== 0 && (
                                <Box sx={{ mt: 2 }}>
                                    <Button variant='outlined' sx={{}} onClick={() => handleModal('pessoajurisd')}>Relação de Jurisdicionados</Button>
                                </Box>
                            )}
                            <Box sx={{ mt: 2 }}>
                                <Button variant="contained" sx={{ bgcolor: '#ff3d00', '&:hover': { bgcolor: '#b22a00' } }}
                                    onClick={() => handleExport()}>
                                    <FileDownloadIcon sx={{ pr: 1 }} /> Exportar dados
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            )}
            {arrayListData && (
                <Grid container spacing={3} sx={{ pb: 1, mt: 1 }}>
                <Grid item xs={12} sm={12} >
                    <Paper sx={stylePaper} elevation={3}>
                        <Typography variant='h6' sx={{ color: '#991b1b', fontWeight: 'bold', mb:2 }}>Dados relacionados:</Typography>

                        {arrayListData && arrayListData.length !== 0 && (
                            <Box >
                                <Button variant='outlined' onClick={() => handleModal('processo')}>Relação de Processos</Button>
                            </Box>
                        )}
                        <Box sx={{ mt: 2 }}>
                            <Button variant="contained" sx={{ bgcolor: '#ff3d00', '&:hover': { bgcolor: '#b22a00' } }}
                                onClick={() => handleExport()}>
                                <FileDownloadIcon sx={{ pr: 1 }} /> Exportar dados
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            )}
            <ModalShowDetails arrayListData={arrayListData} arrayRelation={pessoaRelation} dataType={buttonType} open={openModal} onClose={handleClose}
            />
        </Box>

    );
}

export default InfoPaperDetails;
