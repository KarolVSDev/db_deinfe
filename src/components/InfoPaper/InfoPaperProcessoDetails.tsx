import { Box, Collapse, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { ProcessoDetails } from '../../types/types';
import { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';


interface DetailsProps {
    processoDetails: ProcessoDetails | undefined;
}

const stylePaper = {
    p: 2,
    width: '100%',
    minHeight: '110px',
    position: 'relative',
};


const InfoPaperProcessoDetails: React.FC<DetailsProps> = ({ processoDetails }) => {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

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
                            {processoDetails.apensados && processoDetails.apensados.length !== 0 && (
                                <Box sx={{ mt:2}}>
                                        <List>
                                            <ListItem>
                                                <ListItemButton id='apensado' onClick={handleClick}>
                                                    <ListItemText  sx={{ color: '#991b1b', fontWeight: 'bold', fontSize: 16 }} primary="Processos Apensados"/>
                                                    {open ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>
                                            </ListItem>
                                    {processoDetails.apensados.map((apenso, index) => (
                                        <Collapse in={open} timeout="auto" unmountOnExit>
                                        <List key={apenso.apensado.id} component="div" disablePadding>
                                          <ListItemButton  sx={{ pl: 4, py:0 }}>
                                            <ListItemText primary={`Número: ${apenso.apensado.numero} `} />
                                          </ListItemButton>
                                        </List>
                                      </Collapse>
                                    ))}
                                        </List>
                                        <List>
                                            <ListItem>
                                                <ListItemButton id='interessado' onClick={handleClick}>
                                                    <ListItemText  sx={{ color: '#991b1b', fontWeight: 'bold', fontSize: 16 }} primary="Interessados"/>
                                                    {open ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>
                                            </ListItem>
                                    {processoDetails.interessados.map((interesse, index) => (
                                        <Collapse in={open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                          <ListItemButton sx={{ pl: 4, py:0 }}>
                                            <ListItemText primary={`Interesse: ${interesse.interesse} `} />
                                            <ListItemText primary={`Interessado: ${interesse.pessoa.nome} `} />
                                          </ListItemButton>
                                        </List>
                                      </Collapse>
                                    ))}
                                        </List>
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Box>

    );
}

export default InfoPaperProcessoDetails;
