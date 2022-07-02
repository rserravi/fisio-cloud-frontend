import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Alert, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { ImageComponent } from './form-components/image-comp';
import { NameForm } from './form-components/name-comp';
import { useDispatch, useSelector } from 'react-redux';
import { nc_editingStart, nc_loadFromBackend } from '../slices/newCustomer-slice';
import { EmailForm } from './form-components/emails-comp';
import { AddressForm } from './form-components/address-comp';
import { PhoneForm } from './form-components/phones-comp';
import { SocialForm } from './form-components/social-comp';
import { CustomerValidation } from '../utils/verification-utils';
import { useParams } from 'react-router-dom';
import { LocAndRoleForm } from './form-components/loc-and-role';
import { getUserDataFromDb } from '../utils/dataFetch-utils';

var initValidation={
  firstname: true,
  lastname: true,
  email: true,
  phone: true
}

export default function UserSetupForm() {
  const NcState = useSelector((state)=> state.newCustomer);

  const _id = Number(useParams().tid);
  const [validation, setValidation] = React.useState(initValidation);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const HandleSubmit = (event)=>{
    event.preventDefault();

  const addedAt = new Date().toLocaleDateString();
  
  const frm = {
    firstname: NcState.firstname,
    lastname: NcState.lastname,
    birthdate: NcState.birthdate,
    gender: NcState.gender,
    image: NcState.image,
    emailhome: NcState.emailhome,
    emailwork:NcState.emailwork,
    streetaddress: NcState.streetaddress,
    city: NcState.city,
    state: NcState.state,
    postalCode: NcState.postalCode,
    country:NcState.country,
    homephone: NcState.homephone,
    mobilephone:NcState.mobilephone,
    whatsapp: NcState.whatsapp,
    social1: NcState.social1,
    social2: NcState.social2,
    social3: NcState.social3,
    socialUser1:NcState.socialUser1,
    socialUser2:NcState.socialUser2,
    socialUser3:NcState.socialUser3,
    language: NcState.locale,
    role: NcState.role,
    addedAt: addedAt,
    }

  const validation2 = CustomerValidation(frm);
    setValidation(validation2);
    console.log(frm);
    console.log(validation)

    /// API PARA ENVIAR EL FORMULARIO AL BACKEND

    // NAVIGATE TO SEECUSTOMER(_id);
  }

  React.useEffect (()=>{
    const loadedfrmData = getUserDataFromDb(_id);
  
    dispatch(nc_loadFromBackend(loadedfrmData))
    dispatch(nc_editingStart());

  },[dispatch, _id])
 

  const resetData= ()=>{
    //setFrmData(frmDataInit);
  }

  return (
    <React.Fragment>
       
        <Box component="form" noValidate onSubmit={HandleSubmit} >
                   
            <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start">
              
              <Grid item xs={12} md={5} sm={5} marginTop={3}>
                <NameForm gender={"none"} editUser={true}/>
                {!validation.firstname ? <Alert severity="error">{t("introduceaname")}</Alert>: <></>}
                {!validation.lastname ? <Alert severity="error">{t("introducealastname")}</Alert>: <></>} 
              </Grid>
              <Grid item xs={12} md={5} sm={5} marginTop={3}>
                <LocAndRoleForm editUser={true}/>
              </Grid>
              <Grid item xs={2} md={2} sm={2} marginTop={3}>
                <ImageComponent editUser={true} />
              </Grid>
            </Grid>

            
              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                <EmailForm editUser={true}/>
                {!validation.email ? <Alert severity="error">{t("youmustintroduceatleastonevalidemail")}</Alert>: <></>}
              </Grid>

              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                <AddressForm  editUser={true} />
              </Grid>
             
              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                <PhoneForm  editUser={true} />
                {!validation.phone ? <Alert severity="error">{t("introduceavelidmobile")}</Alert>: <></>}
              </Grid>
              
              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                <SocialForm editUser={true} />
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
