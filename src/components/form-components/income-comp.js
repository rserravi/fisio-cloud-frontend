import * as React from 'react';
import Title from '../Title';
import { useTranslation } from 'react-i18next';
import { addMonthtoDate, twoDigitsDateOptions } from '../../utils/date-utils';
import { GetDepositsFromDate, GetDepositsArrayFromDate, getCustomer, getCustomerNameFromId } from '../../utils/dataFetch-utils';
import { Box } from '@mui/system';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Button, Container, Grid, TextField, Tooltip } from '@mui/material';
import { LocalTextForDataGrid } from '../../utils/mui-custom-utils';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { locale } from 'moment';
import configData from "../../assets/data/config-data.json"
import EditIcon from '@mui/icons-material/Edit';




const initData = [{
    id: "0",
    date: "",
    duration:"0",
    service: "masage",
    price:"50",
    paid :"0",
    status:"",
    closed: "",
    notes: "",
    attachment:"",
    customerId:"",
    periodStart: new Date(), 
    periodEnd: new Date()
}]



export default function Income(props) {
  const { t } = useTranslation();
  const localization = props.locale;
  locale(localization);
  var today = new Date().toISOString(localization);
  const [income, setIncome] = React.useState( initData);

  React.useEffect(()=>{
    const newInc = GetDepositsArrayFromDate(addMonthtoDate(today,-1),today, "paid")
    setIncome(newInc);

  },[])

  const handlePeriodStart = (value) =>{
    setIncome(GetDepositsArrayFromDate(new Date(value),new Date(income[0].periodEnd), "paid"))
  }

  const handlePeriodEnd = (value) =>{
    setIncome(GetDepositsArrayFromDate(new Date(income[0].periodStart),new Date(value), "paid"))
    
  }

  const editHistory = (params) =>{

  }

  const rows = income.map((row) => 
    (
      {
        id: row.id, 
        customerId:getCustomerNameFromId(row.customerId),
        date: new Date(row.date).toLocaleDateString(localization, twoDigitsDateOptions),
        duration: row.duration + " m.",
        service: row.service, 
        price: row.price + " €",
        paid: row.paid + " €",
        status:t(row.status),
        closed: new Date(row.closed).toLocaleDateString(localization, twoDigitsDateOptions)
        
      }
    )
  );

  const monthClick = (event)=>{
    setIncome(GetDepositsArrayFromDate(addMonthtoDate(today,-1),today, "paid"))
  }

  const quarterClick = (event)=>{
    setIncome(GetDepositsArrayFromDate(addMonthtoDate(today,-4),today, "paid"))
  }

  const yearClick = (event)=>{
    setIncome(GetDepositsArrayFromDate(addMonthtoDate(today,-12),today, "paid"))
  }
  const alwaysClick = (event)=>{
    setIncome(GetDepositsArrayFromDate(new Date(2000,1,1),today, "paid"))
  }

  const Columns = () => {
    const { t } = useTranslation();
  
    return(
      [
        { field: 'id', headerName: t("Id"), width: 20 },
        { field: 'paid', headerName:t("income"), width:70 },
        { field: 'customerId', headerName:t("Customer"), width:200 },
        { field: 'date', headerName: t("date"), width: 120},
        { field: 'service', headerName:t("service"), width:80 },
        { field: 'duration', headerName:t("duration"), width:80 }, 
        { field: 'closed', headerName:t("closed"), width:120},
        {
          field: 'actions',
          type: 'actions',
          headerName: "",
          width: 20,
          sortable: false,
          getActions: (params) => [
            <GridActionsCellItem
            icon={<Tooltip title={t("editappointment")}><EditIcon /></Tooltip>}
            label={t("edit")}
            
            onClick={(event) => {
              editHistory(params);
              event.stopPropagation();
          }}
          />,
          ],
        },
      ]
    )
  } 

  return (
    <React.Fragment>
      <Title>{t("incomes")}</Title>
      <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%', mt:2   }}>
      <Grid container >
        <Grid item xs={12} sm={4} md={4}>
          <LocalizationProvider locale={localization} dateAdapter={AdapterMoment}> 
            <DatePicker
                label={t("periodStart")}
                value={income[0] && income[0].periodStart? income[0].periodStart: new Date("15/01/20").toDateString()}
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
                label={t("periodEnd")}
                inputFormat="DD/MM/yyyy"
                value={income[0] && income[0].periodEnd? income[0].periodEnd: new Date().toDateString()}
                variant="standard"
                sx = {{mr:2}}
                onChange={handlePeriodEnd}
                renderInput={(params) => <TextField variant="standard" sx = {{mr:2}} {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid container alignItems="stretch" justifyContent="flex-start" direction="row" sx={{mt:2}}>  
          <Grid item xs={6} sm={3} md={3}>
              <Button onClick={alwaysClick} variant='outlined'sx={{mr:1}}>{t("always")}</Button>
          </Grid>
          <Grid item xs={6} sm={3} md={3}>
              <Button onClick={monthClick} variant='outlined'sx={{mr:1}}>{t("month")}</Button>
          </Grid>
          <Grid item xs={6} sm={3} md={3}>
              <Button onClick={quarterClick} variant='outlined'sx={{mr:1}}>{t("quarter")}</Button>
          </Grid>
          <Grid item xs={6} sm={3} md={3}>
            <Button onClick={yearClick} variant='outlined'sx={{mr:1}}>{t("year")}</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%', mt:2  }}>
    <Container sx={{height:320}}>
    <DataGrid
        rows={rows}
        columns={Columns()}
        autoHeight={false}
        checkboxSelection ={false}
        rowsPerPageOptions={[5,10,25,50,100]}
        rowsPerPage ={10}    
        //onSelectionModelChange={handleRowSelection}
        localeText={LocalTextForDataGrid()}
      /> 
     </Container>
    </Box>
                
    </React.Fragment>
  );
}