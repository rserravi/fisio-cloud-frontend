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
import i18next from 'i18next';
import { CommTab } from '../../components/tabs/comm-tab-comp';
import { GetAllComm } from '../../api/communications.api';
import { Loading } from '../../components/Loading-comp';


const mdTheme = createTheme();

function CommunicactionsContent() {

  const boardState = useSelector((state)=> state.navigator);
  const userSelector = useSelector(state => state.user);
  const localization = userSelector.locale;
  const [commData, setCommData] = React.useState([])
  const [firstLoad, setFirstLoad]= React.useState(true);

  React.useEffect(()=>{
   // console.log("EN USE EFFECT COMM")
    if (firstLoad){
    GetAllComm().then((data)=>{
      //console.log("DATA RESULT",data.result);
      setCommData(data.result);
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
        <ApplicationBar boardState={boardState} title={i18next.t("communications")} />
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
                  <CommTab compact={false} locale={localization} commData={commData}/>
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

export default function Communications() {
  return <CommunicactionsContent />;
}