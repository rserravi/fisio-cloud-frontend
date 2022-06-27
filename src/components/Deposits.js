import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useTranslation } from 'react-i18next';
import { addMinutesToDate, addMonthtoDate, formatDate } from '../utils/date-utils';
import { GetDebtsToDate, GetDepositsFromDate } from '../utils/dataFetch-utils';


function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const { t, i18n } = useTranslation();
  var today = formatDate(new Date());

  const ingresos = GetDepositsFromDate(addMonthtoDate(new Date,-1),new Date);
  const deudas = GetDebtsToDate(new Date);


  return (
    <React.Fragment>
      <Title>{t("lastmonthdeposits")}</Title>
      <Typography component="p" variant="h5"style={{color:"#00adb5"}}>
       Ingresos: {ingresos} €
      </Typography>
      <Typography component="p" variant="h6" style={{color:"#FF0000"}}>
       Deudas: {deudas} €
      </Typography>
      <p></p>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        del {formatDate(addMonthtoDate(new Date,-1))} a {today}.
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          {t("viewbalance")}
        </Link>
      </div>
    </React.Fragment>
  );
}