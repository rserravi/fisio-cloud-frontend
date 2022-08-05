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
import { ReportsComponent } from '../../components/report-comp';
import { useParams } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { navigationLoading, navigationSuccess } from '../../slices/navigation-slice';
import i18next from 'i18next';


const mdTheme = createTheme();

function ReportsContent() {

  const boardState = useSelector((state)=> state.navigator);
  const userSelector = useSelector(state => state.user);
  const localization = userSelector.locale;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const _period = useParams().period;
  if (_period !=="quarter" && _period !=="year" && _period !=="all" ){
    const actualScreen = "/404"
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <ApplicationBar boardState={boardState} title={i18next.t("reports")} />
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
                <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                  
                  <ReportsComponent locale={localization} compact={false} period={_period}/>
                  
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

export default function Reports() {
  return <ReportsContent />;
}