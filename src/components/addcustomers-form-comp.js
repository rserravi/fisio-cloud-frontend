import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { CustomerValidation} from '../utils/verification-utils';
import InputAdornment from '@mui/material/InputAdornment';
import { socialNetworks } from '../utils/social-networks-utils';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { ImageComponent } from './form-components/image-comp';
import { NameForm } from './form-components/name-comp';
import { useDispatch } from 'react-redux';
import { nc_editingStart } from '../slices/newCustomer-slice';
import { EmailForm } from './form-components/emails-comp';
import { AddressForm } from './form-components/address-comp';
import { PhoneForm } from './form-components/phones-comp';
import { SocialForm } from './form-components/social-comp';


export default function CustomerForm() {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleSubmit = (event)=>{
    event.preventDefault();

   // frmData.addedAt = new Date().toLocaleDateString();
   // const frmValidation = CustomerValidation(frmData);
   // console.log(frmData);
   // console.log(frmValidation)

    /// API PARA ENVIAR EL FORMULARIO AL BACKEND

    // NAVIGATE TO SEECUSTOMER(_id);
  }

  React.useEffect (()=>{
    dispatch(nc_editingStart());

  },[])
 

  const resetData= ()=>{
    //setFrmData(frmDataInit);
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    marginTop: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  return (
    <React.Fragment>
       
        <Box component="form" noValidate onSubmit={handleSubmit} >
            <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start">
             <Grid item xs={12}>
                <Item>
                     <Typography variant="h4" component="h2">{t("addnewcustomer")}</Typography> 
                </Item>
              </Grid>
            </Grid>
            <Typography variant="h6" color="text.secondary" align="center" sx={{mt:2}}>
              {t("NAMEANDIMAGE")}
            </Typography>
            
            <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start">
              
              <Grid item xs={12} md={10} sm={10} marginTop={3}>
                <NameForm gender={"none"} />
              </Grid>
              
              <Grid item xs={2} md={2} sm={2} marginTop={3}>
                <ImageComponent />
              </Grid>
            </Grid>
              
              <Typography variant="h6" color="text.secondary" align="center" sx={{mt:2}}>
                {t("EMAILS")}
              </Typography>

              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                <EmailForm  />
              </Grid>

              <Typography variant="h6" color="text.secondary" align="center" sx={{mt:2}}>
                {t("ADDRESS")}
              </Typography>

              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                <AddressForm />
              </Grid>
             
              <Typography variant="h6" color="text.secondary" align="center" sx={{mt:2}}>
                {t("PHONES")}
              </Typography>
             
              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                <PhoneForm />
              </Grid>

              <Typography variant="h6" color="text.secondary" align="center" sx={{mt:2}}>
                {t("SOCIALNETWORKS")}
              </Typography>
              
              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                <SocialForm />
              </Grid>
              
            <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%', m:2 }}>
            <Button
                type="submit"
                fullWidth
                color="success"
                variant="contained"
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
        </Box>
    </React.Fragment>
  )
}
