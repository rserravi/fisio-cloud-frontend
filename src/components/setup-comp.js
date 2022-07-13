import { Button, Grid, Paper } from '@mui/material';
import * as React from 'react';
import CabinsForm from './form-components/cabins-comp';
import CompanyForm from './form-components/company-comp';
import AlertsForm from './form-components/alerts-comp';
import ServicesForm from './form-components/services-comp';
import UsersForm from './form-components/users-comp';
import { useTranslation } from 'react-i18next';


const initValue = {
    company: true,
    users: false,
    services: false,
    cabins: false,
    alerts: false
}

export default function SetupForm() {
    const [selected, setSelected] = React.useState(initValue);
    const { t } = useTranslation();

    const buttonClick =(event)=>{
        setSelected({[event.target.name] : true})
    }

    return (
        <React.Fragment>
            
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', mb:2 }}>
            <Grid container spacing={1}>
             <Grid item xs={12}>
             
                  <Button name='company' onClick={buttonClick} variant='outlined' sx={{mr:2, mt:2}}>{t("company")}</Button>
                  <Button name='users' onClick={buttonClick} variant='outlined'  sx={{mr:2, mt:2}}>{t("users")}</Button>
                  <Button name='alerts' onClick={buttonClick} variant='outlined'  sx={{mr:2, mt:2}}>{t("alerts")}</Button>
                  <Button name='cabins' onClick={buttonClick} variant='outlined'  sx={{mr:2, mt:2}}>{t("physicalspace")}</Button>
                  <Button name='services' onClick={buttonClick} variant='outlined'  sx={{mr:2, mt:2}}>{t("services")}</Button>
                  </Grid>  
             </Grid>    
             </Paper>
             
           
           {selected.company? <CompanyForm />:<></>}
           {selected.users? <UsersForm />:<></>}
           {selected.services? <ServicesForm />:<></>}
           {selected.cabins? <CabinsForm />:<></>}
           {selected.alerts? <AlertsForm />:<></>}
        </React.Fragment>
    )
}