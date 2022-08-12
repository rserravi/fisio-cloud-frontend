import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllData, GetCommunicationActions, getCustomer, GetCustomerIdFromName, getCustomerMailFromId, getCustomerPhoneFromId, getCustomerWhatsappFromId, GetNextCommunicationId, GetNextThreadId} from '../utils/dataFetch-utils';
import CustomerSearchBar from './form-components/customer-search-form-comp';
import { useNavigate } from 'react-router-dom';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Button, MenuItem, Paper, TextField } from '@mui/material';
import i18next from 'i18next';
import { Loading } from './Loading-comp';

  
export default function AddCommunicationsComponent(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state)=> state.user);
  const navigationState =  useSelector((state)=> state.navigator);
  const locale = props.locale;
  const commActions = GetCommunicationActions();
  const [mode,setMode] = React.useState("add") // Modes "add", "addToId", "addToIdAndThread", "addToIdAndAction"
  const [showStart, setShowStart] = React.useState(true);
  const [showEnd, setShowEnd] = React.useState(false);
  const [showSend, setShowSend] = React.useState(false);
  const [firstLoad, setFirstLoad] = React.useState(false);
  const [customerData, setCustomerData] = React.useState(props.customerData);
  const [threadData, setThreadData] = React.useState(props.threadData);
  const [phonemail] = React.useState(props.phonemail);
  const [customerId, setCustomerId] = React.useState(props.customerData._id);
    
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
   
    if(!firstLoad){ //PARA EVITAR REFRESCOS! SE EJECUTA SOLO LA PRIMERA VEZ
      setCommButtons();
    //SELECCION DE MODOS
    console.log ("USE EFFECT CUSTOMER DATA", customerData, "THREAD", threadData)
      
      if (customerData && threadData.length===0 && !props.action){
            //MODO AÑADIR CITA A ID
            console.log("MODO 'ADD TO ID'")
            setMode("addToId")
            setComm({...Comm, "customerId": props.customerData._id, "thread": GetNextThreadId(props.customerData._id)})
          }

      if (customerData && threadData.length!==0 &&!props.action){
            //MODO AÑADIR CITA A ID Y THREAD
            console.log("MODO 'ADD TO ID AND THREAD'")
            setMode("addToIdAndThread")
            setComm({...Comm, "customerId":  props.customerData._id, "thread":props.threadId, "id": GetNextCommunicationId(props.customerId)})
          }
      if (props.action){
            //MODO AÑADIR CITA A ID Y THREAD Y ACCION
            console.log("MODO 'ADD TO ID AND ACTION'")
            setMode("addToIdAndAction")
            setComm({...Comm, "customerId":  props.customerData._id, "thread":GetNextThreadId(props.customerId), "type": props.action})
        }
      setFirstLoad(false);
    }

    
    },[props, firstLoad, Comm, customerData, setCommButtons, threadData]);

  const [customerName, setCustomerName] = React.useState("")
   
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
    setCustomerId(custId);
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
            <h2>{i18next.t("addingcommunicationto")} {customerData.firstname} {customerData.lastname} </h2>
          )  
      case "addToIdAndThread":
          return (
            <h2>{i18next.t("responsetocommunicationwith")} {customerData.firstname} {customerData.lastname}</h2>
          )
      case "addToIdAndAction":
          if (props.action==="1"){
            return(
              <>
            <h2>{i18next.t("makingcallto")} {customerData.firstname} {customerData.lastname} {i18next.t("to")} {!props.phonemail?getCustomerPhoneFromId(customerData.id):phonemail} </h2>
            <h4>{i18next.t("pressthecallbuttontocallandrecordtime")}</h4>
            </>
            )
          }
          if (props.action==="2"){
            
            return(
            <h2>{i18next.t("sendingmailto")} {customerData.firstname} {customerData.lastname} {i18next.t("to")} {!props.phonemail?getCustomerMailFromId(customerData.id):phonemail} </h2>
            )
          }
          if (props.action==="3"){
            return(
            <h2>{i18next.t("sendingwhatsappto")} {customerData.firstname} {customerData.lastname} {i18next.t("to")} {!props.phonemail?getCustomerWhatsappFromId(customerData.id):phonemail} </h2>
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
      if(customerId){  
        const tel = getCustomerPhoneFromId(customerId)
      
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
        {showStart?<Button onClick={startCall} variant='contained'>{i18next.t("initcall")}</Button>:<Button onClick={endCall} color="error" variant='contained'>{i18next.t("endcall")}</Button>}
      </React.Fragment>
    )
  }

  const SendFragment = () =>  {
    const sendMessage = () =>{
      console.log("ENVIANDO MENSAJE", Comm.type)
      switch (Comm.type) {
        case "2": // EMAIL
          if(customerId){  
            const email = getCustomerMailFromId(customerId)
            if(Comm.notes && Comm.subject){
              let url = 'mailto:'+email+'?subject='+Comm.subject+'&body='+Comm.notes
               // Open our newly created URL in a new tab to send the message
              console.log(url)
              window.open(url);   
            }  
          }
          
          break;
        case "3": // WHATSAPP
          console.log("ENVIALDO WHATS a ", customerId)
          if(customerId){  
            const whatsapp = getCustomerWhatsappFromId(customerId)
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
        <Button sx={{mt:2}} onClick={sendMessage} variant='contained'>{i18next.t("sendmessage")}</Button>
      </React.Fragment>
    )
  }

  if(firstLoad){
    return (
      <Box sx={{ display: 'flex' }}>
        <Loading /> 
      </Box>
    );
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
                            label={i18next.t("date")}
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
                          label={i18next.t("Time")}
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
                        label={i18next.t("action")}
                        value={Comm.type || ''}
                        variant="standard"
                        disabled={mode==="addToIdAndAction"}
                        onChange={handleActionChange}
                        select
                        fullWidth
                        sx={{mr:1, textAlign:'left'}}
                        >
                          {commActions.map((option) => (
                            <MenuItem key={option.id} value={option.id}>{i18next.t(option.type)}</MenuItem>
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
                            label={i18next.t("duration")}
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
                        label={i18next.t("Subject")}
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
                        label={i18next.t("notes")}
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
                        label={i18next.t("nextaction")}
                        value={Comm.follow || ''}
                        variant="standard"
                        onChange={handleNewActionChange}
                        select
                        fullWidth
                        sx={{mr:2, textAlign:'left'}}
                        >
                          {commActions.map((option) => (
                            <MenuItem key={option.id} value={option.type}>{i18next.t(option.type)}</MenuItem>
                          ))}
                          <MenuItem key={15} value={"NONE"}>{i18next.t("nothing")}</MenuItem>               
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3} sx={{mt:2, mr:1}}>
                        <LocalizationProvider dateAdapter={AdapterMoment} locale={locale}>
                        {Comm.follow !=="" && Comm.follow!=="NONE"? <DatePicker
                            label={i18next.t("date")+ " "+i18next.t("newaction") }
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
                          label={i18next.t("Time")}
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
                          {i18next.t("createcommunication")}
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={5.5} md={5.5} sx={{ mt:1}}>
                          <Button
                            fullWidth
                            variant="contained"
                            color = "error"
                            onClick={resetData}
                          >
                          {i18next.t("cancel")}
                          </Button>
                        </Grid>
                      </Grid>
                </Grid>
                </Paper>
        </Box>
    </React.Fragment>
  )
}
