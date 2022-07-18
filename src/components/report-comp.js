//REACT IMPORTS
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

//MUI IMPORTS
import { Button, Grid } from '@mui/material';

import Tooltip from '@mui/material/Tooltip';

//CUSTOM IMPORTS
import Title from './Title';

//VICTORY IMPORTS

//ICONS

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { GetDepositsForMonthChart } from '../utils/dataFetch-utils';


/////////////////////////////////
//                             //
//   MAIN COMPONENT FUNCTION   //
//                             //
/////////////////////////////////

export const ReportsComponent = (props)=> {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const depositsMonth = GetDepositsForMonthChart(new Date (2021,7,1), new Date (2022,7,1));
   
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

  //MAIN DOM RETURN
  return (
    <React.Fragment>
    
      <CustomerToolBar />
      <Grid container direction="row" justifyContent="flex-start" alignItems="baseline" sx={{mb:4}}>
            <Grid item xs={12} sm={6} md={6} sx={{mt:2}}>
              
            </Grid>
      </Grid>     
    </React.Fragment>
  );
}