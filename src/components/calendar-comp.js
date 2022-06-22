import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Title from './Title';
import { useTranslation } from 'react-i18next';



export default function CalendarComp() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();


  return (
    <React.Fragment>
      <Title>{t("today")}</Title>
      
       Aquí va el Calendario con Google Calendar
     
    </React.Fragment>
  );
}