import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Copyright } from '../../components/copyright-component';
import ApplicationBar from '../../components/application-bar-component';
import SideMenu from '../../components/sideMenu-component';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { useTranslation } from 'react-i18next';
import AddCommunicationsComponent from '../../components/add-communicaciont-comp';
import { useParams } from 'react-router-dom';



const mdTheme = createTheme();

function AddCommunicationContent() {

  const boardState = useSelector((state)=> state.navigator);
  const userSelector = useSelector(state => state.user);
  const localization = userSelector.locale;
  const _customerId = Number(useParams().customerid);
  const _thread = Number(useParams().thread);

  const { t } = useTranslation();

  
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <ApplicationBar boardState={boardState} title={t("addcomunication")} />
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
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <AddCommunicationsComponent customerId={_customerId} threadId={_thread} locale={localization} />
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

export default function AddCommunication() {
  return <AddCommunicationContent />;
}