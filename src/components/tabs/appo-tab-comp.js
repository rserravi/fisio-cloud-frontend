// REACT
import * as React from 'react';
import { useTranslation } from 'react-i18next';

// MUI
import Typography from '@mui/material/Typography';
import { LocalTextForDataGrid} from '../../utils/mui-custom-utils';
import { Button, IconButton, Paper, Tooltip} from '@mui/material';
import Grid from '@mui/material/Grid';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/system';

//MUI ICONS
import ContentCopyIcon from '@mui/icons-material/ContentCopyTwoTone';
import DeleteIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshopTwoTone';
import FastRewindTwoToneIcon from '@mui/icons-material/FastRewindTwoTone';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1TwoTone';
import FastForwardTwoToneIcon from '@mui/icons-material/FastForwardTwoTone';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import FilePresentTwoToneIcon from '@mui/icons-material/FilePresentTwoTone';
import FlagIcon from '@mui/icons-material/FlagTwoTone';


//CUSTOM IMPORTS
import { getDateFromISOTime, getWeekInYear, timeDifference } from '../../utils/date-utils';
import { GetAppointments, GetAppointmentsByCustomerId, GetCabinNameById, GetRowById, getServiceNameById } from '../../utils/dataFetch-utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { navigationLoading, navigationSuccess } from '../../slices/navigation-slice';
import { AppoSingleComponent } from './appo-single-comp';

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

