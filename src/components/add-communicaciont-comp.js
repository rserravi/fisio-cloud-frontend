import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllData, GetCommunicationActions, getCustomer, GetCustomerIdFromName, GetNextCommunicationId, GetNextThreadId} from '../utils/dataFetch-utils';
import CustomerSearchBar from './form-components/customer-search-form-comp';
import { useNavigate } from 'react-router-dom';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Button, MenuItem, Paper, TextField } from '@mui/material';
  
export default function AddCommunicationsComponent(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state)=> state.user);
  const [customerID, setCustomerID] = React.useState(props.customerId)
  const locale = props.locale;
  const commActions = GetCommunicationActions();
  const [mode,setMode] = React.useState("add") // Modes "add", "addToId", "addToIdAndThread"
  const [showStart, setShowStart] = React.useState(true);
  const [showEnd, setShowEnd] = React.useState(false);
  const [showSend, setShowSend] = React.useState(false);
    
  var initValidation={
    id: 0,
    senderName: "",
    receiverName :  "",
    customerId: 0,
    userId: userState.id,
    communicationId: 0, 
    direction: "receive",
    date: new Date().toISOString(locale),
    type: "call",
    duration: 0,
    subject: "",
    notes: "",
    follow: "",
    alertfollow: "",
    thread: props.thread  
  }
  const [Comm, setComm] = React.useState(initValidation);

  React.useEffect(() => {   
    if(Number(Comm.customerId) === 0){ //PARA EVITAR REFRESCOS!
    //SELECCION DE MODOS
    if (props.customerId && !props.threadId){
          //MODO AÑADIR CITA A ID
          setMode("addToId")
          setComm({...Comm, "customerId": props.customerId, "thread": GetNextThreadId(props.customerId), "id": GetNextCommunicationId(props.customerId)})
        }

    if (props.customerId && props.threadId){
          //MODO AÑADIR CITA A ID Y THREAD
          setMode("addToIdAndThread")
          setComm({...Comm, "customerId": props.customerId, "thread":props.threadId, "id": GetNextCommunicationId(props.customerId)})
        }
      }
    },[props.threadId, props.customerId, setMode, setComm, Comm, ]);

  const [customerName, setCustomerName] = React.useState("")
   
  const data = () => {
    if (customerID){
      return getCustomer(customerID);
    }
    else
      return (GetAllData)
  }   

  const datos =data();

  const HandleSubmit = (event)=>{
    event.preventDefault();
    console.log(Comm)
    //CALL API TO PUT IN DATABASE
    const actualScreen = "/communications"
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))

   }
  
  const SetCustomer = (data) =>{
    setCustomerName(data);
    const custId = GetCustomerIdFromName(data); 
    console.log("ESTAMOS EN SETCUSTOMER", custId)
    setCustomerID(custId);
    setComm({...Comm, "customerId": custId, "thread": GetNextThreadId(custId), "id":GetNextCommunicationId(custId)}, )
  }
 
  const resetData= (event)=>{
    event.preventDefault();
      setComm(initValidation);
      if (props.customerId && !props.threadId){
        //MODO AÑADIR CITA A ID
        setMode("addToId")
        setComm({...Comm, "customerId": props.customerId, "thread": GetNextThreadId(props.customerId)})
      }

      if (props.customerId && props.threadId){
        //MODO AÑADIR CITA A ID Y THREAD
        setMode("addToIdAndThread")
        setComm({...Comm, "duration": props.customerId, "thread":props.threadId})
      } 
  }

  const handleDate= (value)=>{
    setComm({...Comm, "date": value._d})
  }
  
  const handleDurationChange= (event)=>{
    event.preventDefault();

    setComm({...Comm, "duration": event.target.value})
  }
  const handleAlertFollowChange = (value)=>{
    setComm({...Comm, "alertfollow": value._d})
  }

  const handleActionChange = (event)=>{
    event.preventDefault();

    setComm({...Comm, "type": event.target.value})
    switch (event.target.value) {
      case "call":
        setShowStart(true);
        setShowSend(false);
        break;
      case "email":
        setShowStart(false);
        setShowSend(true);
        break;
      case "whatsapp":
        setShowStart(false);
        setShowSend(true);
        break;
      default:
        setShowStart(false);
        setShowSend(true);
        break;
    }
  }

  const handleNewActionChange= (event)=>{
    event.preventDefault();
    if (event.target.value ==="NONE"){
      setComm({...Comm, "follow": "","alertfollow": ""})
    }
    setComm({...Comm, "follow": event.target.value})
  }

  const handleNotesChange= (event)=>{
    event.preventDefault();
    setComm({...Comm, "notes": event.target.value})
  }

  const handleSubjectChange = (event)=>{
    event.preventDefault();
    setComm({...Comm, "subject": event.target.value})
  }

  const MainTitle = () =>{
    // Modes "add", "addToId", "addToIdAndThread"
    switch (mode) {
      case "add":
          return(<><CustomerSearchBar customerFunc={SetCustomer}/></>);
      case "addToId":
        return (
            <h2>{t("addingcommunicationto")} {datos.firstname} {datos.lastname} </h2>
          )  
      case "addToIdAndThread":
          return (
            <h2>{t("responsetocommunicationwith")} {datos.firstname} {datos.lastname}</h2>
          )
        
      default:
          return (
            <>Ha habido un error</>
          )
    }
  }

  const CallFragment = () =>  {

    var startTime=new Date();
    const startCall = () =>{
      setShowStart(false);
      setShowEnd(true);
      setComm({...Comm, "date":new Date(), "duration":"0:00:00"})
      startTime = new Date();
    }
    const endCall = () =>{
      setShowStart(true);
      setShowEnd(false);
      const endTime = new Date();
      console.log("START",startTime, "ENDTIME", endTime);
      const dur = new Date(endTime - startTime);
      setComm({...Comm, "duration":dur.toLocaleTimeString(locale)})
    }
    return (
      <React.Fragment>
        {showStart?<Button onClick={startCall} variant='contained'>{t("initcall")}</Button>:<Button onClick={endCall} color="error" variant='contained'>{t("endcall")}</Button>}
      </React.Fragment>
    )
  }

  const SendFragment = () =>  {

    return (
      <React.Fragment>
        <Button variant='contained'>{t("sendmessage")}</Button>
      </React.Fragment>
    )
  }

   return (
    <React.Fragment>
       
        <Box component="form" noValidate onSubmit={HandleSubmit} >
            <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="center">
              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                <MainTitle />
                <h1>{customerName}</h1>
              </Grid>
            </Grid>

            <Paper sx={{p:1, mb:2}}>
              <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                 
                  <Grid item xs={12} sm={3} md={3} sx={{mt:2, mr:1}}>
                        <LocalizationProvider dateAdapter={AdapterMoment} locale={locale}>
                        <DatePicker
                            label={t("date")}
                            value={Comm.date}
                            variant="standard"
                            sx = {{mr:2}}
                            onChange={handleDate}
                            
                            renderInput={(params) => <TextField fullWidth variant="standard" sx = {{mr:2}} {...params} />}
                        />
                         </LocalizationProvider> 
                  </Grid>
                  <Grid item xs={12} sm={2} md={2} sx={{mt:2, mr:1}}>
                         <LocalizationProvider dateAdapter={AdapterMoment} locale={locale}>
                        <TimePicker
                          label={t("Time")}
                          value={Comm.date}
                          variant="standard"
                          
                          onChange={handleDate}
                          renderInput={(params) => <TextField fullWidth variant="standard" sx = {{mr:2}} {...params} />}
                        />
                        </LocalizationProvider>
                      
                    </Grid>
                    <Grid item xs={12} sm={2} md={2} sx={{mt:2, mr:1}}>
                      <TextField
                        id="action"
                        name='action'
                        label={t("action")}
                        value={Comm.type || ''}
                        variant="standard"
                        onChange={handleActionChange}
                        select
                        fullWidth
                        sx={{mr:1, textAlign:'left'}}
                        >
                          {commActions.map((option) => (
                            <MenuItem key={option.id} value={option.type}>{t(option.type)}</MenuItem>
                          ))}  
                      
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={2} md={2} sx={{mt:2, mr:1}}>
                      {showStart?<CallFragment />:<></>}
                      {showEnd?<CallFragment />:<></>}
                      {showSend?<SendFragment />:<></>}
                    </Grid>
                    <Grid item xs={12} sm={2} md={2} sx={{mt:2, mr:1}}>
                      {!showSend?
                        <TextField
                            label={t("duration")}
                            value={Comm.duration}
                            variant="standard"
                            fullWidth
                            sx = {{mr:2}}
                            onChange={handleDurationChange}
                        />:<></>}
                    </Grid>
                    
                 </Grid>
                 <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                    <Grid item xs={12} sm={12} md={12} sx={{mt:2}}>
                        <TextField 
                        label={t("Subject")}
                        value={Comm.subject}
                        variant="outlined"
                        fullWidth
                        sx = {{mr:2}}
                        onChange={handleSubjectChange}
                        ></TextField>
                     </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                    <Grid item xs={12} sm={12} md={12} sx={{mt:2}}>
                        <TextField 
                        label={t("notes")}
                        value={Comm.notes}
                        variant="outlined"
                        fullWidth
                        sx = {{mr:2}}
                        multiline
                        rows={6}
                        onChange={handleNotesChange}
                        ></TextField>
                     </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                    <Grid item xs={12} sm={3} md={3} sx={{mt:2, mr:2}}>
                    <TextField
                        id="nextction"
                        name='nextaction'
                        label={t("nextaction")}handleNewActionChange
                        value={Comm.follow || ''}
                        variant="standard"
                        onChange={handleNewActionChange}
                        select
                        fullWidth
                        sx={{mr:2, textAlign:'left'}}
                        >
                          {commActions.map((option) => (
                            <MenuItem key={option.id} value={option.type}>{t(option.type)}</MenuItem>
                          ))}
                          <MenuItem key={15} value={"NONE"}>{t("nothing")}</MenuItem>               
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3} sx={{mt:2, mr:1}}>
                        <LocalizationProvider dateAdapter={AdapterMoment} locale={locale}>
                        {Comm.follow !=="" && Comm.follow!=="NONE"? <DatePicker
                            label={t("date")+ " "+t("newaction") }
                            value={Comm.alertfollow}
                            variant="standard"
                            sx = {{mr:2}}
                            onChange={handleAlertFollowChange}
                            
                            renderInput={(params) => <TextField fullWidth variant="standard" sx = {{mr:2}} {...params} />}
                        />:<></>}
                         </LocalizationProvider> 
                    </Grid>
                    <Grid item xs={12} sm={2} md={2} sx={{mt:2, mr:1}}>
                         <LocalizationProvider dateAdapter={AdapterMoment} locale={locale}>
                         {Comm.follow !=="" && Comm.follow!=="NONE"? <TimePicker
                          label={t("Time")}
                          value={Comm.alertfollow}
                          variant="standard"
                          
                          onChange={handleAlertFollowChange}
                          renderInput={(params) => <TextField fullWidth variant="standard" sx = {{mr:2}} {...params} />}
                        />:<></>}
                        </LocalizationProvider>
                      
                    </Grid>
                    <Grid container direction="row" justifyContent="space-between" alignItems="flex-end">
                      <Grid item xs={12} sm={5.5} md={5.5} sx={{mt:2 }}>
                        <Button
                            type="submit"
                            fullWidth
                            color="success"
                            variant="contained"
                            onClick={HandleSubmit}
                          >
                          {t("createcommunication")}
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={5.5} md={5.5} sx={{ mt:1}}>
                          <Button
                            fullWidth
                            variant="contained"
                            color = "error"
                            onClick={resetData}
                          >
                          {t("cancel")}
                          </Button>
                        </Grid>
                      </Grid>
                </Grid>
                </Paper>
        </Box>
    </React.Fragment>
  )
}
