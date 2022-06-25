import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import customerData from "../assets/data/dummy-data.json";
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';

import { LocalTextForDataGrid, paperColor, StatusColor } from '../utils/mui-custom-utils';
import { styled } from '@mui/material/styles';
import { findSocialIcon } from '../utils/social-networks-utils';
import { GenderIcon } from '../utils/mui-custom-utils';
import { AppBar, Button, Divider, Toolbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import Title from './Title';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import { firstItemId, getCustomer, lastItemId } from '../utils/dataFetch-utils';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { navigationSuccess } from '../pages/dashboard/navigation-slice';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const EditName= ()=>{
    console.log("Editar Nombre")
}


const SeeHistory= (props)=>{
    console.log("Ver Historial de Citas")
}

const EditHistory= (props)=>{
    console.log("editar Historial de Citas")
}

const DuplicateHistory= (props)=>{
    console.log("Duplicar Historial de Citas")
}

const DeleteHistory= (props)=>{
    console.log("Borrar Historial de Citas")
}

const PrintHistory= (props)=>{
    console.log("imprimir Historial de Citas")
}

const SeeAppointments= (props)=>{
    console.log("Ver  Cita")
}

const EditAppointments= (props)=>{
    console.log("editar Cita")
}

const DuplicateAppointments= (props)=>{
    console.log("Duplicar Cita")
}

const DeleteAppointments= (props)=>{
    console.log("Borrar Cita")
}

const PrintAppointments= (props)=>{
    console.log("imprimir Cita")
}

const SeeComunications= (props)=>{
    console.log("Ver Comunicación")
}

const EditComunications= (props)=>{
    console.log("editar Comunicación")
}

const DuplicateComunications= (props)=>{
    console.log("Duplicar Comunicación")
}

const DeleteComunications= (props)=>{
    console.log("Borrar Comunicación")
}

const PrintComunications= (props)=>{
    console.log("imprimir Comunicación")
}

const handleImageClick = () =>{
    console.log("Name Click")
}
const handleEmailClick = () =>{
    console.log("Email Click")
}
const handlePhoneClick = () =>{
    console.log("Phones Click")
}
const handleSocialNetworksClick = () =>{
    console.log("Social Click")
}

const handleAddressClick = () =>{
    console.log("Address Click")
}

const addNewAppointment = () =>{
    console.log("Añadir Cita")
}

const addNewCommunication = () =>{
    console.log("Añadir Comunicación")
}

const seeCalendar = () =>{
    console.log ("Ver Calendario")
}

const RenderStatusCell=(props)=>{
  const price = props.row.price;
  const state = props.row.status;
  const { t } = useTranslation();
  return (
    <>
    <Typography variant="p" component="p" align='left' color={StatusColor(state)} >
        {price}€, {t(state)}
    </Typography>
    </>
  );

}

const Columns = () => {
    const { t } = useTranslation();

    return(
        [
        { field: 'id', headerName: t("Id"), width: 20 },
        { field: 'date', headerName: t("date"), width: 90},
        { field: 'startingTime', headerName: t("startingTime"), width: 100 },
        { field: 'duration', headerName: t("Duration"), width: 80 },
        { field: 'service', headerName: t("Service"), width: 90},
        { field: 'status', headerName: t("Status"), width: 120, renderCell:RenderStatusCell },
        { field: 'notes', headerName: t("Notes"), width: 260},
        {
            field: 'actions',
            type: 'actions',
            headerName: t("actions"),
            width: 80,
            sortable: false,
            getActions: (params) => [
            <GridActionsCellItem
            icon={<Tooltip title={t("seeappointment")}><VisibilityIcon /></Tooltip>}
            label={t("seeappointment")}
            
            onClick={(event) => {
                SeeHistory(params.id);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
                icon={<EditIcon />}
                label={t("editappointment")}
                showInMenu
                onClick={(event) => {
                EditHistory(params.id);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
            icon={<ContentCopyIcon />}
            label={t("duplicateappointment")}
            showInMenu
            onClick={(event) => {
                DuplicateHistory(params.id);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label={t("deleteappointment")}
                showInMenu
                onClick={(event) => {
                DeleteHistory(params.id);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
            icon={<LocalPrintshopIcon />}
            label={t("printappointment")}
            showInMenu
            onClick={(event) => {
                PrintHistory(params.id);
                event.stopPropagation();
            }}
            />,
            ],
        },
        ]
    )
} 


const AppointmentColumns = () => {
    const { t } = useTranslation();

    return(
        [
        { field: 'id', headerName: t("Id"), width: 20 },
        { field: 'date', headerName: t("date"), width: 90},
        { field: 'startingTime', headerName: t("startingTime"), width: 100 },
        { field: 'duration', headerName: t("Duration"), width: 80 },
        { field: 'service', headerName: t("Service"), width: 90},
        { field: 'price', headerName: t("Price"), width: 90},
        { field: 'notes', headerName: t("Notes"), width: 290},
        {
            field: 'actions',
            type: 'actions',
            headerName: t("actions"),
            width: 80,
            sortable: false,
            getActions: (params) => [
            <GridActionsCellItem
            icon={<Tooltip title={t("seeappointment")}><VisibilityIcon /></Tooltip>}
            label={t("seeappointment")}
            
            onClick={(event) => {
                SeeAppointments(params.id);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
                icon={<EditIcon />}
                label={t("editappointment")}
                showInMenu
                onClick={(event) => {
                EditAppointments(params.id);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
            icon={<ContentCopyIcon />}
            label={t("duplicateappointment")}
            showInMenu
            onClick={(event) => {
                DuplicateAppointments(params.id);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label={t("deleteappointment")}
                showInMenu
                onClick={(event) => {
                DeleteAppointments(params.id);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
            icon={<LocalPrintshopIcon />}
            label={t("printappointment")}
            showInMenu
            onClick={(event) => {
                PrintAppointments(params.id);
                event.stopPropagation();
            }}
            />,
            ],
        },
        ]
    )
} 

const ColumnsContactHistory = () => {
    const { t } = useTranslation();

    return(
        [
        { field: 'id', headerName: t("Id"), width: 20 },
        { field: 'date', headerName: t("date"), width: 90},
        { field: 'type', headerName: t("Type"), width: 100 },
        { field: 'duration', headerName: t("Duration"), width: 80 },
        { field: 'subject', headerName: t("Subject"), width: 100},
        { field: 'notes', headerName: t("Notes"), width: 270},
        { field: 'follow', headerName: t("Follow"), width: 110},
        {
            field: 'actions',
            type: 'actions',
            headerName: t("actions"),
            width: 80,
            sortable: false,
            getActions: (params) => [
            <GridActionsCellItem
            icon={<Tooltip title={t("seecontact")}><VisibilityIcon /></Tooltip>}
            label={t("seecontact")}
            
            onClick={(event) => {
                SeeComunications(params.id);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
                icon={<EditIcon />}
                label={t("editcontact")}
                showInMenu
                onClick={(event) => {
                EditComunications(params.id);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
            icon={<ContentCopyIcon />}
            label={t("duplicatecontact")}
            showInMenu
            onClick={(event) => {
                DuplicateComunications(params.id);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label={t("deletecontact")}
                showInMenu
                onClick={(event) => {
                DeleteComunications(params.id);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
            icon={<LocalPrintshopIcon />}
            label={t("printcontact")}
            showInMenu
            onClick={(event) => {
                PrintComunications(params.id);
                event.stopPropagation();
            }}
            />,
            ],
        },
        ]
    )
} 

export default function CustomerCard(props) {
    const _id = Number(props._id);
    const customer = getCustomer(_id);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    var compact = false;
    const { t, i18n } = useTranslation();

    const [historyExpanded, setHistoryExpanded] = React.useState(true);
    const [appointmentsExpanded, setAppointmentsExpanded] = React.useState(true);
    const [contactsExpanded, setContatctExpanded] = React.useState(true);
    // Select has an array of selected rows
    const [select, setSelection] = React.useState([]);

    if (!customer){
        return (
            <b>SE HA PRODUCIDO UN ERROR</b>
        )
    }
    const colorPaperInbound = paperColor(customer.inbound)
    const history = customer.history;
    const appointments = customer.appointments;
    const contacthistory = customer.contacthistory;

    const handleHistoryExpandClick = () => {
        setHistoryExpanded(!historyExpanded);
    };

    const handleAppointmentExpandClick = () => {
        setAppointmentsExpanded(!appointmentsExpanded);
    };
    const handleContactsExpandClick = () => {
        setContatctExpanded(!contactsExpanded);
    };

    const SeeAllCustomers=()=>{
        console.log("See all customers");
        const actualScreen = "AllCustomers";
        navigate("/customers", {replace: true});
        dispatch(navigationSuccess(actualScreen))
    }

    const SeePreviousCustomer = (event) =>{
        event.stopPropagation();
        if (_id <= Number(firstItemId())){
            const actualScreen = "SeeCustomer";
            navigate("/customer/"+ lastItemId(), {replace: true});
            dispatch(navigationSuccess(actualScreen))
        }else{
            const actualScreen = "SeeCustomer";
            navigate("/customer/"+ (_id-1), {replace: true});
            dispatch(navigationSuccess(actualScreen))
        }
    }

    const SeeNextCustomer = (event) =>{
        event.stopPropagation();
        if (_id >= Number(lastItemId())){
            const actualScreen = "SeeCustomer";
            navigate("/customer/"+ firstItemId(), {replace: true});
            dispatch(navigationSuccess(actualScreen))
        }else{
            const actualScreen = "SeeCustomer";
            navigate("/customer/"+ (_id+1), {replace: true});
            dispatch(navigationSuccess(actualScreen))
        }
    }

    const CheckPendingNotes=()=>{

        const count = history.reduce((accumulatos, obj)=>{
         if (obj.status === "pending"){
             return accumulatos + Number(obj.price);
         }
         return accumulatos;
         
        }, 0);
     
          
         return (
             <React.Fragment>
             
             {count ?<Button color='error' sx={{ marginRight:2 }}> ¡{count}€ pendientes!</Button>:<Button color='success'> 
             Sin Deudas</Button>}
            
            </React.Fragment>
         )
     }
    
    
  

    const handleRowSelection = (ids) =>{
        setSelection(ids);
    }
    
  
   
    const rowsHistory = history.map((row) => 
        ({
            id: row.id, 
            date: row.date,
            image: row.image, 
            startingTime: row.startingTime, 
            duration: row.duration,
            service: row.service,
            price: row.price,
            status: row.status,
            notes: row.notes
        })
    );

    const rowsAppointments = appointments.map((row) => 
        ({
            id: row.id, 
            date: row.date,
            startingTime: row.startingTime, 
            duration: row.duration,
            service: row.service,
            price: row.price + "€",
            notes: row.notes
        })
    );

    const rowsContactHistory = contacthistory.map((row) => 
        ({
            id: row.id, 
            date: row.date,
            type: row.type,
            duration: row.duration,
            subject: row.subject,
            notes: row.notes,
            follow: row.follow
        })
    );

  if (customer){
 
  return (
    <React.Fragment>
        <AppBar position='static' color="transparent" >
            <Toolbar>
                <Typography variant="h4" component="div" align='left' sx={{ flexGrow: 1 }}>
                    {customer.firstname} {customer.lastname} <GenderIcon name={customer.gender} />
                    <Button key={"editar nombre"} onClick={EditName} >
                        Editar Nombre
                    </Button>
                </Typography>
              
                    {CheckPendingNotes()}
                    
                    <Button variant="contained" key={"todos los clientes"} onClick={SeeAllCustomers}>
                        Todos los Clientes
                    </Button>
                    <IconButton color="primary" aria-label="backwards" component="span" onClick={SeePreviousCustomer}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="forward" component="span" onClick={SeeNextCustomer}>
                        <ChevronRightIcon />
                    </IconButton>
            </Toolbar>
        </AppBar>
        <Divider sx={{mb:2}} />


       <Card sx={{ display: 'flex',  width: '100%'  }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%' }}>
            
            {/* Firs Column of Main Box */}
            <Box sx={{ display: 'inline-block', flexDirection: 'column'}}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                >
                <Grid item xs={3}>
                <CardMedia
                    component="img"
                    sx={{ width: 180, align:'center' }}
                    image={"/images/" + customer.image}
                    alt="Foto"
                />
                </Grid>
                </Grid>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    
                <Paper
                    sx={{bgcolor:colorPaperInbound.back, color:colorPaperInbound.front, marginY:1}}                  
                >
                    <Typography variant='p' component="p" marginX={2}>{t(customer.inbound)}</Typography>
                </Paper> 
                </CardContent>
               

                {/* Emails */}
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Card >
                    <Typography component="div" variant="p" align='left'>
                         <strong>Emails: </strong><Button size='small'  onClick={handleEmailClick}>Edit</Button>
                    </Typography>
                    <Typography component="div" variant="p" align='left'>
                        Home:{customer.email[0].emailAddress ? <a href={`mailto:${customer.email[0].emailAddress}`}> {customer.email[0].emailAddress} </a> :<></>}
                    </Typography>
                    <Typography component="div" variant="p" align='left'>
                        Work:{customer.email[1] ? <a href={`mailto:${customer.email[1].emailAddress}`}> {customer.email[1].emailAddress} </a> :<></>}
                    </Typography>
                    </Card>
                </CardContent>

                 {/* Phones */}
                <CardContent sx={{ flex: '1 0 auto',  }}>
                    <Card sx={{}}>
                    <Typography component="div" variant="p" align='left'>
                        <strong>Phones: </strong><Button size='small' onClick={handlePhoneClick}>Edit</Button>
                    </Typography>
                    <Typography component="div" variant="p" align='left'>
                        Home: <a href={`tel:${customer.phoneNumber[0].number}`}> {customer.phoneNumber[0].number} </a> 
                    </Typography>
                    <Typography component="div" variant="p" align='left'>
                        Work: <a href={`tel:${customer.phoneNumber[1].number}`}> {customer.phoneNumber[1].number} </a>  
                    </Typography>
                    </Card>
                </CardContent>

                 {/* Social Networks */}
                <CardContent sx={{ flex: '1 0 auto',  }} >
                    <Card sx={{}}>
                    <Typography component="div" variant="p" align='left' >
                        <strong>Social Networks: </strong><Button size='small'  onClick={handleSocialNetworksClick}>Edit</Button>
                    </Typography>
                    <Typography component="div" variant="p" align='left' >
                    {customer.socialMedia[0] ? findSocialIcon(customer.socialMedia[0].media):<></>} {customer.socialMedia[0] ? customer.socialMedia[0].user : <></> } 
                    </Typography>
                    <Typography component="div" variant="p" align='left'>
                    {customer.socialMedia[1] ? findSocialIcon(customer.socialMedia[1].media):<></>} {customer.socialMedia[1] ? customer.socialMedia[1].user : <></> }
                    </Typography>
                    <Typography component="div" variant="p" align='left'>
                       {customer.socialMedia[2] ? findSocialIcon(customer.socialMedia[2].media):<></>} {customer.socialMedia[2] ? customer.socialMedia[2].user : <></> }
                    </Typography>
                    </Card>
                </CardContent>

                 {/* Address */}
                 <CardContent sx={{ flex: '1 0 auto',  }}>
                    <Card sx={{}}>
                    <Typography component="div" variant="p" align='left' >
                        <strong>Address: </strong> <a href='#'>Ver mapa</a> <Button size='small' onClick={handleAddressClick}>Edit</Button>
                    </Typography>
                    <Typography component="div" variant="p" align='left' >
                    {customer.address.streetAddress}
                    </Typography>
                    <Typography component="div" variant="p" align='left'>
                    {customer.address.postalCode}, {customer.address.city}, {customer.address.state}
                    </Typography>
                    </Card>
                </CardContent>
            </Box>

            {/* Second column of main box */}
          
            <Box sx={{ display: 'inline', flexDirection: 'column',  width:'100%', height:'100%'}}>
              
                <Box sx={{ display: 'flex', flexDirection: 'row',  width:'100%' }}>
                <Title>{t("nextappointments")}</Title> 
                <Button variant="outlined" size="small" sx={{ ml: 6, mb:1 }} key={"Ver Calendario"} onClick={seeCalendar}>
                    Ver Calendario
                </Button>
                <Button variant="outlined" size="small" sx={{ ml: 6, mb:1 }} key={"AñadirCita"} onClick={addNewAppointment}>
                    Añadir Cita
                </Button>
                <ExpandMore
                    expand={appointmentsExpanded}
                    onClick={handleAppointmentExpandClick}
                    aria-expanded={appointmentsExpanded}
                    aria-label={t("showmore")}
                >
                    <ExpandMoreIcon />
                </ExpandMore>
                </Box>
                <Collapse in={appointmentsExpanded} timeout="auto" unmountOnExit>
                <div style={{ height: 285, width: '100%' }}>
                <div style={{ height: 280, width: '100%' }}>
                    <DataGrid
                        rows={rowsAppointments}
                        columns={AppointmentColumns()}
                        checkboxSelection ={!compact}
                        density="compact"
                        rowsPerPageOptions={[5,10,25,50,100]}
                        rowsPerPage ={10}
                        components={!compact?{
                        Toolbar: GridToolbar,
                        }:null}
                    
                        onSelectionModelChange={handleRowSelection}
                        localeText={LocalTextForDataGrid()}
                    />
                    </div>
                    </div>
                    </Collapse>
                    <Box sx={{ display: 'flex', flexDirection: 'row',  width:'100%'}}>
                    <Title>{t("contacthistory")}</Title>
                    <Button variant="outlined" size="small" sx={{ ml: 6, mb:1 }} key={"AñadirComunicación"} onClick={addNewCommunication}>
                        Añadir Comunicación
                    </Button>
                    <ExpandMore
                        expand={contactsExpanded}
                        onClick={handleContactsExpandClick}
                        aria-expanded={contactsExpanded}
                        aria-label={t("showmore")}
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                    </Box>
                    <Collapse in={contactsExpanded} timeout="auto" unmountOnExit>
                    <div style={{ height: 285, width: '100%' }}>
                    <div style={{ height: 280, width: '100%' }}>
                    <DataGrid
                        rows={rowsContactHistory}
                        columns={ColumnsContactHistory()}
                        checkboxSelection ={!compact}
                        density="compact"
                        rowsPerPageOptions={[5,10,25,50,100]}
                        rowsPerPage ={10}
                        components={!compact?{
                        Toolbar: GridToolbar,
                        }:null}
                    
                        onSelectionModelChange={handleRowSelection}
                        localeText={LocalTextForDataGrid()}
                    />
                    </div>
                    </div>
                    </Collapse>
                    <Box sx={{ display: 'flex', flexDirection: 'row',  width:'100%'}}>
                <Title>{t("appointmenthistory")}</Title>
                <ExpandMore
                    expand={historyExpanded}
                    onClick={handleHistoryExpandClick}
                    aria-expanded={historyExpanded}
                    aria-label={t("showmore")}
                >
                    <ExpandMoreIcon />
                </ExpandMore>
                </Box>
                <Collapse in={historyExpanded} timeout="auto" unmountOnExit>
                <div style={{ height: 285, width: '100%' }}>
                <div style={{ height: 280, width: '100%' }}>
                
                    <DataGrid
                        rows={rowsHistory}
                        columns={Columns()}
                        density="compact"
                        checkboxSelection ={!compact}
                        rowsPerPageOptions={[5,10,25,50,100]}
                        rowsPerPage ={10}
                        components={!compact?{
                        Toolbar: GridToolbar,
                        }:null}
                    
                        onSelectionModelChange={handleRowSelection}
                        localeText={LocalTextForDataGrid()}
                    />
                  
                   </div>
                    </div>
                </Collapse>
                </Box>
            </Box>
            
   
                
        </Card>
        
    </React.Fragment>
  )
  }else{return(
    <p>
        Se ha producido un error
    </p>
  )}
}
