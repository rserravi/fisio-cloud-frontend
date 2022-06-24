
//REACT IMPORTS
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

//MUI IMPORTS
import { Button, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

//CUSTOM IMPORTS
import Title from './Title';
import { navigationSuccess } from '../pages/dashboard/navigation-slice';
import { nameInitial } from '../utils/name-utils.js';
import { LocalTextForDataGrid, paperColor } from '../utils/mui-custom-utils';


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
import { GetAppointments } from '../utils/tests/dataFetch-utils';


var info = "";
var compact = false;


// FUNCTIONS FOR EXTERNAL ACTIONS

const addNewAppointment= (customerId) =>{
  console.log("ADD APPOINTMENT IN CUSTOMER " + customerId);
}

const editCustomer= (customerId) =>{
  console.log("EDIT "+ customerId);
}
const deleteCustomer = (customerId) => {
  console.log("DELETE CUSTOMER " + customerId);
}

const duplicateCustomer = (customerId) => {
  console.log("DUPLICATE CUSTOMER " + customerId);
}

const printCustomer = (customerId) => {
  console.log("PRINT CUSTOMER " + customerId);
}


const callUser = (firstname, lastname, number) =>{
  console.log("Calling to " + nameInitial(firstname) + " "+ lastname + " at " + number )
}

const emailUser = (firstname, lastname, mail) =>{
  console.log("Sending email to " + nameInitial(firstname) + " "+ lastname + " at " + mail )
}

const whatsappUser = (firstname, lastname, number, whastsapp) =>{
  if (whastsapp){
    console.log("Sending Whatsapp to " + nameInitial(firstname) + " "+ lastname + " at " + whastsapp )
  }else{
  console.log("Sending Whastapp to " + nameInitial(firstname) + " "+ lastname + " at Mobile " + number )
  }
}

//RENDER CELLS


// FUNCTIONS FOR DATAGRID COLUMNS AND ROWS

const data = GetAppointments();

const appointmentsWidth = () =>{
  if(compact){
    return 50
  }else{
    return 130
  }
}


/////////////////////////////////
//                             //
//   MAIN COMPONENT FUNCTION   //
//                             //
/////////////////////////////////

export const AppointmentsComponent = (props)=> {
  //PROPS.COMPACT (true, false)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  compact = props.compact;

  const { t } = useTranslation();
 
  const rows = data.map((row) => 
  ({
    id: row.id,  
    userid: row.customerId,
    userName: row.customerName,
    date: row.date,
    startingTime: row.startingTime,
    duration: row.duration,
    service: row.service,
    price: row.price,
    status: row.status,
    closed: row.closed,
    notes: row.notes 
  })
  );

  const Columns = () => {
    const { t } = useTranslation();
  
    return(
      [
        { field: 'id', headerName: t("Id"), width: 20 },
        { field: 'userName', headerName: t("Customer"), width:200},
        { field: 'date', headerName: t("date"), width: 100},
        { field: 'startingTime', headerName: t("startingTime"), width:100},
        { field: 'duration', headerName: t("Duration"), width: 80
       },
        { field: 'service', headerName: t("Service"), width: 80
       },
        { field: 'price', headerName: t("Price"), width: 80 },
        { field: 'notes', headerName: t("Notes"), width: 280 },
        {
          field: 'actions',
          type: 'actions',
          headerName: t("actions"),
          width: 80,
          sortable: false,
          getActions: (params) => [
            <GridActionsCellItem
            icon={<Tooltip title={t("seecustomer")}><VisibilityIcon /></Tooltip>}
            label={t("seecustomer")}
            
            onClick={(event) => {
              seeCustomer(params.id);
              event.stopPropagation();
          }}
          />,
          
            <GridActionsCellItem
            icon={<ContentCopyIcon />}
            label={t("duplicatecustomer")}
            showInMenu
            onClick={(event) => {
              duplicateCustomer(params.id);
              event.stopPropagation();
          }}
          />,
          <GridActionsCellItem
              icon={<DeleteIcon />}
              label={t("deletecustomer")}
              showInMenu
              onClick={(event) => {
                deleteCustomer(params.id);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
            icon={<LocalPrintshopIcon />}
            label={t("printcustomer")}
            showInMenu
            onClick={(event) => {
              printCustomer(params.id);
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
    const actualScreen = "AddCustomer";
    navigate("/addcustomer",{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  const seeCustomer = (customerId) => {
    console.log("SEE CUSTOMER " + customerId);
    const actualScreen = "SeeCustomer";
    navigate("/customer/"+customerId,{replace: true});
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

   // Set if Toolbar is visible depending on var compact
  const CustomerToolBar = () =>{
    if(compact) {
      return (<></>)
    }
    else {
    return (
      <React.Fragment>
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar variant='regular'>   
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button variant='contained' size="small" onClick={AddCustomerButton} startIcon={<PersonAddAlt1Icon />}>{t("addnewcustomer")} </Button>
              <Button variant='contained' size="small" onClick={printSelected} startIcon={<PrintIcon />}>Imprimir {select.length===0 ? "Todos" : "Seleccion"}</Button>
              <Button variant='contained' size="small" onClick={emailSelected} startIcon={<EmailIcon />}>Mail a {select.length===0 ? "Todos" : "Seleccion"} </Button>
              <Button variant='contained' size="small" onClick={whastappSelected} startIcon={<WhatsAppIcon />}>Whatsapp a {select.length===0 ? "Todos" : "Seleccion"} </Button>
            </ButtonGroup>
          </Toolbar>
        </Box>
      </React.Fragment>
    )
    }
  }

  //MAIN DOM RETURN
  return (
    <React.Fragment>
    
      <CustomerToolBar />
      <Title>{t("nextappointments")}</Title>
    
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
      />
      
    </React.Fragment>
  );
}
