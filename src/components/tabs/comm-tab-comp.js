// REACT
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { navigationLoading, navigationSuccess } from '../../slices/navigation-slice';
import i18next from 'i18next';

// MUI

import Typography from '@mui/material/Typography';
import { LocalTextForDataGrid} from '../../utils/mui-custom-utils';
import { Button, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled';
import { GridFilterModel } from '@mui/x-data-grid';

//MUI ICONS
import EditIcon from '@mui/icons-material/EditOffTwoTone';
import ContentCopyIcon from '@mui/icons-material/ContentCopyTwoTone';
import DeleteIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshopTwoTone';
import ArrowRightIcon from '@mui/icons-material/ArrowRightTwoTone';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeftTwoTone';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1TwoTone';


//CUSTOM IMPORTS
import { getDateFromISOTime } from '../../utils/date-utils';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { ConversationComponent } from '../conversation-comp';


export const CommTab = (props) =>{
    const locale = props.locale;
    
    const customer = props.customer?props.customer:{};
    //console.log("COMM TAB PROPS", props)
    const communications=props.customer?props.customer.communications:props.commData
    const tableHeight = props.customer?280:600;
    const mode=props.customer?"custoPage":"commPage";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterModel, setFilterModel] = React.useState();
    const [modeForFilter, setModeForFilter] = React.useState("seeall");
         
    // Select has an array of selected rows
    const [select, setSelection] = React.useState([]);

    React.useEffect (()=>{
        if (modeForFilter==="seeall"){
            setFilterModel({
                items:[
                   
                ]
            })
        }

        if (modeForFilter==='notreaded'){
            setFilterModel({
                items:[
                    {id:1, columnField:'readed', operatorValue:'is', value:'false'}
                ]
            }
            )
        }
        if (modeForFilter==='notanswered'){
            setFilterModel({
                items:[
                    {id:1, columnField:'answered', operatorValue:'is', value:'false'}
                ]
            }
            )
        }
        if (modeForFilter==='useranswer'){
            setFilterModel({
                items:[
                    {id:1, columnField:'direction', operatorValue:'contains', value:'receive'}
                ]
            }
            )
        }
    },[modeForFilter])


    const RenderDirection = (props) =>{
        return(
            <React.Fragment>
                {!props.row.customerSent?<ArrowRightIcon color='primary'/>:<ArrowLeftIcon color='primary'/>}
            </React.Fragment>
        )
    }

    const handleRowSelection = (ids) =>{
        console.log("PASAMOS EN ID DE LA COMM PULSADA",ids, "customer", customer)
        setSelection(ids);
        
      }

    const addCommClick = (event)=>{
        event.stopPropagation();
        console.log("ADD COMM")
        const actualScreen = "/addcommunication/"+ customer._id;
        dispatch(navigationLoading())
        navigate(actualScreen,{replace: true});
        dispatch(navigationSuccess(actualScreen))
    }

    const Columns = () => {
        return(
            [
                { field: 'id', hide: true, headerName: i18next.t("Id"), width: 20 },
                { field: 'readed', type:"boolean", headerName: i18next.t("readed"), width:10},
                { field: 'answered', type:"boolean", headerName: i18next.t("answered"), width:10},
                { field: 'direction', headerName: "", width:10, renderCell: RenderDirection},
                { field: 'date', headerName: i18next.t("date"), width: 250},
                { field: 'type', headerName: i18next.t("Type"), width: 80 },
                { field: 'duration', headerName: i18next.t("Duration"), width: 80 },
                { field: 'subject', headerName: i18next.t("Subject"), width: 120},
                { field: 'notes', headerName: i18next.t("Notes"), width: 275},
                { field: 'follow', headerName: i18next.t("Follow"), hide: true,  width: 110},
                {
                    field: 'actions',
                    type: 'actions',
                    headerName: i18next.t("actions"),
                    width: 80,
                    sortable: false,
                    getActions: (params) => [
                    
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label={i18next.t("editcontact")}
                            showInMenu
                            onClick={(event) => {
                            //EditComunications(params.id);
                            event.stopPropagation();
                        }}
                        />,
                        <GridActionsCellItem
                            icon={<ContentCopyIcon />}
                            label={i18next.t("duplicatecontact")}
                            showInMenu
                            onClick={(event) => {
                                //DuplicateComunications(params.id);
                                event.stopPropagation();
                            }}
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label={i18next.t("deletecontact")}
                            showInMenu
                            onClick={(event) => {
                            //DeleteComunications(params.id);
                            event.stopPropagation();
                        }}
                        />,
                        <GridActionsCellItem
                            icon={<LocalPrintshopIcon />}
                            label={i18next.t("printcontact")}
                            showInMenu
                            onClick={(event) => {
                                //PrintComunications(params.id);
                                event.stopPropagation();
                            }}
                        />,
                    ]
                }
                
            ]
        )
    } 

    const rows = communications.map((row) => 
    ({
        id: row._id, 
        customerId: row.customerId,
        customerName: row.customerName,
        customerSent: row.customerSent,
        userName: row.userName,
        date: getDateFromISOTime(row.date, locale),
        type: row.type,
        duration: row.duration,
        subject: row.subject,
        notes: row.notes,
        follow: row.follow,
        readed: row.readed,
        answered: row.answered,
        thread: row.thread
    })
    );

    const IndianRedButton = styled(Button)(({ theme }) => ({
        color: "black",
        backgroundColor:"indianred",
        '&:hover': {
          backgroundColor: "indianred",
        },
      }));
    const YellowButton = styled(Button)(({ theme }) => ({
        color: "black",
        backgroundColor:"yellow",
        '&:hover': {
          backgroundColor: "yellow",
        },
      }));
    const GainsboroButton = styled(Button)(({ theme }) => ({
        color: "black",
        backgroundColor:"gainsboro",
        '&:hover': {
          backgroundColor: "gainsboro",
        },
      }));

    
    const seeAllFilterModel: GridFilterModel ={
        items:[
           
        ]
    }
    

    // Set if Toolbar is visible depending on var compact
    const CustomerToolBar = () =>{

            return (
            <React.Fragment>
                <Grid container direction="row" justifyContent="flex-start" alignItems="baseline" marginBottom={2}>
                    <Grid item xs={12} sm={2.8} md={2.8}>
                    <Button fullWidth onClick={addCommClick} size="small" startIcon={<PersonAddAlt1Icon />}>{i18next.t("addcommunication")} </Button>
                    </Grid>
                    <Grid item xs={12} sm={9} md={9}>
                        <IndianRedButton onClick={((event)=>{event.stopPropagation(); setModeForFilter("notreaded")})} size="small" sx={{mr:1}}>{i18next.t("notreaded")}  </IndianRedButton>
                        <YellowButton onClick={((event)=>{event.stopPropagation(); setModeForFilter("notanswered")})}  size="small" sx={{mr:1}}>{i18next.t("notanswered")} </YellowButton>
                        <GainsboroButton onClick={((event)=>{event.stopPropagation(); setModeForFilter("useranswer")})}  size="small" sx={{mr:1}}>{i18next.t("useranswer")} </GainsboroButton>
                        <Button onClick={((event)=>{event.stopPropagation(); setModeForFilter("seeall")})} size="small" sx={{mr:1}}>{i18next.t("seeall")} </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
            )
        
    }

    const rowClassName = (params)=>{
        if(params.row.readed && params.row.answered && params.row.customerSent)return "done";
        if(!params.row.readed && !params.row.aswered && params.row.customerSent) return "notreaded";
        if(params.row.readed && !params.row.answered && params.row.customerSent) return "notanswered"
        if(!params.row.customerSent) return "answer"
    }

    return (
        <React.Fragment>
      
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" sx={{p:2, ml:2, mb:4}}> 
            <Grid item xs={12} md={12} sm={12}>
              <Box sx={{ 
                height: tableHeight, 
                mb:7,
                width: '100%',
                '& .notreaded':{
                    bgcolor:"indianred",
                    color: "black",
                    '&:hover': {
                        bgcolor: "indianred",
                        color: "black"
                    },
                },
                '& .notanswered':{
                    bgcolor:"yellow",
                    color: "black",
                    '&:hover': {
                        bgcolor: "yellow",
                        color: "black"
                    }
                },
                '& .done':{
                    bgcolor:""
                },
                '& .answer':{
                    bgcolor:"gainsboro"
                }
             
              }}>
                <Typography variant="h5" component="h1" align='left' sx={{ flexGrow: 1, mb:1 }}>{i18next.t("communications")}</Typography>
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
                    filterModel={filterModel}
                    onSelectionModelChange={handleRowSelection}
                />
              </Box>
              </Grid>
              <Paper sx={{mt:5}}>               
                    {select.length>0?<ConversationComponent locale={locale} select={select[0]} customer={customer} />:<></>}
              </Paper>
            </Grid>
        </React.Fragment>
    )
}