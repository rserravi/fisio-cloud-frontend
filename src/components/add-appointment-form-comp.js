import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Alert, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, MenuItem, Paper, Snackbar, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import CustomerSearchBar from './form-components/customer-search-form-comp';
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
import { getPriceForService } from '../utils/dataFetch-utils';
import { addAppointment, updateAppointment } from '../api/appointments.api';
import { getDateFromISOTime } from '../utils/date-utils';
import CloseIcon from '@mui/icons-material/Close';


var initAddService={
  service:"",
  price:""
}

  
export default function AddAppointmentForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigationState= useSelector((state)=> state.navigator);
  const locale = props.locale;
  const [customerData, setCustomerData] = React.useState(props.customerData)
  const [appo, setAppo] = React.useState(props.appoData)
  const [cabinsData, setCabinsData] = React.useState(props.cabinsData);
  const [servicesData, setServicesData]= React.useState(props.servicesData);
  const [mode,setMode] = React.useState("add") // Modes "add", "addToId", "edit"
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [closeAppoDialogOpen, setCloseAppoDialogOpen] = React.useState(false);
  const [newService, setNewService] = React.useState(initAddService);
  const [firstLoad, setFirstLoad]= React.useState(true);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [error, setError] = React.useState("")
  const userSelector = useSelector(state => state.user);
  const userId = userSelector.id;

  
  var initData={
    id:"1",
    userId: userId,
    customerName:"",
    customerId:"",
    date: new Date(Date.now()),
    duration: "60", 
    service:"1",
    cabin:"3",
    price: "50",
    paid:"0",
    status: "pending",
    closed: "",
    notes: "",
    attachment:[]
  }
  
  React.useEffect (()=>{
    //SELECCION DE MODOS
      if(firstLoad){
        if (customerData._id && !appo.customerId){
          //MODO AÑADIR CITA A ID
          console.log("MODO ADDTOID")
          setAppo({...appo, "customerId": customerData._id, "customerName": customerData.firstname + " " + customerData.lastname})
          setMode("addToId")
        }

        if (appo.customerId){
          //MODO EDITAR EXISTENTE
          console.log("MODO EDIT EXISTENT APPO")
          setMode("edit")
        }

        if (!customerData._id && !appo.customerId){
          //MODO AÑADIR
          console.log("MODO EDIT")
          setMode("add")
          setAppo(initData)
        }

        setFirstLoad(false)
      }
      console.log("DATA EN USEEFFECT COMP: APPO", appo, "CUSTOMER,",customerData,"SERVICES", servicesData, "CABINS", cabinsData)
    },[customerData, appo, servicesData, cabinsData, firstLoad])
   
  const HandleSubmit = (event)=>{

    event.preventDefault();
    console.log(appo)
    //CALL API TO PUT IN DATABASE
    if (mode==="addToId"){
      addAppointment(appo).then((data)=>{
        if(data.status ==="error"){
          console.log("ERROR EN APP_APPO", data.result)
          setError(error)
          setOpenSnackBar(true)
        }
        else {
          setError("")
          setOpenSnackBar(true)
        }
      })

    }else{
        updateAppointment(appo).then((data)=>{
          if(data.status ==="error"){
            console.log("ERROR EN APP_APPO", data)
            setError(data.message)
            setOpenSnackBar(true)     
          }
          else {
            setError("")
            setOpenSnackBar(true)
          }
        })
    }
   }

   const handleCloseSnackBar = (event, reason) =>{
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
    if (error===""){
      const actualScreen = "/appointments"
      dispatch(navigationLoading());
      navigate(actualScreen,{replace: true});
      dispatch(navigationSuccess(actualScreen))
    }
   }
   
   const closeAppointment = (event)=>{
    event.preventDefault();
    setCloseAppoDialogOpen(true);

  }

  const closeAppo = (event) =>{
    event.preventDefauli18next.t();
    console.log(appo)
    setAppo({...appo, "closed": new Date().now})
    //CALL API TO PUT IN DATABASE
    const actualScreen = "/appointments"
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  const closeAppoDialog = () =>{
    setCloseAppoDialogOpen(false);
  }

   const SetCustomer = (id, name) =>{
    console.log ("SET CUSTOMER", id, name);
    setAppo({...appo, "customerName": name, "customerId":id}); 
    setMode("addToId")
   }
 

   const resetData= (event)=>{
    event.preventDefault();
    const actualScreen = navigationState.previousScreen;
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen)) 
  }

  const handleDate= (value)=>{
    setAppo({...appo, "date": value})
  }
  
  const handleDurationChange= (event)=>{
    setAppo({...appo, "duration": event.target.value})
  }

  const handleCabinChange = (event)=>{
    setAppo({...appo, "cabin": event.target.value})
  }

  const handlePriceChange = (event)=>{
    setAppo({...appo, "price": event.target.value})
  }

  const handlePaidChange = (event)=>{
    setAppo({...appo, "paid": event.target.value})
  }

  const handleServicesChange= (event)=>{
    setAppo({...appo, "service": event.target.value,"price": getPriceForService(event.target.value, servicesData) })
  }

  const handleNotesChange= (event)=>{
    console.log(appo);
    setAppo({...appo, "notes": event.target.value})
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

  const seeAppointment = (event)=>{
    const actualScreen = "/appointments"
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  const Input = styled('input')({
    display: 'none',
  });

  const handleAttachmentChange = (e)=>{
    var attached = appo.attachment;
    console.log ("Copia de Appo", attached)
    var item = {}
    item["id"] = attached.length;
    item["file"] = URL.createObjectURL(e.target.files[0]);
    item["name"] = e.target.files[0].name;
    console.log("Objeto a empujar", item)
    attached.push(item);

    console.log("Objeto modificado",attached);

    setAppo({...appo, "attachment": attached}); 
  }
  
  const SnackBarAction = (
    <React.Fragment>
    <Button color="secondary" size="small" onClick={handleCloseSnackBar}>
      ACEPTAR
    </Button>
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleCloseSnackBar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
    </React.Fragment>
  )

  const MainTitle = () =>{
    // Modes "add", "addToId", "edit"
    switch (mode) {
      case "add":
          return(<><CustomerSearchBar customerFunc={SetCustomer}/></>);
      case "addToId":
        return (
          <>
          <Button size="small" onClick={()=>{setAppo(initData); setMode("add")}}>{i18next.t("finddifferentcustomer")}</Button>
            <h2>{i18next.t("addingdateto")} </h2>
          </>
          )  
      case "edit":
          return (
            <h2>{i18next.t("editingdateof")} {getDateFromISOTime(appo.date, locale)} , {new Date(appo.date).toLocaleTimeString()}</h2>
          )
        
      default:
          return (
            <>Ha habido un error</>
          )
    }
  }

  const AdditionalButton = ()=>{
    // Modes "add", "addToId", "edit"
    if (mode === "edit"){
      return (
        <Button       
          fullWidth
          variant="contained"
          color = "warning"
          onClick={closeAppointment}
          sx={{ m:3 }}
        >
          {i18next.t("closeappointment")}
        </Button>
        )
      }
    }

    const ShowAttachments = ()=>{
      const attached = appo.attachment;
      if (attached){
        return (
          <React.Fragment>
          <p>{attached.map((item)=>{ 
            return (
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
          <Loading/> 
        </Box>
      );
    }

   return (
    <React.Fragment>
        <Box component="form" noValidate onSubmit={HandleSubmit} >
            <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="center">
              
              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                <MainTitle />
                <h1>{appo.customerName}</h1>
              </Grid>
            </Grid>
              
              <Typography variant="h6" color="text.secondary" align="center" sx={{mt:2}}>
                {i18next.t("appointment")}
              </Typography>

              {/* DATE AND TIME CARD */}

             <Paper sx={{p:1, mb:2}}>
              <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                  <Grid item xs={12} sm={1} md={1} sx={{mt:2, mr:1}}>
                    <Button fullWidth onClick={seeAppointment} variant="outlined" sx={{mr:2}}>{i18next.t("calendar")}</Button>
                  </Grid>
                  <Grid item xs={12} sm={3} md={3} sx={{mt:2, mr:1}}>
                        <LocalizationProvider dateAdapter={AdapterMoment} locale={locale}>
                        <DatePicker
                            label={i18next.t("date")}
                            value={appo.date}
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
                          value={appo.date}
                          variant="standard"
                          
                          onChange={handleDate}
                          renderInput={(params) => <TextField fullWidth variant="standard" sx = {{mr:2}} {...params} />}
                        />
                        </LocalizationProvider>
                      
                    </Grid>
                    <Grid item xs={12} sm={2} md={2} sx={{mt:2, mr:1}}>
                        <TextField
                            label={i18next.t("duration")}
                            value={appo.duration}
                            variant="standard"
                            fullWidth
                            sx = {{mr:2}}
                            onChange={handleDurationChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} md={3} sx={{mt:2}}>
                        <TextField
                            label={i18next.t("cabin")}
                            value={appo.cabin}
                            variant="standard"
                            fullWidth
                            sx = {{mr:2, textAlign:'left'}}
                            select
                            onChange={handleCabinChange}
                        >
                           {cabinsData.map((option) => (
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
                            value={appo.service}
                            variant="standard"
                            sx = {{mr:2, textAlign:'left'}}
                            fullWidth
                            select
                            helperText= {i18next.t("pleaseselectaserviceoraddnew")}
                            onChange={handleServicesChange}
                        >
                          {servicesData.map((option) =>{ return (
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
                          value={appo.price}
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
                          value={appo.paid}
                          variant="standard"
                          sx = {{mr:2, input: appo.paid<appo.price? {color:'red'}: {color:'green'}}}
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
                    value={appo.notes}
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
                disabled={mode==="add"}
            >
               {mode==="addToId"? i18next.t("createappointment"): mode==="edit"?i18next.t("editappointment"):<></>}
            </Button>
            <AdditionalButton />
            <Dialog open={closeAppoDialogOpen} onClose={closeAppoDialog}>
                <DialogTitle>{i18next.t("closeappointment")}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                  {i18next.t("doyouwanttofiletheappointmentorkeepediting")}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeAppo}>{i18next.t("fileit")}</Button>
                  <Button onClick={closeAppoDialog}>{i18next.t("keepediting")}</Button>
                </DialogActions>
              </Dialog>
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
            action={SnackBarAction}
          >
          {error===""?<Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>{i18next.t("appointmentupdated")} </Alert>:<Alert onClose={handleCloseSnackBar} severity="error" sx={{ width: '100%' }}>{error} </Alert>}
        </Snackbar>
    </React.Fragment>
  )
}
