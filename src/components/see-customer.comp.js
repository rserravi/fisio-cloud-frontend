// REACT
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { navigationFail, navigationForceActualScreen, navigationSuccess } from '../slices/navigation-slice';
import { useTranslation } from 'react-i18next';
// MUI

import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { paperColor } from '../utils/mui-custom-utils';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';

//MUI ICONS
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { GenderIcon } from '../utils/mui-custom-utils';
import PointOfSaleIcon from '@mui/icons-material/PointOfSaleTwoTone';
import ScheduleIcon from '@mui/icons-material/ScheduleTwoTone';
import EmailIcon from '@mui/icons-material/EmailTwoTone';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';

//CUSTOM IMPORTS
import { findSocialIcon } from '../utils/social-networks-utils';
import { notAnsweredMessages } from '../utils/dataFetch-utils';
import { getAge } from '../utils/date-utils';
import { CommTab } from './tabs/comm-tab-comp';
import { AppoTab } from './tabs/appo-tab-comp';
import { nc_loadFromBackend } from '../slices/newCustomer-slice';
import { HistTab } from './tabs/hist-tab-comp';
import { NameForm } from './form-components/name-comp';
import { DniForm } from './form-components/dni-form';
import { EmailForm } from './form-components/emails-comp';
import { SocialForm } from './form-components/social-comp';
import { PhoneForm } from './form-components/phones-comp';
import { AddressForm } from './form-components/address-comp';
import { GetCustomer } from '../api/customer.api';

