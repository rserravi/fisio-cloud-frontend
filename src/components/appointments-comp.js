//REACT IMPORTS
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

//MUI IMPORTS
import { Button, Grid, IconButton } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

//CUSTOM IMPORTS
import Title from './Title';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';
import { LocalTextForDataGrid } from '../utils/mui-custom-utils';
import { GetAppointments, GetCabinNameById, getCustomerMailFromId, getCustomerPhoneFromId, getCustomerWhatsappFromId, getServiceNameById } from '../utils/dataFetch-utils';
import { getDateFromISOTime, getTimeFromISOTime, getWeekInYear, timeDifference } from '../utils/date-utils';


//ICONS
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PrintIcon from '@mui/icons-material/Print';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventBusyIcon from '@mui/icons-material/EventBusy';

var compact = false;

// FUNCTIONS FOR EXTERNAL ACTIONS

const deleteAppointment = (customerId) => {
  console.log("DELETE Appointment " + customerId);
}

const duplicateAppointment = (customerId) => {
  console.log("DUPLICATE Appointment " + customerId);
}

const printAppointment = (customerId) => {
  console.log("PRINT Appointment " + customerId);
}

// FUNCTIONS FOR DATAGRID COLUMNS AND ROWS

const data = GetAppointments();


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
  const locale= props.locale;


  const [anchorElPastButtonEL, setAnchorPastButtonEL] = React.useState(null);
  const openPastMenu = Boolean(anchorElPastButtonEL);
  const [anchorElNextButtonEL, setAnchorNextButtonEL] = React.useState(null);
  const openNextMenu = Boolean(anchorElNextButtonEL);
  const { t } = useTranslation();

  //RENDER CELLS

  const RenderDateCell = (props) =>{
    const {hasFocus } = props;
    const {date} = props.row;
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

  const thisWeek = getWeekInYear(Date.now());
  const dateWeek = getWeekInYear(date);

  if (timeDifference(date) <= 0){
    return (
      <>
      <Tooltip title={t("pastDateClickforoptions")}>
        <IconButton 
          id="pastButton" 
          color="error" 
          aria-label="pastButton" 
          component="span"
          aria-controls={openPastMenu ? 'pastappo-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openPastMenu ? 'true' : undefined}
          onClick={handlePastButtonClick}
        >
          <EventBusyIcon />
        </IconButton>
      </Tooltip>
        <Menu
          id="pastappo-menu"
          aria-labelledby="pastappo-menu"
          anchorEl={anchorElPastButtonEL}
          open={openPastMenu}
          onClose={handlePastButtonClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem
            onClick={(event) => {
              doReport(props.row)
              event.stopPropagation();
          }}
          >
            {t("makereport")}
          </MenuItem>
         
          <MenuItem 
            onClick={(event) => {
              modifyAppointment(props.row);
              event.stopPropagation();
          }} 
          >
            {t("modifyAppointment")}
          </MenuItem>
          
          <MenuItem
            onClick={(event) => {
              cancelAppointment(props.row)
              event.stopPropagation();
        }} 
          >
            {t("cancelAppointment")}
          </MenuItem>
          
          <MenuItem 
            onClick={(event) => {
              handlePastButtonClose();
              event.stopPropagation();
          }} 
          >
            {t("exit")}
          </MenuItem>
        </Menu>
    
        {getDateFromISOTime(date, locale)}
        
      </>
    )
  }
  if (dateWeek-thisWeek === 0){
      return (
        <>
        <Tooltip title="Cita Pasada. Pulsa para ver opciones">
        <IconButton 
          id="nextAppButton" 
          color="warning" 
          aria-label="nextAppButton" 
          component="span"
          aria-controls={openNextMenu ? 'nextappo-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openNextMenu ? 'true' : undefined}
          onClick={handleNextButtonClick}
        >
          <EventBusyIcon />
        </IconButton>
      </Tooltip>
        <Menu
          id="nextappo-menu"
          aria-labelledby="nextappo-menu"
          anchorEl={anchorElNextButtonEL}
          open={openNextMenu}
          onClose={handleNextButtonClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
                 
          <MenuItem 
            onClick={(event) => {
              modifyAppointment(props.row);
              event.stopPropagation();
          }} 
          >
            {t("modifyAppointment")}
          </MenuItem>
          
          <MenuItem
            onClick={(event) => {
              cancelAppointment(props.row)
              event.stopPropagation();
        }} 
          >
            {t("cancelAppointment")}
          </MenuItem>
          
          <MenuItem 
            onClick={(event) => {
              handleNextButtonClose();
              event.stopPropagation();
          }} 
          >
            {t("exit")}
          </MenuItem>
        </Menu>
          {getDateFromISOTime(date, locale)}
        </>
      )
    }

  return (
     <>
     {getDateFromISOTime(date, locale)}
      </>
  );
  
}
 
  const rows = data.map((row) => 
  ({
    id: row.id,  
    appoid: row.appoId,
    customerId: row.customerId,
    userName: row.customerName,
    date: row.date,
    startingTime: getTimeFromISOTime(row.date, locale) + " h.",
    duration: row.duration +" m.",
    service: getServiceNameById(row.service),
    cabin: GetCabinNameById(row.cabin),
    price: row.price + "???",
    status: row.status,
    closed: row.closed,
    notes: row.notes
  })
  );


  const Columns = () => {
    const { t } = useTranslation();
  
    return(
      [
        { field: 'see',
          type: 'actions',
          headerName: '',
          width: 130,
          sortable: false,
          getActions: (params) => [
            <GridActionsCellItem
              icon={<Tooltip title={t("seecustomer")}><PersonIcon /></Tooltip>}
              label={t("seecustomer")}
              
              onClick={(event) => {
                seeCustomer(params.row.customerId);
                event.stopPropagation();
              }}
            />,
            <GridActionsCellItem
            icon={<Tooltip title={t("call")}><PhoneForwardedIcon /></Tooltip>}
            label={t("call")}
            disabled = {!getCustomerPhoneFromId(params.row.customerId)}
            onClick={(event) => {
              callUser(params.row.customerId);
              event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
            icon={<Tooltip title={t("sendemail")}><SendIcon /></Tooltip>}
            label={t("sendemail")}
            disabled = {!getCustomerMailFromId(params.row.customerId)}
            onClick={(event) => {
              emailUser(params.row.customerId);
              event.stopPropagation();
            }}
          />,
            <GridActionsCellItem
            icon={<Tooltip title={t("sendwhatsapp")}><WhatsAppIcon /></Tooltip>}
            label={t("GridActionsCellItem")}
            disabled = {!getCustomerWhatsappFromId(params.row.customerId)}
            onClick={(event) => {
              whatsappUser(params.row.customerId);
              event.stopPropagation();
            }}
          />,
        ]},
        { field: 'userName', headerName: t("Customer"), width:200},
        { field: 'date', headerName: t("date"), width: 220, renderCell:RenderDateCell},
        { field: 'startingTime', headerName: t("Time"), width:100},
        { field: 'duration', headerName: t("Duration"), width: 80},
        { field: 'service', headerName: t("Service"), width: 80},
        { field: 'price', headerName: t("Price"), width: 80 },
        { field: 'cabin', headerName: t("cabin"), width: 75 },
        {
          field: 'actions',
          type: 'actions',
          headerName: t("actions"),
          width: 100,
          sortable: false,
          getActions: (params) => [
            
          <GridActionsCellItem
            icon={<Tooltip title={t("seeappointment")}><VisibilityIcon /></Tooltip>}
            label={t("seeappointment")}
            
            onClick={(event) => {
              seeAppointment(params.row.customerId, params.row.appoid);
              event.stopPropagation();
          }}
          />,     
          
          <GridActionsCellItem
            icon={<ContentCopyIcon />}
            label={t("duplicateappointment")}
            showInMenu
            onClick={(event) => {
            duplicateAppointment(params.id);
            event.stopPropagation();
          }}
          />,
          <GridActionsCellItem
              icon={<DeleteIcon />}
              label={t("deleteappointment")}
              showInMenu
              onClick={(event) => {
                deleteAppointment(params.id);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
              icon={<LocalPrintshopIcon />}
              label={t("printappointment")}
              showInMenu
              onClick={(event) => {
              printAppointment(params.id);
              event.stopPropagation();
          }}
          />,
          ],
        },
      ]
    )
  } 

  // NAVIGATE FUNCTIONS
  const AddAppoButton= () =>{
    const actualScreen = "/addAppointment";
    dispatch(navigationLoading())
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  const seeCustomer = (customerId) => {
    dispatch(navigationLoading())
    const actualScreen = "/customer/"+customerId;
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  const seeAppointment= (customerId, appoId) => {
    dispatch(navigationLoading())
    const actualScreen = "/addappointment/"+ Number(customerId) +"/"+ Number(appoId);
    navigate(actualScreen, {replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  const emailUser = (id, mail) =>{
    dispatch(navigationLoading());
    navigate("/addcommunication/"+ Number(id) + "/0/2",{replace: true});
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

  const handlePastButtonClick = (event) =>{
    setAnchorPastButtonEL(event.currentTarget);
  }

  const handlePastButtonClose = () =>{
    setAnchorPastButtonEL(null);
  }

  const handleNextButtonClick = (event) =>{
    setAnchorNextButtonEL(event.currentTarget);
  }

  const handleNextButtonClose = () =>{
    setAnchorNextButtonEL(null);
  }

  const cancelAppointment = (props) =>{
    console.log("Cancelar cita " + props.id);
    setAnchorPastButtonEL(null);
  }

  const doReport = (props) =>{
    console.log("Hacer informe de cita " + props.id);
    setAnchorPastButtonEL(null);
    seeAppointment(props.customerId, props.id);

  }

  const modifyAppointment = (props) =>{
    console.log("Modificar cita " + props.id);
    setAnchorPastButtonEL(null);
    seeAppointment(props.customerId, props.id);
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
              <Button variant='contained' size="small" onClick={AddAppoButton} startIcon={<ScheduleIcon />}>{t("addappointment")} </Button>
            </Grid>
            <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
              <Button variant='contained' size="small" onClick={printSelected} startIcon={<PrintIcon />}>{t("print")} {select.length===0 ? t("everyone") : t("selection")}</Button>
            </Grid>
            <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
              <Button variant='contained' size="small" onClick={emailSelected} startIcon={<EmailIcon />}>{t("mailto")} {select.length===0 ? t("everyone") : t("selection")} </Button>
            </Grid>
            <Grid item xs={6} sm={3} md={3}sx={{mt:2}}>
              <Button variant='contained' size="small" onClick={whastappSelected} startIcon={<WhatsAppIcon />}>{t("whatsappto")} {select.length===0 ? t("everyone") : t("selection")} </Button>
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
