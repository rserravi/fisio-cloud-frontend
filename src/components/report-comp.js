//REACT IMPORTS
import * as React from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import _ from 'underscore';


//RECHARTS IMPORTS
import { LineChart,Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart } from 'recharts';

//MUI IMPORTS
import { Button, Grid, Typography } from '@mui/material';

//ICONS
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import PrintTwoToneIcon from '@mui/icons-material/PrintTwoTone';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';
import { addYeartoDate, getActualQuarterEndDate, getActualQuarterStartDate } from '../utils/date-utils';
import { GetReports } from '../api/report.api';
import i18next from 'i18next';
import { Box } from '@mui/system';
import { Loading } from './Loading-comp';


/////////////////////////////////
//                             //
//   MAIN COMPONENT FUNCTION   //
//                             //
/////////////////////////////////

export const ReportsComponent = (props)=> {

  const locale = props.locale;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const _period = props.period;
  const [showTabs, setShowTabs] = React.useState(_period) // "all", "quarter", "year"
  const [periodStart, setPeriodStart] = React.useState(function(){
    switch (_period) {
      case "all":
        return new Date(2000,1,1)
      case "year":
        return addYeartoDate(new Date(),-1)
      case "quarter":
        return getActualQuarterStartDate(new Date())
      default:
        break;
    }
  })
  const [periodEnd, setPeriodEnd] =React.useState(function(){
    switch (_period) {
      case "all":
        return new Date()
      case "year":
        return new Date()
      case "quarter":
        return getActualQuarterEndDate(new Date())
      default:
        break;
    }
  })

  const [firstLoad, setFirstLoad]= React.useState(true);
  const [depositsforchart, setDepositsForChart]= React.useState({});
  const [cabinsforchart, setCabinsForChart]= React.useState({});
  const [servicesforchart, setServicesForChart] = React.useState({});
  const [userServicesforChart, setUserServicesForChart]= React.useState({});
  const [leadsAndCustomers, setLeadsAndCustomers] = React.useState({});


  React.useEffect(()=>{
    console.log("EN USE EFFECT REPORT-COMP")
    if (firstLoad){
    GetReports(locale).then((data)=>{
      setDepositsForChart(data.depo);
      setCabinsForChart(data.cabins);
      setServicesForChart(data.services);
      setUserServicesForChart(data.userServ);
      setLeadsAndCustomers(data.leadsAndCust);
      setFirstLoad(false);
      console.log(data);
    }
  ).catch((error)=>{
    console.log(error)
  })}
  },[firstLoad, locale])
  
  if(firstLoad){
    return (
      <Box sx={{ display: 'flex' }}>
        <Loading /> 
      </Box>
    );
  }

  const depositsMonthFilter = () => {
    const depositsMonth = depositsforchart;
    const result = _.filter(depositsMonth, function(item){
      return new Date (item.date) >= new Date (periodStart) && new Date (item.date) <= new Date (periodEnd)
    })
    return result;
  }
  const servicesForCabinFilter =() => cabinsforchart;
  const servicesrealizedFilter = ()  => servicesforchart;
  const servicesByUserFilter = () => userServicesforChart;
  const leadsbyDateFilter = () => leadsAndCustomers;

  const SeeAllData = (event)=>{
    setPeriodStart(new Date(2000,1,1))
    setPeriodEnd(new Date())
    setShowTabs("all")
    const actualScreen = "/reports/all"
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }
  const SeeQuarterData = (event)=>{
    setPeriodStart(getActualQuarterStartDate(new Date()))
    setPeriodEnd(getActualQuarterEndDate(new Date()))
    setShowTabs("quarter")
    const actualScreen = "/reports/quarter"
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }
  const SeeYearData = (event)=>{
    setPeriodStart(addYeartoDate(new Date(),-1))
    setPeriodEnd(new Date())
    setShowTabs("year")
    const actualScreen = "/reports/year"
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }


 
   
  const CustomerToolBar = () =>{
    return (
        <React.Fragment>
        <Grid container direction="row" justifyContent="space-around" alignItems="baseline"  marginBottom={2}>
            <Grid item xs={12} sm={2.8} md={2.8} sx={{mt:1}}>
              <Button 
                fullWidth 
                variant='outlined' 
                color={showTabs === "all"?"secondary":"primary"} 
                size='small'
                startIcon={<CalendarMonthTwoToneIcon />}
                onClick={SeeAllData}
                >{i18next.t("always")} 
              </Button>
            </Grid>
            <Grid item xs={12} sm={2.8} md={2.8} sx={{mt:1}}>
              <Button 
                fullWidth 
                variant='outlined' 
                color={showTabs === "year"?"secondary":"primary"} 
                size="small" 
                startIcon={<DateRangeTwoToneIcon />}
                onClick={SeeYearData}
                >{i18next.t("year")} 
              </Button>
            </Grid>
            <Grid item xs={12} sm={2.8} md={2.8} sx={{mt:1}}>
              <Button 
                fullWidth 
                variant='outlined'
                color={showTabs === "quarter"?"secondary":"primary"} 
                size="small" 
                onClick={SeeQuarterData}
                startIcon={<TodayTwoToneIcon />}
                >{i18next.t("quarter")} 
              </Button>
            </Grid>
            <Grid item xs={12} sm={2.8} md={2.8} sx={{mt:1}}>
              <Button 
                fullWidth 
                
                color="primary"
                size="small" 
                
                startIcon={<PrintTwoToneIcon />}
                >{i18next.t("printreports")}
              </Button>
            </Grid>      
        </Grid>
      </React.Fragment>
    )
  }

  const translatedLegend = (value, entry) =>{
    return i18next.t(value);
  }

  function CustomerToolTip({ payload, label, active }) {
    if (active) {
      //console.log(payload)
      return (
        <div className="custom-tooltip" style={{backgrouncolor:"white"}}>
          <p className="label"  margin="0">{label}</p>
          {payload[0].payload.custoName?<p className="label" margin="0" style={{color: "#118811"}}>{payload[0].payload?i18next.t(payload[0].dataKey) + " " + payload[0].payload.leadName:""}</p>:<></>}
          {payload[1].payload.custoName?<p className="label" margin="0" style={{color: "#881111"}}>{`${i18next.t(payload[1].dataKey)} ${payload[1].payload.custoName}`}</p>:<></>}
        </div>
      );
    }
  
    return null;
  }

  function DepositsToolTip({ payload, label, active }) {
    if (active) {

      return (
        <div className="custom-tooltip" style={{backgrouncolor:"white"}}>
          <p className="label" margin="0"><b>{label}</b></p>
          <p className="label" margin="0" style={{color: "#118811"}}>{payload[0].payload?i18next.t(payload[0].dataKey) + " " + payload[0].payload.earnings:""}</p>
          <p className="label" margin="0" style={{color: "#881111"}}>{`${i18next.t(payload[1].dataKey)} ${payload[1].payload.debts}`}</p>
        
        </div>
      );
    }
  
    return null;
  }

  //MAIN DOM RETURN
  return (
    <React.Fragment>
    
      <CustomerToolBar />
      <Grid container direction="row" justifyContent="flex-start" alignItems="baseline" sx={{mb:4}}>
        <Grid item xs={12} sm={12} md={12} sx={{mt:2}}>
        
          <Typography variant="h6" align='left' component="h2">{i18next.t("deposits")}, {i18next.t("earnings")} {i18next.t("and")} {i18next.t("debts")}</Typography>
          <ResponsiveContainer width={'100%'} height={400}>
          <LineChart
              width={570}
              height={350}
              data={depositsMonthFilter()}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: "€" }} />
              <Tooltip content={<DepositsToolTip />} wrapperStyle={{ backgroundColor: "white", borderStyle: "solid", borderWidth: "thin", borderColor:"grey", paddingLeft: "10px", paddingRight: "10px"}}/>
              <Legend formatter={translatedLegend}/>
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#118811"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="debts" stroke="#881111" />
            </LineChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12} sm={4} md={4} sx={{mt:2}}>
            <Typography variant="h6" align='left' component="h2">{i18next.t("services")} {i18next.t("for")} {i18next.t("cabin")}</Typography>
            <ResponsiveContainer width={'100%'} height={400}>
            <BarChart
                width={570}
                height={350}
                data={servicesForCabinFilter()}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 5
                }}
              >
                <Bar dataKey="realized" fill="#8884d8" />
                <XAxis dataKey="cabinName" />
                <YAxis />
                <Tooltip />
                <Legend formatter={translatedLegend}/>
            </BarChart>
            </ResponsiveContainer>
        </Grid>
        <Grid item xs={12} sm={4} md={4} sx={{mt:2}}>
            <Typography variant="h6" align='left' component="h2">{i18next.t("realized")}</Typography>
            <ResponsiveContainer width={'100%'} height={400}>
            <BarChart
                width={570}
                height={350}
                data={servicesrealizedFilter()}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 5
                }}
              >
                <Bar dataKey="realized" fill="#8884d8" />
                <XAxis dataKey="service" />
                <YAxis />
                <Tooltip />
                <Legend formatter={translatedLegend}/>
            </BarChart>
            </ResponsiveContainer>
        </Grid>
        <Grid item xs={12} sm={4} md={4} sx={{mt:2}}>
            <Typography variant="h6" align='left' component="h2">{i18next.t("servicesbyuser")}</Typography>
            <ResponsiveContainer width={'100%'} height={400}>
            <BarChart
                width={570}
                height={350}
                data={servicesByUserFilter()}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 5
                }}
              >
                <Bar dataKey="realized" fill="#8884d8" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend formatter={translatedLegend}/>
            </BarChart>
            </ResponsiveContainer>
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{mt:2}}>
        
          <Typography variant="h6" align='left' component="h2">{i18next.t("leadsgained")}</Typography>
          <ResponsiveContainer width={'100%'} height={400}>
          <LineChart
              width={570}
              height={350}
              data={leadsbyDateFilter()}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomerToolTip />}  wrapperStyle={{ backgroundColor: "white", borderStyle: "solid", borderWidth: "thin", borderColor:"grey", paddingLeft: "10px", paddingRight: "10px"}}/>
              <Legend formatter={translatedLegend}/>
              <Line
                type="monotone"
                dataKey="leads"
                stroke="#118811"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="customers"
                stroke="#111188"
                activeDot={{ r: 8 }}
              />
            
            </LineChart>
            </ResponsiveContainer>
          </Grid>
      </Grid>     
    </React.Fragment>
  );
}