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
import Deposits from '../../components/Deposits';
import Income from '../../components/form-components/income-comp';
import Loses from '../../components/form-components/loses-comp';


function DepositContent() {

  const boardState = useSelector((state)=> state.navigator);
  const { t } = useTranslation();

  const [width, setWidth] = React.useState(Number(window.innerWidth));

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
    }
  React.useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

  const isMobile = width <= 768;
  const mdTheme = createTheme();

  
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <ApplicationBar boardState={boardState} title={t("deposits")} />
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

            <Grid container spacing={2} >
             <Grid item xs={12} sm={3} md={3}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Deposits month={true} />
                </Paper>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', mt:2}}>
                  <Deposits quarter={true}  />
                </Paper>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', mt:2 }}>
                  <Deposits year={true}  />
                </Paper>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', mt:2 }}>
                  <Deposits always={true}  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={9} md={9}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Income />
                </Paper>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', mt:2 }}>
                  <Loses />
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

export default function DepositsPage() {
  return <DepositContent />;
}