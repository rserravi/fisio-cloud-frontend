import * as React from 'react';
import Title from '../Title';
import { useTranslation } from 'react-i18next';
import { addMonthtoDate,  twoDigitsDateOptions } from '../../utils/date-utils';
import { GetDepositsArrayFromDate, getCustomerNameFromId } from '../../utils/dataFetch-utils';
import { Box } from '@mui/system';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Button, Container, Grid, TextField, Tooltip } from '@mui/material';
import { LocalTextForDataGrid } from '../../utils/mui-custom-utils';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { locale } from 'moment';

//ICONS
import EditIcon from '@mui/icons-material/Edit';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import CampaignIcon from '@mui/icons-material/Campaign';



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

export default function Loses(props) {
  const { t } = useTranslation();
  const localization = props.locale;
  locale(localization);
  var today = new Date().toISOString(localization);
  const [loses, setloses] = React.useState( initData);

  React.useEffect(()=>{
    const newInc = GetDepositsArrayFromDate(addMonthtoDate(today,-120),today, "pending")
    setloses(newInc);

  },[today])

  const handlePeriodStart = (value) =>{
    setloses(GetDepositsArrayFromDate(new Date(value),new Date(loses[0].periodEnd), "paid"))
  }

  const handlePeriodEnd = (value) =>{
    setloses(GetDepositsArrayFromDate(new Date(loses[0].periodStart),new Date(value), "paid"))
    
  }

  const editHistory = (params) =>{

  }
  const closeDebt = (params) =>{
    
  }
  const sendRequest = (params) =>{
    
  }

  const alwaysClick = (event) =>{
    setloses(GetDepositsArrayFromDate(new Date(2000,1,1),today, "pending"))
  }

  const lastYearClick = (events)=>{
    setloses(GetDepositsArrayFromDate(addMonthtoDate(today,-12),today, "pending"))
  }

  function getLoses(params) {
    return (
      Number(params.row.price) - Number(params.row.paid) + " €"
    )
  }

  const rows = loses.map((row) => 
    (
      {
        id: row.id, 
        customerId:getCustomerNameFromId(row.customerId),
        date: new Date(row.date).toLocaleDateString(localization, twoDigitsDateOptions),
        duration: row.duration + " m.",
        service: row.service, 
        price: row.price,
        paid: row.paid,
    
        closed: new Date(row.closed).toLocaleDateString(localization, twoDigitsDateOptions)
        
      }
    )
  );

  const Columns = () => {
    const { t } = useTranslation();
  
    return(
      [
        { field: 'id', headerName: t("Id"), width: 20 },
        { field: 'loses', headerName:t("debt"), width:70, valueGetter: getLoses, },
        { field: 'customerId', headerName:t("Customer"), width:200 },
        { field: 'date', headerName: t("date"), width: 120},
        { field: 'service', headerName:t("service"), width:80 },
        { field: 'duration', headerName:t("duration"), width:80 }, 
        {
          field: 'actions',
          type: 'actions',
          headerName: "",
          width: 150,
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
          
          <GridActionsCellItem
              icon={<Tooltip title={t("close")}><PointOfSaleIcon /></Tooltip>}
              label={t("close")}
              
              onClick={(event) => {
                closeDebt(params);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
              icon={<Tooltip title={t("sendRequest")}><CampaignIcon /></Tooltip>}
              label={t("sendRequest")}
              
              onClick={(event) => {
                sendRequest(params);
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
      <Title>{t("loses")}</Title>
      <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%', mt:2   }}>
      <Grid container >
        <Grid item xs={12} sm={4} md={4}>
          <LocalizationProvider locale={localization} dateAdapter={AdapterMoment}>
            <DatePicker
                label={t("periodStart")}
                value={loses[0] && loses[0].periodStart? loses[0].periodStart: new Date("15/01/20").toDateString()}
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
                value={loses[0] && loses[0].periodEnd? loses[0].periodEnd: new Date().toDateString()}
                variant="standard"
                sx = {{mr:2}}
                onChange={handlePeriodEnd}
                renderInput={(params) => <TextField variant="standard" sx = {{mr:2}} {...params} />}
            />
          </LocalizationProvider>
          </Grid>
          <Grid item xs={6} sm={2} md={2} sx={{mt:2}}>
            <Button onClick={alwaysClick} variant='outlined'sx={{mr:1}}>{t("always")}</Button>
          </Grid>
          <Grid item xs={6} sm={2} md={2} sx={{mt:2}}>
            <Button onClick={lastYearClick} variant='outlined'sx={{mr:1}}>{t("last")} {t("year")}</Button>
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