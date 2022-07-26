import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { ImageComponent } from './form-components/image-comp';
import { NameForm } from './form-components/name-comp';
import { useDispatch, useSelector } from 'react-redux';
import { nc_editingStart, nc_loadFromBackend, nc_submmitedSucceed } from '../slices/newCustomer-slice';
import { EmailForm } from './form-components/emails-comp';
import { AddressForm } from './form-components/address-comp';
import { PhoneForm } from './form-components/phones-comp';
import { SocialForm } from './form-components/social-comp';
import { CustomerValidation } from '../utils/verification-utils';
import { useNavigate, useParams } from 'react-router-dom';
import { LocAndRoleForm } from './form-components/loc-and-role';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';
import { fetchUser } from '../api/user.api';
import { updateUser } from '../api/user.actions';

var initValidation={
  firstname: true,
  lastname: true,
  email: true,
  phone: true
}

export default function UserSetupForm() {
  const NcState = useSelector((state)=> state.newCustomer);
  const userSelector = useSelector(state => state.user);
  const navSelector = useSelector((state) => state.navigator)
  const localization = userSelector.locale;
  const _id = useParams().tid;
  const [validation, setValidation] = React.useState(initValidation);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstLoad, setFirstLoad] = React.useState(true);
  const [openDialog, setOpenDialog]= React.useState(false);
 
  const HandleSubmit = async (event)=>{
    event.preventDefault();
    
    const frm = {
      firstname: NcState.firstname,
      lastname: NcState.lastname,
      birthdate: NcState.birthdate,
      gender: NcState.gender,
      image: NcState.image,
      emailhome: NcState.emailhome,
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
      locales: NcState.locale,
      role: NcState.role,
      isNew: true,
      }


    const validation2 = CustomerValidation(frm);
      setValidation(validation2);
      console.log("frmdata en HANDLESUBMIT",frm);
      console.log(validation)

      /// API PARA ENVIAR EL FORMULARIO AL BACKEND
      
      dispatch(updateUser(_id, frm))
       .then((data)=>{
        if (data==="user updated"){
          setOpenDialog(true)
        }
        console.log(data)
      })
       .catch((error)=>{console.log(error)})

  }

  React.useEffect (()=>{
    if (firstLoad){
      var loadedfrmData = {}
      fetchUser(_id)
        .then(data =>{
          loadedfrmData= data.user
          setFirstLoad(false);
          dispatch(nc_loadFromBackend(loadedfrmData))
          dispatch(nc_editingStart());

        })
        .catch((err)=>{console.log(err)})
    
      } 

  },[dispatch,firstLoad, _id])
 

  const resetData= ()=>{
    var loadedfrmData = {}
    fetchUser(_id)
      .then(data =>{
        loadedfrmData= data.user
        setFirstLoad(false);
        dispatch(nc_loadFromBackend(loadedfrmData))
        dispatch(nc_editingStart());

      })
      .catch((err)=>{console.log(err)})
  }

  const handleKeepEditing = (event) =>{
    setOpenDialog(false);
  }

  const handleClose = (event)=>{
    dispatch(nc_submmitedSucceed())
     // NAVIGATE 
    const actualScreen = navSelector.previousScreen
    console.log(actualScreen);
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  return (
    <React.Fragment>
      <Dialog open={openDialog}>
            <DialogTitle align='center'>{t("userupdatedcorrectly")}</DialogTitle>
            <DialogContent align='center'>{t("doyouwanttokeepeditingorclose")}</DialogContent>
            <DialogActions>
              <Button onClick={handleKeepEditing}>{t("keepediting")}</Button>
              <Button onClick={handleClose}>{t("close")}</Button>
            </DialogActions>
        </Dialog>
       
        <Box component="form" noValidate onSubmit={HandleSubmit} >
             {NcState.isNew?t("NEWUSER"):<></>}
            <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start">
              
              <Grid item xs={12} md={5} sm={5} marginTop={3}>
                <NameForm gender={"none"} editUser={true} locale={localization}/>
                {!validation.firstname ? <Alert severity="error">{t("introduceaname")}</Alert>: <></>}
                {!validation.lastname ? <Alert severity="error">{t("introducealastname")}</Alert>: <></>} 
              </Grid>
              <Grid item xs={12} md={5} sm={5} marginTop={3}>
                <LocAndRoleForm editUser={true} locale={localization}/>
                <EmailForm editUser={true}/>
                {!validation.email ? <Alert severity="error">{t("youmustintroduceatleastonevalidemail")}</Alert>: <></>}
              </Grid>
              <Grid item xs={12} md={2} sm={2} marginTop={3}>
                <ImageComponent editUser={true} />
              </Grid>
            </Grid>
           
            <Grid item xs={12} md={12} sm={12} marginTop={3}>
                <PhoneForm  editUser={true} />
                {!validation.phone ? <Alert severity="error">{t("introduceavelidmobile")}</Alert>: <></>}
              </Grid>

              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                <AddressForm  editUser={true} />
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
               {NcState.isNew?t("createuser"):t("updateuser")}
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
