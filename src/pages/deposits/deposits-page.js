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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Deposits from '../../components/deposits-comp';
import Income from '../../components/form-components/income-comp';
import Loses from '../../components/form-components/loses-comp';
import i18next from 'i18next';
import { Loading} from '../../components/Loading-comp'
import { Button, TextField } from '@mui/material';
import { getDeposits } from '../../api/deposits.api';
import { addMonthtoDate } from '../../utils/date-utils';



function DepositContent() {

  const boardState = useSelector((state)=> state.navigator);
  const userSelector = useSelector(state => state.user);
  const localization = userSelector.locale;
  // eslint-disable-next-line
  const [width, setWidth] = React.useState(Number(window.innerWidth));
  const [firstLoad, setFirstLoad] = React.useState(true);
  const [income, setIncome] = React.useState(0);
  const [debts, setDebts]= React.useState(0);
  const [deposits, setDeposits]= React.useState([]);
  const [startDate, setStartDate] = React.useState(new Date(2000,1,1))
  const [endDate, setEndDate] = React.useState(new Date());
  const [dateMode, setDateMode] = React.useState("always");
  const userId = userSelector.id;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
    }
  
  React.useEffect(() => {
        if (firstLoad){
          getDeposits(startDate, endDate, userId).then((data)=>{
            console.log("DATA RESULT",data);
            setDeposits(data.result.deposits);
            setDebts(data.result.debts)
            setIncome(data.result.income);
            setFirstLoad(false);
            setDateMode(dateMode);
            window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
        }
        ).catch((error)=>{
          console.log(error)
        })
        }
    
        
    }, [firstLoad, startDate, endDate, userId,dateMode]);

  const mdTheme = createTheme();

  const handlePeriodStart = (value) =>{
    setStartDate(new Date(value))
    setFirstLoad(true)
    setDateMode("customizedDates")
    //setIncome(GetDepositsArrayFromDate(new Date(value),new Date(income[0].periodEnd), "paid"))
  }

  const handlePeriodEnd = (value) =>{
    //setIncome(GetDepositsArrayFromDate(new Date(income[0].periodStart),new Date(value), "paid"))
    setEndDate(new Date(value))
    setFirstLoad(true)
    setDateMode("customizedDates")

  }

  const monthClick = (event)=>{
    const today = new Date();
    setStartDate(addMonthtoDate(today, -1))
    setFirstLoad(true)
    setDateMode("month")

   // setIncome(GetDepositsArrayFromDate(addMonthtoDate(today,-1),today, "paid"))
  }

  const quarterClick = (event)=>{
    const today = new Date();
    setStartDate(addMonthtoDate(today, -4))
    setFirstLoad(true)
    setDateMode("quarter")

   // setIncome(GetDepositsArrayFromDate(addMonthtoDate(today,-4),today, "paid"))
  }

  const yearClick = (event)=>{
    const today = new Date();
    setStartDate(addMonthtoDate(today, -12))
    setFirstLoad(true)
    setDateMode("year")

    //setIncome(GetDepositsArrayFromDate(addMonthtoDate(today,-12),today, "paid"))
  }
  const alwaysClick = (event)=>{
    setStartDate(new Date(2000,1,1))
    setFirstLoad(true)
    setDateMode("always")

    //setIncome(GetDepositsArrayFromDate(new Date(2000,1,1),today, "paid"))
  }

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
        <ApplicationBar boardState={boardState} title={i18next.t("deposits")} />
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
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', mt:2, mb:2}}>
              
                <Grid container alignItems="flex-start" justifyContent="flex-start" direction="row" sx={{mt:2}} >
                  <Grid item xs={12} sm={4} md={4}>
                    <LocalizationProvider locale={localization} dateAdapter={AdapterMoment}> 
                      <DatePicker
                          label={i18next.t("periodStart")}
                          value={startDate.toDateString()}
                          variant="standard"
                          inputFormat="DD/MM/yyyy"
                          sx = {{mr:2}}
                          onChange={handlePeriodStart}
                          renderInput={(params) => <TextField variant="standard" sx = {{mr:2}} {...params} />}
                      />
                      </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <LocalizationProvider locale={localization} dateAdapter={AdapterMoment}>
                      <DatePicker
                          label={i18next.t("periodEnd")}
                          inputFormat="DD/MM/yyyy"
                          value={income[0] && income[0].periodEnd? income[0].periodEnd: new Date().toDateString()}
                          variant="standard"
                          sx = {{mr:2}}
                          onChange={handlePeriodEnd}
                          renderInput={(params) => <TextField variant="standard" sx = {{mr:2}} {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>

                <Grid container alignItems="flex-start" justifyContent="flex-start" direction="row" sx={{mt:2}}>  
                  <Grid item xs={12} sm={3} md={3}  sx = {{mt:1}}>
                      <Button onClick={alwaysClick} variant='outlined'sx={{mr:1}}>{i18next.t("always")}</Button>
                  </Grid>
                  <Grid item xs={12} sm={3} md={3} sx = {{mt:1}} >
                      <Button onClick={monthClick} variant='outlined'sx={{mr:1}}>{i18next.t("month")}</Button>
                  </Grid>
                  <Grid item xs={12} sm={3} md={3}  sx = {{mt:1}}>
                      <Button onClick={quarterClick} variant='outlined'sx={{mr:1}}>{i18next.t("quarter")}</Button>
                  </Grid>
                  <Grid item xs={12} sm={3} md={3}  sx = {{mt:1}}>
                    <Button onClick={yearClick} variant='outlined'sx={{mr:1}}>{i18next.t("year")}</Button>
                  </Grid>
                </Grid>
              </Paper>
            <Grid container spacing={2} >
             <Grid item xs={12} sm={12} md={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', mb:2 }}>
                  <Deposits locale={localization} dateMode={dateMode} income={income} debts={debts} startDate={startDate} endDate={endDate}/>
                </Paper>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Income locale={localization} dateMode={dateMode} data={deposits}/>
                </Paper>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', mt:2 }}>
                  <Loses locale={localization} dateMode={dateMode} data={deposits}/>
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