import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { GetAllData, GetAppointmentById, GetCabins, getCustomer, GetCustomerIdFromName, getPriceForService, getServices } from '../utils/dataFetch-utils';
import CustomerSearchBar from './form-components/customer-search-form-comp';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';
import styled from '@emotion/styled';
import AttachFileIcon from '@mui/icons-material/AttachFile';

var initAddService={
  service:"",
  price:""
}

  
export default function AddAppointmentForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customerID, setCustomerID] = React.useState(props.customerId)
  // const _appoId = props.appoId
  
  const [mode,setMode] = React.useState("add") // Modes "add", "addToId", "edit"
  const cabinsData = GetCabins();
    
  var initValidation={
    id:"1",
    date: new Date(Date.now()),
    duration: "60", 
    service:"Masaje",
    cabin:"3",
    price: "50",
    paid:"0",
    status: "pending",
    closed: "",
    notes: "",
    attachment:[]
  }
  const [appo, setAppo] = React.useState(initValidation);

  React.useEffect(() => {   
    
    //SELECCION DE MODOS
     
    if (props.customerId && !props.appoId){
          //MODO AÑADIR CITA A ID
          setMode("addToId")
        }

    if (props.customerId && props.appoId){
          //MODO EDITAR
          setMode("edit")
          const newData = GetAppointmentById({appoId: props.appoId, userId: props.customerId })
          setAppo(newData[0])
        }
    },[props.appoId, props.customerId, setMode, setAppo ]);

  const [customerName, setCustomerName] = React.useState("")
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [closeAppoDialogOpen, setCloseAppoDialogOpen] = React.useState(false);
  const [newService, setNewService] = React.useState(initAddService);
  const services = getServices();
  
  React.useEffect (()=>{

    },[])
 
  const { t } = useTranslation();
  
  const data = () => {
    if (customerID){
      return getCustomer(customerID);
    }
    else
      return (GetAllData)
  }   


  const HandleSubmit = (event)=>{
  
    event.preventDefault();
    console.log(appo)
    //CALL API TO PUT IN DATABASE
    const actualScreen = "/appointments"
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))

   }
   const closeAppointment = (event)=>{
    event.preventDefault();
    setCloseAppoDialogOpen(true);

  }

  const closeAppo = (event) =>{
    event.preventDefault();
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

   const SetCustomer = (data) =>{

    setCustomerName(data);
    setCustomerID(GetCustomerIdFromName(data));
   }
 

  const resetData= ()=>{
    //setFrmData(frmDataInit);
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
    setAppo({...appo, "price": event.target.value})
  }

  const handleServicesChange= (event)=>{
    setAppo({...appo, "service": event.target.value,"price": getPriceForService(event.target.value) })
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

  const MainTitle = () =>{
    // Modes "add", "addToId", "edit"
    switch (mode) {
      case "add":
          return(<><CustomerSearchBar customerFunc={SetCustomer}/></>);
      case "addToId":
        return (
            <h2>{t("addingdateto")} {data().firstname} {data().lastname} </h2>
          )  
      case "edit":
          return (
            <h2>{t("editingdateof")} {data().firstname} {data().lastname}, el {new Date(appo.date).toLocaleDateString()} a las {new Date(appo.date).toLocaleTimeString()}</h2>
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
        {t("closeappointment")}
    </Button>
      )

      }
    }

    const ShowAttachments = ()=>{

      const attached = appo.attachment;
    
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
                {t("appointment")}
              </Typography>

              

              {/* DATE AND TIME CARD */}

             <Paper sx={{p:1, mb:2}}>
              <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                  <Grid item xs={12} sm={1} md={1} sx={{mt:2, mr:1}}>
                    <Button fullWidth onClick={seeAppointment} variant="outlined" sx={{mr:2}}>{t("calendar")}</Button>
                  </Grid>
                  <Grid item xs={12} sm={3} md={3} sx={{mt:2, mr:1}}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            label={t("date")}
                            value={appo.date}
                            variant="standard"
                            sx = {{mr:2}}
                            onChange={handleDate}
                            
                            renderInput={(params) => <TextField fullWidth variant="standard" sx = {{mr:2}} {...params} />}
                        />
                         </LocalizationProvider> 
                  </Grid>
                  <Grid item xs={12} sm={2} md={2} sx={{mt:2, mr:1}}>
                         <LocalizationProvider dateAdapter={AdapterMoment}>
                        <TimePicker
                          label={t("Time")}
                          value={appo.date}
                          variant="standard"
                          
                          onChange={handleDate}
                          renderInput={(params) => <TextField fullWidth variant="standard" sx = {{mr:2}} {...params} />}
                        />
                        </LocalizationProvider>
                      
                    </Grid>
                    <Grid item xs={12} sm={2} md={2} sx={{mt:2, mr:1}}>
                        <TextField
                            label={t("duration")}
                            value={appo.duration}
                            variant="standard"
                            fullWidth
                            sx = {{mr:2}}
                            onChange={handleDurationChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} md={3} sx={{mt:2}}>
                        <TextField
                            label={t("cabin")}
                            value={appo.cabin}
                            variant="standard"
                            fullWidth
                            sx = {{mr:2, textAlign:'left'}}
                            select
                            onChange={handleCabinChange}
                        >
                           {cabinsData.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                    {option.localization}
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
                       <Button fullWidth onClick={addService} variant="outlined" sx={{mr:2}}>{t("addservice")}</Button>
                    </Grid>
                      <Dialog open={dialogOpen} onClose={closeAddServiceDialog}>
                        <DialogTitle>{t("addservice")}</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                          {t("addaservicetothelistandusualprice")}
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="service"
                            label={t("service")}
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
                            label={t("price")}
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={handleNewServicePrice}
                            value= {newService.price}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={newServiceFormCommit}>{t("add")}</Button>
                          <Button onClick={closeAddServiceDialog}>{t("cancel")}</Button>
                        </DialogActions>
                      </Dialog>
                    <Grid item xs={12} sm={3} md={3} sx={{mr:1}}>
                        <TextField
                            label={t("service")}
                            value={appo.service}
                            variant="standard"
                            sx = {{mr:2, textAlign:'left'}}
                            fullWidth
                            select
                            helperText= {t("pleaseselectaserviceoraddnew")}
                            onChange={handleServicesChange}
                        >
                          {services.map((option) =>{ return (
                            <MenuItem key={option.id} value={option.serviceName}>
                              {option.serviceName}
                            </MenuItem>
                            )
                          })}
                         
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={2} md={2} sx={{mr:1}}>  
                        <TextField
                          label={t("price")}
                          value={appo.price}
                          variant="standard"
                          sx = {{mr:2}}
                          fullWidth
                          onChange={handlePriceChange}
                          helperText= {t("selectaprice")}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                          }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} >
                        <TextField
                          label={t("paid")}
                          value={appo.paid}
                          variant="standard"
                          sx = {{mr:2}}
                          fullWidth
                          onChange={handlePaidChange}
                          helperText= {t("amountpaid")}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                            endAdornment: <InputAdornment position="end"><Button size="small">{t("printrecipe")}</Button></InputAdornment>
                          }}
                        />
                    </Grid>
                  </Grid>
                </Paper>
              

                {/* NOTAS */}

              <Typography variant="h6" color="text.secondary" align="center" sx={{mt:2}}>
                {t("notes")}
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
                    label={t("notes")}
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
            >
               {mode==="add"? t("createappointment"): t("editappointment")}
            </Button>
            <AdditionalButton />
            <Dialog open={closeAppoDialogOpen} onClose={closeAppoDialog}>
                          <DialogTitle>{t("closeappointment")}</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                            {t("doyouwanttofiletheappointmentorkeepediting")}
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={closeAppo}>{t("fileit")}</Button>
                            <Button onClick={closeAppoDialog}>{t("keepediting")}</Button>
                          </DialogActions>
                        </Dialog>
            <Button
               
                fullWidth
                variant="contained"
                color = "error"
                onClick={resetData}
                sx={{ m:3 }}
            >
               {t("cancel")}
            </Button>
          </Box>
        
              
        </Box>
    </React.Fragment>
  )
}
