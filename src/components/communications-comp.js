//REACT IMPORTS
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

//MUI IMPORTS
import { Button, Grid, Paper } from '@mui/material';
import { DataGrid,  GridToolbar } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import { Container } from '@mui/system';


//CUSTOM IMPORTS
import Title from './Title';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';
import { nameInitial } from '../utils/name-utils.js';
import { LocalTextForDataGrid, paperColor } from '../utils/mui-custom-utils';
import { GetCommunications, getCustomerNameFromId, GetLocales, GetReceiverName, GetRowById, GetSenderName, getUserById } from '../utils/dataFetch-utils';
import { ConversationComponent } from './conversation-comp';

//ICONS

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PrintIcon from '@mui/icons-material/Print';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

var compact = false;

// FUNCTIONS FOR DATAGRID COLUMNS AND ROWS

const sortedData =()=> {
  const data = GetCommunications();
  const sorted = data.sort((a,b)=> new Date(b.date) - new Date(a.date))
  return sorted;

}


/////////////////////////////////
//                             //
//   MAIN COMPONENT FUNCTION   //
//                             //
/////////////////////////////////

export const CommunicationsComponent = (props)=> {
  //PROPS.COMPACT (true, false)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  compact = props.compact;
  const locale = props.locale;

  const { t } = useTranslation();
  // Select has an array of selected rows
  const [select, setSelection] = React.useState([]);

  const getFormattedDate=(params)=>{
    const resultDate = new Date(params.row.date).toLocaleDateString(locale)
    return resultDate;
  }

  const rows = sortedData().map((row) => 
    (
      {
      id: row.id,
      senderName: GetSenderName(row.customerId, row.userId, row.direction),
      receiverName :  GetReceiverName(row.customerId, row.userId, row.direction),
      customerId: row.customerId,
      userId: Number(row.userId),
      communicationId: row.communicationId, 
      direction: row.direction,
      date: row.date,
      type: row.type,
      duration: row.duration,
      subject: row.subject,
      notes: row.notes,
      follow: row.follow,
      alertfollow: row.alertfollow,
      thread: row.thread,
      }
    )
  );

  const Columns = () => {
    const { t } = useTranslation();
  
    return(
      [
        { field: 'id', headerName: t("Id"), width: 10 },
        { field: 'senderName', headerName: t("from"), width: 200},
        { field: 'receiverName', headerName: t("to"), width: 200},
        { field: 'date', headerName: t("date"), width: 120, valueGetter:getFormattedDate},
        { field: 'type', headerName: t("type"), width: 80},
        { field: 'subject', headerName: t("Subject"), width: 120},
        { field: 'notes', headerName: t("notes"), width:290},
      ]
    )
  } 



    const handleRowSelection = (ids) =>{
      setSelection(ids);
    }

    const getBackLastRowSelected = ()=>{
      const result = rows[select[select.length-1]-1]
      return result
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
              <Button variant='contained' size="small" startIcon={<PersonAddAlt1Icon />}>{t("addnewcustomer")} </Button>
            </Grid>
            <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
              <Button variant='contained' size="small" startIcon={<PrintIcon />}>{t("print")} {select.length===0 ? t("everyone") : t("selection")}</Button>
            </Grid>
            <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
              <Button variant='contained' size="small"startIcon={<EmailIcon />}>{t("mailto")} {select.length===0 ?  t("everyone") : t("selection")} </Button>
            </Grid>
            <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
              <Button variant='contained' size="small" startIcon={<WhatsAppIcon />}>{t("whatsappto")} {select.length===0 ?  t("everyone"): t("selection")} </Button>
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
    
    <Container sx={{height:400}}>
      <DataGrid
        rows={rows}
        columns={Columns()}
        autoHeight={false}
        checkboxSelection ={false}
        rowsPerPageOptions={[5,10,25,50,100]}
        rowsPerPage ={10}
        components={!compact?{
          Toolbar: GridToolbar,
        }:null}
      
        onSelectionModelChange={handleRowSelection}

        localeText={LocalTextForDataGrid()}
      />
      </Container>
     <Paper sx={{m:3}}>
    
      {select.length>0?<ConversationComponent locale={locale} select={GetRowById(rows,select[select.length-1])} />:<></>}
      </Paper>
      
    </React.Fragment>
  );
}