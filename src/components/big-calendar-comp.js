import React, { useCallback } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { locale } from 'moment';
import { GetCabins, GetCustomerIdFromName, getPriceForService, getServices } from '../utils/dataFetch-utils';
import CustomerSearchBar from './form-components/customer-search-form-comp';

import 'react-big-calendar/lib/sass/styles.scss'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputAdornment, MenuItem, TextField } from '@mui/material';
import { addMonthtoDate, getDateFromISOTime, getTimeFromISOTime } from '../utils/date-utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimePicker } from '@mui/x-date-pickers';
import styled from '@emotion/styled';
import { GetCalendar } from '../api/calendar.api';
import i18next from 'i18next';
import { Loading } from './Loading-comp';


require('moment/locale/es.js')
require('moment/locale/ca.js')
require('moment/locale/en-gb.js')

var initAppoValidation={
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

var initCommValidation={
  id: "1",
  senderName:"",
  receiverName : "",
  customerId: 0,
  userId: 0,
  communicationId: 0, 
  direction: "receive",
  date: new Date(Date.now()),
  type: "call",
  duration: 0,
  subject: "",
  notes: "",
  follow: "",
  alertfollow: "",
  thread: 0
}

const initData = [

]

export default function BigCalendarComp(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSelector = useSelector((state)=>state.user);
  const localization = props.locale;
  locale(localization);
  const localizer = momentLocalizer(moment)
  const compact =props.compact;
  const onlyAppo = props.onlyAppo;
  const [data, setData]=React.useState(initData)
  const [mode, setMode]=React.useState("seeall");
  const [firstLoad, setFirstLoad]=React.useState(true);
  const userId = userSelector.id



  const mutateData = (data)=> {
    const datos2 = data;
    for (let key in datos2){
      if (datos2[key].kind==="comm"){
        datos2[key].title = i18next.t(datos2[key].commAction) + " " + i18next.t("to") + " " + datos2[key].customerName;
      }
      if (datos2[key].kind==="appo"){
        datos2[key].title = i18next.t("appointment") +": "+ datos2[key].customerName + " " + i18next.t("for") + " " +datos2[key].service;
      }
      if (datos2[key].kind==="birth"){
        datos2[key].title = i18next.t("birthdate") +": "+ datos2[key].customerName + " " + i18next.t("for") + " " +datos2[key].service;
      }
      datos2[key].start = new Date(datos2[key].start);
      datos2[key].end = new Date(datos2[key].end);
    }
    return datos2
  }

   
  const [seeAppointmentDlg, setSeeAppointmentDlgOpen] = React.useState(false);
  const [seeCommDlg, setSeeCommDlgOpen] = React.useState(false);
  const [seeBirthDlg, setSeeBirthDlgOpen] = React.useState(false);
  const [customerID, setCustomerID] = React.useState(props.customerId)
  const [customerName, setCustomerName] = React.useState("")
  const [newEventDlg, setNewEventDlg] = React.useState(false);

  const [selectedEvent, setSelectedvent] = React.useState(null);
  const [eventStart, setEventStart] = React.useState("00:00");
  const [appo, setAppo] = React.useState(initAppoValidation);
  const [comm, setComm] = React.useState(initCommValidation);
  const [birth, setBirth] = React.useState(initData);
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

  React.useEffect(()=>{
    if (firstLoad){
      GetCalendar(mode,userSelector.id).then((data)=>{
          setData(mutateData(data.result));
          setFirstLoad(false);
  }).catch((error)=>{
    setFirstLoad(false);
  })
  }

  },[firstLoad, mode, userSelector.id, mutateData])

  const SetCustomer = (data) =>{
      console.log (data);
      setCustomerName(data);
      setCustomerID(GetCustomerIdFromName(data));
    }
  
  const handleDialogClose = () => {
    setSeeAppointmentDlgOpen(false);
    setSeeCommDlgOpen(false);
    setSeeBirthDlgOpen(false);
  };
  
  const handleSelectEvent = useCallback(
    (event) => {
      setSelectedvent(event);
      setCustomerID(event.customerId);
      if(event.kind==="appo"){
        setAppo({...appo, "id": event.resourceId})
        setSeeAppointmentDlgOpen(true);
      }
      if(event.kind==="comm"){
        setComm({...comm, "id": event.resourceId});
        setSeeCommDlgOpen(true);
      }
      if(event.kind==="birth"){
        setComm({...birth, "id": event.resourceId});
        setSeeBirthDlgOpen(true);
      }
    },
    [appo, comm, birth]
    
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
    const actualScreen = "/addappointment/"+ customerID +"/"+ appo.id;
    navigate(actualScreen, {replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  const handleEditAppointment = (event)=>{
    console.log("SEE APPOINTMENT", appo.id, " OF CUSTOMER", customerID );
    dispatch(navigationLoading())
    const actualScreen = "/addappointment/"+ customerID +"/"+ appo.id;
    navigate(actualScreen, {replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  const handleFollowAction= (event) =>{

  }
  
  // Set if Toolbar is visible depending on var compact
  const CustomerToolBar = () =>{
    const IndianRedButton = styled(Button)(({ theme }) => ({
      backgroundColor:"indianred",
      color : "white",
      '&:hover': {
        backgroundColor: "indianred",
        color:"white"
      },
    }));
    const OrangeButton = styled(Button)(({ theme }) => ({
        color: "white",
        backgroundColor:"orange",
        '&:hover': {
          backgroundColor: "orange",
          
        },
      }));
    
    const DodgerBlueButton = styled(Button)(({ theme }) => ({
      color: "white",
      backgroundColor:"dodgerblue",
      '&:hover': {
        backgroundColor: "dodgerblue",
        colot: "white"
      },
    }));

    const FireBrickButton = styled(Button)(({ theme }) => ({
      color: "white",
      backgroundColor:"firebrick",
      '&:hover': {
        backgroundColor: "firebrick",
        colot: "white"
      },
    }));

    const TanButton = styled(Button)(({ theme }) => ({
      color: "white",
      backgroundColor:"tan",
      '&:hover': {
        backgroundColor: "tan",
        colot: "white"
      },
    }));

    const MediumTurquoiseButton = styled(Button)(({ theme }) => ({
      color: "black",
      backgroundColor:"mediumturquoise",
      '&:hover': {
        backgroundColor: "mediumturquoise",
        colot: "black"
      },
    }));
    

    const setModeForFilter = (mode) =>{
      setMode(mode)
      setFirstLoad(true);
    }  

    return (
      <React.Fragment>
          <Grid container direction="row" justifyContent="flex-start" alignItems="baseline" marginBottom={2}>
      
              <Grid item xs={12} sm={12} md={12} sx={{my:2}}>
                  <IndianRedButton onClick={((event)=>{event.stopPropagation(); setModeForFilter("pastdate")})} size="small" sx={{mr:1}}>{i18next.t("pastdate")}  </IndianRedButton>
                  <OrangeButton onClick={((event)=>{event.stopPropagation(); setModeForFilter("nextdate")})}  size="small" sx={{mr:1}}>{i18next.t("nextdate")} </OrangeButton>
                  <DodgerBlueButton onClick={((event)=>{event.stopPropagation(); setModeForFilter("alldate")})} size="small" sx={{mr:1}}>{i18next.t("seealldates")} </DodgerBlueButton>
                  {!onlyAppo?<FireBrickButton onClick={((event)=>{event.stopPropagation(); setModeForFilter("pastcomm")})} size="small" sx={{mr:1}}>{i18next.t("pastcomm")} </FireBrickButton>:<></>}
                  {!onlyAppo?<TanButton onClick={((event)=>{event.stopPropagation(); setModeForFilter("nextcomm")})} size="small" sx={{mr:1}}>{i18next.t("nextcomm")} </TanButton>:<></>}
                  {!onlyAppo?<MediumTurquoiseButton onClick={((event)=>{event.stopPropagation(); setModeForFilter("allcomm")})} size="small" sx={{mr:1}}>{i18next.t("allcomm")} </MediumTurquoiseButton>:<></>}
                  {!onlyAppo?<Button onClick={((event)=>{event.stopPropagation(); setModeForFilter("seeall")})} sx={2} size="small">{i18next.t("seeall")} </Button>:<></>}
              </Grid>
          </Grid>
      </React.Fragment>
    )

  }

  const resourceMap = [
    { resourceId: 1, resourceTitle: 'Sala Principal' },
  ]

  if(firstLoad){
    return (
      <Loading />
      );
  }

  return (
    <React.Fragment>
    {!compact?<CustomerToolBar />:<></>}
    {compact? <div>
      <Calendar
        localizer={localizer}
        events={data}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        culture={localization}
        views={['agenda']}
        messages={{
          week: i18next.t("week"),
          work_week: i18next.t("work_week"),
          day: i18next.t("day"),
          month: i18next.t("month"),
          previous: i18next.t("previous"),
          next: i18next.t("next"),
          today: i18next.t("today"),
          agenda: i18next.t("agenda"),
          date: i18next.t("date"),
          time: i18next.t("time"),
          event: i18next.t("event"),
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
        style={{ minHeight: 200 }}
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
      events={data}
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleSelectEvent}
      resourceIdAccessor="resourceId"
      startAccessor="start"
      showMultiDayTimes
      resources={resourceMap}
      endAccessor="end"
      style={{ minHeight: 500 }}
      selectable
      popup
      messages={{
        week: i18next.t("week"),
        work_week: i18next.t("work_week"),
        day: i18next.t("day"),
        month: i18next.t("month"),
        previous: i18next.t("previous"),
        next: i18next.t("next"),
        today: i18next.t("today"),
        agenda: i18next.t("agenda"),
        date: i18next.t("date"),
        time: i18next.t("time"),
        event: i18next.t("event"),
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
      open={seeAppointmentDlg}
      onClose={handleDialogClose}
      aria-labelledby="appointment-dialog-title"
      aria-describedby="appointment-dialog-description"
    >
      <DialogTitle id="appointment-dialog-title">
        {selectedEvent? selectedEvent.title : <></>}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="appointment-dialog-description">
        {selectedEvent? ""+getDateFromISOTime(selectedEvent.start, localization) : <></>}
        &nbsp;{i18next.t("from")} {selectedEvent? ""+getTimeFromISOTime(selectedEvent.start, localization) : <></>} {i18next.t("to")} {selectedEvent? ""+getTimeFromISOTime(selectedEvent.end, localization) : <></>}
        {selectedEvent && selectedEvent.ispast ? <p  style={{color:"#FF0000"}}><strong> {i18next.t("pastdate")}</strong> </p>  : <></>}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {selectedEvent && selectedEvent.ispast ? <Button onClick={handleWriteReport}>{i18next.t("writereport")}</Button> :  <Button onClick={handleDialogClose}>{i18next.t("sendRequest")}</Button>}
        <Button onClick={handleEditAppointment}>{i18next.t("editappointment")}</Button>
        <Button onClick={handleDialogClose}>{i18next.t("deleteappointment")}</Button>
        <Button onClick={handleDialogClose} autoFocus>
          {i18next.t("exit")}
        </Button>
      </DialogActions>
    </Dialog>
    
    <Dialog
      open={seeBirthDlg}
      onClose={handleDialogClose}
      aria-labelledby="birthday-dialog-title"
      aria-describedby="birthday-dialog-description"
    >
      <DialogTitle id="birthday-dialog-title">
        {selectedEvent? i18next.t("aniversary")+  " " +selectedEvent.customerName : <></>}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="birthday-dialog-description">
        {selectedEvent? ""+ moment(selectedEvent.start).locale(localization).format("dddd") + ", "+ moment(selectedEvent.start).date() + " " + i18next.t("of") +" " + moment(selectedEvent.start).locale(localization).format("MMMM"):<></>}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>{i18next.t("sendcard")}</Button>
        <Button onClick={handleDialogClose} autoFocus>
          {i18next.t("exit")}
        </Button>
      </DialogActions>
    </Dialog>

    <Dialog
      open={seeCommDlg}
      onClose={handleDialogClose}
      aria-labelledby="comm-dialog-title"
      aria-describedby="comm-dialog-description"
    >
      <DialogTitle id="comm-dialog-title">
        {selectedEvent? selectedEvent.title : <></>}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="comm-dialog-description">
        {selectedEvent? ""+getDateFromISOTime(selectedEvent.start, localization) : <></>}
        &nbsp;
        {selectedEvent && selectedEvent.ispast ? <p  style={{color:"#FF0000"}}><strong> {i18next.t("pastaction")}</strong> </p>  : <></>}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {selectedEvent && selectedEvent.ispast ? <Button onClick={handleFollowAction}>{i18next.t("reschedule")}</Button> :  <Button onClick={handleDialogClose}>{i18next.t("action")}</Button>}
        <Button onClick={handleDialogClose}>{i18next.t("duplicateappointment")}</Button>
        <Button onClick={handleDialogClose}>{i18next.t("deleteappointment")}</Button>
        <Button onClick={handleDialogClose} autoFocus>
          {i18next.t("exit")}
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
        {i18next.t("newappointmenttheday")} {new Date(eventStart).toLocaleDateString(localization)}
        <p>{customerName}</p>
          
      </DialogTitle>
      <DialogContent>
        
        <DialogContentText id="new-event-dialog-description">
        <LocalizationProvider dateAdapter={AdapterMoment}>
              <TimePicker
                label={i18next.t("Time")}
                value={appo.date}
                variant="standard"
                
                onChange={handleDate}
                renderInput={(params) => <TextField variant="standard" sx = {{mr:2}} {...params} />}
              />
            </LocalizationProvider>
            <TextField
                label={i18next.t("duration")}
                value={appo.duration}
                variant="standard"
                
                sx = {{mr:2}}
                onChange={handleDurationChange}
            />
            <TextField
                label={i18next.t("service")}
                value={appo.service}
                variant="standard"
                sx = {{mr:2, mt:2, textAlign:'left'}}
                
                select
                helperText= {i18next.t("pleaseselectaserviceoraddnew")}
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
                label={i18next.t("cabin")}
                value={appo.cabin}
                variant="standard"
                sx = {{mr:2, mt:2, textAlign:'left'}}
                
                select
                helperText= {i18next.t("selectacabin")}
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
              label={i18next.t("price")}
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
        <Button onClick={newEventDlgSubmit}>{i18next.t("accept")}</Button>
        <Button onClick={newEventDlgClose}>{i18next.t("cancelAppointment")}</Button>
      </DialogActions>
    </Dialog>

    </React.Fragment>
  );
}