export default function SeeCustomerComponent(props) {
    const locale = props.locale;
    const customer = props._customer;
    const _id = customer._id;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showTabs, setShowTabs] = React.useState(props._tab?props._tab:"none") // none, appo, comm, depo, hist
    const [editNameDialog, setNameDialogOpen]= React.useState(false);
    const [editMailsDialog, setMailsDialogOpen]= React.useState(false);
    const [editPhonesDialog, setPhonesDialogOpen]= React.useState(false);
    const [editSocialDialog, setSocialDialogOpen]= React.useState(false);
    const [editAddressDialog, setAddressDialogOpen]= React.useState(false);
    const customerSelector = useSelector((state)=>state.newCustomer);

    const { t } = useTranslation();
    
    React.useEffect(()=>{
        //console.log("CUSTOMER AT USE EFFECT SEE-CUSTOMER", customer)
        dispatch(nc_loadFromBackend(customer));
       

    },[customer, dispatch])

    if (!customer){
        return (
            <b>SE HA PRODUCIDO UN ERROR</b>
        )
    }
    const colorPaperInbound = paperColor(customer.inbound)
    const history = customer.history;
   
    const SeeAllCustomers=(event)=>{
        event.stopPropagation();
        const actualScreen = "/customers";
        navigate(actualScreen, {replace: true});
        dispatch(navigationSuccess(actualScreen))
    }

    const SeePreviousCustomer = async (event) =>{
        event.stopPropagation();
        const actualScreen = "/customer/"+customer.prev_customer
        await GetCustomer(customer.prev_customer).then(data =>{
            dispatch(nc_loadFromBackend(data.result));
            navigate(actualScreen, {replace: true});
            navigate(0);
            dispatch(navigationSuccess(actualScreen))
            setShowTabs("none")
        })
        
    }

    const SeeNextCustomer = async (event) =>{
        event.stopPropagation();
        const actualScreen = "/customer/"+customer.next_customer
        await GetCustomer(customer.next_customer).then(data =>{
            dispatch(nc_loadFromBackend(data.result));
            navigate(actualScreen, {replace: true});
            navigate(0);
            dispatch(navigationSuccess(actualScreen))
            setShowTabs("none")
        })  
        
    }

    const sendEmail = (event)=>{
        console.log(event.target.outerText)
        const actualScreen = "/addcommunication/"+_id.toString()+"/0/2/" + event.target.outerText;
        try {
            navigate(actualScreen, {replace: true});
            dispatch(navigationSuccess(actualScreen))
        } catch (error) {
            dispatch(navigationFail(error))
        }     
    }

    const callPhone = (event)=>{
        console.log(event.target.outerText)
        const actualScreen = "/addcommunication/"+_id.toString()+"/0/1/" + event.target.outerText;
        try {
            navigate(actualScreen, {replace: true});
            dispatch(navigationSuccess(actualScreen))
        } catch (error) {
            dispatch(navigationFail(error))
        }     
    }

    const seeInGoogleMaps = (event)=>{
        console.log(event)
        event.stopPropagation();
        var url = "https://maps.google.com/?q="+customer.streetaddress +" "+ customer.postalcodeaddress+" "+customer.cityaddress+" "+customer.stateaddress+", "+customer.countryaddress
        console.log(url)
        window.open(url);   
    }

    const SeeAppointmentsTab = (event)=>{
        setShowTabs("appo");
        dispatch(navigationForceActualScreen("/customer/"+_id +"/appo"))
    }
    const SeeDepositsTab = (event)=>{
        setShowTabs("depo")
        dispatch(navigationForceActualScreen("/customer/"+_id +"/depo"))
    }
    const SeeCommunicationsTab = (event)=>{
        setShowTabs("comm")
        dispatch(navigationForceActualScreen("/customer/"+_id +"/comm"))
    }
    const SeeHistoryTab = (event)=>{
        setShowTabs("hist")
        dispatch(navigationForceActualScreen("/customer/"+_id +"/hist"))
    }

    const editNameDialogClick = (event)=>{
        event.stopPropagation();
        setNameDialogOpen(true);
    }
    const editMailDialogClick = (event)=>{
        event.stopPropagation();
        setMailsDialogOpen(true);
    }
    const editSocialDialogClick = (event)=>{
        event.stopPropagation();
        setSocialDialogOpen(true);
    }
    const editAddressDialogClick = (event)=>{
        event.stopPropagation();
        setAddressDialogOpen(true);
    }
    const editPhoneDialogClick = (event)=>{
        event.stopPropagation();
        setPhonesDialogOpen(true);   
    }

    const closeDialogs = (event)=>{
        event.stopPropagation();
        setNameDialogOpen(false);
        setMailsDialogOpen(false);
        setSocialDialogOpen(false);
        setAddressDialogOpen(false);
        setPhonesDialogOpen(false);   
    }

    const ButtonTabs = ()=>{
        return(
            <React.Fragment>
            <Grid container direction="row" justifyContent="space-around" alignItems="baseline"  marginBottom={2}>
                <Grid item xs={12} sm={2.8} md={2.8} sx={{mt:1}}>
                  <Button 
                    fullWidth 
                    variant='outlined' 
                    color={showTabs === "appo"?"secondary":"primary"} size="small" 
                    onClick={SeeAppointmentsTab} 
                    startIcon={<ScheduleIcon />}
                    >{t("seeappointments")} 
                 </Button>
                </Grid>
                <Grid item xs={12} sm={2.8} md={2.8} sx={{mt:1}}>
                  <Button 
                    fullWidth 
                    variant='outlined' 
                    color={showTabs === "hist"?"secondary":"primary"} 
                    size="small" 
                    onClick={SeeHistoryTab} 
                    startIcon={<AssignmentTwoToneIcon />}
                    >{t("seehistory")} 
                  </Button>
                </Grid>
                <Grid item xs={12} sm={2.8} md={2.8} sx={{mt:1}}>
                  <Button 
                    fullWidth 
                    variant='outlined'
                    color={showTabs === "depo"?"secondary":"primary"}
                    size="small" 
                    onClick={SeeDepositsTab} 
                    startIcon={<PointOfSaleIcon />}
                    >{t("seedeposits")} 
                  </Button>
                </Grid>
                <Grid item xs={12} sm={2.8} md={2.8} sx={{mt:1}}>
                  <Button 
                    fullWidth 
                    variant='outlined' 
                    color={showTabs === "comm"?"secondary":"primary"} 
                    size="small" 
                    onClick={SeeCommunicationsTab} 
                    startIcon={<EmailIcon />}
                    >{t("seecommunications")}
                  </Button>
                </Grid>      
            </Grid>
          </React.Fragment>
        )
    }

    const CheckPendingNotes=()=>{
        const count = history.reduce((accumulatos, obj)=>{
         if (obj.status === "pending"){
             return accumulatos + (Number(obj.price) - Number(obj.paid));
         }
         return accumulatos;      
        }, 0);
     
          
         return (
            <React.Fragment>
                {count ?<Button color='error' onClick={SeeDepositsTab} sx={{ marginRight:2 }}> ¡{count}€ {t("missing")}!</Button>:<Button onClick={()=>{setShowTabs("depo")}} color='success'> 
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
                    sx={{ width: 172, align:'center' }}
                    image={customer.image?"/images/" + customer.image:"/images/Portrait_Placeholder.png"}
                    alt="Foto"
                />
                    <Paper
                        sx={{bgcolor:colorPaperInbound.back, color:colorPaperInbound.front, marginY:1}}                  
                    >
                        <Typography variant='p' component="p">{t(customer.inbound)}</Typography>
                    </Paper> 
                    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start"> 
                        <Grid item xs={12} md={12} sm={12}>
                            <Button fullWidth variant="contained" color="success" sx={{mb:1, mt:3}} onClick={SeeAppointmentsTab}>{t("appointments")} {customer.appointments.length}</Button>
                        </Grid>
                        <Grid item xs={12} md={12} sm={12}>
                            <Button fullWidth variant="contained" color="warning" sx={{mb:1}} onClick={SeeHistoryTab}>{t("history")} {customer.history.length}</Button>
                        </Grid>
                        <Grid item xs={12} md={12} sm={12}>
                            <Button fullWidth variant="contained" color="error" sx={{mb:1}} onClick={SeeCommunicationsTab}>{t("notansweredmessages")} {notAnsweredMessages(customer.id)}</Button>
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
                                <Typography variant="p" component="p" align='left' sx={{ flexGrow: 1 }}>{t("addedat")} {new Date(customer.addedAt).toLocaleDateString(locale)} </Typography>
                            </Grid>
                            <Grid item>
                                <Button onClick={editNameDialogClick} align='left'>{t("edit")} {t("name")}</Button>
                            </Grid>
                        </Grid>
                        </Paper>
                        <Paper sx={{p:1, mb:2, width:"100%"}}>
                        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start"> 
                            <Grid item  xs={12} md={12} sm={12}>
                                
                                <Typography component="div" variant="p" align='left' >
                                {customer.socialmedia1 ? findSocialIcon(customer.socialmedia1):<></>} {customer.socialmedia1 ? customer.socialuser1 : <></> } 
                                </Typography>
                                <Typography component="div" variant="p" align='left'>
                                {customer.socialmedia2 ? findSocialIcon(customer.socialmedia2):<></>} {customer.socialmedia2 ? customer.socialuser2 : <></> }
                                </Typography>
                                <Typography component="div" variant="p" align='left'>
                                {customer.socialmedia3 ? findSocialIcon(customer.socialmedia3):<></>} {customer.socialmedia3 ? customer.socialuser3 : <></> }
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button onClick={editSocialDialogClick} align='left'>{t("edit")} {t("SOCIALNETWORKS")}</Button>
                            </Grid>
                        </Grid>
                        </Paper>
                        <Paper sx={{p:1, mb:2, width:"100%"}}>
                        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start"> 
                            <Grid item  xs={12} md={12} sm={12}>
                                
                                <Typography component="div" variant="p" align='left' >
                                {t("releaseform")}: 
                                {customer.releaseForm.generated?<a href={"/docs/releaseforms/"+customer.releaseForm.file}> {customer.releaseForm.file} </a>:<> {t("none")}</>}
                                </Typography>
                                <Typography component="div" variant="p" align='left' >
                                {customer.releaseForm.signed?<div style={{color:"green"}}>{t("consentsigned")}</div>:<div style={{color:"red"}}> {t("consentnotsigned")}</div>}
                                </Typography>
                               
                            </Grid>
                            <Grid item>
                                {!customer.releaseForm.generated?<Button onClick={editSocialDialogClick} align='left'>{t("generatefile")}</Button>:<></>}
                                {!customer.releaseForm.signed?<Button onClick={editSocialDialogClick} align='left'>{t("sign")}</Button>:<></>}
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
                                        <Typography variant="p" component="p" align='left' sx={{ flexGrow: 1 }}>{t("email")} {t("home")}: {customer.emailhome?<Button onClick={sendEmail} size='small'>{customer.emailhome}</Button>:<></>}</Typography>
                                        <Typography variant="p" component="p" align='left' sx={{ flexGrow: 1 }}>{t("email")} {t("work")}: {customer.emailwork?<Button onClick={sendEmail} size='small'>{customer.emailwork}</Button>:<></>}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={editMailDialogClick} align='left'>{t("edit")}</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Paper sx={{p:1, width:"100%", mb:2}}>
                                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start"> 
                                    <Grid item>
                                        <Typography variant="p" component="p" align='left' sx={{ flexGrow: 1 }}>{t("phone")} {t("home")}: {customer.phonehome?<Button onClick={callPhone} size='small'>{customer.phonehome}</Button>:<></>}</Typography>
                                        <Typography variant="p" component="p" align='left' sx={{ flexGrow: 1 }}>{t("phone")} {t("work")}: {customer.phonework?<Button onClick={callPhone} size='small'>{customer.phonework}</Button>:<></>}</Typography>
                                        <Typography variant="p" component="p" align='left' sx={{ flexGrow: 1 }}>{t("whatsapp")}: {customer.whatsapp?<Button size='small'>{customer.whatsapp}</Button>:<></>}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={editPhoneDialogClick} align='left'>{t("edit")}</Button>
                                    </Grid>
                                 </Grid>
                            </Paper>
                            <Paper sx={{p:1, width:"100%", mb:2}}>
                                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start"> 
                                    <Grid item>
                                        <Typography variant="p" component="p" align='left' sx={{ flexGrow: 1 }}>
                                            {t("address")}: {customer.streetaddress}. {customer.postalcodeaddress} {customer.cityaddress} {customer.stateaddress}, {customer.countryaddress}.
                                        </Typography>
                                        
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={editAddressDialogClick} align='left'>{t("edit")}</Button><Button onClick={seeInGoogleMaps}>{t("seeingooglemaps")}</Button>
                                    </Grid>
                                 </Grid>
                            </Paper>
                        </Grid>
                    </Grid>             
                </Grid>
            </Grid>
        </Grid>
        <Grid container direction="row" spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start" > 
        {showTabs==="appo"?<AppoTab locale={locale} customer={customer}/>:<></>}
        {showTabs==="hist"?<HistTab locale={locale} customer={customer}/>:<></>}
        {showTabs==="depo"?<DepoTab locale={locale}/>:<></>}
        {showTabs==="comm"?<CommTab locale={locale} customer={customer}/>:<></>}
        </Grid>
        <Dialog open={editNameDialog} onClose={closeDialogs}>
            <DialogTitle>{t("editname")}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <NameForm firstname={customerSelector.firstname} lastname={customerSelector.lastname} birthdate={customerSelector.birthdate} gender={customerSelector.gender} /><DniForm dni={customerSelector.dni} />
                    </DialogContentText>
                    
                </DialogContent>
                <DialogActions>
                    <Button>{t("accept")}</Button>
                    <Button onClick={closeDialogs}>{t("cancel")}</Button>
                    
                </DialogActions>
        </Dialog>
        <Dialog open={editMailsDialog} onClose={closeDialogs}>
            <DialogTitle>{t("editmail")}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <EmailForm emailhome={customerSelector.emailhome} emailwork={customerSelector.emailwork}/>
                    </DialogContentText>
                    
                </DialogContent>
                <DialogActions>
                    <Button>{t("accept")}</Button>
                    <Button onClick={closeDialogs}>{t("cancel")}</Button>
                    
                </DialogActions>
        </Dialog>
        <Dialog open={editSocialDialog} onClose={closeDialogs}>
            <DialogTitle>{t("editsocialnetworks")}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       <SocialForm social1={customerSelector.social1} social2={customerSelector.social2} social3={customerSelector.social3} socialUser1={customerSelector.socialUser1} socialUser2={customerSelector.socialUser2} socialUser3={customerSelector.socialUser3} />
                    </DialogContentText>
                    
                </DialogContent>
                <DialogActions>
                    <Button>{t("accept")}</Button>
                    <Button onClick={closeDialogs}>{t("cancel")}</Button>
                    
                </DialogActions>
        </Dialog>
        <Dialog open={editPhonesDialog} onClose={closeDialogs}>
            <DialogTitle>{t("editphones")}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       <PhoneForm homephone={customerSelector.homephone} mobilephone={customerSelector.mobilephone} whatsapp={customerSelector.whatsapp} />
                    </DialogContentText>
                    
                </DialogContent>
                <DialogActions>
                    <Button>{t("accept")}</Button>
                    <Button onClick={closeDialogs}>{t("cancel")}</Button>
                    
                </DialogActions>
        </Dialog>
        <Dialog open={editAddressDialog} onClose={closeDialogs}>
            <DialogTitle>{t("editaddress")}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       <AddressForm streetaddress={customerSelector.streetaddress} city={customerSelector.city} state={customerSelector.state} postalCode={customerSelector.postalCode} country={customerSelector.country} />
                    </DialogContentText>
                    
                </DialogContent>
                <DialogActions>
                    <Button>{t("accept")}</Button>
                    <Button onClick={closeDialogs}>{t("cancel")}</Button>
                    
                </DialogActions>
        </Dialog>
     
        
    </React.Fragment>
  )
  }else{return(
    <p>
       {t("anerrorocurred")}
    </p>
  )}
}
