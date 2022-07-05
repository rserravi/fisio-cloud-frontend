import * as React from 'react';
import TextField from '@mui/material/TextField';
import { socialNetworks } from '../../utils/social-networks-utils';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import { useDispatch, useSelector } from 'react-redux';
import { nc_social1_Commit, nc_social2_Commit, nc_social3_Commit, nc_socialUser1_Commit, nc_socialUser2_Commit, nc_socialUser3_Commit } from '../../slices/newCustomer-slice';


export const SocialForm = (props) =>{
    const InitData = {
      social1: "Facebook",
      social2: "Twitter",
      social3: "Instagram",
      socialUser1:"@",
      socialUser2:"@",
      socialUser3:"@"
    }
    const dispatch = useDispatch();
    const [socialFrmData, setSocialFrmData] = React.useState(InitData);
    const newUserSelector =  useSelector(state => state.newCustomer);

    React.useEffect (()=>{
      //console.log(props)
      if (props.editUser){
          const InitData2 = {
            social1: newUserSelector.social1,
            social2: newUserSelector.social2,
            social3 :newUserSelector.social3,
            socialUser1:newUserSelector.socialUser1,
            socialUser2:newUserSelector.socialUser2,
            socialUser3:newUserSelector.socialUser3,
          }
          setSocialFrmData(InitData2)
      }
  
    },[
      props.editUser,
      newUserSelector.social1,
      newUserSelector.social2,
      newUserSelector.social3,
      newUserSelector.socialUser1,
      newUserSelector.socialUser2,
      newUserSelector.socialUser3,
    ])

    const { t } = useTranslation();

       
    const handleChangeSocial1 = (event) => {
      setSocialFrmData({...socialFrmData, "social1": event.target.value})
      dispatch(nc_social1_Commit(event.target.value))
    
    };
    const handleChangeSocial2 = (event) => {
      setSocialFrmData({...socialFrmData, "social2": event.target.value})
      dispatch(nc_social2_Commit(event.target.value))
    
    };
    
    const handleChangeSocial3 = (event) => {
      setSocialFrmData({...socialFrmData, "social3": event.target.value})
      dispatch(nc_social3_Commit(event.target.value))
    
    };

    const handleChangeSocialUser1 = (event) => {
      setSocialFrmData({...socialFrmData, "socialUser1": event.target.value})
      dispatch(nc_socialUser1_Commit(event.target.value))
    
    };

    const handleChangeSocialUser2 = (event) => {
      setSocialFrmData({...socialFrmData, "socialUser2": event.target.value})
      dispatch(nc_socialUser2_Commit(event.target.value))
    
    };

    const handleChangeSocialUser3 = (event) => {
      setSocialFrmData({...socialFrmData, "socialUser3": event.target.value})
      dispatch(nc_socialUser3_Commit(event.target.value))
    
    };

    return (
        <React.Fragment>
            <Card sx={{ display: 'flex',  width: '100%'  }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', m:2 }}>
           
            <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%' }}>
              
                <TextField
                    id="social1"
                    label="Social Media 1"
                    name= "social1"
                    select
                    helperText={t("selectasocialnetwork")}
                    variant="standard"
                    value={socialFrmData.social1}
                    onChange={handleChangeSocial1}
                    fullWidth
                    sx = {{mr:2, textAlign:'left'}}
                    >
                    {socialNetworks.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                          <ListItemIcon>
                            {option.icon}
                            {option.value}
                          </ListItemIcon>
                      </MenuItem>
                    ))}  
                </TextField>
                <TextField
                    id="social2"
                    label="Social Media 2"
                    name= "social2"
                    select
                    helperText={t("selectasocialnetwork")}
                    variant="standard"
                    value={socialFrmData.social2}
                    fullWidth
                    onChange={handleChangeSocial2}
                    sx = {{mr:2, textAlign:'left'}}
                    >
                    {socialNetworks.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                          <ListItemIcon>
                            {option.icon}
                            {option.value}
                          </ListItemIcon>
                      </MenuItem>
                    ))}  
                </TextField>
                <TextField
                    id="social3"
                    label="Social Media 3"
                    name= "social3"
                    helperText={t("selectasocialnetwork")}
                    variant="standard"
                    value={socialFrmData.social3}
                    fullWidth
                    select
                    onChange={handleChangeSocial3}
                    sx = {{mr:2, textAlign:'left'}}
                    >
                    {socialNetworks.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                          <ListItemIcon>
                            {option.icon}
                            {option.value}
                          </ListItemIcon>
                      </MenuItem>
                    ))}  
                   </TextField>    
               
   
              </Box>
             
              <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%' }}>
                
                <TextField
                    id="socialUser1"
                    name="socialUser1"
                    label={t("socialmediauser")}
                    helperText={t("selectauser")}
                    variant="standard"
                    value={socialFrmData.socialUser1}
                    fullWidth
                    onChange={handleChangeSocialUser1}
                   
                    
                    />
                <TextField
                    id="socialUser2"
                    name="socialUser2"
                    label={t("socialmediauser")}
                    helperText={t("selectauser")}
                    variant="standard"
                    value={socialFrmData.socialUser2}
                    fullWidth
                    onChange={handleChangeSocialUser2}
                  
                    />

                <TextField
                    id="socialUser3"
                    name="socialUser3"
                    label={t("socialmediauser")}
                    helperText={t("selectauser")}
                    value={socialFrmData.socialUser3}
                    variant="standard"
                    fullWidth
                    onChange={handleChangeSocialUser3}
                    
                    />
              </Box>

              </Box>
            </Card>
        
        </React.Fragment>

    )
}