export const AppoTab = (props) =>{
    const locale = props.locale;
    const customer = props.customer?props.customer:{};
    const tableHeight = props.customer?280:600;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showTabs, setShowTabs] = React.useState("all") // none, past, next, all

    const { t } = useTranslation();
    
    // Select has an array of selected rows
    const [select, setSelection] = React.useState([]);
    const appoInit = props.customer?(GetAppointmentsByCustomerId(customer.id)):GetAppointments()
    const [appointments, setAppoinments]= React.useState(appoInit)

    // ACTIONS FROM BUTTONS

    const doReport = (props) =>{
        console.log(props)
        console.log("Hacer informe de cita " + props.id);
        const actualScreen = "/addAppointment/"+ customer.id+"/"+props.id
        dispatch(navigationLoading())
        navigate(actualScreen,{replace: true});
        dispatch(navigationSuccess(actualScreen))

    }
    const AddAppoButton= () =>{
        console.log("ADD APPO")
        const actualScreen = "/addAppointment/"+ Number(customer.id);
        dispatch(navigationLoading())
        navigate(actualScreen,{replace: true});
        dispatch(navigationSuccess(actualScreen))
    }

    const ShowOnlyPastDates = ()=>{
        var datos = props.customer?(GetAppointmentsByCustomerId(customer.id)):GetAppointments();
        try {
            setAppoinments(datos.filter((appo)=>{return new Date(appo.date) <= new Date()}))
            
        } catch (error) {
            datos = {}
            console.log(error)
        }
        setShowTabs("past")
       
    }

    const ShowOnlyNextDates = ()=>{
        var datos = props.customer?(GetAppointmentsByCustomerId(customer.id)):GetAppointments();
        try {
            setAppoinments(datos.filter((appo)=>{return new Date(appo.date) >= new Date()}))
        } catch (error) {
            datos = {}
            console.log(error)
        }
        setShowTabs("next")
    }

    const ShowAllDates = ()=>{
        setAppoinments(appoInit);
        setShowTabs("all")
    }

    const setPastAppo = (props)=>{
        var {date} = 0
        if(props.date){
            date = props.date
        }
        else {
            date = props.row.date
        }
        const result = (timeDifference(date) <= 0);
        console.log("PAST APPO",result)
        return (result);
    }

    const setCloseAppo = (props)=>{
        var {date} = 0
        if(props.date){
            date = props.date
        }
        else {
            date = props.row.date
        }
        console.log("DATE IN SETCLOSEAPPO",date)
        const thisWeek = getWeekInYear(Date.now());
        const dateWeek = getWeekInYear(date);
        const result = (dateWeek-thisWeek === 0)
        console.log("CLOSE APPO", result)
        return (result)
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
  
    const handleRowSelection = (ids) =>{
        setSelection(ids);
      }

    const Columns = () => {
        const { t } = useTranslation();
        return(
            [
                {
                    field: 'actions',
                    type: 'actions',
                    headerName: t("actions"),
                    width: 80,
                    sortable: false,
                    getActions: (params) => [
                        params.row.pastappo?             
                        <GridActionsCellItem
                            icon={<FlagIcon />}
                            label={t("makereport")}
                            onClick={(event) => {
                                doReport(params);
                                event.stopPropagation();
                            }}
                        />:<></>,
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
                    ]
                },
                { field: 'id', hide: true, headerName: t("Id"), width: 20 },
                { field: 'date', headerName: t("date"), width: 220, renderCell:RenderDateCell},
                { field: 'time', headerName: t("Time"), width:100},
                { field: 'duration', headerName: t("Duration"), width: 80},
                { field: 'service', headerName: t("Service"), width: 80},
                { field: 'price', headerName: t("Price"), width: 80 },
                { field: 'cabin', headerName: t("cabin"), width: 75 },
                { field: 'attachments', headerName: t("attachments"), width:150, renderCell:RenderAttachments },
                { field: 'notes', headerName: t("notes"), width:245}
                
            ]
        )
    } 

    const rows = appointments.map((row) => 
    ({
        id: row.id, 
        customerId: row.customerId,
        customerName: row.customerName,
        date: new Date(row.date),
        time: new Date(row.date).toLocaleTimeString(locale),
        duration: row.duration,
        service: getServiceNameById(row.service),
        price: row.price,
        cabin: GetCabinNameById(row.cabin),
        status: row.status,
        closed: row.closed,
        notes: row.notes,
        attachment: row.attachment,
        pastappo: setPastAppo(row),
        closeappo: setCloseAppo(row)
    })
    );

    // Set if Toolbar is visible depending on var compact
    const CustomerToolBar = () =>{
   
            return (
            <React.Fragment>
                <Grid container direction="row" justifyContent="space-around" alignItems="baseline" marginBottom={2}>
                    <Grid item xs={12} sm={2.8} md={2.8} >
                        <Button 
                           
                            fullWidth
                            size="small" 
                            startIcon={<PersonAddAlt1Icon />} 
                            onClick={AddAppoButton}
                            >{t("addappointment")} 
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={2.8} md={2.8} >
                        <Button 
                            variant='outlined' 
                            fullWidth
                            size="small" 
                            color={showTabs === "past"?"secondary":"primary"} 
                            startIcon={<FastRewindTwoToneIcon />} 
                            onClick={ShowOnlyPastDates}
                            >{t("showonlypastdates")} 
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={2.8} md={2.8} >
                        <Button 
                            variant='outlined' 
                            fullWidth
                            size="small" 
                            color={showTabs === "next"?"secondary":"primary"} 
                            startIcon={<FastForwardTwoToneIcon />} 
                            onClick={ShowOnlyNextDates}
                            >{t("showonlynextdates")} 
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={2.8} md={2.8} >
                        <Button 
                            variant='outlined' 
                            fullWidth
                            size="small" 
                            color={showTabs === "all"?"secondary":"primary"} 
                            startIcon={<AssignmentTwoToneIcon />}
                            onClick={ShowAllDates}
                            >{t("showalldates")}
                        </Button>
                    </Grid>
                   
                </Grid>

            </React.Fragment>
            )
    }

    const rowClassName = (params)=>{
        if(params.row.closeappo) return "close";
        if(params.row.pastappo) return "past";
      
    }


    return (
        <React.Fragment>
            <Grid container direction="row" justifyContent="flex-start" alignItems="center" sx={{p:2, ml:2, mb:4}}> 
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
                <Typography variant="h5" component="h1" align='left' sx={{ flexGrow: 1, mb:1 }}>{t("appointments")}</Typography>
                <CustomerToolBar />
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
                {select.length>0?<AppoSingleComponent locale={locale} select={GetRowById(rows,select[select.length-1])} />:<></>}
              </Paper>
            </Grid>
        </React.Fragment>
    )
}