import * as React from 'react';
import Title from './Title';
import { useTranslation } from 'react-i18next';
import { Button, IconButton, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';

import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Tooltip from '@mui/material/Tooltip';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import customerData from "../assets/data/dummy-data.json";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { navigationClientPanel,navigationAppointmentPanel, navigationDrawer, navigationLoading, navigationSuccess } from '../pages/dashboard/navigation-slice';
import AddCustomer from '../pages/customers/add-customer-page';



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

const printForm = () =>{
  console.log("PRINT FORM ");
}

const pdfForm = () =>{
  console.log("CREATE PDF");
}

const RenderAppointmentButton = (props) => {
  const {hasFocus, value } = props;
  const _id = props.row.id;
  const buttonElement = React.useRef(null);
  const rippleRef = React.useRef(null);
  const { t, i18n } = useTranslation();

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
      {value}
      
   
      <Button
        component="button"
        ref={buttonElement}
        touchRippleRef={rippleRef}
        variant="contained"
        size="small"
        style={{ marginLeft: 16 }}
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
        {t("add")}
      </Button>
      </strong>
  );
};


const Columns = () => {
  const { t, i18n } = useTranslation();

  return(
    [
      { field: 'id', headerName: t("id"), width: 50 },
      { field: 'image', headerName:"Imagen", width:60, renderCell: (params)=>
          {
            return(
              <>
                <Avatar src={"./images/" + params.value} />
              </>
            )
          }
      },
      { field: 'firstName', headerName: t("name"), width: 130 },
      { field: 'lastName', headerName: t("lastname"), width: 160 },
      {
        field: 'phoneNumber',
        headerName: t("phoneNumber"),
        width: 130,
      },
      {
        field: 'appointments',
        headerName: t("calendar"),
        width: 130,
        renderCell: RenderAppointmentButton,
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: t("actions"),
        width: 200,
        sortable: false,
        getActions: (params) => [
          <GridActionsCellItem
          icon={<VisibilityIcon />}
          label="See"
          onClick={(event) => {
            seeCustomer(params.id);
            event.stopPropagation();
        }}
        />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={(event) => {
              editCustomer(params.id);
              event.stopPropagation();
          }}
          />,
          <GridActionsCellItem
          icon={<ContentCopyIcon />}
          label="Duplicate"
          onClick={(event) => {
            duplicateCustomer(params.id);
            event.stopPropagation();
        }}
        />,
        <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={(event) => {
              deleteCustomer(params.id);
              event.stopPropagation();
          }}
          />,
          <GridActionsCellItem
          icon={<LocalPrintshopIcon />}
          label="Print"
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
      id: row.id, image: row.image, firstName: row.firstname, lastName: row.lastname, phoneNumber: row.phoneNumber[0].number, appointments: row.appointments.length, 
   })
);


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default function CustomersComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const AddCustomerButton= () =>{
    console.log("QUE COÑO PASA?")
    const actualScreen = "AddCustomer";
    navigate("/addcustomer",{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  return (
    <React.Fragment>
     <Box sx={{ flexGrow: 1 }}>
      <Toolbar variant='dense'>
        <Typography variant="h6" noWrap component="div"  sx={{ display: { xs: 'none', sm: 'block' }}}>
          {t("allcustomers")}
        </Typography>
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={t("search")}
                inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant='contained' size="small" onClick={AddCustomerButton} startIcon={<PersonAddAlt1Icon />}>{t("addnewcustomer")} </Button>
            <Tooltip title={t("print")}>
              <IconButton 
                color="primary" 
                aria-label="imprimir-formulario" 
                component="span" 
                onClick={(event) => {
                              printForm();
                              event.stopPropagation();
                          }}>
                <PrintIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("exporttoPDF")}>
              <IconButton 
                color="primary" 
                aria-label="exportar-formulario" 
                component="span" onClick={(event) => {
                              pdfForm();
                              event.stopPropagation();
                          }}>
                <PictureAsPdfIcon />
              </IconButton>
            </Tooltip>
          </Stack>

        </Toolbar>
      </Box>
      <Toolbar />

      <Title>{t("allcustomers")}</Title>
    
      <DataGrid
        rows={rows}
        columns={Columns()}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        autoHeight ="true"
      />

    </React.Fragment>
  );
}