//REACT IMPORTS
import { Button, Grid, TextField } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { GetLocales, GetReceiverName, GetSenderName, GetThread } from '../utils/dataFetch-utils';

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

export const ConversationComponent = (props) => {
 
   const { t } = useTranslation();
   const threadData =GetThread(props.select);
   
   const Message = (msg)=>{
        var msgId =msg.id
        
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
                   <b>{t("from")}:</b> <Button>{GetSenderName(threadData[msgId].customerId, threadData[msgId].userId, threadData[msgId].direction)}</Button> <b>{t("subject")}: </b> {threadData[msgId].subject}.<b> {t("to")}: </b> <Button>{GetReceiverName(threadData[msgId].customerId, threadData[msgId].userId, threadData[msgId].direction)}</Button>, <b> {t("sendat")}:</b> {new Date(threadData[msgId].date).toLocaleDateString(GetLocales())}, {new Date(threadData[msgId].date).toLocaleTimeString(GetLocales())}
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
                      value={threadData[msgId].follow + " " + new Date(threadData[msgId].alertfollow).toLocaleDateString(GetLocales())}
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
                    {threadData[msgId].direction==="send"?<Button variant='outlined' sx={{mr:1}}>{t("answer")}</Button>:<></>}
                    <Button variant='outlined'>{t("newaction")}</Button>
                </Grid>
           
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