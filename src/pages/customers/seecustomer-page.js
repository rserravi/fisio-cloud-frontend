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
import CustomerCard from '../../components/customer-card-comp';
import { t } from 'i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomer } from '../../utils/dataFetch-utils';
import LinearProgress from '@mui/material/LinearProgress';
import SeeCustomerComponent from '../../components/see-customer.-comp';



const mdTheme = createTheme();

function SeeCustomerContent() {

  const boardState = useSelector((state)=> state.navigator);
  const _id = Number(useParams().tid);
  const customer = getCustomer(_id);
  const navigate = useNavigate();
  const userSelector = useSelector(state => state.user);
  const localization = userSelector.locale;
  
  React.useEffect(() => {
    if (!customer){
     navigate("/404")   
    }
  },[customer,navigate])

  if (!customer){
    console.log("NO HAY CLIENTE");
    return (
      <ThemeProvider theme={mdTheme}>
         <CssBaseline />
         <Box sx={{ width: '100%', height:'100%'}}>
            <LinearProgress />
         </Box>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <ApplicationBar boardState={boardState} title={t("Customer") +": " + customer.firstname + " " + customer.lastname +". ID:" + customer.id} />
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
                  <SeeCustomerComponent _id={_id} locale={localization}/>
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