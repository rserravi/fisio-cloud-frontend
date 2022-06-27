import React, { useCallback } from 'react'
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { GetAppointmentsCalendarFormat } from '../utils/dataFetch-utils';



import 'react-big-calendar/lib/sass/styles.scss'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { addMonthtoDate, getDateFromISOTime, getTimeFromISOTime } from '../utils/date-utils';

require('moment/locale/es.js')
require('moment/locale/ca.js')
require('moment/locale/fr.js')

export default function CalendarComp(props) {
  const theme = useTheme();
  const compact =props.compact;
  const localizer = momentLocalizer(moment)
  const { t, i18n } = useTranslation();
  
  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedvent] = React.useState(null);

  moment.locale('es', {
    week: {
        dow: 1,
        doy: 1,
    },
    });


  const handleDialogClose = () => {
    setOpen(false);

  };
  
  const handleSelectEvent = useCallback(
    (event) => {
      console.log(event);
      setSelectedvent(event);
      setOpen(true);
    },
    []
  )
 
  const handleSelectSlot = useCallback(
    (event) => {
      console.log("CREATE EVENT AT " + event.start)
      console.log(event)
    },
    []
  )

 
  const resourceMap = [
    { resourceId: 1, resourceTitle: 'Sala Principal' },
  ]

  return (
    <React.Fragment>
      
     {compact? <div>
      <Calendar
        localizer={localizer}
        events={GetAppointmentsCalendarFormat()}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        culture='es'
        views={['agenda']}
        messages={{
          week: 'Semana',
          work_week: 'Semana de trabajo',
          day: 'Día',
          month: 'Mes',
          previous: 'Atrás',
          next: 'Después',
          today: 'Hoy',
          agenda: 'Agenda',
          date: 'Fecha',
          time: 'Hora',
          event: 'Evento',
          showMore: (total) => `+${total} más`,
        }}
       
        defaultView={Views.AGENDA}
        selectable
        length={60}
        defaultDate={addMonthtoDate(Date.now(), -1)}
        resourceIdAccessor="resourceId"
        startAccessor="start"
        resources={resourceMap}
        resourceTitleAccessor="resourceTitle"
        endAccessor="end"
        popup
        style={{ height: 200 }}
        eventPropGetter={
          (event) => {
            let newStyle = {
              backgroundColor: event.backgroundColor,
              color: event.color
            };
      
            return {
              className: "",
              style: newStyle
            };
          }
        }
  
      />
    </div>:
    <div>
    <Calendar
      localizer={localizer}
      events={GetAppointmentsCalendarFormat()}
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleSelectEvent}
      resourceIdAccessor="resourceId"
      startAccessor="start"
      resources={resourceMap}
      endAccessor="end"
      style={{ height: 500 }}
      selectable
      popup
      messages={{
        week: 'Semana',
        work_week: 'Semana de trabajo',
        day: 'Día',
        month: 'Mes',
        previous: 'Atrás',
        next: 'Después',
        today: 'Hoy',
        agenda: 'Agenda',
        date: 'Fecha',
        time: 'Hora',
        event: 'Evento',
        showMore: (total) => `+${total} más`,
      }}
      eventPropGetter={
        (event) => {
          let newStyle = {
            backgroundColor: event.backgroundColor,
            color: event.color
          };
    
          return {
            className: "",
            style: newStyle
          };
        }
      }

      />
    </div>
    }

    <Dialog
      open={open}
      onClose={handleDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {selectedEvent? selectedEvent.title : <></>}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {selectedEvent? ""+getDateFromISOTime(selectedEvent.start) : <></>}
        &nbsp;de {selectedEvent? ""+getTimeFromISOTime(selectedEvent.start) : <></>} a {selectedEvent? ""+getTimeFromISOTime(selectedEvent.end) : <></>}
        {selectedEvent && selectedEvent.ispast ? <p  style={{color:"#FF0000"}}><strong> CITA PASADA</strong> </p>  : <></>}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {selectedEvent && selectedEvent.ispast ? <Button onClick={handleDialogClose}>Escribir informe</Button> :  <Button onClick={handleDialogClose}>Enviar Recordatorio</Button>}
        <Button onClick={handleDialogClose}>Duplicar Cita</Button>
        <Button onClick={handleDialogClose}>Cancelar Cita</Button>
        <Button onClick={handleDialogClose} autoFocus>
          Salir
        </Button>
      </DialogActions>
    </Dialog>

    </React.Fragment>
  );
}