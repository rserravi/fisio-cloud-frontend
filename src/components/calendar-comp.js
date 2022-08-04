import React, { useCallback } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { locale } from 'moment';
import { GetAppointmentsCalendarFormat, GetCabins, GetCustomerIdFromName, getPriceForService, getServices } from '../utils/dataFetch-utils';
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
  cabin:"3",
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
  const localization = props.locale;
  locale(localization);
  const localizer = momentLocalizer(moment)
  
  const [open, setOpen] = React.useState(false);
  const [customerID, setCustomerID] = React.useState(props.customerId)
  const [customerName, setCustomerName] = React.useState("")
  const [newEventDlg, setNewEventDlg] = React.useState(false);

  const [selectedEvent, setSelectedvent] = React.useState(null);
  const [eventStart, setEventStart] = React.useState("00:00");
  const [appo, setAppo] = React.useState(initValidation);
  const services = getServices();
  const cabins = GetCabins();

  moment.locale(
    'es', {
      week: {
          dow: 1,
          doy: 1,
      },
      },
    'ca', {
        week: {
            dow: 1,
            doy: 1,
        },
       },
    );

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

  const handleCabinChange= (event)=>{
    setAppo({...appo, "cabin": event.target.value })
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
        culture={localization}
        views={['agenda']}
        messages={{
          week: t("week"),
          work_week: t("work_week"),
          day: t("day"),
          month: t("month"),
          previous: t("previous"),
          next: t("next"),
          today: t("today"),
          agenda: t("agenda"),
          date: t("date"),
          time: t("time"),
          event: t("event"),
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
      culture={localization}
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
        week: t("week"),
        work_week: t("work_week"),
        day: t("day"),
        month: t("month"),
        previous: t("previous"),
        next: t("next"),
        today: t("today"),
        agenda: t("agenda"),
        date: t("date"),
        time: t("time"),
        event: t("event"),
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
        &nbsp;{t("from")} {selectedEvent? ""+getTimeFromISOTime(selectedEvent.start) : <></>} {t("to")} {selectedEvent? ""+getTimeFromISOTime(selectedEvent.end) : <></>}
        {selectedEvent && selectedEvent.ispast ? <p  style={{color:"#FF0000"}}><strong> {t("pastdate")}</strong> </p>  : <></>}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {selectedEvent && selectedEvent.ispast ? <Button onClick={handleWriteReport}>{t("writereport")}</Button> :  <Button onClick={handleDialogClose}>{t("sendRequest")}</Button>}
        <Button onClick={handleDialogClose}>{t("duplicateappointment")}</Button>
        <Button onClick={handleDialogClose}>{t("deleteappointment")}</Button>
        <Button onClick={handleDialogClose} autoFocus>
          {t("exit")}
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
        {t("newappointmenttheday")} {new Date(eventStart).toLocaleDateString()}
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
                sx = {{mr:2, mt:2, textAlign:'left'}}
                
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
                label={t("cabin")}
                value={appo.cabin}
                variant="standard"
                sx = {{mr:2, mt:2, textAlign:'left'}}
                
                select
                helperText= {t("selectacabin")}
                onChange={handleCabinChange}
            >
              {cabins.map((option) =>{ return (
                <MenuItem key={option.id} value={option.id}>
                  {option.localization}
                </MenuItem>
                )
              })}
            </TextField>
            
            <TextField
              label={t("price")}
              value={appo.price}
              variant="standard"
              sx = {{mr:2, mt:2, mb:1}}
              
              onChange={handlePriceChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">€</InputAdornment>,
              }}
            />
          <CustomerSearchBar customerFunc={SetCustomer}></CustomerSearchBar>
          
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={newEventDlgSubmit}>{t("accept")}</Button>
        <Button onClick={newEventDlgClose}>{t("cancelAppointment")}</Button>
      </DialogActions>
    </Dialog>

    </React.Fragment>
  );
}