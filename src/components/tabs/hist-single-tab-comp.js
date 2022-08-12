//REACT IMPORTS
import { Button,  Dialog,  DialogActions,  DialogContent,  DialogContentText,  DialogTitle,  Grid, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import * as React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { navigationLoading, navigationSuccess } from '../../slices/navigation-slice';
import { addMinutesToDate, getDateFromISOTime, getTimeFromISOTime } from '../../utils/date-utils';
import FilePresentTwoToneIcon from '@mui/icons-material/FilePresentTwoTone';
import i18next from 'i18next';




export const HistSingleComponent = (props) => {
 
   const data = props.select;
   const locale = props.locale;
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [payDialog, setPayDialogOpen] = React.useState(false) 
   const debt = Number(data.price) - Number(data.paid)
   const [payAmount, setPayAmount]= React.useState(0);
   console.log("DATA EN HISTSINGLECOMP,", data)

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
   
   const editHistoryClick = ()=>{

        console.log(data)
        const actualScreen = "/edithistory/"+ data.customerId+"/"+data.id
        dispatch(navigationLoading())
        navigate(actualScreen,{replace: true});
        dispatch(navigationSuccess(actualScreen))

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
    setPayDialogOpen(false);
   }

   const printrecipe = (event)=>{

   }

   const setNewPaymentAccept = (event)=>{
    //API CALL
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
                    {i18next.t("price")}: {data.price} €. {i18next.t("Paid")}: {data.paid?data.paid:0} € {debt>0?<p style={{color:"red"}}>{i18next.t("debt")} {debt} €</p>:<p style={{color:"green"}}>{i18next.t("fullypaid")}</p>}
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
                   <Button variant='outlined' size='small' sx={{mr:1}} onClick={editHistoryClick}>{i18next.t("edit")}</Button>
                   {debt!==0?<Button variant='outlined' size='small' onClick={payClick}>{i18next.t("pay")}</Button>:<></>}
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
            
       </React.Fragment>
   )
}