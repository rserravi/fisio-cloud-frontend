//REACT IMPORTS
import * as React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

//MUI IMPORTS
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Snackbar, } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

//CUSTOM IMPORTS
import Title from './Title';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';
import { LocalTextForDataGrid } from '../utils/mui-custom-utils';
import { DeleteCustomer } from '../api/customer.api';


//ICONS
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PrintIcon from '@mui/icons-material/Print';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SendIcon from '@mui/icons-material/Send';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import i18next from 'i18next';
import CloseIcon from '@mui/icons-material/Close';
import { GetCustomerRecords } from '../utils/dataFetch-utils';


var info = "";
var compact = false;

// FUNCTIONS FOR SIZE

const appointmentsWidth = () =>{
  if(compact){
    return 50
  }else{
    return 130
  }
}

const initCustomerRecords = {
  appo: 0,
  comm: 0,
  hist: 0
}

/////////////////////////////////
//                             //
//   MAIN COMPONENT FUNCTION   //
//                             //
/////////////////////////////////

export const CustomersComponent = (props)=> {
  //PROPS.INFO ("all","newCustomers", "withAppointments" )
  //PROPS.COMPACT (true, false)

  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const customerList = props.customerData
  const [custForAction, setCustForAction]= React.useState({});
  const [deleteCustomerDialog, setDeleteCustomerDialog] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [error, setError] = React.useState("")
  const [customerHasRecords, setCustomerHasRecords]= React.useState(initCustomerRecords)


  info= props.info;
  compact = props.compact;
  var boxHeight = 600;
  if(compact){
    boxHeight = 330;
  }

  // FUNCTIONS FOR EXTERNAL ACTIONS

  const deleteCustomer = (params) => {

    setCustForAction(params.id);
    console.log("DELETE CUSTOMER " + params.id);
    setCustomerHasRecords(GetCustomerRecords(params.row))
    setDeleteCustomerDialog(true);
  }

  const commitDeleteCustomer =()=>{
    DeleteCustomer(custForAction).then((data)=>{
      if (data.status==="error"){
        setError(data.message)
      }
      else{
        setError("")
      }
      setDeleteCustomerDialog(false);
      setOpenSnackBar(true)
    
    })
  }

  const handleCloseDeleteDialog = (event)=>{
    event.stopPropagation();
    setDeleteCustomerDialog(false);

  }

  const handleCloseSnackBar = (event, reason) =>{
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
    if (error===""){
      window.location.reload(false)
    }
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


  const duplicateCustomer = (params) => {
    console.log("DUPLICATE CUSTOMER " + params.id);
  }

  const printCustomer = (params) => {
    console.log("PRINT CUSTOMER " + params.id);
  }

  const osint = (params) => {
    console.log ("BUSCANDO POR INTERNET AL NUMERO", params.id)
  }

  const GetDebts = (row) =>{
    if (row.history){
      const count = row.history.reduce((accumulatos, obj)=>{
        if (obj.price !== obj.paid){
            return accumulatos + (Number(obj.price) - Number(obj.paid));
        }
        return accumulatos;      
       }, 0);
       return count *-1;
    }
    return 0;    
  }

  const RenderAppointmentCell = (props) => {
 
    const buttonElement = React.useRef(null);
    const rippleRef = React.useRef(null);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const {hasFocus, value } = props;
    const _id = props.row.id;
  
    React.useLayoutEffect(() => {
      if (hasFocus) {
        const input = buttonElement.current?.querySelector('input');
        input?.focus();
      } else if (rippleRef.current) {
        // Only available in @mui/material v5.4.1 or later
        rippleRef.current.stop({});
      }
    }, [hasFocus]);
  
    const addNewAppointment= (customerId) =>{
      const actualScreen = "/addappointment/"+ customerId
      dispatch(navigationLoading());
      navigate(actualScreen,{replace: true});
      dispatch(navigationSuccess(actualScreen))
    }
  
    const seeAppo = (customerId)=>{
      const actualScreen = "/customer/"+ customerId + "/appo";
      dispatch(navigationLoading());
      navigate(actualScreen,{replace: true});
      dispatch(navigationSuccess(actualScreen))
    
    }
  
    const seeHist = (customerId)=>{
      const actualScreen = "/customer/"+ customerId + "/hist";
      dispatch(navigationLoading());
      navigate(actualScreen,{replace: true});
      dispatch(navigationSuccess(actualScreen))
    }
  
    
    return (
       <strong>
        <Tooltip title={i18next.t("appointments")}>
        <IconButton 
          aria-label="delete" 
          variant='contained' 
          onClick={(event) => {
            seeAppo(_id);
            event.stopPropagation();
          }}
       
          sx={{ 
            backgroundColor:'green', 
            color:'white', 
            fontSize:'small',
            minHeight: 0,
            minWidth: 0,
            paddingX: 1.5,
            '&:hover': {
              backgroundColor: 'green',
              color: 'white',
            },
            
          }}>
        {value.next}
        </IconButton>
        </Tooltip>
        {!compact ? <Tooltip title={i18next.t("history")}>
        <IconButton 
          aria-label="delete" 
          variant='contained' 
          style={{ marginLeft: 2 }}
          onClick={(event) => {
            seeHist(_id)
            event.stopPropagation();
          }}
          sx={{ 
            backgroundColor:'orange', 
            color:'white', 
            fontSize:'small',
            minHeight: 0,
            minWidth: 0,
            paddingX: 1.5,
            '&:hover': {
              backgroundColor: 'orange',
              color: 'white',
            },
            
          }}>
        {value.past}
        </IconButton>
        </Tooltip> 
        : <></>
        }
           
        {!compact ?<Tooltip title={i18next.t("adddate")}>
        <IconButton
          component="button"
          ref={buttonElement}
          touchRippleRef={rippleRef}
          variant="contained"
          color='primary'
          size="small"
          style={{ marginLeft: 5 }}
          // Remove button from tab sequence when cell does not have focus
          tabIndex={hasFocus ? 0 : -1}
          onKeyDown={(event) => {
            if (event.key === ' ') {
              // Prevent key navigation when focus is on button
              event.stopPropagation();
            }
          }}
       
          onClick={(event) => {
             addNewAppointment(_id);
             event.stopPropagation();
          }}
        
        >
         <AddCircleIcon />
        </IconButton>
        </Tooltip>
        : <></>
        }
        </strong>
    );
  };

  const getPhone= (row)=>{
    var result=""
    if(row.phonework){
        result =row.phonework 
        return result
    }
    if(row.phonehome){
        result = row.phonehome
        return result
    }
    return result;
  }

  const RenderPhoneCell = (props) => {
    const {hasFocus, value } = props;
    const {id, whatsapp} = props.row;
    const phone = getPhone(props.row);
    const buttonElement = React.useRef(null);
    const rippleRef = React.useRef(null);
  
    React.useLayoutEffect(() => {
      if (hasFocus) {
        const input = buttonElement.current?.querySelector('input');
        input?.focus();
      } else if (rippleRef.current) {
        // Only available in @mui/material v5.4.1 or later
        rippleRef.current.stop({});
      }
    }, [hasFocus]);
  
    return (
       <>
       
        <Tooltip title={i18next.t("call")}>
          <IconButton
            component="button"
            ref={buttonElement}
            touchRippleRef={rippleRef}
            variant="contained"
            color='primary'
            size="small"
            style={{ marginLeft: 0 }}
            // Remove button from tab sequence when cell does not have focus
            tabIndex={hasFocus ? 0 : -1}
            onKeyDown={(event) => {
              if (event.key === ' ') {
                // Prevent key navigation when focus is on button
                event.stopPropagation();
              }
            }}
        
            onClick={(event) => {
              callUser(id);
              event.stopPropagation();
            }}
          
          >
            <PhoneForwardedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={i18next.t("sendwhatsapp")}>
          <IconButton
            component="button"
            ref={buttonElement}
            touchRippleRef={rippleRef}
            variant="contained"
            color='primary'
            size="small"
            style={{ marginLeft: 5 }}
            // Remove button from tab sequence when cell does not have focus
            tabIndex={hasFocus ? 0 : -1}
            onKeyDown={(event) => {
              if (event.key === ' ') {
                // Prevent key navigation when focus is on button
                event.stopPropagation();
              }
            }}
        
            onClick={(event) => {
              whatsappUser(id, whatsapp);
              event.stopPropagation();
            }}
          
          >
            <WhatsAppIcon />
          </IconButton>
        </Tooltip>
        {value}
        </>
    );
  };

   
  const getMail= (row)=>{
    var result=""
    if(row.emailwork){
        result = row.email?row.emailwork: "(w) " + row.emailwork
        return result
    }
    if(row.emailhome){
        result = row.email?row.emailhome: "(h) " + row.emailhome
        return result
    }
    return result;
  }


  const RenderEmailCell = (props) => {
    const {hasFocus, value } = props;
    const {id} = props.row;
    const buttonElement = React.useRef(null);
    const rippleRef = React.useRef(null);
   
    const email = getMail(props.row);
  
    React.useLayoutEffect(() => {
      if (hasFocus) {
        const input = buttonElement.current?.querySelector('input');
        input?.focus();
      } else if (rippleRef.current) {
        // Only available in @mui/material v5.4.1 or later
        rippleRef.current.stop({});
      }
    }, [hasFocus]);
  
    return (
       <>
       
        <Tooltip title={i18next.t("sendemail")}>
          <IconButton
            component="button"
            ref={buttonElement}
            touchRippleRef={rippleRef}
            variant="contained"
            color='primary'
            size="small"
            style={{ marginLeft: 0 }}
            // Remove button from tab sequence when cell does not have focus
            tabIndex={hasFocus ? 0 : -1}
            onKeyDown={(event) => {
              if (event.key === ' ') {
                // Prevent key navigation when focus is on button
                event.stopPropagation();
              }
            }}
        
            onClick={(event) => {
              emailUser(id, value);
              event.stopPropagation();
            }}
          
          >
            <SendIcon />
          </IconButton>
        </Tooltip>
        {value}
        </>
    );
  };

  const RenderCustomerHasRecords = () =>{
    console.log("RENDER CUSTOMER HAS RECORDS", customerHasRecords)
    if (customerHasRecords.appo>0 || customerHasRecords.comm >0 || customerHasRecords.hist){
      return (
        <React.Fragment>
          <p style={{ color: 'red' }}><b>{i18next.t("thiscustomerhasrecordsthatwillbedeleted")}</b></p>
          {customerHasRecords.appo >0?<p>{i18next.t("appointments")+ ": " + customerHasRecords.appo + ". "}</p>:<></> }
          {customerHasRecords.hist >0?<p>{i18next.t("history") + ": " + customerHasRecords.hist + ". "}</p>:<></>}
          {customerHasRecords.comm >0?<p>{i18next.t("communications") + ": " + customerHasRecords.comm + "."}</p>:<></>}
        </React.Fragment>
      )
    }
    return (<></>)
  }
  
  const emailUser = (id, mail) =>{
    dispatch(navigationLoading());
    navigate("/addcommunication/"+ id + "/0/2",{replace: true});
    dispatch(navigationSuccess("addappointment"))
    console.log("Sending email to " + id + " at " + mail )
  
  }


  const callUser = (id) =>{
    const actualScreen = "/addcommunication/"+ id + "/0/1"
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  const whatsappUser = (id, whatsapp) =>{
    if (whatsapp){
      const actualScreen = "/addcommunication/"+ id + "/0/3"
      dispatch(navigationLoading());
      navigate(actualScreen,{replace: true});
      dispatch(navigationSuccess(actualScreen))
    }
  }
 

  const rows = customerList.map((row) => 
    (
      {
        id: row._id, 
        inbound: row.inbound,
        image: row.image, 
        firstName: row.firstname, 
        lastName: row.lastname,
        email: getMail(row),
        emailwork: row.emailwork,
        emailhome: row.emailhome,
        phoneNumber: getPhone(row),
        phonework: row.phonework,
        phonehome: row.phonehome,
        whatsapp: row.whatsapp,
        debts : GetDebts(row) + " €",
        appointments: {"next": row.appointments?row.appointments.length:0, "past": row.history.length}, 
        communications: row.communications.length,
      }
    )
  );

  const Columns = () => {
  
    return(
      [
        { field: 'id', headerName: i18next.t("Id"), width: 20, hide:"true" },
        { field: 'inbound', headerName: i18next.t("inbound"), width: 120 },
        { field: 'image', headerName:i18next.t("image"), width:60, renderCell: (params)=>
            {
              return(
                <>
                  <Avatar src={params.value.includes("data:image/jpeg;base64")?params.value:"./images/" + params.value} />
                </>
              )
            }
        },
        { field: 'firstName', headerName: i18next.t("name"), width: 100, align: "right",headerAlign:"right" },
        { field: 'lastName', headerName: i18next.t("lastname"), width: 150},
        { field: 'email', headerName: i18next.t("email"), width: 183,renderCell: RenderEmailCell},
        
        {
          field: 'phoneNumber',
          headerName: i18next.t("phoneNumber"),
          width: 190,
          renderCell: RenderPhoneCell,
        },
        {
          field: 'appointments',
          headerName: i18next.t("calendar"),
          width: appointmentsWidth(),
          renderCell: RenderAppointmentCell,
        },
        {
          field: 'debts',
          headerName: i18next.t("debts"),
          width: 55,
        },
        {
          field: 'actions',
          type: 'actions',
          headerName: i18next.t("actions"),
          width: 80,
          sortable: false,
          getActions: (params) => [
            <GridActionsCellItem
            icon={<Tooltip title={i18next.t("seecustomer")}><VisibilityIcon /></Tooltip>}
            label={i18next.t("seecustomer")}
            
            onClick={(event) => {
              seeCustomer(params.id);
              event.stopPropagation();
          }}
          />,
          
            <GridActionsCellItem
            icon={<PersonSearchIcon />}
            label={i18next.t("osint")}
            showInMenu
            onClick={(event) => {
              osint(params);
              event.stopPropagation();
          }}
          />,
          <GridActionsCellItem
            icon={<ContentCopyIcon />}
            label={i18next.t("duplicatecustomer")}
            showInMenu
            onClick={(event) => {
              duplicateCustomer(params);
              event.stopPropagation();
          }}
          />,
          <GridActionsCellItem
              icon={<DeleteIcon />}
              label={i18next.t("deletecustomer")}
              showInMenu
              onClick={(event) => {
                deleteCustomer(params);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
            icon={<LocalPrintshopIcon />}
            label={i18next.t("printcustomer")}
            showInMenu
            onClick={(event) => {
              printCustomer(params);
              event.stopPropagation();
          }}
          />,
          ],
        },
      ]
    )
  } 

  // NAVIGATE FUNCTIONS
  const AddCustomerButton= () =>{
    const actualScreen = "/addcustomer";
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  const seeCustomer = (customerId) => {
    const actualScreen = "/customer/"+customerId
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }
 
  // Select has an array of selected rows
  const [select, setSelection] = React.useState([]);

  const handleRowSelection = (ids) =>{
    setSelection(ids);
  }

  // ACTIONS FROM ROW BUTTONS
  const emailSelected = () =>{
    if (select.length===0){
      console.log("Enviando un mail a todos");
    }else{
    select.forEach((valor)=>{console.log("Enviando un mail al " + valor)})
    }
  }

  const printSelected= () =>{
    if (select.length===0){
      console.log("Imprimiendo todo el formulario");
    }else{
       let cadena = "Imprimiendo la seleccion de ";
    select.forEach((valor)=>{cadena = cadena + valor + ","})
     console.log (cadena);
    }
  }

  const whastappSelected= () =>{
    if (select.length===0){
      console.log("Enviando un whastsapp a todos");
    }else{
    select.forEach((valor)=>{console.log("Enviando un whatsapp al " + valor)})
    }
  }

  // Functions depending on props.info (global var info) y props.compact (global var compact)
  // Set the title depending on var info
  const setTitle = () =>{
    switch (info) {
      case "all":
        return "allcustomers"
      case "newCustomers" :
        return "newCustomers"
      case "withAppointments" :
        return "customersWithAppointments"
      default:
        return "error"
    }
  }

  // Set if Toolbar is visible depending on var compact
  const CustomerToolBar = () =>{
    if(compact) {
      return (<></>)
    }
    else {
    return (
      <React.Fragment>
         <Grid container direction="row" justifyContent="flex-start" alignItems="baseline" sx={{mb:4}}>
            <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
              <Button variant='contained' size="small" onClick={AddCustomerButton} startIcon={<PersonAddAlt1Icon />}>{i18next.t("addnewcustomer")} </Button>
            </Grid>
            <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
              <Button variant='contained' size="small" onClick={printSelected} startIcon={<PrintIcon />}>{i18next.t("print")} {select.length===0 ? i18next.t("everyone") : i18next.t("selection")}</Button>
            </Grid>
            <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
              <Button variant='contained' size="small" onClick={emailSelected} startIcon={<EmailIcon />}>{i18next.t("mailto")} {select.length===0 ? i18next.t("everyone") : i18next.t("selection")} </Button>
            </Grid>
            <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
              <Button variant='contained' size="small" onClick={whastappSelected} startIcon={<WhatsAppIcon />}>{i18next.t("whatsappto")} {select.length===0 ? i18next.t("everyone"): i18next.t("selection")} </Button>
            </Grid>
        </Grid>

      </React.Fragment>
    )
    }
  }

  //MAIN DOM RETURN
  return (
    <React.Fragment>
    
      <CustomerToolBar />
      <Title>{i18next.t(setTitle())}</Title>
      <Box
          sx={{
            height: boxHeight,
            width: '100%',
            '& .inbound-unknown': {
              backgroundColor: 'rosybrown',
              color: 'white',
              fontWeight: '600',
            },
            '& .inbound-lead': {
              backgroundColor: 'khaki',
              color: 'dimgray',
              fontWeight: '600',
            },
            '& .inbound-customer': {
              backgroundColor: 'dodgerblue',
              color: 'white',
              fontWeight: '600',
            },
            '& .inbound-passive': {
              backgroundColor: 'darkred',
              color: 'white',
              fontWeight: '600',
            },
            '& .name-bold': {
              fontWeight: '600',
            },
            '& .debt': {
              fontWeight: '600',
              backgroundColor: 'red',
              color: 'white'
            },
            
          }}>
      <DataGrid
        rows={rows}
        columns={Columns()}
        autoHeight={!compact}
        checkboxSelection ={!compact}
        rowsPerPageOptions={[5,10,25,50,100]}
        rowsPerPage ={10}
        components={!compact?{
          Toolbar: GridToolbar,
        }:null}
        onSelectionModelChange={handleRowSelection}
        localeText={LocalTextForDataGrid()}
        getCellClassName={(params) => {
          if (params.field === 'inbound') {
            switch (params.value) {
              case "unknown":
                return 'inbound-unknown';
              case "lead":
                return 'inbound-lead';
              case "customer":
                return 'inbound-customer';
              case "passive":
                return 'inbound-passive';
            
              default:
                return 'inbound-unknown';
            }
          }
          if (params.field === 'firstName' || params.field ==='lastName'){
              return 'name-bold'
            }
          if(params.field === 'debts'){
            const paramNum = params.value.split("€")
            if (Number(paramNum[0]) !==0)
              return 'debt'
            }
          return "";
          
        }}
      />
  </Box>
      <Dialog
        open={deleteCustomerDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          {i18next.t("deletecustomer")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            {i18next.t("Areyousureyouwanttodeletecustomer")}
            <RenderCustomerHasRecords />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>{i18next.t("Disagree")}</Button>
          <Button onClick={commitDeleteCustomer} autoFocus>
            {i18next.t("Agree")}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
            open={openSnackBar}
            autoHideDuration={6000}
            onClose={handleCloseSnackBar}
            message="Note archived"
            
          >
          {error===""?<Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>{i18next.t("customerdeleted")} </Alert>:<Alert onClose={handleCloseSnackBar} severity="error" sx={{ width: '100%' }}>{error} </Alert>}
        </Snackbar>
    </React.Fragment>
  );
}