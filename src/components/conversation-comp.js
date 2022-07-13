//REACT IMPORTS
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';
import { GetCommunicationActions, GetReceiverName, GetSenderName, GetThread } from '../utils/dataFetch-utils';



const textAlign = (dir)=>{
    if (dir ==="send") {
        return "left"
    }
    return "right";
   }

const BackgroundColor = (dir) =>{
    if (dir ==="send") {
        return "honeydew"
    }
    return "mintcream";
   }

const commActions = GetCommunicationActions();

export const ConversationComponent = (props) => {

 
   const { t } = useTranslation();
   const threadData =GetThread(props.select);
   const locale = props.locale;
   const [newActionDialogOpen, setNewActionDialogOpen] = React.useState(false);
   console.log(threadData)

   const HandleNewActionClick = ()=>{
    setNewActionDialogOpen(true)
   }

   const handleNewActionDialogClose = () =>{
    setNewActionDialogOpen(false)
   }

  

   
   
   const Message = (msg)=>{
        var msgId =msg.id
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [msgCopy, setMsgCopy] = React.useState(threadData[msgId]);

        const handleAnswerClick = (event) =>{

            event.stopPropagation(); 
            console.log(threadData, "CustomerID",threadData[msgId].customerId, "Thread", threadData[msgId].thread );
            const actualScreen = "/addcommunication/" + threadData[msgId].customerId+"/" + threadData[msgId].thread
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
                backgroundColor: BackgroundColor(threadData[msgId].direction),
                paddingRight: "15px",
                position: "relative",
                border: "2px solid gainsboro",
                }}
            >
            <Grid container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">
                
                <Grid item  xs={12} sm={12} md={12} textAlign={textAlign(threadData[msgId].direction)} sx={{mt:2, ml:2}}>
                   <b>{t("from")}:</b> <Button>{GetSenderName(threadData[msgId].customerId, threadData[msgId].userId, threadData[msgId].direction)}</Button> <b>{t("subject")}: </b> {threadData[msgId].subject}.<b> {t("to")}: </b> <Button>{GetReceiverName(threadData[msgId].customerId, threadData[msgId].userId, threadData[msgId].direction)}</Button>, <b> {t("sendat")}:</b> {new Date(threadData[msgId].date).toLocaleDateString(locale)}, {new Date(threadData[msgId].date).toLocaleTimeString(locale)}
                </Grid>
                <Grid item  xs={12} sm={12} md={12} textAlign={textAlign(threadData[msgId].direction)} sx={{ml:2}}>
                  
                    <TextField
                      id="type"
                      name='type'
                      label={t("type")}
                      value={threadData[msgId].type}
                      variant="standard"
                      sx={{mr:1}}
                      />
                       <TextField
                      id="duration"
                      name='duration'
                      label={t("duration")}
                      value={threadData[msgId].duration}
                      variant="standard"
                      sx={{mr:1}}
                      />
                      {threadData[msgId].follow!==""?<TextField
                      id="action"
                      name='action'
                      label={t("nextaction")}
                      value={threadData[msgId].follow + " " + new Date(threadData[msgId].alertfollow).toLocaleDateString(locale)}
                      variant="standard"
                      sx={{mr:1}}
                      />:<></>}
                    </Grid>
                    
                <Grid item  xs={12} sm={12} md={12} textAlign={textAlign(threadData[msgId].direction)}sx={{ml:2, mt:2}}>
                   <TextField
                      id="notes"
                      name='notes'
                      label={t("notes")}
                      value={threadData[msgId].notes}
                      sx={{width:"60%"}}
                      multiline
                      rows={4}
                      />
                </Grid>
                <Grid item  xs={12} sm={12} md={12} textAlign={textAlign(threadData[msgId].direction)} sx={{ml:2, mt:1, mb:2}}>
                    {threadData[msgId].direction==="send"?<Button variant='outlined' onClick={handleAnswerClick} sx={{mr:1}}>{t("answer")}</Button>:<></>}
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
            return(
            <Message id ={i} key={i} />
            )
        })}
       </React.Fragment>
   )
}