import { Button, Grid, Paper } from '@mui/material';
import * as React from 'react';
import CabinsForm from './form-components/cabins-comp';
import CompanyForm from './form-components/company-comp';
import RolesForm from './form-components/roles-comp';
import ServicesForm from './form-components/services-comp';
import UsersForm from './form-components/users-comp';
import { useTranslation } from 'react-i18next';


const initValue = {
    company: true,
    users: false,
    services: false,
    cabins: false,
    roles: false
}

export default function SetupForm() {
    const [selected, setSelected] = React.useState(initValue);
    const { t } = useTranslation();

    const buttonClick =(event)=>{
        setSelected({[event.target.name] : true})
    }

    return (
        <React.Fragment>
            <Grid container spacing={1}>
             <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', mb:2 }}>
                  <Button name='company' onClick={buttonClick} variant='outlined' sx={{mr:2}}>{t("company")}</Button>
                  <Button name='users' onClick={buttonClick} variant='outlined' sx={{mr:2}}>{t("users")}</Button>
                  <Button name='roles' onClick={buttonClick} variant='outlined' sx={{mr:2}}>{t("usersroles")}</Button>
                  <Button name='cabins' onClick={buttonClick} variant='outlined' sx={{mr:2}}>{t("physicalspace")}</Button>
                  <Button name='services' onClick={buttonClick} variant='outlined' sx={{mr:2}}>{t("services")}</Button>
                  
                </Paper>
              </Grid>
            </Grid>
           {selected.company? <CompanyForm />:<></>}
           {selected.users? <UsersForm />:<></>}
           {selected.services? <ServicesForm />:<></>}
           {selected.cabins? <CabinsForm />:<></>}
           {selected.roles? <RolesForm />:<></>}
        </React.Fragment>
    )
}