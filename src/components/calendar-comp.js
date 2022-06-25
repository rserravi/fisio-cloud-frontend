import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { GetAppointmentsCalendarFormat } from '../utils/dataFetch-utils';

import 'react-big-calendar/lib/sass/styles.scss'


export default function CalendarComp() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const localizer = momentLocalizer(moment)
  const resourceMap = [
    { resourceId: 1, resourceTitle: 'Board room' },
    { resourceId: 2, resourceTitle: 'Training room' },
    { resourceId: 3, resourceTitle: 'Meeting room 1' },
    { resourceId: 4, resourceTitle: 'Meeting room 2' },
  ]

  return (
    <React.Fragment>
     <div>
      <Calendar
        localizer={localizer}
        events={GetAppointmentsCalendarFormat()}
        resourceIdAccessor="resourceId"
        startAccessor="start"
        resources={resourceMap}
          resourceTitleAccessor="resourceTitle"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>

     
    </React.Fragment>
  );
}