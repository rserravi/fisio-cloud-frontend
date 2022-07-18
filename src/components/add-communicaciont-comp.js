import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllData, GetCommunicationActions, getCustomer, GetCustomerIdFromName, getCustomerMailFromId, getCustomerPhoneFromId, getCustomerWhatsappFromId, GetNextCommunicationId, GetNextThreadId} from '../utils/dataFetch-utils';
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
  const navigationState =  useSelector((state)=> state.navigator);
  const [customerID, setCustomerID] = React.useState(props.customerId)
  const locale = props.locale;
  const commActions = GetCommunicationActions();
  const [mode,setMode] = React.useState("add") // Modes "add", "addToId", "addToIdAndThread", "addToIdAndAction"
  const [showStart, setShowStart] = React.useState(true);
  const [showEnd, setShowEnd] = React.useState(false);
  const [showSend, setShowSend] = React.useState(false);
  const [firstTimeRenderCheck, setFirstTimeRenderCheck] = React.useState(false);
  const [phonemail] = React.useState(props.phonemail);
    
  var initValidation={
    id: 0,
    senderName: "",
    receiverName :  "",
    customerId: 0,
    userId: userState.id,
    communicationId: 0, 
    direction: "receive",
    date: new Date().toISOString(locale),
    type: 1,
    duration: 0,
    subject: "",
    notes: "",
    follow: "",
    alertfollow: "",
    thread: props.thread  
  }
  const [Comm, setComm] = React.useState(initValidation);

  const setCommButtons =React.useCallback(()=>{
    //console.log("setCommButton", Comm.type, "mode", mode)
    switch (Number(Comm.type)) {
      case 1:
        if(!showEnd){
          setShowStart(true);
          setShowSend(false);
        }
        break;
      case 2:
        setShowStart(false);
        setShowSend(true);
        break;
      case 3:
        setShowStart(false);
        setShowSend(true);
        break;
      default:
        setShowStart(false);
        setShowSend(false);
        break;
    }
  },[Comm.type, showEnd])

  React.useEffect(() => {   
    setCommButtons();
    if(!firstTimeRenderCheck){ //PARA EVITAR REFRESCOS! SE EJECUTA SOLO LA PRIMERA VEZ
    //SELECCION DE MODOS
      setFirstTimeRenderCheck(true);
      if (props.customerId && !props.threadId && !props.action){
            //MODO AÑADIR CITA A ID
            setMode("addToId")
            setComm({...Comm, "customerId": props.customerId, "thread": GetNextThreadId(props.customerId), "id": GetNextCommunicationId(props.customerId)})
          }

      if (props.customerId && props.threadId &&!props.action){
            //MODO AÑADIR CITA A ID Y THREAD
            setMode("addToIdAndThread")
            setComm({...Comm, "customerId": props.customerId, "thread":props.threadId, "id": GetNextCommunicationId(props.customerId)})
          }
      if (props.customerId && !props.threadId &&props.action){
          //MODO AÑADIR CITA A ID Y THREAD
          setMode("addToIdAndAction")
          setComm({...Comm, "customerId": props.customerId, "thread":GetNextThreadId(props.customerId), "id": GetNextCommunicationId(props.customerId), "type": props.action})
        }
    }
    
    },[props.threadId, props.customerId, props.action, setMode, setComm, Comm, firstTimeRenderCheck, setCommButtons]);

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
    const actualScreen = navigationState.previousScreen;
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen)) 
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
    setCommButtons();
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
    // Modes "add", "addToId", "addToIdAndThread", "addToIdAndAction"
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
      case "addToIdAndAction":
          if (props.action==="1"){
            return(
              <>
            <h2>{t("makingcallto")} {datos.firstname} {datos.lastname} {t("to")} {!props.phonemail?getCustomerPhoneFromId(datos.id):phonemail} </h2>
            <h4>{t("pressthecallbuttontocallandrecordtime")}</h4>
            </>
            )
          }
          if (props.action==="2"){
            
            return(
            <h2>{t("sendingmailto")} {datos.firstname} {datos.lastname} {t("to")} {!props.phonemail?getCustomerMailFromId(datos.id):phonemail} </h2>
            )
          }
          if (props.action==="3"){
            return(
            <h2>{t("sendingwhatsappto")} {datos.firstname} {datos.lastname} {t("to")} {!props.phonemail?getCustomerWhatsappFromId(datos.id):phonemail} </h2>
            )
          }
          break;
        
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
      if(customerID){  
        const tel = getCustomerPhoneFromId(customerID)
      
          let url = 'tel:'+tel
           // Open our newly created URL in a new tab to send the message
          console.log(url)
          window.open(url);   
        } 
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
    const sendMessage = () =>{
      console.log("ENVIANDO MENSAJE", Comm.type)
      switch (Comm.type) {
        case "2": // EMAIL
          if(customerID){  
            const email = getCustomerMailFromId(customerID)
            if(Comm.notes && Comm.subject){
              let url = 'mailto:'+email+'?subject='+Comm.subject+'&body='+Comm.notes
               // Open our newly created URL in a new tab to send the message
              console.log(url)
              window.open(url);   
            }  
          }
          
          break;
        case "3": // WHATSAPP
          console.log("ENVIALDO WHATS a ", customerID)
          if(customerID){  
            const whatsapp = getCustomerWhatsappFromId(customerID)
            if(Comm.notes || Comm.subject){
              var message = Comm.subject + ". " + Comm.notes
            // Regex expression to remove all characters which are NOT alphanumeric 
              let number = whatsapp.replace(/[^\w\s]/gi, "").replace(/ /g, "");

            // Appending the phone number to the URL
              let url = `https://web.whatsapp.com/send?phone=${number}`;

            // Appending the message to the URL by encoding it
              url += `&text=${encodeURI(message)}&app_absent=0`;

            // Open our newly created URL in a new tab to send the message
            console.log(url)
            window.open(url);
            }  
          }
          
          break;
    
        default:
          console.log("ESTAMOS EN DEFAULT")
          break;
      }
    }
    return (
      <React.Fragment>
        <Button sx={{mt:2}} onClick={sendMessage} variant='contained'>{t("sendmessage")}</Button>
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
                        disabled={mode==="addToIdAndAction"}
                        onChange={handleActionChange}
                        select
                        fullWidth
                        sx={{mr:1, textAlign:'left'}}
                        >
                          {commActions.map((option) => (
                            <MenuItem key={option.id} value={option.id}>{t(option.type)}</MenuItem>
                          ))}  
                      
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={2} md={2} sx={{mt:2, mr:1}}>
                      {showStart?<CallFragment />:<></>}
                      {showEnd?<CallFragment />:<></>}
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
                <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end">
                {showSend?<SendFragment />:<></>}
                </Grid>
                <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                    <Grid item xs={12} sm={3} md={3} sx={{mt:2, mr:2}}>
                    <TextField
                        id="nextction"
                        name='nextaction'
                        label={t("nextaction")}
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
