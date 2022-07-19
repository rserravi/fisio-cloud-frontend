//REACT IMPORTS
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { LineChart,Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart } from 'recharts';


//MUI IMPORTS
import { Button, Grid, Typography } from '@mui/material';

//CUSTOM IMPORTS
import Title from './Title';


//ICONS

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { GetCabinsForChart, GetDepositsArrayForChart, GetLeadsByDate, GetServicesForChart, GetServicesRealizedByUsersForChart } from '../utils/dataFetch-utils';


/////////////////////////////////
//                             //
//   MAIN COMPONENT FUNCTION   //
//                             //
/////////////////////////////////

export const ReportsComponent = (props)=> {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const locale = props.locale;
  const { t } = useTranslation();
  const depositsMonth = GetDepositsArrayForChart(locale);
  const servicesForCabin= GetCabinsForChart();
  const servicesrealized = GetServicesForChart();
  const servicesByUser = GetServicesRealizedByUsersForChart();
  const leadsbyDate = GetLeadsByDate();
  
   
  // Set if Toolbar is visible depending on var compact
  const CustomerToolBar = () =>{
    return (
      <React.Fragment>
         <Grid container direction="row" justifyContent="flex-start" alignItems="baseline" sx={{mb:4}}>
            <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
              <Button variant='contained' size="small" startIcon={<PersonAddAlt1Icon />}>{t("addnewcustomer")} </Button>
            </Grid>
            <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
              <Button variant='contained' size="small" startIcon={<PersonAddAlt1Icon />}>{t("addnewcustomer")} </Button>
            </Grid>
            <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
              <Button variant='contained' size="small" startIcon={<PersonAddAlt1Icon />}>{t("addnewcustomer")} </Button>
            </Grid>
            <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
              <Button variant='contained' size="small" startIcon={<PersonAddAlt1Icon />}>{t("addnewcustomer")} </Button>
            </Grid>
        </Grid>

      </React.Fragment>
    )
  }

  const translatedLegend = (value, entry) =>{
    return t(value);
  }

  function CustomerToolTip({ payload, label, active }) {
    if (active) {
     // console.log("PAYLOAD TOOLTIP", payload )
      return (
        <div className="custom-tooltip">
          <p className="label">{label}</p>
          <p className="label">{payload[0].payload?payload[0].dataKey + " " + payload[0].payload.leadName:""}</p>
          <p className="label">{`${payload[1].dataKey} ${payload[1].payload.custoName}`}</p>
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
        
          <Typography variant="h6" align='left' component="h2">{t("deposits")}, {t("earnings")} {t("and")} {t("debts")}</Typography>
          <ResponsiveContainer width={'100%'} height={400}>
          <LineChart
              width={570}
              height={350}
              data={depositsMonth}
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
              <Tooltip />
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
            <Typography variant="h6" align='left' component="h2">{t("services")} {t("for")} {t("cabin")}</Typography>
            <ResponsiveContainer width={'100%'} height={400}>
            <BarChart
                width={570}
                height={350}
                data={servicesForCabin}
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
            <Typography variant="h6" align='left' component="h2">{t("realized")}</Typography>
            <ResponsiveContainer width={'100%'} height={400}>
            <BarChart
                width={570}
                height={350}
                data={servicesrealized}
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
            <Typography variant="h6" align='left' component="h2">{t("users")}</Typography>
            <ResponsiveContainer width={'100%'} height={400}>
            <BarChart
                width={570}
                height={350}
                data={servicesByUser}
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
        
          <Typography variant="h6" align='left' component="h2">{t("leadsgained")}</Typography>
          <ResponsiveContainer width={'100%'} height={400}>
          <LineChart
              width={570}
              height={350}
              data={leadsbyDate}
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
              <Tooltip content={<CustomerToolTip />}/>
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