//REACT IMPORTS
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { GetThreadByCommId } from '../api/communications.api';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';
import { GetCommunicationActions, GetReceiverName, GetSenderName  } from '../utils/dataFetch-utils';

const textAlign = (customerSent)=>{
    if (customerSent) {
        return "left"
    }
    return "right";
   }

const BackgroundColor = (customerSent) =>{
    if (customerSent) {
        return "honeydew"
    }
    return "gainsboro";
   }

const commActions = GetCommunicationActions();

const initData = [
    {
        id: "", 
        customerId: "",
        customerName: "",
        customerSent: false,
        userName: "",
        date: "",
        type: "",
        duration: "",
        subject: "",
        notes: "",
        follow: "",
        readed: "",
        answered: "",
        thread: 0
    },
    {
        id: "", 
        customerId: "",
        customerName: "",
        customerSent: false,
        userName: "",
        date: "",
        type: "",
        duration: "",
        subject: "",
        notes: "",
        follow: "",
        readed: "",
        answered: "",
        thread: 0
    }
]

export const ConversationComponent = (props) => {

   console.log ("PROPS EN CONVERSATION COMPONENT", props)
   const { t } = useTranslation();
   const [threadData, setThreadData]= React.useState(initData)
   const locale = props.locale;
   const commId = props.select;
   const [newActionDialogOpen, setNewActionDialogOpen] = React.useState(false);
   const [firstLoad, setFirstLoad] = React.useState(true)
   console.log("THREAD EN INICIO", threadData)

   React.useEffect(() => {
    console.log("ESTAMOS EN USE EFFECT")
    if(firstLoad){
        console.log("PRIMERA CARGA")
        GetThreadByCommId(commId).then(data =>{
            setThreadData(data.result);
            setFirstLoad(false);
            })
        }
    },[firstLoad,props.select.thread, commId])   

   const HandleNewActionClick = ()=>{
    setNewActionDialogOpen(true)
   }

   const handleNewActionDialogClose = () =>{
    setNewActionDialogOpen(false)
   }

   const Message = (props)=>{
        const msg = props.msg;
        const key = props.keyN;
        console.log("EN MESSAGE", msg, key)
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [msgCopy, setMsgCopy] = React.useState(threadData[key]);

        const handleAnswerClick = (event) =>{

            event.stopPropagation(); 
            console.log(threadData, "CustomerID",threadData[key].customerId, "Thread", threadData[key].thread );
            const actualScreen = "/addcommunication/" + threadData[key].customerId+"/" + threadData[key].thread
            dispatch(navigationLoading());
            navigate(actualScreen,{replace: true});
            dispatch(navigationSuccess(actualScreen))
           }
        const handleNextActionChange = (event)=>{
            setMsgCopy({...msgCopy, "follow": event.target.value})
        }

        const handleAlertChange= (value)=>{
            setMsgCopy({...msgCopy, "alertfollow": value._d})
          }
        
        const handleDialogSubmit = () =>{
            console.log("DIALOG SUBMIT", msgCopy)
            setNewActionDialogOpen(false)
        }
        
        return(
        <React.Fragment>
            <div
                style={{
                backgroundColor: BackgroundColor(threadData[key].customerSent),
                paddingRight: "15px",
                position: "relative",
                border: "2px solid gainsboro",
                }}
            >
            <Grid container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">
                
                <Grid item  xs={12} sm={12} md={12} textAlign={textAlign(threadData[key].customerSent)} sx={{mt:2, ml:2}}>
                   <b>{t("from")}:</b> <Button>{GetSenderName(threadData[key].customerName, threadData[key].userName, threadData[key].customerSent)}</Button> <b>{t("subject")}: </b> {threadData[key].subject}.<b> {t("to")}: </b> <Button>{GetReceiverName(threadData[key].customerName, threadData[key].userName, threadData[key].customerSent)}</Button>, <b> {t("sendat")}:</b> {new Date(threadData[key].date).toLocaleDateString(locale)}, {new Date(threadData[key].date).toLocaleTimeString(locale)}
                </Grid>
                <Grid item  xs={12} sm={12} md={12} textAlign={textAlign(threadData[key].customerSent)} sx={{ml:2}}>
                  
                    <TextField
                      id="type"
                      name='type'
                      label={t("type")}
                      value={threadData[key].type}
                      variant="standard"
                      sx={{mr:1}}
                      />
                       <TextField
                      id="duration"
                      name='duration'
                      label={t("duration")}
                      value={threadData[key].duration}
                      variant="standard"
                      sx={{mr:1}}
                      />
                      {threadData[key].follow!==""?<TextField
                      id="action"
                      name='action'
                      label={t("nextaction")}
                      value={threadData[key].follow + " " + new Date(threadData[key].alertfollow).toLocaleDateString(locale)}
                      variant="standard"
                      sx={{mr:1}}
                      />:<></>}
                     
                      <p style={{color:"red"}}>{!threadData[key].answered?<b>{t("notanswered")}. </b>:<></>}</p>
                    </Grid>
                    
                <Grid item  xs={12} sm={12} md={12} textAlign={textAlign(threadData[key].direction)}sx={{ml:2, mt:2}}>
                   <TextField
                      id="notes"
                      name='notes'
                      label={t("notes")}
                      value={threadData[key].notes}
                      sx={{width:"60%"}}
                      multiline
                      rows={4}
                      />
                </Grid>
                <Grid item  xs={12} sm={12} md={12} textAlign={textAlign(threadData[key].direction)} sx={{ml:2, mt:1, mb:2}}>
                    {threadData[key].direction==="send"?<Button variant='outlined' onClick={handleAnswerClick} sx={{mr:1}}>{t("answer")}</Button>:<></>}
                    <Button onClick={HandleNewActionClick} variant='outlined'>{t("newaction")}</Button>
                </Grid>
                <Dialog open={newActionDialogOpen} onClose={handleNewActionDialogClose}>
                    <DialogTitle>{t("newaction")}</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        {t("programanactiontoaddedtothecalendar")}
                    </DialogContentText>
                    <TextField
                        id="nextction"
                        name='nextaction'
                        label={t("nextaction")}
                        value={msgCopy.follow || ''}
                        variant="standard"
                        onChange={handleNextActionChange}
                        select
                        fullWidth
                        sx={{mr:2, textAlign:'left'}}
                        >
                          {commActions.map((option) => (
                            <MenuItem key={option.id} value={option.type}>{t(option.type)}</MenuItem>
                          ))}
                          <MenuItem key={15} value={"NONE"}>{t("nothing")}</MenuItem>               
                        </TextField>
                        <LocalizationProvider dateAdapter={AdapterMoment} locale={locale}>
                        <DatePicker
                            label={t("date")}
                            value={msgCopy.alertfollow}
                            variant="standard"
                            sx = {{mr:2}}
                            onChange={handleAlertChange}
                            
                            renderInput={(params) => <TextField fullWidth variant="standard" sx = {{mr:2}} {...params} />}
                        />
                         </LocalizationProvider> 
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleDialogSubmit}>{t("accept")}</Button>
                    <Button onClick={handleNewActionDialogClose}>{t("close")}</Button>
                    </DialogActions>
                </Dialog>
           
            </Grid>
            </div>
        </React.Fragment>
    )
   }
   
   return(
        <React.Fragment>
        {threadData.map((msg,i)=>{
            console.log("ESTAMOS EN MAP", msg, i);
            return(
                <Message msg={msg} keyN={i} />
            )
        })}
       </React.Fragment>
   )
}