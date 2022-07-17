//REACT IMPORTS
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

//MUI IMPORTS
import { Button, Grid, IconButton, } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

//CUSTOM IMPORTS
import Title from './Title';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';
import customerData from "../assets/data/dummy-data.json";
import { LocalTextForDataGrid } from '../utils/mui-custom-utils';



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
import { getCustomerMailFromId, getCustomerPhoneFromId, getCustomerWhatsappFromId } from '../utils/dataFetch-utils';



var compact = false;


/////////////////////////////////
//                             //
//   MAIN COMPONENT FUNCTION   //
//                             //
/////////////////////////////////

export const ReportsComponent = (props)=> {
  //PROPS.INFO ("all","newCustomers", "withAppointments" )
  //PROPS.COMPACT (true, false)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  compact = props.compact;
 

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
              <Button variant='contained' size="small" startIcon={<PersonAddAlt1Icon />}>{t("addnewcustomer")} </Button>
            </Grid>
            <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
              <Button variant='contained' size="small" startIcon={<PersonAddAlt1Icon />}>{t("addnewcustomer")} </Button>
            </Grid>
            <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
              <Button variant='contained' size="small" startIcon={<PersonAddAlt1Icon />}>{t("addnewcustomer")} </Button>
            </Grid>
            <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
              <Button variant='contained' size="small" startIcon={<PersonAddAlt1Icon />}>{t("addnewcustomer")} </Button>
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
   
     
    </React.Fragment>
  );
}