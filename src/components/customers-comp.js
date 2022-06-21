import * as React from 'react';
import Title from './Title';
import { useTranslation } from 'react-i18next';
import { Button, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import PrintIcon from '@mui/icons-material/Print';
import Tooltip from '@mui/material/Tooltip';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import customerData from "../assets/data/dummy-data.json";
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { navigationSuccess } from '../pages/dashboard/navigation-slice';
import { nameInitial } from '../utils/name-utils.js';
import ButtonGroup from '@mui/material/ButtonGroup';
import PropTypes from 'prop-types'; // ES6


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

const seeCustomer = (customerId) => {
  console.log("SEE CUSTOMER " + customerId);
}


const callUser = (firstname, lastname, number) =>{
  console.log("Calling to " + nameInitial(firstname) + " "+ lastname + " at " + number )
}

const whatsappUser = (firstname, lastname, number, whastsapp) =>{
  if (whastsapp){
    console.log("Sending Whatsapp to " + nameInitial(firstname) + " "+ lastname + " at " + whastsapp )
  }else{
  console.log("Sending Whastapp to " + nameInitial(firstname) + " "+ lastname + " at Mobile " + number )
  }
}

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
      <Tooltip title={t("pastappointments")}>
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
         
      <Tooltip title={t("adddate")}>
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

const RenderInboundCell = (props) => {
  const {hasFocus, value } = props;
  const { t } = useTranslation();

  const buttonElement = React.useRef(null);
  const rippleRef = React.useRef(null);

  const paperColor = () =>{
    let back = ""
    let front = ""
    switch (props.row.inbound) {
      case "unknown":
          back = "rosybrown";
          front = "white"
        break;
      case "lead":
        back = "khaki";
        front = "dimgray"
      break;
      case "customer":
        back = "dodgerblue";
        front = "white"
      break;
      case "passive":
        back = "darkred";
        front = "white"
      break;
    
      default:
        back = "yellow"
        front = "white"
        break;
    }
    return {
      "back" : back,
      "front": front
    }
  }

  const colorPaperInbound = paperColor();

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
      { field: 'lastName', headerName: t("lastname"), width: 160 },
      { field: 'email', headerName: t("email"), width: 160,},
      
      {
        field: 'phoneNumber',
        headerName: t("phoneNumber"),
        width: 190,
        renderCell: RenderPhoneCell,
      },
      {
        field: 'appointments',
        headerName: t("calendar"),
        width: 130,
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
            icon={<EditIcon />}
            label={t("editcustomer")}
            showInMenu
            onClick={(event) => {
              editCustomer(params.id);
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

const rows = customerData.map((row) => 
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

export const CustomersComponent = (props)=> {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const compact = props.visible;
  console.log(compact)

  const { t } = useTranslation();

  const AddCustomerButton= () =>{
    const actualScreen = "AddCustomer";
    navigate("/addcustomer",{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  const [select, setSelection] = React.useState([]);

  const handleRowSelection = (ids) =>{
    setSelection(ids);
  }

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

  const customerToolBar = () =>{

  }

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
      
      <Title>{t("allcustomers")}</Title>
    
      <DataGrid
        rows={rows}
        columns={Columns()}
        autoHeight
        checkboxSelection
        components={{
          Toolbar: GridToolbar,
        }}
        onSelectionModelChange={handleRowSelection}

        localeText={{
          toolbarDensity: t("Density"),
          toolbarDensityLabel: t("Density"),
          toolbarDensityCompact: t("Compact"),
          toolbarDensityStandard: t("Standart"),
          toolbarDensityComfortable: t("Comfortable"),
          noRowsLabel: t("noRows"),
          noResultsOverlayLabel: t("noResultsFound"),
          errorOverlayDefaultLabel: t("anerrorocurred"),
          toolbarFilters: t('Filters'),
          toolbarFiltersLabel: t('Showfilters'),
          toolbarFiltersTooltipHide: t('Hidefilters'),
          toolbarFiltersTooltipShow: t('Showfilters'),
          toolbarQuickFilterPlaceholder: t('search'),
          toolbarQuickFilterLabel: t('search'),
          toolbarQuickFilterDeleteIconLabel: t('Clear'),
          toolbarExport: t('Export'),
          toolbarExportLabel: t('Export'),
          toolbarExportCSV: t('DownloadasCSV'),
          toolbarExportPrint: t('print'),
          columnsPanelTextFieldLabel: t('findcolumn'),
          columnsPanelTextFieldPlaceholder: t('Columntitle'),
          columnsPanelDragIconLabel: t('reordercolumn'),
          columnsPanelShowAllButton: t('showall'),
          columnsPanelHideAllButton: t('hideall'),
          filterPanelAddFilter: t('Addfilter'),
          filterPanelDeleteIconLabel: t('Delete'),
          filterPanelLinkOperator: t('logicoperator'),
          filterPanelOperators: t('Operator'), // TODO v6: rename to filterPanelOperator
          filterPanelOperatorAnd: t('And'),
          filterPanelOperatorOr: t('Or'),
          filterPanelColumns: t('Columns'),
          filterPanelInputLabel: t('Value'),
          filterPanelInputPlaceholder: t('Filtervalue'),
          filterOperatorContains: t('contains'),
          filterOperatorEquals: t('equals'),
          filterOperatorStartsWith: t('startswith'),
          filterOperatorEndsWith: t('endswith'),
          filterOperatorIs: t('is'),
          filterOperatorNot: t('isnot'),
          filterOperatorIsEmpty: t('isempty'),
          filterOperatorIsNotEmpty: t('isnotempty'),
          filterOperatorIsAnyOf: t('isanyof'),
          filterValueAny: t('any'),
          filterValueTrue: t('true'),
          filterValueFalse: t('false'),
          columnMenuLabel: t('Menu'),
          columnMenuShowColumns: t('showcolumns'),
          columnMenuFilter: t('Filter'),
          columnMenuHideColumn: t('Hide'),
          columnMenuUnsort: t('Unsort'),
          columnMenuSortAsc: t('SortbyASC'),
          columnMenuSortDesc: t('SortbyDESC'),
          columnHeaderFiltersLabel: t('Showfilters'),
          columnHeaderSortIconLabel: t('Sort'),
          booleanCellTrueLabel: t('yes'),
          booleanCellFalseLabel: t('no'),
          footerRowSelected: (count) =>
          count !== 1
            ? `${count.toLocaleString() + " " + t("rowsselected")}`
            : `${count.toLocaleString() + " " + t("rowselected")}`,
          footerTotalRows: t('TotalRows')
        }}
      />

    </React.Fragment>
  );
}

CustomersComponent.propTypes = {
  props: PropTypes.bool.isRequired
}
