import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import { Box, Button, Grid, InputAdornment } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { nc_homephone_Commit, nc_mobilephone_Commit, nc_whatsapp_Commit } from '../../slices/newCustomer-slice';

export const PhoneForm = (props) =>{
  const NcState = useSelector((state)=> state.newCustomer);

    const InitData = {
        homephone:  props.homephone,
        mobilephone: props.mobilephone,
        whatsapp: props.whatsapp
    }
    const dispatch = useDispatch();
    const [phoneFrmDta, setPhoneFrmData] = React.useState(InitData);

    React.useEffect (()=>{
      //console.log(props)
      if (props.editUser){
          const InitData2 = {
            homephone:  NcState.homephone,
            mobilephone: NcState.mobilephone,
            whatsapp: NcState.whatsapp
          }
          setPhoneFrmData(InitData2)
      }
  
    },[props,NcState.homephone, NcState.mobilephone, NcState.whatsapp])
   

    const { t } = useTranslation();

    const handleChangeHomePhone = (event) => {
      setPhoneFrmData({...phoneFrmDta, "homephone": event.target.value})
      dispatch(nc_homephone_Commit(event.target.value))
    
    };
    const handleChangeMobilePhone = (event) => {
      setPhoneFrmData({...phoneFrmDta, "mobilephone": event.target.value})
      dispatch(nc_mobilephone_Commit(event.target.value))

    };
    
    const handleChangeWhatsapp = (event) => {
      setPhoneFrmData({...phoneFrmDta, "whatsapp": event.target.value})
      dispatch(nc_whatsapp_Commit(event.target.value))

    };

    const WhatsappPick = () => {
    
      setPhoneFrmData({...phoneFrmDta, "whatsapp":phoneFrmDta.mobilephone});
      dispatch(nc_whatsapp_Commit(phoneFrmDta.mobilephone))
    }

    return (
        <React.Fragment>
            <Card sx={{ display: 'flex',  width: '100%'  }}>
           
            <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', m:2 }}>
                <Grid container>
                <Grid item xs={12} sm={3} md={3} sx={{mt:2, mr:1}} >
                  <TextField
                      id="homephone"
                      name="homephone"
                      label={t("home phone")}
                      helperText={t("enteravalidphone")}
                      variant="standard"
                      fullWidth
                      focused
                      value={phoneFrmDta.homephone}
                      onChange={handleChangeHomePhone}
                      sx = {{mr:2}}
                      
                    />
                    </Grid>
                     <Grid item xs={12} sm={3} md={3} sx={{mt:2, mr:1}} >
                    <TextField
                      id="mobilephone"
                      name="mobilephone"
                      label={t("mobile phone")}
                      helperText={t("enteravalidphone")}
                      variant="standard"
                      fullWidth
                      focused
                      value={phoneFrmDta.mobilephone}
                      sx = {{mr:2}}
                      onChange={handleChangeMobilePhone}
                      required
                      />
                    </Grid>
                    <Grid item xs={12} sm={5} md={5} sx={{mt:2, mr:1}} >
                    <TextField
                      id="whatsapp"
                      name="whatsapp"
                      label="Whatsapp"
                      focused
                      value = {phoneFrmDta.whatsapp}
                      helperText={t("enteravalidphone")}
                      variant="standard"
                      fullWidth
                      onChange={handleChangeWhatsapp}
                      InputProps={{
                        endAdornment: <InputAdornment position="start">
                        <Button size='small' onClick={WhatsappPick}>{t("pick form mobile")}</Button>
                        </InputAdornment>,
                    }}
                    />
                    </Grid>
                </Grid>
              </Box> 
                
            </Card>
         
        
        </React.Fragment>

    )
}
