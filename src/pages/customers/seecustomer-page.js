import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Copyright } from '../../components/copyright-component';
import ApplicationBar from '../../components/application-bar-component';
import SideMenu from '../../components/sideMenu-component';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import SeeCustomerComponent from '../../components/see-customer.comp';
import {GetCustomer} from '../../api/customer.api'
import i18next from 'i18next';
import { Loading } from '../../components/Loading-comp';



const mdTheme = createTheme();

function SeeCustomerContent() {

  const boardState = useSelector((state)=> state.navigator);
  const _id = useParams().tid;
  const _tab = useParams().tab; //appo, hist, depo, comm
  const navigate = useNavigate();
  const userSelector = useSelector(state => state.user);
  const localization = userSelector.locale;
  const [firstLoad, setFirstLoad] = React.useState(true)

  const initData = {
    "_id":1,
    "promotedToCustomer":"",
    "firstname": "",
    "lastname": "",
    "dni":"",
    "birthdate": "",
    "image": "",
    "gender": "",
    "inbound": "",
    "emailhome":"",
    "emailwork":"",
    "streetaddress": "",
    "cityaddress": "",
    "stateaddress": "",
    "postalcodeaddress": "",
    "countryaddress":"",
    "phonehome":"",
    "phonework":"",   
    "whatsapp": "",
    "socialmedia1":"Facebook",
    "socialmedia2":"Twitter",
    "socialmedia3":"Reddit",
    "socialuser1": "",
    "socialuser2": "",
    "socialuser3": "",
    "releaseForm":{
            "file":"",
            "generated":false,
            "signed":false
    },
    "history":[],
    "appointments":[],
    "communications":[],
    "next_customer":"",
    "prev_customer":""
  }

  const [customer, setCustomer]= React.useState(initData)
  
  React.useEffect(() => {
    if (!customer){
     navigate("/404")   
    }
    if(firstLoad){
      GetCustomer(_id).then(data =>{
          setCustomer(data.result);
          setFirstLoad(false);
      })
  }
  },[customer,navigate, firstLoad,_id])

  if (!customer || firstLoad){
    console.log("NO HAY CLIENTE");
    return (
      <Loading />
    )
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <ApplicationBar boardState={boardState} title={i18next.t("Customer") +": " + customer.firstname + " " + customer.lastname} />
        <SideMenu boardState={boardState} />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          
            <Container sx={{ mt: 4, mb: 4 }}>

            <Grid container spacing={1}>
             <Grid item xs={12}>
                <Paper sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
                  <SeeCustomerComponent _customer ={customer} locale={localization} _tab={_tab}/>
                </Paper>
              </Grid>
            </Grid>

            
          </Container>
          <Copyright sx={{ pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function SeeCustomer() {
  return <SeeCustomerContent />;
}