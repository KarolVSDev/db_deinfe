import { Box, Button, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { jurisdRelation, ProcessoDetails, ProcessoUpdate } from '../../types/types';
import { useState } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import useExportToExcel from '../../hooks/useExportToExcel';
import ModalShowDetails from '../Modais/DataTableModals/ModalShowDetails';

interface DetailsProps {
    processoDetails?: ProcessoDetails | undefined;
    processoPrincipal?: ProcessoUpdate | { message: string } | undefined;
    jurisdDetails?:jurisdRelation;
    jurisdPrincipal?:string | {message:string}
}

const stylePaper = {
    p: 2,
    width: '100%',
    minHeight: '110px',
    position: 'relative',
};


const InfoPaperProcessoDetails: React.FC<DetailsProps> = ({jurisdPrincipal, processoDetails, processoPrincipal, jurisdDetails }) => {

    const [openModal, setOpenModal] = useState(false)
    const [buttonType, setButtonType] = useState('')
    const [processoCompleto, setProcessoCompleto] = useState<ProcessoDetails>()
    const { exportProcessoToExcel } = useExportToExcel()

    const handleModal = (valueButton: string) => {
        setButtonType(valueButton)
        setOpenModal(true)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    const mergeData = () => {
        if (processoDetails && processoPrincipal) {
            let novoProcessoCompleto: ProcessoDetails;
            if ('numero' in processoPrincipal) {
                novoProcessoCompleto = {
                    ...processoDetails,
                    processoPrincipal: processoPrincipal.numero
                }
            } else {
                novoProcessoCompleto = {
                    ...processoDetails,
                    processoPrincipal: processoPrincipal.message
                }
            }
            setProcessoCompleto(novoProcessoCompleto)
            console.log(novoProcessoCompleto)
            exportProcessoToExcel(novoProcessoCompleto, 'detalhes_do_processo.xlsx')
        }
    }

    console.log(jurisdPrincipal)
    return (
        <Box >
            {processoDetails && (
                <Grid container spacing={3} sx={{ pb: 1, mt: 1 }}>
                    <Grid item xs={12} sm={12} >
                        <Paper sx={stylePaper} elevation={3}>
                            <Typography variant='h6' sx={{ color: '#991b1b', fontWeight: 'bold' }}>Detalhes do processo:</Typography>
                            <Typography sx={{ fontSize: 15 }}><strong>Relator(a):</strong> {processoDetails.relator.nome}</Typography>
                            <Typography sx={{ fontSize: 15 }}><strong>Procurador(a):</strong> {processoDetails.procurador.nome}</Typography>
                            <Typography sx={{ fontSize: 15 }}><strong>Advogado(a):</strong> {processoDetails.advogado.nome}</Typography>
                            <Typography sx={{ fontSize: 15 }}><strong>Unidade Gestora:</strong> {processoDetails.jurisd.nome}</Typography>
                            {processoPrincipal && (
                                <Typography sx={{ fontSize: 15 }}><strong>Processo Apenso:</strong> {processoPrincipal && 'message' in processoPrincipal
                                    ? processoPrincipal.message : processoPrincipal.numero
                                }</Typography>
                            )}
                            {processoDetails.interessados && processoDetails.interessados.length !== 0 && (
                                <Box sx={{ mt: 2 }}>
                                    <Button variant='outlined' onClick={() => handleModal('interessado')}>Interessados</Button>
                                </Box>
                            )}
                            {processoDetails.apensados && processoDetails.apensados.length !== 0 && (
                                <Box sx={{ mt: 2 }}>
                                    <Button variant='outlined' sx={{}} onClick={() => handleModal('apenso')}>Processos Apensados</Button>
                                </Box>
                            )}
                            <Box sx={{ mt: 2 }}>
                                <Button variant="contained" sx={{ bgcolor: '#ff3d00', '&:hover': { bgcolor: '#b22a00' } }}
                                    onClick={mergeData}>
                                    <FileDownloadIcon sx={{ pr: 1 }} /> Exportar dados
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                    <ModalShowDetails Details={processoDetails} dataType={buttonType} open={openModal} onClose={handleClose}
                    />
                </Grid>
            )}
            {jurisdDetails && (
                  <Grid container spacing={3} sx={{ pb: 1, mt: 1 }}>
                  <Grid item xs={12} sm={12} >
                      <Paper sx={stylePaper} elevation={3}>
                          <Typography variant='h6' sx={{ color: '#991b1b', fontWeight: 'bold', mb:2 }}>Detalhes da Unidade Gestora:</Typography>
                        
                          {jurisdPrincipal && (
                              <Typography sx={{ fontSize: 15 }}><strong>Unidade Principal:</strong> {typeof jurisdPrincipal === 'string'? jurisdPrincipal : jurisdPrincipal.message}</Typography>
                          )}
                          {jurisdDetails.processos && jurisdDetails.processos.length !== 0 && (
                              <Box sx={{ mt: 2 }}>
                                  <Button variant='outlined' onClick={() => handleModal('processo')}>relação de processos</Button>
                              </Box>
                          )}
                          {jurisdDetails.pessoaJurisds && jurisdDetails.pessoaJurisds.length !== 0 && (
                              <Box sx={{ mt: 2 }}>
                                  <Button variant='outlined'  onClick={() => handleModal('pessoajurisd')}>relação de Jurisdicionados</Button>
                              </Box>
                          )}
                          <Box sx={{ mt: 2 }}>
                              <Button variant="contained" sx={{ bgcolor: '#ff3d00', '&:hover': { bgcolor: '#b22a00' } }}
                                  onClick={mergeData}>
                                  <FileDownloadIcon sx={{ pr: 1 }} /> Exportar dados
                              </Button>
                          </Box>
                      </Paper>
                  </Grid>
                  <ModalShowDetails jurisdDetails={jurisdDetails} dataType={buttonType} open={openModal} onClose={handleClose}
                    />
              </Grid>
            )}
        </Box>

    );
}

export default InfoPaperProcessoDetails;
