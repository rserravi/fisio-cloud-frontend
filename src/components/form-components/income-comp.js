import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from '../Title';
import { useTranslation } from 'react-i18next';
import { addMonthtoDate, formatDate, toLocalDate2 } from '../../utils/date-utils';
import { GetDepositsFromDate, GetDepositsArrayFromDate, getCustomer, getCustomerNameFromId } from '../../utils/dataFetch-utils';
import { Box } from '@mui/system';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Button, Container, TextField } from '@mui/material';
import { LocalTextForDataGrid } from '../../utils/mui-custom-utils';
import { DataGrid } from '@mui/x-data-grid';
import { locale } from 'moment';


function preventDefault(event) {
  event.preventDefault();
}

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

export default function Income() {
  const { t } = useTranslation();
  var today = new Date().toISOString();
  const [income, setIncome] = React.useState( initData);

  React.useEffect(()=>{
    const newInc = GetDepositsArrayFromDate(addMonthtoDate(today,-1),today, "paid")
    console.log("EN USE EFFECT", newInc);
    setIncome(newInc);

  },[])

  const handlePeriodStart = (value) =>{
    console.log("VALUE en handleStart: ",value);
    console.log("PERIODEND en handleStart", income[0].periodEnd)
    setIncome(GetDepositsArrayFromDate(new Date(value),new Date(income[0].periodEnd), "paid"))
  }

  const handlePeriodEnd = (value) =>{
    //setIncome(GetDepositsArrayFromDate(new Date(income.periodStart),new Date(value), "paid"))
    
  }

  const rows = income.map((row) => 
    (
      {
        id: row.id, 
        customerId:getCustomerNameFromId(row.customerId),
        date: new Date(row.date).toLocaleDateString("es-ES"),
        duration: row.duration + " m.",
        service: row.service, 
        price: row.price + " €",
        paid: row.paid + " €",
        status:t(row.status),
        closed: new Date(row.closed).toLocaleDateString("es-ES")
        
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

  const Columns = () => {
    const { t } = useTranslation();
  
    return(
      [
        { field: 'id', headerName: t("Id"), width: 20 },
        { field: 'paid', headerName:t("income"), width:80 },
        { field: 'customerId', headerName:t("Customer"), width:200 },
        { field: 'date', headerName: t("date"), width: 120},
        { field: 'service', headerName:t("service"), width:80 },
        { field: 'duration', headerName:t("duration"), width:80 }, 
        { field: 'closed', headerName:t("closed"), width:120
     },
      ]
    )
  } 

  return (
    <React.Fragment>
      <Title>{t("incomes")}</Title>
      <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%', mt:2   }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
                label={t("periodStart")}
                value={income[0].periodStart? income[0].periodStart: new Date("15/01/20").toDateString()}
                variant="standard"
                inputFormat="DD/MM/yyyy"
                sx = {{mr:2}}
                onChange={handlePeriodStart}
                renderInput={(params) => <TextField variant="standard" sx = {{mr:2}} {...params} />}
            />
            <DatePicker
                label={t("periodEnd")}
                inputFormat="DD/MM/yyyy"
                value={income[0].periodEnd? income[0].periodEnd: new Date().toDateString()}
                variant="standard"
                sx = {{mr:2}}
                onChange={handlePeriodEnd}
                renderInput={(params) => <TextField variant="standard" sx = {{mr:2}} {...params} />}
            />
        </LocalizationProvider>
        <Button onClick={monthClick} variant='outlined'sx={{mr:1}}>{t("month")}</Button>
        <Button onClick={quarterClick} variant='outlined'sx={{mr:1}}>{t("quarter")}</Button>
        <Button onClick={yearClick} variant='outlined'sx={{mr:1}}>{t("year")}</Button>
        
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