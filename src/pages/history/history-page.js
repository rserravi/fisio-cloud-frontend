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
import i18next from 'i18next';
import { useParams } from 'react-router-dom';
import EditHistoryForm from '../../components/edithistory-form-comp';
import { getCabins } from '../../api/cabins.api';
import { Loading } from '../../components/Loading-comp';
import { getHistoryById } from '../../api/history.api';
import { getServices } from '../../api/services.api';



const mdTheme = createTheme();

function EditHistoryContent() {

  const boardState = useSelector((state)=> state.navigator);
  const userSelector = useSelector(state => state.user);
  const localization = userSelector.locale;
  const params = useParams();
  const _customerId = params.customerId
  const _histoId =params.histoId
  const [histoData, setHistoData]= React.useState([]);
  const [firstLoad, setFirstLoad]= React.useState(true);
  const [cabinsList, setCabinsList]= React.useState([]);
  const [servicesList, setServicesList]= React.useState([]);
  const userId = userSelector.id


  React.useEffect(()=>{
    //console.log("USER ID", userSelector, "CUSTOMERID", _customerId, "HISTO", _histoId)
    if (firstLoad && userId){
        getHistoryById(_histoId).then((data)=>{
          //console.log("getHistoryById en USEEFFECT PAGE",data)
          setHistoData(data);
          getServices().then((data)=>{
            setServicesList(data.result);
            getCabins().then ((data)=>{
              setCabinsList(data.result);
              setFirstLoad(false);
            }).catch((error)=>{
              console.log("CABINS ERROR",error)
              })
          }).catch((error)=>{
            console.log("SERVICES ERROR",error)
            })
        }
        ).catch((error)=>{
          console.log("HISTORYBYID ERROR",error)
      })
   
    }
  },[firstLoad, _histoId, _customerId, histoData, userId, userSelector])


  if(firstLoad ){
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
        <ApplicationBar boardState={boardState} title={i18next.t("edithistory")} />
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
                   <EditHistoryForm histoData={histoData} cabinsData={cabinsList} servicesData={servicesList} locale={localization}/> 
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

export default function EditHistory() {
  return <EditHistoryContent />;
}