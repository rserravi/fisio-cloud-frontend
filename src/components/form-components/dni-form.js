import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { Alert, Grid, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { nc_dni_Commit } from '../../slices/newCustomer-slice';
import configData from "../../assets/data/config-data.json"
import { locale } from 'moment';
import { validateDNI } from '../../utils/verification-utils';


export const DniForm = (props) =>{
    const newUserSelector =  useSelector(state => state.newCustomer);
    const localization = props.locale;
    locale(localization);       
    const InitData = {
        dni: props.dni,
    }
    

    const dispatch = useDispatch();
    const [dniFrmData, setDniFrmData] = React.useState(InitData);
    const [validated, setValidated] = React.useState(false);


    React.useEffect (()=>{
        //console.log(props)
        if (props.editUser){
            const InitData2 = {
                dni: newUserSelector.dni,
            }
            setDniFrmData(InitData2)
        }
    
      },[props,newUserSelector.dni])
     

    const { t } = useTranslation();

    const handleChangeDNI = (event) => {
        setDniFrmData({...dniFrmData, "dni": event.target.value})
        dispatch(nc_dni_Commit(event.target.value))
        setValidated(validateDNI(event.target.value))
    
      };

    return (
        <React.Fragment>
            <Paper>
                <Grid container sx={{m:2}}>
                    <Grid xs={11} sm={11} md={11} item sx={{mr:2}}>
                    <TextField
                      id="dni"
                      name='dni'
                      label={t("dni")}
                      variant="standard"
                      fullWidth
                      focused
                      value={dniFrmData.dni}
                      onChange={handleChangeDNI}
                      required
                      sx={{mr:2}}
                      />
                    </Grid>
                    <Grid xs={11} sm={11} md={11} item sx={{mt:2, mb:2}}>
                    {validated?<Alert severity='success'>{t("correctDNI")}</Alert>:<Alert severity='error'>{t("enteravalidId")}</Alert>}
                    </Grid>
                </Grid>
               
            </Paper>
        
        </React.Fragment>

    )
}
