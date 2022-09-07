import { Button, Grid, Paper } from '@mui/material';
import * as React from 'react';
import CabinsForm from './form-components/cabins-comp';
import CompanyForm from './form-components/company-comp';
import AlertsForm from './form-components/alerts-comp';
import ServicesForm from './form-components/services-comp';
import UsersForm from './form-components/users-comp';
import { useTranslation } from 'react-i18next';
import BlueprintForm from './form-components/blueprint-comp';


const initValue = {
    company: true,
    users: false,
    services: false,
    cabins: false,
    alerts: false
}

export default function SetupForm() {
    const [selected, setSelected] = React.useState(initValue);
    const [showTabs, setShowTabs] = React.useState("company") // none, company, users, alerts, cabins, services
    const { t } = useTranslation();

    const buttonClick =(event)=>{
        setSelected({[event.target.name] : true})
        setShowTabs(event.target.name);
    }

    return (
        <React.Fragment>
            
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', mb:2 }}>
            <Grid container spacing={1}>
             <Grid item xs={12}>
             
                  <Button color={showTabs === "company"?"secondary":"primary"}  name='company' onClick={buttonClick} variant='outlined' sx={{mr:2, mt:2}}>{t("company")}</Button>
                  <Button color={showTabs === "users"?"secondary":"primary"} name='users' onClick={buttonClick} variant='outlined'  sx={{mr:2, mt:2}}>{t("users")}</Button>
                  <Button color={showTabs === "alerts"?"secondary":"primary"} name='alerts' onClick={buttonClick} variant='outlined'  sx={{mr:2, mt:2}}>{t("alerts")}</Button>
                  <Button color={showTabs === "cabins"?"secondary":"primary"} name='cabins' onClick={buttonClick} variant='outlined'  sx={{mr:2, mt:2}}>{t("physicalspace")}</Button>
                  <Button color={showTabs === "services"?"secondary":"primary"} name='services' onClick={buttonClick} variant='outlined'  sx={{mr:2, mt:2}}>{t("services")}</Button>
                  <Button color={showTabs === "blueprint"?"secondary":"primary"} name='blueprint' onClick={buttonClick} variant='outlined'  sx={{mr:2, mt:2}}>{t("blueprint")}</Button>
                  </Grid>  
             </Grid>    
             </Paper>
             
           
           {selected.company? <CompanyForm />:<></>}
           {selected.users? <UsersForm />:<></>}
           {selected.services? <ServicesForm />:<></>}
           {selected.cabins? <CabinsForm />:<></>}
           {selected.alerts? <AlertsForm />:<></>}
           {selected.blueprint? <BlueprintForm />:<></>}
        </React.Fragment>
    )
}