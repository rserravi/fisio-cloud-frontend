import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useTranslation } from 'react-i18next';
import { addMonthtoDate, formatDate } from '../utils/date-utils';
import { GetDebtsToDate, GetDepositsFromDate } from '../utils/dataFetch-utils';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';


function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  const [startDate, setStartDate] = React.useState(new Date());
   // eslint-disable-next-line
  const [endDate, setEndDate] = React.useState(new Date());
  const [titleTime, setTitleTime] = React.useState(t("month"))
  const [showButton, setShowButton] = React.useState(false);

  React.useEffect(()=>{
    if (props.month){
      setStartDate(addMonthtoDate(new Date(),-1))
      setTitleTime(t("month"))
    }
    if (props.quarter){
      setStartDate(addMonthtoDate(new Date(),-4))
      setTitleTime(t("quarter"))
    }
    if (props.year){
      setStartDate(addMonthtoDate(new Date(),-12))
      setTitleTime(t("year"))
    }
    if (props.always){
      setStartDate(new Date (2000,1,1))
      setTitleTime(t("always"))
    }
    
    if (props.dashboard){
      setShowButton(true)
    }

  },[props.month, props.quarter, props.year, props.always, props.dashboard,t])

  var today = formatDate(new Date());

  const ingresos = GetDepositsFromDate(startDate,endDate);
  const deudas = GetDebtsToDate(new Date());
  
  const gotoDeposits=(event)=>{
    preventDefault(event);
    dispatch(navigationLoading());
    const actualScreen = "/deposits";
    navigate(actualScreen, {replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  return (
    <React.Fragment>
      <Title>{t("deposits")} {titleTime}</Title>
      <Typography component="p" variant="h5"style={{color:"#00adb5"}}>
       {t("incomes")}: {ingresos} €
      </Typography>
      <Typography component="p" variant="h6" style={{color:"#FF0000"}}>
       {t("debts")}: {deudas} €
      </Typography>
      <p></p>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        del {formatDate(startDate)} a {today}.
      </Typography>
      {showButton? <Button onClick={gotoDeposits} variant="outlined">{t("seedeposits")}</Button>:<></>}
  
    </React.Fragment>
  );
}