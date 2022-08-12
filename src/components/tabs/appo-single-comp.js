//REACT IMPORTS
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, InputAdornment, Snackbar, TextField, Tooltip } from '@mui/material';

import * as React from 'react';
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { navigationLoading, navigationSuccess } from '../../slices/navigation-slice';
import { addMinutesToDate, getDateFromISOTime, getTimeFromISOTime, timeDifference } from '../../utils/date-utils';
import FilePresentTwoToneIcon from '@mui/icons-material/FilePresentTwoTone';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import i18next from 'i18next';
import { closeAppointment, updateAppointmentDate, updateAppointmentPaid } from '../../api/appointments.api';

export const AppoSingleComponent = (props) => {

   const data = props.select;
   console.log("DATA EN APPOSINGLE", data)
   const locale = props.locale;
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const navigationState= useSelector((state)=> state.navigator);
   const [rescheduleDialog, setRescheduleDialogOpen] = React.useState(false);
   const [fileItDialog, setFileItDialogOpen]= React.useState(false);
   const [payDialog, setPayDialogOpen]= React.useState(false);
   const [payAmount, setPayAmount]= React.useState(0);
   const [newAppoDate, setNewAppDate] = React.useState(new Date());
   const [error, setError] = React.useState("");
   const [openSnackBar, setOpenSnackBar] = React.useState(false);


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

    const closeAppo = (event) =>{
        event.preventDefault();
        console.log(data)
        //CALL API TO PUT IN DATABASE
        closeAppointment(data.id).then((data2)=>{
          if(data.status ==="error"){
            console.log("ERROR EN CLOSE APPO", data2)
            setError(data2.message)
            setOpenSnackBar(true)     
          }
          else {
            setError("")
            setOpenSnackBar(true)
          }
        })
    }
    
    const handleCloseSnackBar = (event, reason) =>{
        if (reason === 'clickaway' || error!="") {
          return;
        }
    
        setOpenSnackBar(false);
        if (error===""){

          navigate(0);
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
        event.stopPropagation();
        
        //API CALL
        updateAppointmentPaid(data.id, payAmount).then((data, error)=>{
            if (error) {
                console.log(error)
                setError(error.message)
                setOpenSnackBar(true)
            }
            setPayDialogOpen(false)
            setOpenSnackBar(true);

            console.log(data)
        })
        
    }
   
    const handleNewAppoDate = (value)=>{
        setNewAppDate(new Date (value));
       }
    
    const setRescheduleSubmit = (event)=>{
        event.stopPropagation();
        
        //API CALL
        updateAppointmentDate(data.id, newAppoDate).then((data, error)=>{
            if (error) {
                console.log(error)
                setError(error.message)
                setOpenSnackBar(true)
            }
            setRescheduleDialogOpen(false)
            setOpenSnackBar(true);

            console.log(data)
        })
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
                   <b>{i18next.t("appointment")}</b> {i18next.t("with")} <b>{data.customerName}</b>, {i18next.t("for")} <b>{data.service}</b>, {i18next.t("cabin")}: {data.cabin}
                </Grid>
                <Grid item  xs={12} sm={12} md={12} textAlign="left" sx={{mt:2, ml:2}}>
                   {getDateFromISOTime(data.date, locale)}. {i18next.t("from")} {getTimeFromISOTime(data.date, locale)} {i18next.t("to")} {addMinutesToDate(data.date, data.duration).toLocaleTimeString(locale)}  &#40;{data.duration} m. &#41;
                </Grid>
                <Grid item  xs={12} sm={12} md={12} textAlign="left" sx={{mt:2, ml:2}}>
                   {(timeDifference(data.date) <= 0)?<b style={{color:"red"}}>{i18next.t("pastdate")}</b>:<></>}
                </Grid>
                <Grid item  xs={12} sm={12} md={12} textAlign="left" sx={{mt:2, ml:2}}>
                    {i18next.t("price")}: {data.price} €. {i18next.t("paid")}: {data.paid?data.paid:0} €
                </Grid>
                <Grid item  xs={12} sm={12} md={12} textAlign="left" sx={{mt:2, ml:2}}>
                   {data.notes}
                </Grid>
                <Grid item  xs={12} sm={12} md={12} textAlign="left" sx={{mt:2, ml:2}}>
                   {i18next.t("attachments")}: {RenderAttachments(data.attachment)}
                </Grid>
            </Grid>
            <Grid container direction='row' justifyContent='flex-start' alignItems='center'>
                <Grid item  xs={12} sm={12} md={12} textAlign="left" sx={{mb:2, mt:1, ml:2}}>
                   <Button variant='outlined' size='small' sx={{mr:1}} onClick={makeReportClick}>{i18next.t("makereport")}</Button>
                   <Button variant='outlined' size='small' sx={{mr:1}} onClick={reScheduleClick}>{i18next.t("reschedule")}</Button>
                   <Button variant='outlined' size='small' sx={{mr:1}} onClick={fileItClick}>{i18next.t("fileit")}</Button>
                   <Button variant='outlined' size='small' onClick={payClick}>{i18next.t("pay")}</Button>
                </Grid>
            </Grid>
            </div>
            <Dialog open={payDialog} onClose={closeDialogs}>
                <DialogTitle>{i18next.t("pay")}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {i18next.t("paydialog")}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            value= {payAmount}
                            onChange = {payAmountHandle}
                            margin="dense"
                            id="pay"
                            label={i18next.t("payquantity")}
                            type="number"
                            fullWidth
                            variant="standard"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">€</InputAdornment>,
                              }}
                        />
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={printrecipe}>{i18next.t("printrecipe")}</Button>
                        <Button onClick={setNewPaymentAccept}>{i18next.t("accept")}</Button>
                        <Button onClick={closeDialogs}>{i18next.t("cancel")}</Button>
                        
                    </DialogActions>
            </Dialog>
            <Dialog open={rescheduleDialog} onClose={closeDialogs}>
                <DialogTitle>{i18next.t("reschedule")}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {i18next.t("rescheduledialog")}
                        </DialogContentText>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            label={i18next.t("newdate")}
                            value={newAppoDate}
                            variant="standard"
                            sx = {{mr:2}}
                            onChange={handleNewAppoDate}
                            renderInput={(params) => <TextField variant="standard" fullWidth sx = {{mr:2}} {...params} />}
                        />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                        <TimePicker
                            label={i18next.t("time")}
                            value={newAppoDate}
                            variant="standard"
                            sx = {{mr:2}}
                            onChange={handleNewAppoDate}
                            renderInput={(params) => <TextField variant="standard" fullWidth sx = {{mr:2}} {...params} />}
                        />
                        </LocalizationProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={setRescheduleSubmit}>{i18next.t("accept")}</Button>
                        <Button onClick={closeDialogs}>{i18next.t("cancel")}</Button>    
                    </DialogActions>
            </Dialog>
            <Dialog open={fileItDialog} onClose={closeDialogs}>
                <DialogTitle>{i18next.t("fileit")}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {i18next.t("doyouwanttofiletheappointmentorkeepediting")}
                        {data.price !== data.paid?<p style={{color:'red'}}>{i18next.t("stilldebtspendant")}</p>:<></>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                        <Button onClick={closeAppo}>{i18next.t("fileit")}</Button>
                        <Button onClick={closeDialogs}>{i18next.t("edit")}</Button>    
                    </DialogActions>
            </Dialog>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                message="Note archived"
            >
                {error===""?<Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>{i18next.t("appointmentupdated")} </Alert>:<Alert onClose={handleCloseSnackBar} severity="error" sx={{ width: '100%' }}>{error} </Alert>}
            </Snackbar>
       </React.Fragment>
   )
}