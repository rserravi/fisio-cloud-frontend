import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Deposits from '../../components/deposits-comp';
import { Copyright } from '../../components/copyright-component';
import ApplicationBar from '../../components/application-bar-component';
import SideMenu from '../../components/sideMenu-component';
import { useSelector, useDispatch } from 'react-redux';
import {CustomersComponent} from '../../components/customers-comp';
import BigCalendarComp from '../../components/big-calendar-comp';
import { getAllCustomers } from '../../api/customer.api';
import i18next from 'i18next';
import { Loading } from '../../components/Loading-comp';

const mdTheme = createTheme();

function DashboardContent() {

  const boardState = useSelector((state)=> state.navigator);
  const userSelector = useSelector(state => state.user);
  const localization = userSelector.locale;
  const [customerData, setCustomerData] = React.useState([])
  const [firstLoad, setFirstLoad]= React.useState(true);

  React.useEffect(()=>{
    console.log("EN USE EFFECT DASH")
    if (firstLoad){
    getAllCustomers().then((data)=>{
      console.log("DATA RESULT",data.result);
      setCustomerData(data.result);
      setFirstLoad(false);
      
  }
  ).catch((error)=>{
    console.log(error)
  })}
  },[firstLoad])
  
  if(firstLoad){
    return (
      <Box sx={{ display: 'flex' }}>
        <Loading /> 
      </Box>
    );
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <ApplicationBar boardState={boardState} title={i18next.t("dashboard")}/>
        <SideMenu boardState={boardState} />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          
            <Container sx={{ mt: 4, mb: 4 }}>

         
            <Grid container spacing={3}>
              {/* Calendar */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                 <BigCalendarComp compact={true} locale={localization} customerData={customerData}/>
                </Paper>
              </Grid>
          
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                
                  <Deposits compact={true} locale={localization} customerData={customerData}/>
                 
                </Paper>
              </Grid>
              {/* Customer Grid*/}
              <Grid item xs={12}>
                <Paper sx={{ pt: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
                  <Container sx={{height:320}}>
                    <CustomersComponent compact={true} info="newCustomers" customerData={customerData}/>
                    </Container>
                </Paper>
              </Grid>
            </Grid>
       
  
          </Container>
          <Copyright sx={{ pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  )  
}

export default function Dashboard() {
  return <DashboardContent />;
}