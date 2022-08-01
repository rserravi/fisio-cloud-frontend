import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Alert, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { ImageComponent } from './form-components/image-comp';
import { NameForm } from './form-components/name-comp';
import { useDispatch, useSelector } from 'react-redux';
import { nc_editingStart, nc_reset_slice } from '../slices/newCustomer-slice';
import { EmailForm } from './form-components/emails-comp';
import { AddressForm } from './form-components/address-comp';
import { PhoneForm } from './form-components/phones-comp';
import { SocialForm } from './form-components/social-comp';
import { CustomerValidation } from '../utils/verification-utils';
import { DniForm } from './form-components/dni-form';
import ReleaseFormComp from './form-components/release-form-comp';
import { useNavigate } from 'react-router-dom';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';
import { addCustomer } from '../api/customer.api';

var initValidation={
  firstname: true,
  lastname: true,
  email: true,
  phone: true,
  dni: true
}

export default function CustomerForm(props) {
  const NcState = useSelector((state)=> state.newCustomer);
  const navigationState= useSelector((state)=> state.navigator);
  const [validation, setValidation] = React.useState(initValidation);
  const locale = props.locale
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HandleSubmit = (event)=>{
    event.preventDefault();

   const addedAt = new Date().toLocaleDateString(locale);
  
   const frm = {
    firstname: NcState.firstname,
    lastname: NcState.lastname,
    birthdate: NcState.birthdate,
    dni: NcState.dni,
    gender: NcState.gender,
    image: NcState.image,
    emailhome: NcState.emailhome,
    emailwork:NcState.emailwork,
    streetaddress: NcState.streetaddress,
    cityaddress: NcState.city,
    stateaddress: NcState.state,
    postalcodeaddress: NcState.postalCode,
    countryaddress:NcState.country,
    phonehome: NcState.homephone,
    phonework:NcState.mobilephone,
    whatsapp: NcState.whatsapp,
    socialmedia1: NcState.social1,
    socialmedia2: NcState.social2,
    socialmedia3: NcState.social3,
    socialuser1:NcState.socialUser1,
    socialuser2:NcState.socialUser2,
    socialuser3:NcState.socialUser3,
    promotedToCustomer:NcState.promotedToCustomer,
    releaseForm:{
      "file":NcState.releaseformFile,
      "generated":NcState.releaseformGenerated,
      "signed":NcState.releaseformsigned
    }
   }

    const validation2 = CustomerValidation(frm);
    setValidation(validation2);
    console.log(frm);
    console.log(validation)

    /// API PARA ENVIAR EL FORMULARIO AL BACKEND

    if (validation.firstname && validation.lastname && validation.email && validation.phone && validation.dni){
      addCustomer(frm).then((data)=>{
        if (data.message==="New Customer Created"){
          console.log("DONE")
           // NAVIGATE TO SEECUSTOMER(_id);
        }
        else {
          console.log("ERROR CHUNGO", data.message);
        }
      })
    }
   


   
  }

  React.useEffect (()=>{
    dispatch(nc_reset_slice())
    dispatch(nc_editingStart());

  },[dispatch])
 

  const resetData= (event)=>{
    event.preventDefault();
    const actualScreen = navigationState.previousScreen;
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen)) 
  }

  return (
    <React.Fragment>
       
        <Box component="form" noValidate onSubmit={HandleSubmit} >
            <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start">
             
             <Grid item xs={12}>         
               <Typography variant="h4" component="h2">{t("addnewcustomer")}</Typography> 
              </Grid>
            </Grid>
            <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start">
              
              <Grid item xs={12} md={5} sm={5} marginTop={3}>
                <NameForm gender={"none"} locale={locale} />
                {!validation.firstname ? <Alert severity="error">{t("introduceaname")}</Alert>: <></>}
                {!validation.lastname ? <Alert severity="error">{t("introducealastname")}</Alert>: <></>} 
              </Grid>
              <Grid item xs={12} md={5} sm={5} marginTop={3}>
                <DniForm locale={locale} />
                {!validation.dni ? <Alert severity="error">{t("youmustintroduceavalidId")}</Alert>: <></>}
                <EmailForm  />
                {!validation.email ? <Alert severity="error">{t("youmustintroduceatleastonevalidemail")}</Alert>: <></>}
               
              </Grid>
              <Grid item xs={2} md={2} sm={2} marginTop={3}>
                <ImageComponent />
              </Grid>
              
            </Grid>
              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                <PhoneForm />
                {!validation.phone ? <Alert severity="error">{t("introduceavelidmobile")}</Alert>: <></>}
              </Grid>

              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                <AddressForm />
              </Grid>
  
              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                <SocialForm />
              </Grid>

              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                <ReleaseFormComp />
              </Grid>

            <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%', m:2 }}>
            <Button
                type="submit"
                fullWidth
                color="success"
                variant="contained"
                onClick={HandleSubmit}
                sx={{ m:3}}
              >
               {t("createcustomer")}
              </Button>
              <Button
               
                fullWidth
                variant="contained"
                color = "error"
                onClick={resetData}
                sx={{ m:3 }}
              >
               {t("cancel")}
              </Button>
              </Box>
              {!validation.lastname || !validation.firstname || !validation.email || !validation.phone ? <Alert severity="error">{ t("errorin")} {!validation.firstname ? t("name") + ",":""} {!validation.lastname ? t("lastname") + ",":""} {!validation.phone ? t("phone") + ",":""} {!validation.email ? t("emails") + ".":""}</Alert>:""}
              
        </Box>
        
    </React.Fragment>
  )
}
