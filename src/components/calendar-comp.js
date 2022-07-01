import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { GetAppointmentsCalendarFormat, GetCustomerIdFromName, getPriceForService, getServices } from '../utils/dataFetch-utils';
import CustomerSearchBar from './form-components/customer-search-form-comp';



import 'react-big-calendar/lib/sass/styles.scss'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, MenuItem, TextField } from '@mui/material';
import { addMonthtoDate, getDateFromISOTime, getTimeFromISOTime } from '../utils/date-utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimePicker } from '@mui/x-date-pickers';

require('moment/locale/es.js')
require('moment/locale/ca.js')
require('moment/locale/fr.js')

var initValidation={
  id:"1",
  date: new Date(Date.now()),
  duration: "60", 
  service: "Masaje",
  price:"0",
  paid:"0",
  status:"pending",
  closed:"",
  notes:"",
  attachment:[{}]
}

export default function CalendarComp(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const compact =props.compact;
  const localizer = momentLocalizer(moment)
  const { t } = useTranslation();
  
  const [open, setOpen] = React.useState(false);
  const [customerID, setCustomerID] = React.useState(props.customerId)
  const [customerName, setCustomerName] = React.useState("")
  const [newEventDlg, setNewEventDlg] = React.useState(false);

  const [selectedEvent, setSelectedvent] = React.useState(null);
  const [eventStart, setEventStart] = React.useState("00:00");
  const [appo, setAppo] = React.useState(initValidation);
  const services = getServices();

  

  moment.locale('es', {
    week: {
        dow: 1,
        doy: 1,
    },
    });

  const SetCustomer = (data) =>{
      console.log (data);
      setCustomerName(data);
      setCustomerID(GetCustomerIdFromName(data));
    }
  
  const handleDialogClose = () => {
    setOpen(false);

  };
  
  const handleSelectEvent = useCallback(
    (event) => {
      console.log(event)
      setSelectedvent(event);
      setCustomerID(event.customerId);
      setAppo({...appo, "id": event.resourceId})
      setOpen(true);
    },
    [appo]
    
  )
 
  const handleSelectSlot = useCallback(
    (event) => {
      setEventStart(event.start);
      setNewEventDlg(true);;
    },
    []
  )

  const newEventDlgClose = () =>{
    setNewEventDlg(false);
  }

  const newEventDlgSubmit = ()=>{
    console.log (appo)
    setNewEventDlg(false);
  }

  const handleDate= (value)=>{
    setAppo({...appo, "date": value})
  }
  const handleDurationChange= (event)=>{
    setAppo({...appo, "duration": event.target.value})
  }

  const handlePriceChange = (event)=>{
    setAppo({...appo, "price": event.target.value})
  }

  const handleServicesChange= (event)=>{
    setAppo({...appo, "service": event.target.value,"price": getPriceForService(event.target.value) })
  }

  const handleWriteReport= (event)=>{
   // console.log(event.target)
    console.log("SEE APPOINTMENT", appo.id, " OF CUSTOMER", customerID );
    dispatch(navigationLoading())
    const actualScreen = "/addappointment/"+ Number(customerID) +"/"+ Number(appo.id);
    navigate(actualScreen, {replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  
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
        {selectedEvent && selectedEvent.ispast ? <Button onClick={handleWriteReport}>{t("writereport")}</Button> :  <Button onClick={handleDialogClose}>Enviar Recordatorio</Button>}
        <Button onClick={handleDialogClose}>Duplicar Cita</Button>
        <Button onClick={handleDialogClose}>Cancelar Cita</Button>
        <Button onClick={handleDialogClose} autoFocus>
          Salir
        </Button>
      </DialogActions>
    </Dialog>

    <Dialog
      open={newEventDlg}
      onClose={newEventDlgClose}
      aria-labelledby="new-event-dialog"
      aria-describedby="new-event-dialog-description"
    >
      <DialogTitle id="new-event-dialog-title">
        Nueva cita el día {new Date(eventStart).toLocaleDateString()}
        <p>{customerName}</p>
          
      </DialogTitle>
      <DialogContent>
        
        <DialogContentText id="new-event-dialog-description">
        <LocalizationProvider dateAdapter={AdapterMoment}>
              <TimePicker
                label={t("Time")}
                value={appo.date}
                variant="standard"
                
                onChange={handleDate}
                renderInput={(params) => <TextField variant="standard" sx = {{mr:2}} {...params} />}
              />
            </LocalizationProvider>
            <TextField
                label={t("duration")}
                value={appo.duration}
                variant="standard"
                
                sx = {{mr:2}}
                onChange={handleDurationChange}
            />
            <TextField
                            label={t("service")}
                            value={appo.service}
                            variant="standard"
                            sx = {{mr:2, textAlign:'left'}}
                            fullWidth
                            select
                            helperText= {t("pleaseselectaserviceoraddnew")}
                            onChange={handleServicesChange}
                        >
                          {services.map((option) =>{ return (
                            <MenuItem key={option.id} value={option.serviceName}>
                              {option.serviceName}
                            </MenuItem>
                            )
                          })}
                         
                        </TextField>
                        
                        <TextField
                          label={t("price")}
                          value={appo.price}
                          variant="standard"
                          sx = {{mr:2}}
                          fullWidth
                          onChange={handlePriceChange}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                          }}
                        />
          <CustomerSearchBar customerFunc={SetCustomer}></CustomerSearchBar>
          
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={newEventDlgSubmit}>Aceptar</Button>
        <Button onClick={newEventDlgClose}>Cancelar Cita</Button>
      </DialogActions>
    </Dialog>

    </React.Fragment>
  );
}