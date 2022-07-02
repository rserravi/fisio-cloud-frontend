import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { nc_emailHome_Commit, nc_emailWork_Commit } from '../../slices/newCustomer-slice';


export const EmailForm = (props) =>{
  const newUserSelector =  useSelector(state => state.newCustomer);
    const InitData = {
        emailhome: props.emailhome,
        emailwork: props.emailwork,
    }
    const dispatch = useDispatch();
    const [emailFrmDta, setEmailFrmData] = React.useState(InitData);

    const { t } = useTranslation();

    const handleChangeHomeMail = (event) => {
        setEmailFrmData({...emailFrmDta, "emailhome": event.target.value})
        dispatch(nc_emailHome_Commit(event.target.value))
    
      };
    const handleChangeWorkEmail = (event) => {
        setEmailFrmData({...emailFrmDta, "emailwork": event.target.value})
        dispatch(nc_emailWork_Commit(event.target.value))

      };
    React.useEffect (()=>{
        //console.log(props)
        if (props.editUser){
            const InitData2 = {
                emailhome: newUserSelector.emailhome,
                emailwork: newUserSelector.emailwork,
            }
            setEmailFrmData(InitData2)
        }
    
      },[props, newUserSelector.emailhome,newUserSelector.emailwork])


    return (
        <React.Fragment>
            <Card sx={{ display: 'flex',  width: '100%'  }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', m:2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%',  }}>
                    <TextField
                      id="emailhome"
                      name='emailhome'
                      label={t("homemail")}
                      helperText={t("enteryour")+t("bestmail")+" ("+t("required")+")"}
                      variant="standard"
                      fullWidth
                      value={emailFrmDta.emailhome}
                      onChange={handleChangeHomeMail}
                      required
                      focused
                      sx = {{mr:2}}
                      />
                    <TextField
                      id="emailwork"
                      name="emailwork"
                      label={t("workmail")}
                      helperText={t("enteryour")+t("bestmail")+" ("+t("required")+")"}
                      variant="standard"
                      fullWidth
                      focused
                      value={emailFrmDta.emailwork}
                      sx = {{mr:2}}
                      onChange={handleChangeWorkEmail}
                      required
                      />
                </Box>

                </Box> 
            </Card>
        
        </React.Fragment>

    )
}
