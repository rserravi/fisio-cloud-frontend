import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import { Box, Button, InputAdornment } from '@mui/material';
import { useDispatch } from 'react-redux';
import { nc_homephone_Commit, nc_mobilephone_Commit, nc_whatsapp_Commit } from '../../slices/newCustomer-slice';


export const PhoneForm = (props) =>{
    const InitData = {
        phonehome: props.phonehome,
        mobilephone: props.mobilephone,
        whatsapp: props.whatsapp,
    }
    const dispatch = useDispatch();
    const [phoneFrmDta, setPhoneFrmData] = React.useState(InitData);

    const { t } = useTranslation();

    const handleChangeHomePhone = (event) => {
      setPhoneFrmData({...phoneFrmDta, ["homephone"]: event.target.value})
      dispatch(nc_homephone_Commit(event.target.value))
    
    };
    const handleChangeMobilePhone = (event) => {
      setPhoneFrmData({...phoneFrmDta, ["mobilephone"]: event.target.value})
      dispatch(nc_mobilephone_Commit(event.target.value))

    };
    
    const handleChangeWhatsapp = (event) => {
      setPhoneFrmData({...phoneFrmDta, ["whatsapp"]: event.target.value})
      dispatch(nc_whatsapp_Commit(event.target.value))

    };

    const WhatsappPick = () => {
    
      setPhoneFrmData({...phoneFrmDta, ["whatsapp"]:phoneFrmDta.mobilephone});
      dispatch(nc_whatsapp_Commit(phoneFrmDta.mobilephone))
    }

    return (
        <React.Fragment>
            <Card sx={{ display: 'flex',  width: '100%'  }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', m:2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%',  }}>
                  <TextField
                      id="homephone"
                      name="homephone"
                      label={t("home phone")}
                      helperText={t("enteravalidphone")}
                      variant="standard"
                      fullWidth
                      value={phoneFrmDta.homephone}
                      onChange={handleChangeHomePhone}
                      sx = {{mr:2}}
                      
                    />
                    <TextField
                      id="mobilephone"
                      name="mobilephone"
                      label={t("mobile phone")}
                      helperText={t("enteravalidphone")}
                      variant="standard"
                      fullWidth
                      value={phoneFrmDta.mobilephone}
                      sx = {{mr:2}}
                      onChange={handleChangeMobilePhone}
                      required
                      />
                    <TextField
                      id="whatsapp"
                      name="whatsapp"
                      label="Whatsapp"
                      value = {phoneFrmDta.whatsapp}
                      helperText={t("enteravalidphone")}
                      variant="standard"
                      fullWidth
                      onChange={handleChangeWhatsapp}
                      focused
                      InputProps={{
                        endAdornment: <InputAdornment position="start">
                        <Button size='small' onClick={WhatsappPick}>{t("pick form mobile")}</Button>
                        </InputAdornment>,
                    }}
                    />
                </Box>
                </Box> 
            </Card>
        
        </React.Fragment>

    )
}
