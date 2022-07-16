//REACT IMPORTS
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { navigationLoading, navigationSuccess } from '../../slices/navigation-slice';
import { addMinutesToDate, getDateFromISOTime, getTimeFromISOTime, timeDifference } from '../../utils/date-utils';
import FilePresentTwoToneIcon from '@mui/icons-material/FilePresentTwoTone';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';


export const AppoSingleComponent = (props) => {
 
   const { t } = useTranslation();
   const data = props.select;
   const locale = props.locale;
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [rescheduleDialog, setRescheduleDialogOpen] = React.useState(false);
   const [fileItDialog, setFileItDialogOpen]= React.useState(false);
   const [payDialog, setPayDialogOpen]= React.useState(false);
   const [payAmount, setPayAmount]= React.useState(0);
   const [newAppoDate, setNewAppDate] = React.useState(new Date());


   const RenderAttachments = (attachment) =>{
    console.log("ATTACHMENT",attachment)
    if (attachment){
        return ( 
            <React.Fragment>
                {attachment.map((icon)=>{
                    return(
                    <Tooltip key={icon.id} title={icon.file}>
                        <IconButton aria-label={icon.file}>
                            <FilePresentTwoToneIcon />
                        </IconButton>
                    </Tooltip>
                    )
                })}
            </React.Fragment>
        )
    } else {
        <>-</>
    }
    }
   
   const makeReportClick = ()=>{

        console.log(data)
        console.log("Hacer informe de cita " + data.id);
        const actualScreen = "/addAppointment/"+ data.customerId+"/"+data.id
        dispatch(navigationLoading())
        navigate(actualScreen,{replace: true});
        dispatch(navigationSuccess(actualScreen))

   }

   const reScheduleClick = (event)=>{
        event.stopPropagation();
        setRescheduleDialogOpen(true);
   }

   const fileItClick = (event)=>{
        event.stopPropagation();
        setFileItDialogOpen(true);
   }

    const payAmountHandle = (event)=>{
        setPayAmount(event.target.valueAsNumber)
    }

    const payClick = (event)=>{
        event.stopPropagation();
        setPayDialogOpen(true);
    }

    const closeDialogs = (event)=>{
        event.stopPropagation();
        setRescheduleDialogOpen(false);
        setPayDialogOpen(false);
        setFileItDialogOpen(false);
    }

    const printrecipe = (event)=>{

    }

    const setNewPaymentAccept = (event)=>{
        //API CALL
    }
   
    const handleNewAppoDate = (value)=>{
        setNewAppDate(new Date (value));
       }
    
    const setRescheduleSubmit = (event)=>{
        console.log("enviar ",newAppoDate,"a la API")
        //API CALLS
        setRescheduleDialogOpen(false);
    }
    
    const setFileItSubmit = (event)=>{
        console.log("ARXIVANT A l'HISTORIAL");
        //API CALLS
        setFileItDialogOpen(false);
    }

   return(
        <React.Fragment>
            <div
                style={{
                backgroundColor:"gainsboro",
                paddingRight: "15px",
                position: "relative",
                border: "2px solid gainsboro",
                }}
            >
            <Grid container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">
                
                <Grid item  xs={12} sm={12} md={12} textAlign="left" sx={{mt:2, ml:2}}>
                   <b>{t("appointment")}</b> {t("with")} <b>{data.customerName}</b>, {t("for")} <b>{data.service}</b>, {t("cabin")}: {data.cabin}
                </Grid>
                <Grid item  xs={12} sm={12} md={12} textAlign="left" sx={{mt:2, ml:2}}>
                   {getDateFromISOTime(data.date, locale)}. {t("from")} {getTimeFromISOTime(data.date, locale)} {t("to")} {addMinutesToDate(data.date, data.duration).toLocaleTimeString(locale)}  &#40;{data.duration} m. &#41;
                </Grid>
                <Grid item  xs={12} sm={12} md={12} textAlign="left" sx={{mt:2, ml:2}}>
                   {(timeDifference(data.date) <= 0)?<b style={{color:"red"}}>{t("pastdate")}</b>:<></>}
                </Grid>
                <Grid item  xs={12} sm={12} md={12} textAlign="left" sx={{mt:2, ml:2}}>
                    {t("price")}: {data.price} €. {t("paid")}: {data.paid?data.paid:0} €
                </Grid>
                <Grid item  xs={12} sm={12} md={12} textAlign="left" sx={{mt:2, ml:2}}>
                   {data.notes}
                </Grid>
                <Grid item  xs={12} sm={12} md={12} textAlign="left" sx={{mt:2, ml:2}}>
                   {t("attachments")}: {RenderAttachments(data.attachment)}
                </Grid>
            </Grid>
            <Grid container direction='row' justifyContent='flex-start' alignItems='center'>
                <Grid item  xs={12} sm={12} md={12} textAlign="left" sx={{mb:2, mt:1, ml:2}}>
                   <Button variant='outlined' size='small' sx={{mr:1}} onClick={makeReportClick}>{t("makereport")}</Button>
                   <Button variant='outlined' size='small' sx={{mr:1}} onClick={reScheduleClick}>{t("reschedule")}</Button>
                   <Button variant='outlined' size='small' sx={{mr:1}} onClick={fileItClick}>{t("fileit")}</Button>
                   <Button variant='outlined' size='small' onClick={payClick}>{t("pay")}</Button>
                </Grid>
            </Grid>
            </div>
            <Dialog open={payDialog} onClose={closeDialogs}>
                <DialogTitle>{t("pay")}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t("paydialog")}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            value= {payAmount}
                            onChange = {payAmountHandle}
                            margin="dense"
                            id="pay"
                            label={t("payquantity")}
                            type="number"
                            fullWidth
                            variant="standard"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">€</InputAdornment>,
                              }}
                        />
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={printrecipe}>{t("printrecipe")}</Button>
                        <Button onClick={setNewPaymentAccept}>{t("accept")}</Button>
                        <Button onClick={closeDialogs}>{t("cancel")}</Button>
                        
                    </DialogActions>
            </Dialog>
            <Dialog open={rescheduleDialog} onClose={closeDialogs}>
                <DialogTitle>{t("reschedule")}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t("rescheduledialog")}
                        </DialogContentText>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            label={t("newdate")}
                            value={newAppoDate}
                            variant="standard"
                            sx = {{mr:2}}
                            onChange={handleNewAppoDate}
                            renderInput={(params) => <TextField variant="standard" fullWidth sx = {{mr:2}} {...params} />}
                        />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                        <TimePicker
                            label={t("time")}
                            value={newAppoDate}
                            variant="standard"
                            sx = {{mr:2}}
                            onChange={handleNewAppoDate}
                            renderInput={(params) => <TextField variant="standard" fullWidth sx = {{mr:2}} {...params} />}
                        />
                        </LocalizationProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={setRescheduleSubmit}>{t("accept")}</Button>
                        <Button onClick={closeDialogs}>{t("cancel")}</Button>    
                    </DialogActions>
            </Dialog>
            <Dialog open={fileItDialog} onClose={closeDialogs}>
                <DialogTitle>{t("fileit")}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                            {t("doyouwanttofiletheappointmentorkeepediting")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                        <Button onClick={setFileItSubmit}>{t("fileit")}</Button>
                        <Button onClick={closeDialogs}>{t("edit")}</Button>    
                    </DialogActions>
            </Dialog>
       </React.Fragment>
   )
}