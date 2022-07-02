import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Deposits from '../../components/Deposits';
import { Copyright } from '../../components/copyright-component';
import ApplicationBar from '../../components/application-bar-component';
import SideMenu from '../../components/sideMenu-component';
import { useSelector } from 'react-redux';
import {CustomersComponent} from '../../components/customers-comp';
import CalendarComp from '../../components/calendar-comp';
import { useTranslation } from 'react-i18next';



const mdTheme = createTheme();

function DashboardContent() {
  const { t } = useTranslation();
  const boardState = useSelector((state)=> state.navigator);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <ApplicationBar boardState={boardState} title={t("dashboard")} />
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
          
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

         
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
                 <CalendarComp compact={true}/>
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
                
                  <Deposits month={true} dashboard={true} />
                 
                </Paper>
              </Grid>
              {/* Customer Grid*/}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
                  <Container sx={{height:320}}>
                    <CustomersComponent compact={true} info="newCustomers" />
                    </Container>
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

export default function Dashboard() {
  return <DashboardContent />;
}