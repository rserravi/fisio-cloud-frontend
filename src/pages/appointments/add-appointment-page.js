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
import AddAppointmentForm from '../../components/add-appointment-form-comp';
import { useParams } from 'react-router-dom';
import { getServices } from '../../api/services.api';
import { getCabins } from '../../api/cabins.api';
import { GetCustomer } from '../../api/customer.api';
import { getAppointmentById } from '../../api/appointments.api';
import { Loading } from '../../components/Loading-comp';



const mdTheme = createTheme();

function AddAppointmentContent() {

  const boardState = useSelector((state)=> state.navigator);
  const userSelector = useSelector(state => state.user);
  const localization = userSelector.locale;
  const params = useParams();
  const _customerId = params.customerId
  const _appoId =params.appoId
  const [customerData, setCustomerData] = React.useState([]);
  const [appoData, setAppoData]= React.useState([]);
  const [firstLoad, setFirstLoad]= React.useState(true);
  const [cabinsList, setCabinsList]= React.useState([]);
  const [servicesList, setServicesList]= React.useState([]);

  React.useEffect(()=>{
    if (firstLoad){
      if (_customerId && !_appoId){
        GetCustomer(_customerId).then((data)=>{
          setCustomerData(data.result);
          getServices().then((data)=>{
            setServicesList(data.result);
            getCabins().then ((data)=>{
              setCabinsList(data.result);
              setFirstLoad(false);
            }).catch((error)=>{
              console.log(error)
              })
          }).catch((error)=>{
            console.log(error)
            })
        }
        ).catch((error)=>{
          console.log(error)
      })}
      if (_appoId){
        getAppointmentById(_appoId).then((data)=>{
          setAppoData(data.result[0]);
          getServices().then((data)=>{
            setServicesList(data.result);
            getCabins().then ((data)=>{
              setCabinsList(data.result);
              setFirstLoad(false);
            }).catch((error)=>{
              console.log(error)
              })
          }).catch((error)=>{
            console.log(error)
            })
        }
        ).catch((error)=>{
          console.log(error)
      })
      }

      if (!_customerId && !_appoId){
        getServices().then((data)=>{
          setServicesList(data.result);
          getCabins().then ((data)=>{
            setCabinsList(data.result);
            setFirstLoad(false);
          }).catch((error)=>{
            console.log(error)
            })
        }).catch((error)=>{
          console.log(error)
          })
      }

    }
  },[firstLoad, _appoId, _customerId, customerData, appoData])

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
        <ApplicationBar boardState={boardState} title={i18next.t("addappointment")} />
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
                <AddAppointmentForm customerData={customerData} appoData={appoData} cabinsData={cabinsList} servicesData={servicesList} locale={localization}/>
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

export default function AddAppointment() {
  return <AddAppointmentContent />;
}