import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useTranslation } from 'react-i18next';
import { addMonthtoDate, formatDate } from '../utils/date-utils';
import { GetDebtsToDate, GetDepositsFromDate } from '../utils/dataFetch-utils';


function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits(props) {
  const { t } = useTranslation();
  console.log ("PROPS EN DEPOSITS", props)
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [titleTime, setTitleTime] = React.useState(t("month"))
  var mode = "month";

  React.useEffect(()=>{
    if (props.month){
      mode = "month";
      setStartDate(addMonthtoDate(new Date(),-1))
      setTitleTime(t("month"))
    }
    if (props.quarter){
      mode = "quarter";
      setStartDate(addMonthtoDate(new Date(),-4))
      setTitleTime(t("quarter"))
    }
    if (props.year){
      mode = "year";
      setStartDate(addMonthtoDate(new Date(),-12))
      setTitleTime(t("year"))
    }

  },[])

  
  
  var today = formatDate(new Date());

  const ingresos = GetDepositsFromDate(startDate,endDate);
  const deudas = GetDebtsToDate(new Date());


  return (
    <React.Fragment>
      <Title>{t("deposits")} {t("last")} {titleTime}</Title>
      <Typography component="p" variant="h5"style={{color:"#00adb5"}}>
       {t("incomes")}: {ingresos} €
      </Typography>
      <Typography component="p" variant="h6" style={{color:"#FF0000"}}>
       Deudas: {deudas} €
      </Typography>
      <p></p>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        del {formatDate(startDate)} a {today}.
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          {t("viewbalance")}
        </Link>
      </div>
    </React.Fragment>
  );
}