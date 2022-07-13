// REACT
import * as React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { navigationFail, navigationSuccess } from '../slices/navigation-slice';
import { useTranslation } from 'react-i18next';
// MUI

import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { paperColor } from '../utils/mui-custom-utils';
import { AppBar, Button, Divider, Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
//MUI ICONS

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { GenderIcon } from '../utils/mui-custom-utils';
import PointOfSaleIcon from '@mui/icons-material/PointOfSaleTwoTone';
import ScheduleIcon from '@mui/icons-material/ScheduleTwoTone';
import EmailIcon from '@mui/icons-material/EmailTwoTone';

//CUSTOM IMPORTS
import { findSocialIcon } from '../utils/social-networks-utils';
import { firstItemId, getCustomer, lastItemId } from '../utils/dataFetch-utils';
import { getAge } from '../utils/date-utils';
import { CommTab } from './form-components/comm-tab-comp';

export default function SeeCustomerComponent(props) {
    const _id = Number(props._id);
    const locale = props.locale;
    const customer = getCustomer(_id);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showTabs, setShowTabs] = React.useState("none") // none, appo, comm, depo
    const { t } = useTranslation();
    

    if (!customer){
        return (
            <b>SE HA PRODUCIDO UN ERROR</b>
        )
    }
    const colorPaperInbound = paperColor(customer.inbound)
    const history = customer.history;
    const appointments = customer.appointments;

   
    const SeeAllCustomers=(event)=>{
        event.stopPropagation();
        const actualScreen = "/customers";
        navigate(actualScreen, {replace: true});
        dispatch(navigationSuccess(actualScreen))
    }

    const SeePreviousCustomer = (event) =>{
        event.stopPropagation();
        if (_id <= Number(firstItemId())){
            const actualScreen = "/customer/"+lastItemId();
            navigate(actualScreen, {replace: true});
            dispatch(navigationSuccess(actualScreen))
        }else{
            const actualScreen = "/customer/" + (_id-1);
            navigate(actualScreen, {replace: true});
            dispatch(navigationSuccess(actualScreen))
        }
    }

    const SeeNextCustomer = (event) =>{
        event.stopPropagation();
        if (_id >= Number(lastItemId())){
            const actualScreen = "/customer/" + firstItemId();
            navigate(actualScreen, {replace: true});
            dispatch(navigationSuccess(actualScreen))
        }else{
            const actualScreen = "/customer/" + (_id+1);
            navigate(actualScreen, {replace: true});
            dispatch(navigationSuccess(actualScreen))
        }
    }

    const seeCalendar = (event) =>{
        event.stopPropagation();
        console.log ("Ver Calendario")
       
    }

    const addNewAppointment = (event) =>{
        event.stopPropagation();
        const actualScreen = "/addappointment/"+_id.toString()
        try {
            navigate(actualScreen, {replace: true});
            dispatch(navigationSuccess(actualScreen))
        } catch (error) {
            dispatch(navigationFail(error))
        }     
    }

    const SeeAppointments= (event)=>{
     
        const actualScreen = "/addappointment/"+_id.toString()+"/"+event
        try {
            navigate(actualScreen, {replace: true});
            dispatch(navigationSuccess(actualScreen))
        } catch (error) {
            dispatch(navigationFail(error))
        }     
    }

    const SeeAppointmentsTab = (event)=>{
        setShowTabs("appo");
    }
    const SeeDepositsTab = (event)=>{
        setShowTabs("depo")
    }
    const SeeCommunicationsTab = (event)=>{
        setShowTabs("comm")
    }

    const ButtonTabs = ()=>{
        return(
            <React.Fragment>
            <Grid container direction="row" justifyContent="flex-start" alignItems="baseline" sx={{mb:4}}>
                <Grid item xs={12} sm={4} md={4} sx={{mt:2}}>
                  <Button variant='contained' color={showTabs === "appo"?"secondary":"primary"} size="small" onClick={SeeAppointmentsTab} startIcon={<ScheduleIcon />}>{t("seeappointments")} </Button>
                </Grid>
                <Grid item xs={12} sm={4} md={4} sx={{mt:2}}>
                  <Button variant='contained' color={showTabs === "depo"?"secondary":"primary"} size="small" onClick={SeeDepositsTab} startIcon={<PointOfSaleIcon />}>{t("seedeposits")} </Button>
                </Grid>
                <Grid item xs={12} sm={4} md={4} sx={{mt:2}}>
                  <Button variant='contained' color={showTabs === "comm"?"secondary":"primary"} size="small" onClick={SeeCommunicationsTab} startIcon={<EmailIcon />}>{t("seecommunications")}</Button>
                </Grid>      
            </Grid>
          </React.Fragment>
        )
    }

    const CheckPendingNotes=()=>{

        const count = history.reduce((accumulatos, obj)=>{
         if (obj.status === "pending"){
             return accumulatos + Number(obj.price);
         }
         return accumulatos;
         
        }, 0);
     
          
         return (
             <React.Fragment>
             
             {count ?<Button color='error' sx={{ marginRight:2 }}> ¡{count}€ {t("missing")}!</Button>:<Button color='success'> 
             {t("nodebts")}</Button>}
            
            </React.Fragment>
         )
     }


    const BirthdateText = () =>{
        if (customer.birthdate){
            return(
                <React.Fragment>
                    <b>{new Date(customer.birthdate).toLocaleDateString(locale)} </b> {t("age")}: <b> {getAge(new Date (customer.birthdate))}</b>
                </React.Fragment>
            )
        }
        else{
            return (
                <React.Fragment>
                    {t("notavailable")}
                </React.Fragment>
            )
        }
    }

    const AppoTab = () =>{
        return (
            <React.Fragment>
                appo
            </React.Fragment>
        )
    }

    const DepoTab = () =>{
        return (
            <React.Fragment>
                depo
            </React.Fragment>
        )
    }

  
  //MAIN DOM RETURN
  
  if (customer){
  return (
    <React.Fragment>
        <AppBar position='static' color="transparent" >
            <Toolbar>
                <Typography variant="h5" component="h1" align='left' sx={{ flexGrow: 1 }}>
                    {customer.firstname} {customer.lastname} 
                   
                </Typography>
              
                    {CheckPendingNotes()}
                    

                    <Button variant="contained" key={"todos los clientes"} onClick={SeeAllCustomers}>
                        {t("allcustomers")}
                    </Button>
                    <IconButton color="primary" aria-label="backwards" component="span" onClick={SeePreviousCustomer}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="forward" component="span" onClick={SeeNextCustomer}>
                        <ChevronRightIcon />
                    </IconButton>
            </Toolbar>
          
        </AppBar>
        <Divider sx={{mb:2}} />
        <ButtonTabs />

        {/* GRID PRINCIPAL CONTENEDOR*/}
        <Grid container direction="row" spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start" sx={{p:2}}> 
            
            {/* Columna 1*/}
            <Grid item xs={12} md={2} sm={2}>
            <CardMedia
                    component="img"
                    sx={{ width: 180, align:'center' }}
                    image={"/images/" + customer.image}
                    alt="Foto"
                />
                    <Paper
                        sx={{bgcolor:colorPaperInbound.back, color:colorPaperInbound.front, marginY:1}}                  
                    >
                        <Typography variant='p' component="p">{t(customer.inbound)}</Typography>
                    </Paper> 
                    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start"> 
                        <Grid item xs={12} md={12} sm={12}>
                            <Button variant="contained" color="success" sx={{mb:1, mt:3}}>{t("nextappointments")} {customer.appointments.length}</Button>
                        </Grid>
                        <Grid item xs={12} md={12} sm={12}>
                            <Button variant="contained" color="warning" sx={{mb:1}}>{t("pastappointments")} {customer.appointments.length}</Button>
                        </Grid>
                    </Grid>
            </Grid>
            
            {/* Columna 2*/}
            <Grid item xs={12} md={10} sm={10} >
                <Grid container direction="row" spacing={2} justifyContent="flex-start" alignItems="flex-start"> 
                    {/* Columna 2 - 1 */}
                    <Grid item xs={12} md={6} sm={6}>
                        <Paper sx={{p:1, mb:2, width:"100%"}}>
                        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start"> 
                            <Grid item  xs={12} md={12} sm={12}>
                                <Typography variant="p" component="p" align='left' sx={{ flexGrow: 1 }}>{t("name")}: <b>{customer.firstname} {customer.lastname}</b>. {t("gender")}: <GenderIcon name={customer.gender} /> ({t(customer.gender)})</Typography>
                                <Typography variant="p" component="p" align='left' sx={{ flexGrow: 1 }}>{t("birthdate")}: <BirthdateText /></Typography>
                                <Typography variant="p" component="p" align='left' sx={{ flexGrow: 1 }}>{t("dni")}: <b>{customer.dni}</b></Typography>
                                <Typography variant="p" component="p" align='left' sx={{ flexGrow: 1 }}>{t("addedat")}: {customer.addedAt}</Typography>
                            </Grid>
                            <Grid item>
                                <Button align='left'>{t("edit")} {t("name")}</Button>
                            </Grid>
                        </Grid>
                        </Paper>
                        <Paper sx={{p:1, mb:2, width:"100%"}}>
                        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start"> 
                            <Grid item  xs={12} md={12} sm={12}>
                                
                                <Typography component="div" variant="p" align='left' >
                                {customer.socialMedia[0] ? findSocialIcon(customer.socialMedia[0].media):<></>} {customer.socialMedia[0] ? customer.socialMedia[0].user : <></> } 
                                </Typography>
                                <Typography component="div" variant="p" align='left'>
                                {customer.socialMedia[1] ? findSocialIcon(customer.socialMedia[1].media):<></>} {customer.socialMedia[1] ? customer.socialMedia[1].user : <></> }
                                </Typography>
                                <Typography component="div" variant="p" align='left'>
                                {customer.socialMedia[2] ? findSocialIcon(customer.socialMedia[2].media):<></>} {customer.socialMedia[2] ? customer.socialMedia[2].user : <></> }
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button align='left'>{t("edit")} {t("SOCIALNETWORKS")}</Button>
                            </Grid>
                        </Grid>
                        </Paper>
                    </Grid>
                    {/* Columna 2 - 2 */}
                    <Grid item xs={12} md={6} sm={6}>
                        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start"> 
                            <Paper sx={{p:1, width:"100%", mb:2}}>
                                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start"> 
                                    <Grid item>
                                        <Typography variant="p" component="p" align='left' sx={{ flexGrow: 1 }}>{t("email")} {t("home")}: {customer.email[0]?<Button size='small'>{customer.email[0].emailAddress}</Button>:<></>}</Typography>
                                        <Typography variant="p" component="p" align='left' sx={{ flexGrow: 1 }}>{t("email")} {t("work")}: {customer.email[1]?<Button size='small'>{customer.email[1].emailAddress}</Button>:<></>}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button align='left'>{t("edit")}</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Paper sx={{p:1, width:"100%", mb:2}}>
                                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start"> 
                                    <Grid item>
                                        <Typography variant="p" component="p" align='left' sx={{ flexGrow: 1 }}>{t("phone")} {t("home")}: {customer.phoneNumber[0]?<Button size='small'>{customer.phoneNumber[0].number}</Button>:<></>}</Typography>
                                        <Typography variant="p" component="p" align='left' sx={{ flexGrow: 1 }}>{t("phone")} {t("work")}: {customer.phoneNumber[1]?<Button size='small'>{customer.phoneNumber[1].number}</Button>:<></>}</Typography>
                                        <Typography variant="p" component="p" align='left' sx={{ flexGrow: 1 }}>{t("whatsapp")}: {customer.whatsapp?<Button size='small'>{customer.whatsapp}</Button>:<></>}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button align='left'>{t("edit")}</Button>
                                    </Grid>
                                 </Grid>
                            </Paper>
                            <Paper sx={{p:1, width:"100%", mb:2}}>
                                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start"> 
                                    <Grid item>
                                        <Typography variant="p" component="p" align='left' sx={{ flexGrow: 1 }}>
                                            {t("address")}: {customer.address.streetAddress}. {customer.address.postalCode} {customer.address.city} {customer.address.state}, {customer.address.country}.
                                        </Typography>
                                        
                                    </Grid>
                                    <Grid item>
                                        <Button align='left'>{t("edit")}</Button><Button align='left'>{t("seeingooglemaps")}</Button>
                                    </Grid>
                                 </Grid>
                            </Paper>
                        </Grid>
                    </Grid>             
                </Grid>
            </Grid>
        </Grid>
        <Grid container direction="row" spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start" sx={{p:2}}> 
        {showTabs==="appo"?<AppoTab locale={locale} />:<></>}
        {showTabs==="depo"?<DepoTab locale={locale}/>:<></>}
        {showTabs==="comm"?<CommTab locale={locale} customer={customer}/>:<></>}
        </Grid>
     
        
    </React.Fragment>
  )
  }else{return(
    <p>
       {t("anerrorocurred")}
    </p>
  )}
}
