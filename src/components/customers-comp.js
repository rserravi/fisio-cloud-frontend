
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
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

//CUSTOM IMPORTS
import Title from './Title';
import { navigationSuccess } from '../pages/dashboard/navigation-slice';
import { nameInitial } from '../utils/name-utils.js';
import customerData from "../assets/data/dummy-data.json";
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


var info = "";
var compact = false;


// FUNCTIONS FOR EXTERNAL ACTIONS

const addNewAppointment= (customerId) =>{
  console.log("ADD APPOINTMENT IN CUSTOMER " + customerId);
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

const RenderAppointmentCell = (props) => {
  const {hasFocus, value } = props;

  const _id = props.row.id;
  const buttonElement = React.useRef(null);
  const rippleRef = React.useRef(null);
  const { t } = useTranslation();

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
     <strong>
      <Tooltip title={t("nextappointments")}>
      <IconButton 
        aria-label="delete" 
        variant='contained' 
        onClick={(event) => {
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
      {!compact ? <Tooltip title={t("pastappointments")}>
      <IconButton 
        aria-label="delete" 
        variant='contained' 
        style={{ marginLeft: 2 }}
        onClick={(event) => {
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
         
      {!compact ?<Tooltip title={t("adddate")}>
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

const RenderPhoneCell = (props) => {
  const {hasFocus, value } = props;
  const {firstName, lastName, whatsapp} = props.row;
  const buttonElement = React.useRef(null);
  const rippleRef = React.useRef(null);
  const { t } = useTranslation();

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
     <strong>
     
      <Tooltip title={t("call")}>
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
            callUser(firstName, lastName, value);
            event.stopPropagation();
          }}
        
        >
          <PhoneForwardedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={t("sendwhatsapp")}>
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
            whatsappUser(firstName, lastName, value, whatsapp);
            event.stopPropagation();
          }}
        
        >
          <WhatsAppIcon />
        </IconButton>
      </Tooltip>
      {value}
      </strong>
  );
};

const RenderEmailCell = (props) => {
  const {hasFocus, value } = props;
  const {firstName, lastName} = props.row;
  const buttonElement = React.useRef(null);
  const rippleRef = React.useRef(null);
  const { t } = useTranslation();

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
     
      <Tooltip title={t("sendemail")}>
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
            emailUser(firstName, lastName, value);
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

const RenderInboundCell = (props) => {
  const {hasFocus, value } = props;
  const { t } = useTranslation();

  const buttonElement = React.useRef(null);
  const rippleRef = React.useRef(null);
  const colorPaperInbound = paperColor(props.row.inbound);

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
      <Paper 
        onClick={(event) => {
          event.stopPropagation();
        }}
        
        sx={{bgcolor:colorPaperInbound.back, color:colorPaperInbound.front}}
        
      >
        <Typography variant='p' component="p" marginX={2}>{t(value)}</Typography>
      
      </Paper>
  );
};

// FUNCTIONS FOR DATAGRID COLUMNS AND ROWS

const data = (infoType) =>{

  if (!infoType){
    
    return customerData;
  }
    switch (infoType) {
      case "all":

        return customerData;
      case "newCustomers" :
        return customerData
      case "withAppointments" :

        try {
          return customerData.filter((newData)=>  {
            return newData.inbound === 'customer';
          });
        } catch (error) {
            console.log(error);
          return customerData;
        }       
      default:
        return customerData;
    
  }
}

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

export const CustomersComponent = (props)=> {
  //PROPS.INFO ("all","newCustomers", "withAppointments" )
  //PROPS.COMPACT (true, false)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  info= props.info;
  compact = props.compact;

  const { t } = useTranslation();
 
  const rows = data(info).map((row) => 
  ({
     id: row.id, 
     inbound: row.inbound,
     image: row.image, 
     firstName: row.firstname, 
     lastName: row.lastname,
     email: row.email[1] ? row.email[1].emailAddress : row.email[0].emailAddress, 
     phoneNumber: row.phoneNumber[1].number,
     whatsapp: row.whatsapp,
     appointments: {"next": row.appointments.length, "past": row.history.length}, 
  })
  );

  const Columns = () => {
    const { t } = useTranslation();
  
    return(
      [
        { field: 'id', headerName: t("Id"), width: 20 },
        { field: 'inbound', headerName: "Inbound", width: 120 ,renderCell:RenderInboundCell },
        { field: 'image', headerName:"Imagen", width:60, renderCell: (params)=>
            {
              return(
                <>
                  <Avatar src={"./images/" + params.value} />
                </>
              )
            }
        },
        { field: 'firstName', headerName: t("name"), width: 100 },
        { field: 'lastName', headerName: t("lastname"), width: 130 },
        { field: 'email', headerName: t("email"), width: 190, renderCell:RenderEmailCell},
        
        {
          field: 'phoneNumber',
          headerName: t("phoneNumber"),
          width: 190,
          renderCell: RenderPhoneCell,
        },
        {
          field: 'appointments',
          headerName: t("calendar"),
          width: appointmentsWidth(),
          renderCell: RenderAppointmentCell,
        },
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
      <Title>{t(setTitle())}</Title>
    
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
