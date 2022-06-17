import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../utils/date-utils';


function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const { t, i18n } = useTranslation();
  var today = formatDate(new Date());

  return (
    <React.Fragment>
      <Title>{t("recentdeposits")}</Title>
      <Typography component="p" variant="h4">
        3.024,00 € 
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {t("on")} {today}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          {t("viewbalance")}
        </Link>
      </div>
    </React.Fragment>
  );
}