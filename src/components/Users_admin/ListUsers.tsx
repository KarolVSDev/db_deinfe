import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { api } from '../../service/api';
import { useState, useEffect } from 'react';
import { AllUsers } from '../../types/types';
import { Box, Button, Grid } from '@mui/material';
import { TypeInfo } from '../../hooks/TypeAlert';
import ModalAddUser from '../Modais/ModalAddUser';
import ModalUpdateUser from '../Modais/ModalUpdateUser';


export default function ListUsers() {

    const [users, setUsers] = useState<AllUsers[]>()

    const getUsers = () => {
        api.get('/usuario').then((response) => {
            setUsers(response.data)
        }).catch((error) => {
            console.error('erro ao trazer os dados', error)
        })
    }

    const removeUser = (userId:string) => {
        api.delete(`/usuario/${userId}`).then((response:any) => {
            TypeInfo(response.data.message, 'success')
        }).catch((error:any) => {
            TypeInfo(error.response.data.message, 'error')
        })
        
    }

   useEffect(() => {
        getUsers()
    },[])

    

    return (
        <Grid sx={{overflowY:'auto', height:'95vh', scrollbarWidth:'thin', pt:10, pl:2, pr:2}} >
            <ModalAddUser/>
            <Grid container >{users?.map((user:any) => (
                <List key={user.id} sx={{ width: '100%', maxWidth: 380, bgcolor: 'background.paper', mb:2}}>
                    <ListItem  alignItems="flex-start"  >
                        <ListItemText
                        primary={user.nome}
                        secondary={
                            <React.Fragment>
                            <Typography
                                sx={{ display: 'inline', fontSize:16 }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {user.email}
                            <br/>
                            </Typography>
                            <Typography component='span' >
                                {user.cargo}
                            </Typography>
                            <Typography component='span' sx={{display:'none'}}>
                                {user.id}
                            </Typography>
                            </React.Fragment>
                        }
                        />
                        <br/>
                        <Box sx={{display:'flex', flexDirection:'column'}}>
                            <Button onClick={() => removeUser(user.id)}variant='outlined' color='error' sx={{mb:1}}>Excluir</Button>
                            <ModalUpdateUser userId = {user.id}/>
                        </Box>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List>
            ))}</Grid>
        </Grid>
  );
}
