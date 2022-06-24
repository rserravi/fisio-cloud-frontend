import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import customerData from "../assets/data/dummy-data.json";
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';

import { paperColor } from '../utils/mui-custom-utils';
import { styled } from '@mui/material/styles';
import { findSocialIcon } from '../utils/social-networks-utils';
import { GenderIcon } from '../utils/mui-custom-utils';
import { AppBar, Button, Divider, Toolbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Title from './Title';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';


const _id = 0;

const customer = customerData[_id];
const history = customer.history;
const appointments = customer.appointments;
const contacthistory = customer.contacthistory;

var compact = false;


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

const SeeHistory= (props)=>{

}

const EditHistory= (props)=>{

}

const DuplicateHistory= (props)=>{

}

const DeleteHistory= (props)=>{

}

const PrintHistory= (props)=>{

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
        { field: 'status', headerName: t("Status"), width: 90},
        { field: 'notes', headerName: t("Notes"), width: 300},
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
                SeeHistory(params.id);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
                icon={<EditIcon />}
                label={t("editcontact")}
                showInMenu
                onClick={(event) => {
                EditHistory(params.id);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
            icon={<ContentCopyIcon />}
            label={t("duplicatecontact")}
            showInMenu
            onClick={(event) => {
                DuplicateHistory(params.id);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label={t("deletecontact")}
                showInMenu
                onClick={(event) => {
                DeleteHistory(params.id);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
            icon={<LocalPrintshopIcon />}
            label={t("printcontact")}
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

export default function CustomerCard() {


    const { t, i18n } = useTranslation();
    const colorPaperInbound = paperColor(customer.inbound)

    const [historyExpanded, setHistoryExpanded] = React.useState(true);
    const [appointmentsExpanded, setAppointmentsExpanded] = React.useState(true);
    const [contactsExpanded, setContatctExpanded] = React.useState(true);

    const handleHistoryExpandClick = () => {
        setHistoryExpanded(!historyExpanded);
    };

    const handleAppointmentExpandClick = () => {
        setAppointmentsExpanded(!appointmentsExpanded);
    };
    const handleContactsExpandClick = () => {
        setContatctExpanded(!contactsExpanded);
    };


    const handleNameClick = () =>{
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

    // Select has an array of selected rows
    const [select, setSelection] = React.useState([]);

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
            image: row.image, 
            startingTime: row.startingTime, 
            duration: row.duration,
            service: row.service,
            price: row.price,
            status: row.status,
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


 
  return (
    <React.Fragment>
        <AppBar position='static' color="transparent" >
            <Toolbar>
                <Typography variant="h4" component="div" align='left' sx={{ flexGrow: 1 }}>
                    {customer.firstname} {customer.lastname} <GenderIcon name={customer.gender} />
                    <Button key={"editar nombre"}  >
                        Editar Nombre
                    </Button>
                </Typography>
              
                    
                    <Button variant="contained" key={"todos los clientes"} >
                        Todos los Clientes
                    </Button>
            
            
            </Toolbar>
        </AppBar>
        <Divider sx={{mb:2}} />
       <Card sx={{ display: 'flex',  width: '100%'  }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%' }}>
            
            {/* Firs Column of Main Box */}
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
               
                <CardMedia
                    component="img"
                    sx={{ width: 180, alignSelf:'center' }}
                    image={"/images/" + customer.image}
                    alt="Foto"
                />
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
                        Home: <a href={`mailto:${customer.email[0].emailAddress}`}> {customer.email[0].emailAddress} </a> 
                    </Typography>
                    <Typography component="div" variant="p" align='left'>
                        Work: <a href={`mailto:${customer.email[1].emailAddress}`}> {customer.email[1].emailAddress} </a> 
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

                        localeText={
                        { 
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
                            footerTotalRows: "total"
                        }
                        }
                    />
                  
                   </div>
                    </div>
                </Collapse>
                <Box sx={{ display: 'flex', flexDirection: 'row',  width:'100%'}}>
                <Title>{t("nextappointments")}</Title>
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
                        columns={Columns()}
                        checkboxSelection ={!compact}
                        density="compact"
                        rowsPerPageOptions={[5,10,25,50,100]}
                        rowsPerPage ={10}
                        components={!compact?{
                        Toolbar: GridToolbar,
                        }:null}
                    
                        onSelectionModelChange={handleRowSelection}

                        localeText={
                        { 
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
                            footerTotalRows: "total"
                        }
                        }
                    />
                    </div>
                    </div>
                    </Collapse>
                    <Box sx={{ display: 'flex', flexDirection: 'row',  width:'100%'}}>
                    <Title>{t("contacthistory")}</Title>
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

                        localeText={
                        { 
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
                            footerTotalRows: "total"
                        }
                        }
                    />
                    </div>
                    </div>
                    </Collapse>
                </Box>
            </Box>
            
   
                
        </Card>
        
    </React.Fragment>
  )
}
