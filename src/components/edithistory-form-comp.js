import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Alert, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, MenuItem, Paper, Snackbar, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { getPriceForService } from '../utils/dataFetch-utils';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';
import styled from '@emotion/styled';
import i18next from 'i18next';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Loading } from './Loading-comp';
import { getDateFromISOTime } from '../utils/date-utils';
import { updateHistory } from '../api/history.api';

var initAddService={
  service:"",
  price:""
}

  
export default function EditHistoryForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigationState= useSelector((state)=> state.navigator);
  const locale = props.locale;
  const [cabinsList, setCabinsList] = React.useState(props.cabinsData);
  const [servicesList, setServicesList] = React.useState(props.servicesData);  
  const [histo, setHisto] = React.useState(props.histoData);

  const [customerName, setCustomerName] = React.useState("")
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [closehistoDialogOpen, setClosehistoDialogOpen] = React.useState(false);
  const [newService, setNewService] = React.useState(initAddService);
  const [firstLoad, setFirstLoad] = React.useState(true);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [error, setError] = React.useState("")
  
  React.useEffect(() => {   
    if(firstLoad){
      if (cabinsList && servicesList && histo){
        setFirstLoad(false);
      }
    }

  },[cabinsList, servicesList, histo]);


    
  const HandleSubmit = (event)=>{
  
    event.preventDefault();
    console.log(histo)
    //CALL API TO PUT IN DATABASE
    updateHistory(histo).then((data)=>{

      console.log("DATA EN HANDLE SUBMIT AFTER UPDATE",data)
      if(data.status ==="error" || !data.result){
        console.log("ERROR EN UPDATE HIST", data)
        setError(data.message)
        if (!data.result){
          setError("NO DATA");
        }
        setOpenSnackBar(true)     
      }
      else {
        setError("")
        setOpenSnackBar(true)
      }
    })

   }

   const handleCloseSnackBar = (event, reason) =>{
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
    if (error===""){
      const actualScreen = navigationState.previousScreen;
      dispatch(navigationLoading());
      navigate(actualScreen,{replace: true});
      dispatch(navigationSuccess(actualScreen))
    }
   }
    

   const resetData= (event)=>{
    event.preventDefault();
    const actualScreen = navigationState.previousScreen;
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen)) 
  }

  const handleDate= (value)=>{
    setHisto({...histo, "date": value})
  }
  
  const handleDurationChange= (event)=>{
    setHisto({...histo, "duration": event.target.value})
  }

  const handleCabinChange = (event)=>{
    setHisto({...histo, "cabin": event.target.value})
  }

  const handlePriceChange = (event)=>{
    setHisto({...histo, "price": event.target.value})
  }

  const handlePaidChange = (event)=>{
    setHisto({...histo, "price": event.target.value})
  }

  const handleServicesChange= (event)=>{
    setHisto({...histo, "service": event.target.value,"price": getPriceForService(event.target.value, servicesList) })
  }

  const handleNotesChange= (event)=>{
    console.log(histo);
    setHisto({...histo, "notes": event.target.value})
  }

  const addService= () =>{
    setDialogOpen(true);
  }

  const closeAddServiceDialog = () =>{
    setDialogOpen(false);
  }

  const newServiceFormCommit = ()=>{
    //TODO, GET NEW ID
    console.log(newService);
    setDialogOpen(false);
  }

  const handleNewServiceService = (event)=>{
    setNewService({...newService, "service": event.target.value})
  }

  const handleNewServicePrice = (event)=>{
    setNewService({...newService, "price": event.target.value})
  }

  const seehistory = (event)=>{
    const actualScreen = "/historys"
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  const Input = styled('input')({
    display: 'none',
  });

  const handleAttachmentChange = (e)=>{
    var attached = histo.attachment;
    console.log ("Copia de histo", attached)
    var item = {}
    item["id"] = attached.length;
    item["file"] = URL.createObjectURL(e.target.files[0]);
    item["name"] = e.target.files[0].name;
    console.log("Objeto a empujar", item)
    attached.push(item);

    console.log("Objeto modificado",attached);

    setHisto({...histo, "attachment": attached}); 
  }

  const MainTitle = () =>{
    // Modes "add", "addToId", "edit"
    console.log("DATA EN MAIN TITLE",cabinsList, servicesList)
    return (
    <h2>{i18next.t("edithistoryof")} {histo.customerName}, {getDateFromISOTime(histo.date, locale)}, {new Date(histo.date).toLocaleTimeString()}</h2>
    )
  }

  const ShowAttachments = ()=>{

      const attached = histo.attachment;
      if(attached){
    
      return (
        <React.Fragment>
         <p>{attached.map((item)=>{ return (
          <Button size='small' href={item.file} target="_blank" >{item.name}</Button>
         )
            })}
        </p>
        </React.Fragment>
      )
        }
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
              
              <Typography variant="h6" color="text.secondary" align="center" sx={{mt:2}}>
                {i18next.t("history")}
              </Typography>

              

              {/* DATE AND TIME CARD */}

             <Paper sx={{p:1, mb:2}}>
              <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                  <Grid item xs={12} sm={1} md={1} sx={{mt:2, mr:1}}>
                    <Button fullWidth onClick={seehistory} variant="outlined" sx={{mr:2}}>{i18next.t("calendar")}</Button>
                  </Grid>
                  <Grid item xs={12} sm={3} md={3} sx={{mt:2, mr:1}}>
                        <LocalizationProvider dateAdapter={AdapterMoment} locale={locale}>
                        <DatePicker
                            label={i18next.t("date")}
                            value={histo.date}
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
                          value={histo.date}
                          variant="standard"
                          
                          onChange={handleDate}
                          renderInput={(params) => <TextField fullWidth variant="standard" sx = {{mr:2}} {...params} />}
                        />
                        </LocalizationProvider>
                      
                    </Grid>
                    <Grid item xs={12} sm={2} md={2} sx={{mt:2, mr:1}}>
                        <TextField
                            label={i18next.t("duration")}
                            value={histo.duration}
                            variant="standard"
                            fullWidth
                            sx = {{mr:2}}
                            onChange={handleDurationChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} md={3} sx={{mt:2}}>
                        <TextField
                            label={i18next.t("cabin")}
                            value={histo.cabin}
                            variant="standard"
                            fullWidth
                            sx = {{mr:2, textAlign:'left'}}
                            select
                            onChange={handleCabinChange}
                        >
                           {cabinsList.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>
                                    {option.cabinName}
                                    </MenuItem>
                                ))}

                        </TextField>
                    </Grid>
                 </Grid>
                </Paper>

                 {/* SERVICE AND PRICE */}

                 <Paper sx={{p:1}}>
                 <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                    <Grid item xs={12} sm={2} md={2} sx={{mt:2, mr:1}}>   
                       <Button fullWidth onClick={addService} variant="outlined" sx={{mr:2}}>{i18next.t("addservice")}</Button>
                    </Grid>
                      <Dialog open={dialogOpen} onClose={closeAddServiceDialog}>
                        <DialogTitle>{i18next.t("addservice")}</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                          {i18next.t("addaservicetothelistandusualprice")}
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="service"
                            label={i18next.t("service")}
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={handleNewServiceService}
                            value = {newService.service}
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            id="price"
                            label={i18next.t("price")}
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={handleNewServicePrice}
                            value= {newService.price}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={newServiceFormCommit}>{i18next.t("add")}</Button>
                          <Button onClick={closeAddServiceDialog}>{i18next.t("cancel")}</Button>
                        </DialogActions>
                      </Dialog>
                    <Grid item xs={12} sm={3} md={3} sx={{mr:1}}>
                        <TextField
                            label={i18next.t("service")}
                            value={histo.service}
                            variant="standard"
                            sx = {{mr:2, textAlign:'left'}}
                            fullWidth
                            select
                            helperText= {i18next.t("pleaseselectaserviceoraddnew")}
                            onChange={handleServicesChange}
                        >
                          {servicesList.map((option) =>{ return (
                            <MenuItem key={option._id} value={option._id}>
                              {option.serviceName}
                            </MenuItem>
                            )
                          })}
                         
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={2} md={2} sx={{mr:1}}>  
                        <TextField
                          label={i18next.t("price")}
                          value={histo.price}
                          variant="standard"
                          sx = {{mr:2}}
                          fullWidth
                          onChange={handlePriceChange}
                          helperText= {i18next.t("selectaprice")}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                          }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} >
                        <TextField
                          label={i18next.t("paid")}
                          value={histo.paid}
                          variant="standard"
                          sx = {{mr:2, input: histo.paid<histo.price? {color:'red'}: {color:'green'}}}
                          fullWidth
                          onChange={handlePaidChange}
                          helperText= {i18next.t("amountpaid")}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                            endAdornment: <InputAdornment position="end"><Button size="small">{i18next.t("printrecipe")}</Button></InputAdornment>
                          }}
                        />
                    </Grid>
                  </Grid>
                </Paper>
              

                {/* NOTAS */}

              <Typography variant="h6" color="text.secondary" align="center" sx={{mt:2}}>
                {i18next.t("notes")}
              </Typography>
              
              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                
                <Card sx={{ display: 'flex',  width: '100%', mt:2  }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', mb:2, mt:1}}>
                <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%'}}>
                  <label htmlFor="attachment">
                    <Input id="attachment" type="file" onChange={handleAttachmentChange}/>
                    <IconButton color="primary" aria-label="upload file" component="span" >
                      <AttachFileIcon />
                    </IconButton>
                  </label>

                  <TextField
                    id="outlined-multiline-flexible"
                    label={i18next.t("notes")}
                    multiline
                    sx = {{m:2}}
                    rows={6}
                    fullWidth
                    value={histo.notes}
                    onChange={handleNotesChange}
                  />
                </Box>

                {/* ATTACHMENTS */}
                  <ShowAttachments />
                </Box>
                </Card>
              </Grid>
                          
            <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%', m:2 }}>
            <Button
                type="submit"
                fullWidth
                color="success"
                variant="contained"
                onClick={HandleSubmit}
                sx={{ m:3}}
            >
               {i18next.t("edithistory")}
            </Button>
            
            <Button
                fullWidth
                variant="contained"
                color = "error"
                onClick={resetData}
                sx={{ m:3 }}
            >
               {i18next.t("cancel")}
            </Button>
          </Box>
        </Box>
        <Snackbar
            open={openSnackBar}
            autoHideDuration={6000}
            onClose={handleCloseSnackBar}
            message="Note archived"
            
          >
          {error===""?<Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>{i18next.t("historyupdated")} </Alert>:<Alert onClose={handleCloseSnackBar} severity="error" sx={{ width: '100%' }}>{error} </Alert>}
        </Snackbar>
    </React.Fragment>
  )
}
