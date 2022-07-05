import { Avatar, Button, Card, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { getNewUsersId, getUserList } from '../../utils/dataFetch-utils';
import { useTranslation } from 'react-i18next';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { navigationLoading, navigationSuccess } from '../../slices/navigation-slice';

export default function UsersForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const userList = getUserList();


    const SeeUser = (props) =>{
        const _id = props.currentTarget.name;
        const actualScreen = "/usersetup/" + _id.toString();
        dispatch(navigationLoading());
        navigate(actualScreen,{replace: true});
        dispatch(navigationSuccess(actualScreen))
    }

    const NewUser = (event) =>{
        console.log(event)
        const _id = event;
        const actualScreen = "/usersetup/" + _id.toString();
        dispatch(navigationLoading());
        navigate(actualScreen,{replace: true});
        dispatch(navigationSuccess(actualScreen)) 
    }
    
    return (
        <React.Fragment>
           <p> {t("users")}</p>
        <Button onClick ={(e)=>{
            e.stopPropagation();
            NewUser(getNewUsersId())}}>{t("adduser")
        }
        </Button>
        <Box >       
            <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12} sm={12} marginTop={3}>
           
               {userList.map((user, id)=>(
                
                   <Card key={id} sx={{ display: 'flex', width: '100%', mb: 2 }}>
                       <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', m: 2 }}>
                           <Avatar alt="image" src={user.image}></Avatar>
                           <Typography variant="h6" align='left' sx={{ ml: 2, width: 20 }}>{user.id.toString()}-</Typography>
                           <Typography variant="h6" align='left' sx={{ ml: 2, width: 250 }}>{user.firstname} {user.lastname}.</Typography>
                           <Typography variant="h6" align='left' sx={{ ml: 2, width: 80 }}>{user.role}</Typography>
                           <IconButton name={user.id} sx={{ ml: 4 }} onClick={SeeUser}>
                               <RemoveRedEyeIcon />
                           </IconButton>
                           <IconButton sx={{ mr: 2 }}>
                               <DeleteForeverIcon />
                           </IconButton>
                           <Typography variant="h6" align='left' sx={{ ml: 2, width: 300 }}> Last Login: </Typography>
                       </Box>
                   </Card>
               ))}
               
                    
                </Grid>
            </Grid>
        </Box>

        </React.Fragment>
    )
}