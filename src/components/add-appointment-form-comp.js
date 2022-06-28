import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Alert, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { EmailForm } from './form-components/emails-comp';
import { AddressForm } from './form-components/address-comp';
import { PhoneForm } from './form-components/phones-comp';
import { SocialForm } from './form-components/social-comp';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

var initValidation={
  id:"1",
  date: "2022-06-21T17:00:00.000Z",
  duration: "60", 
  service: "Masaje",
  price:"50",
  status:"pending",
  closed:"",
  notes:""
}

  
export default function AddAppointmentForm(props) {
  const [appo, setAppo] = React.useState(initValidation);
  React.useEffect (()=>{

    },[])
  const customerid = props.customerid;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const data = {}


  const HandleSubmit = (event)=>{
    event.preventDefault();

   }

 
 

  const resetData= ()=>{
    //setFrmData(frmDataInit);
  }

  const CustomerData = () =>{

    return(
        <React.Fragment>
        
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
       
        <Box component="form" noValidate onSubmit={HandleSubmit} >
            <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start">
             <Grid item xs={12}>
                
                <Typography variant="h4" component="h2">{t("addnewcustomer")}</Typography> 
                
              </Grid>
            </Grid>
            <Typography variant="h6" color="text.secondary" align="center" sx={{mt:2}}>
              {t("NAMEANDIMAGE")}
            </Typography>
         
            <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start">
              
              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                <CustomerData />
             
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
        
              
        </Box>
    </React.Fragment>
  )
}
