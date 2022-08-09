import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { formatDate } from '../utils/date-utils';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';
import i18next from 'i18next';
import { getDeposits } from '../api/deposits.api';
import { Box } from '@mui/system';
import { Loading } from './Loading-comp';



function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSelector = useSelector(state => state.user);
  const userId = userSelector.id;

  var today = formatDate(new Date());

  const [income, setIncome] = React.useState(props.income);
  const [debts, setDebts] = React.useState(props.debts);
  const [loading, setLoading]= React.useState(true);
  var  startDate = props.startDate?props.startDate:new Date(2000,1,1)
  var compact = props.compact;

  React.useEffect(() => {
    if (!props.income && !props.debts){
      getDeposits(startDate, new Date(), userId).then((data)=>{
        //console.log("DATA RESULT",data);
        setDebts(data.result.debts)
        setIncome(data.result.income);
        setLoading(false);
      }
    ).catch((error)=>{
      console.log(error)
    })
    }
    if (props.income && props.debts){
      setLoading(false);
    }    
}, [startDate, userId, props.income, props.debts]);

  
  const gotoDeposits=(event)=>{
    preventDefault(event);
    dispatch(navigationLoading());
    const actualScreen = "/deposits";
    navigate(actualScreen, {replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  if(loading){
    return (
      <Box sx={{ display: 'flex' }}>
        <Loading /> 
      </Box>
    );
  }

  if(compact){

  return (
    <React.Fragment>
      <Title>{i18next.t("deposits")} </Title>
      <Typography component="p" variant="h5"style={{color:"#00adb5"}}>
       {i18next.t("incomes")}: {income} €
      </Typography>
      <Typography component="p" variant="h6" style={{color:"#FF0000"}}>
       {i18next.t("debts")}: {debts} €
      </Typography>
      <p></p>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      {i18next.t("from")} {formatDate(startDate)} {i18next.t("to")} {today}.
      </Typography>
      <Button onClick={gotoDeposits} variant="outlined">{i18next.t("seedeposits")}</Button>
  
    </React.Fragment>
  );
  }
  return (
    <React.Fragment>
      <Title>{i18next.t("deposits")}</Title>
      <Grid container>
        <Grid item xs={12} sm={4} md={4}>
        <Typography component="p" variant="h5"style={{color:"#00adb5"}}>
          {i18next.t("incomes")}: {income} €
        </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Typography component="p" variant="h6" style={{color:"#FF0000"}}>
          {i18next.t("debts")}: {debts} €
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {i18next.t("from")} {formatDate(startDate)} {i18next.t("to")} {today}.
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}