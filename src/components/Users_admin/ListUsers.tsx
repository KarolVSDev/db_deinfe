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


export default function ListUsers() {

    const [users, setUsers] = useState<AllUsers[]>()
    const [idUser, setIdUser] = useState<AllUsers[]>()
    const [email, setEmail] = useState(localStorage.getItem('email'))

    const getUsers = () => {
        api.get('/usuario').then((response) => {
            setUsers(response.data)
        }).catch((error) => {
            console.error('erro ao trazer os dados', error)
        })
    }
    const getUser = async() => {
        await api.get(`/usuario/login/${email}`).then((response) => {
          let data = response.data;
          delete data.createAt;
          delete data.updateAt;
          setIdUser(data)
        }).catch((error) => {
          console.error('Erro ao buscar dados de usuário', error)
        })
      }
    
    // const removeUser = () => {
    //     let iduser = 
    //     // api.delete(`/usuario/${}`)

    // }
    
    useEffect(() => {
        getUsers()
        getUser()
    },[])
    

    return (
        <Grid container >{users?.map((user:any) => (
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mb:2}}>
                <ListItem alignItems="flex-start"  >
                    <ListItemText
                    primary={user.nome}
                    secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {user.email}
                        <br/>
                        </Typography>
                        {`id: ${user.id}`}
                        </React.Fragment>
                    }
                    />
                    <br/>
                    <Box sx={{display:'flex', flexDirection:'column'}}>
                        <Button onClick={() => removeUser()} variant='contained' color='error' sx={{mb:1}}>Excluir</Button>
                        <Button variant='contained' color='secondary'>Atualizar</Button>
                    </Box>
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>
        ))}</Grid>
        
  );
}
