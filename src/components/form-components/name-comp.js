import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import { Box, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { nc_birthdate_Commit, nc_firstName_Commit, nc_gender_Commit, nc_lastName_Commit } from '../../slices/newCustomer-slice';
import { locale } from 'moment';




export const NameForm = (props) =>{
    const newUserSelector =  useSelector(state => state.newCustomer);

    const localization = props.locale;
    locale(localization);
    const InitData = {
        firstname: props.firstname,
        lastname: props.lastname,
        birthdate: props.birthdate?props.birthdate:Date.now(),
        gender: props.gender
    }
    

    const dispatch = useDispatch();
    const [nameFrmDta, setNameFrmData] = React.useState(InitData);


    React.useEffect (()=>{
        //console.log(props)
        if (props.editUser){
            const InitData2 = {
                firstname: newUserSelector.firstname,
                lastname: newUserSelector.lastname,
                birthdate: newUserSelector.birthdate,
                gender:  newUserSelector.gender
            }
            setNameFrmData(InitData2)
        }
    
      },[props,newUserSelector.firstname,newUserSelector.lastname,newUserSelector.birthdate,newUserSelector.gender])
     

    const { t } = useTranslation();

    const handleChangeName = (event) => {
        setNameFrmData({...nameFrmDta, "firstname": event.target.value})
        dispatch(nc_firstName_Commit(event.target.value))
    
      };
    const handleChangeLastName= (event) => {
        setNameFrmData({...nameFrmDta, "lastname": event.target.value})
        dispatch(nc_lastName_Commit(event.target.value))

      };
    const handleGender= (event) => {
        setNameFrmData({...nameFrmDta, "gender": event.target.value})
        dispatch(nc_gender_Commit(event.target.value))

      };
    const handleBirthdate= (value) => {
        setNameFrmData({...nameFrmDta, "birthdate": value})
        console.log(value)
        dispatch(nc_birthdate_Commit(new Date (value).toLocaleDateString()))
      };

    return (
        <React.Fragment>
            <Card sx={{ display: 'flex',  width: '100%'  }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', m:2 }}>
                <Grid container justifyContent="flex-start" alignItems="flex-start"> 
                  <Grid item xs={12} sm={5} md={5} sx={{mt:2, mr:1}} >
                    <TextField
                      id="firstname"
                      name='firstname'
                      label={t("name")}
                      helperText={t("enterthe")+ " " +t("name")+" ("+t("required")+")"}
                      variant="standard"
                      fullWidth
                      width={600}
                      focused
                      value={nameFrmDta.firstname}
                      onChange={handleChangeName}
                      required
                      sx = {{mr:2}}
                      />
                </Grid>
                <Grid item xs={12} sm={6} md={6} sx={{mt:2, mr:1}} >
                    <TextField
                      id="lastname"
                      name="lastname"
                      label={t("lastname")}
                      helperText={t("enterthePlural")+ " " +t("lastname")+" ("+t("required")+")"}
                      variant="standard"
                      fullWidth
                      focused
                      value={nameFrmDta.lastname}
                      sx = {{mr:2}}
                      onChange={handleChangeLastName}
                      required
                      />
                    </Grid>
               
                <Grid item xs={12} sm={6} md={6} sx={{mt:2, mr:1}} >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            label={t("birthdate")}
                            value={nameFrmDta.birthdate}
                            variant="standard"
                            sx = {{mr:2}}
                            onChange={handleBirthdate}
                            renderInput={(params) => <TextField variant="standard" fullWidth sx = {{mr:2}} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={5} md={5} sx={{mt:2, mr:1}} >
                    <FormControl variant="standard" fullWidth sx={{  minWidth: 120 } }>
                    <InputLabel id="gender">{t("gender")}</InputLabel>
                        <Select
                            labelId="gender"
                            id="gender"
                            value={nameFrmDta.gender}
                            onChange={handleGender}
                            label={t("gender")}
                            >
                            <MenuItem value={"none"}>{t("none")}</MenuItem>
                            <MenuItem value={"female"}>{t("female")}</MenuItem>
                            <MenuItem value={"male"}>{t("male")}</MenuItem>
                            <MenuItem value={"other"}>{t("other")}</MenuItem>
                        </Select>
                        </FormControl>
                </Grid>
                </Grid>
                </Box> 
            </Card>
        
        </React.Fragment>

    )
}
