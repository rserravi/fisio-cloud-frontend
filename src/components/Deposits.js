import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { addMonthtoDate, formatDate } from '../utils/date-utils';
import { GetDebtsToDate, GetDepositsFromDate } from '../utils/dataFetch-utils';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';
import i18next from 'i18next';


function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [startDate, setStartDate] = React.useState(new Date());
   // eslint-disable-next-line
  const [endDate, setEndDate] = React.useState(new Date());
  const [titleTime, setTitleTime] = React.useState(i18next.t("month"))
  const [showButton, setShowButton] = React.useState(false);

  React.useEffect(()=>{
    if (props.month){
      setStartDate(addMonthtoDate(new Date(),-1))
      setTitleTime(i18next.t("month"))
    }
    if (props.quarter){
      setStartDate(addMonthtoDate(new Date(),-4))
      setTitleTime(i18next.t("quarter"))
    }
    if (props.year){
      setStartDate(addMonthtoDate(new Date(),-12))
      setTitleTime(i18next.t("year"))
    }
    if (props.always){
      setStartDate(new Date (2000,1,1))
      setTitleTime(i18next.t("always"))
    }
    
    if (props.dashboard){
      setShowButton(true)
    }

  },[props.month, props.quarter, props.year, props.always, props.dashboard])

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
      <Title>{i18next.t("deposits")} {titleTime}</Title>
      <Typography component="p" variant="h5"style={{color:"#00adb5"}}>
       {i18next.t("incomes")}: {ingresos} €
      </Typography>
      <Typography component="p" variant="h6" style={{color:"#FF0000"}}>
       {i18next.t("debts")}: {deudas} €
      </Typography>
      <p></p>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        del {formatDate(startDate)} a {today}.
      </Typography>
      {showButton? <Button onClick={gotoDeposits} variant="outlined">{i18next.t("seedeposits")}</Button>:<></>}
  
    </React.Fragment>
  );
}