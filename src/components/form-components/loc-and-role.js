import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { nc_locale_Commit, nc_role_Commit } from '../../slices/newCustomer-slice';
import configData from "../../assets/data/config-data.json"
import { locale } from 'moment';


const localization = configData[0].user[0].locales;
locale(localization);

export const LocAndRoleForm = (props) =>{
    const newUserSelector =  useSelector(state => state.newCustomer);
    const InitData = {
        locale: localization,
        role: "user"
    }
    const dispatch = useDispatch();
    const [locAndRoleFrmData, setLocAndRoleFrmData] = React.useState(InitData);

    React.useEffect (()=>{
        if (props.editUser){
            const InitData2 = {
                locale: newUserSelector.locale,
                role: newUserSelector.role,
            }
  
            setLocAndRoleFrmData(InitData2)
        }
    
      },[props, newUserSelector.locale, newUserSelector.role])

    const { t } = useTranslation();

    const handleLocaleChange= (event) => {
        setLocAndRoleFrmData({...locAndRoleFrmData, "locale": event.target.value})
        dispatch(nc_locale_Commit( event.target.value))

      };
    const handleRoleChange= (event) => {
        setLocAndRoleFrmData({...locAndRoleFrmData, "role": event.target.value})
        dispatch(nc_role_Commit(event.target.value))
      };

    return (
        <React.Fragment>
            <Card sx={{ display: 'flex',  width: '100%'  }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', m:2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%', mb:14 }}>
                    <FormControl variant="standard" sx={{  minWidth: 120, mr:2, width:300, 
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "left" }}>
                    <InputLabel sx={{mr:2}} id="language">{t("language")}</InputLabel>
                        <Select
                            labelId="language"
                            id="language"
                            value={locAndRoleFrmData.locale}
                            onChange={handleLocaleChange}
                            label={t("language")}
                            >
                                {configData[0].languages.map((option) => (
                                    <MenuItem key={option.id} value={option.code}>
                                    {option.name}
                                    </MenuItem>
                                ))}
                        </Select>
                        </FormControl>
                    <FormControl variant="standard"sx={{  minWidth: 120, mr:2, width:300,
                         display: "flex",
                         flexDirection: "row",
                         alignItems: "left"}}>
                    <InputLabel sx={{mr:2}} id="role">{t("role")}</InputLabel>
                        <Select
                            labelId="role"
                            id="role"
                            value={locAndRoleFrmData.role}
                            onChange={handleRoleChange}
                            label={t("role")}
                            >
                            <MenuItem value={"admin"}>{t("admin")}</MenuItem>
                            <MenuItem value={"user"}>{t("user")}</MenuItem>
                            <MenuItem value={"other"}>{t("other")}</MenuItem>
                        </Select>
                        </FormControl>
                 </Box>
                </Box> 
            </Card>
        
        </React.Fragment>

    )
}
