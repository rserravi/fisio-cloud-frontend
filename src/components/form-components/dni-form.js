import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { nc_dni_Commit } from '../../slices/newCustomer-slice';
import configData from "../../assets/data/config-data.json"
import { locale } from 'moment';


const localization = configData[0].user[0].locales;
locale(localization);


export const DniForm = (props) =>{
    const newUserSelector =  useSelector(state => state.newCustomer);
    const InitData = {
        dni: props.dni,
    }
    

    const dispatch = useDispatch();
    const [dniFrmData, setDniFrmData] = React.useState(InitData);


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
    
      };

    return (
        <React.Fragment>
            <Card sx={{ display: 'flex',  width: '100%'  }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', m:2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%',  }}>
                    <TextField
                      id="dni"
                      name='dni'
                      label={t("dni")}
                      helperText={t("enteravalidId")}
                      variant="standard"
                      fullWidth
                      focused
                      value={dniFrmData.dni}
                      onChange={handleChangeDNI}
                      required
                      sx = {{mr:2}}
                      />
                </Box>
            </Box> 
            </Card>
        
        </React.Fragment>

    )
}
