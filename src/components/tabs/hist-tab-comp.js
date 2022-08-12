// REACT
import * as React from 'react';
import i18next from 'i18next';


// MUI
import Typography from '@mui/material/Typography';
import { LocalTextForDataGrid} from '../../utils/mui-custom-utils';
import { IconButton, Paper, Tooltip} from '@mui/material';
import Grid from '@mui/material/Grid';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/system';

//MUI ICONS
import ContentCopyIcon from '@mui/icons-material/ContentCopyTwoTone';
import DeleteIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshopTwoTone';
import FilePresentTwoToneIcon from '@mui/icons-material/FilePresentTwoTone';
import FlagIcon from '@mui/icons-material/FlagTwoTone';


//CUSTOM IMPORTS
import { getDateFromISOTime } from '../../utils/date-utils';
import { GetRowById } from '../../utils/dataFetch-utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { navigationLoading, navigationSuccess } from '../../slices/navigation-slice';
import { HistSingleComponent } from './hist-single-tab-comp';

// FUNCTIONS FOR EXTERNAL ACTIONS

const deleteAppointment = (customerId) => {
    console.log("DELETE Histo " + customerId);
}
  
const duplicateAppointment = (customerId) => {
    console.log("DUPLICATE Histo " + customerId);
}
  
const printAppointment = (customerId) => {
    console.log("PRINT Histo " + customerId);
}
  
// FUNCTIONS FOR DATAGRID COLUMNS AND ROWS

export const HistTab = (props) =>{
    const locale = props.locale;
    const customer = props.customer?props.customer:{};
    const tableHeight = props.customer?280:600;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Select has an array of selected rows
    const [select, setSelection] = React.useState([]);
    const histoInit = props.customer?customer.history:{}
    const [history, setHistory]= React.useState(histoInit)

    // ACTIONS FROM BUTTONS

    const doReport = (props) =>{
        console.log(props)
        console.log("Hacer informe de cita " + props.id);
        const actualScreen = "/addAppointment/"+ customer.id+"/"+props.id
        dispatch(navigationLoading())
        navigate(actualScreen,{replace: true});
        dispatch(navigationSuccess(actualScreen))

    }

     //RENDER CELLS
    const RenderDateCell = (props) => {
        const date = props.row.date;
        return ( 
            <React.Fragment>
                {getDateFromISOTime(date, locale)}
            </React.Fragment>
        )   
    }

    const RenderAttachments = (props) =>{
        if (props.row.attachment ){
            return ( 
                <React.Fragment>
                    {props.row.attachment.map((icon)=>{
                        return(
                        <Tooltip key={icon.id} title={icon.file}>
                            <IconButton aria-label={icon.file}>
                                <FilePresentTwoToneIcon />
                            </IconButton>
                        </Tooltip>
                        )
                    })}
                </React.Fragment>
            )
        } else {
            <>-</>
        }
    }

    const RenderDebt = (props)=>{
        return(
            <React.Fragment>
                <p style={{color:props.row.debt>0?"red":"green"}}>{props.row.debt} €</p>
            </React.Fragment>
        )
    }
  
    const handleRowSelection = (ids) =>{
        setSelection(ids);
      }

    const Columns = () => {
        return(
            [
                {
                    field: 'actions',
                    type: 'actions',
                    headerName: i18next.t("actions"),
                    width: 80,
                    sortable: false,
                    getActions: (params) => [
                        params.row.pastappo?             
                        <GridActionsCellItem
                            icon={<FlagIcon />}
                            label={i18next.t("makereport")}
                            onClick={(event) => {
                                doReport(params);
                                event.stopPropagation();
                            }}
                        />:<></>,
                        <GridActionsCellItem
                            icon={<ContentCopyIcon />}
                            label={i18next.t("duplicateappointment")}
                            showInMenu
                            onClick={(event) => {
                                duplicateAppointment(params.id);
                                event.stopPropagation();
                            }}
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label={i18next.t("deleteappointment")}
                            showInMenu
                            onClick={(event) => {
                                deleteAppointment(params.id);
                                event.stopPropagation();
                        }}
                        />,
                        <GridActionsCellItem
                            icon={<LocalPrintshopIcon />}
                            label={i18next.t("printappointment")}
                            showInMenu
                            onClick={(event) => {
                                printAppointment(params.id);
                                event.stopPropagation();
                        }}
                        />,
                    ]
                },
                { field: 'id', hide: true, headerName: i18next.t("Id"), width: 20 },
                { field: 'date', headerName:i18next.t("date"), width: 220, renderCell:RenderDateCell},
                { field: 'time', headerName: i18next.t("Time"), width:100},
                { field: 'duration', headerName: i18next.t("Duration"), width: 80},
                { field: 'service', headerName: i18next.t("Service"), width: 80},
                { field: 'price', headerName: i18next.t("Price"), width: 80 },
                { field: 'paid', headerName: i18next.t("Paid"), width: 80 },
                { field: 'debt', headerName: i18next.t("debt"), width: 80, renderCell:RenderDebt},
                { field: 'cabin', headerName: i18next.t("cabin"), width: 75 },  
                { field: 'attachments', headerName: i18next.t("attachments"), width:270, renderCell:RenderAttachments }
            ]
        )
    } 

    const rows = history.map((row) => 
    ({
        id: row._id, 
        customerId: row.customerId,
        customerName: row.customerName,
        date: new Date(row.date),
        time: new Date(row.date).toLocaleTimeString(locale),
        duration: row.duration,
        service: row.serviceName,
        price: row.price,
        paid: row.paid,
        debt: row.price- row.paid,
        cabin: row.cabinName,
        status: row.status,
        closed: row.closed,
        notes: row.notes,
        attachment: row.attachment,
    })
    );

    const rowClassName = (params)=>{
        if(params.row.closeappo) return "close";
        if(params.row.pastappo) return "past";
      
    }

    return (
        <React.Fragment>
           
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" sx={{p:2, ml:2, mb:4}}> 
            <Grid item xs={12} md={12} sm={12}>
              <Box sx={{ 
                height: tableHeight, 
                mb:7,
                width: '100%',
                '& .past':{
                    bgcolor:"indianred",
                    color: "black",
                    '&:hover': {
                        bgcolor: "indianred",
                        color: "black"
                    },
                },
                '& .close':{
                    bgcolor:"lightcyan",
                    color: "black",
                    '&:hover': {
                        bgcolor: "lightcyan",
                        color: "black"
                    },
                },              
             
              }}>
                <Typography variant="h5" component="h1" align='left' sx={{ flexGrow: 1, mb:1 }}>{i18next.t("history")}</Typography>
              
                <DataGrid
                    rows={rows}
                    columns={Columns()}
                    density="compact"
                    rowsPerPageOptions={[5,10,25,50,100]}
                    rowsPerPage ={10}
                    components= {{Toolbar: GridToolbar,}}
                    localeText={LocalTextForDataGrid()}
                    getRowClassName={rowClassName}
                    onSelectionModelChange={handleRowSelection}
                />
              </Box>

              </Grid>
              <Paper sx={{mt:5}}>
                {select.length>0?<HistSingleComponent locale={locale} select={GetRowById(rows,select[select.length-1])} />:<></>}
              </Paper>
            </Grid>
        </React.Fragment>
    )
}