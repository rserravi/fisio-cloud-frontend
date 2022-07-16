// REACT
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { navigationLoading, navigationSuccess } from '../../slices/navigation-slice';
// MUI

import Typography from '@mui/material/Typography';
import { LocalTextForDataGrid} from '../../utils/mui-custom-utils';
import { Button, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled';
import { GridFilterModel } from '@mui/x-data-grid';
//import { indianred } from '@mui/material/colors';

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
import { GetCommunications, GetRowById, OrderArrayByDate } from '../../utils/dataFetch-utils';
import { ConversationComponent } from '../conversation-comp';




export const CommTab = (props) =>{
    const locale = props.locale;
    
    const customer = props.customer?props.customer:{};
    const communications=props.customer?OrderArrayByDate(GetCommunications(customer)):OrderArrayByDate(GetCommunications());
    const tableHeight = props.customer?280:600;
    const mode=props.customer?"custoPage":"commPage";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterModel, setFilterModel] = React.useState();
    const [modeForFilter, setModeForFilter] = React.useState("seeall");
     
    const { t } = useTranslation();
    
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
                {props.row.direction!=="send"?<ArrowRightIcon color='primary'/>:<ArrowLeftIcon color='primary'/>}
            </React.Fragment>
        )
    }

    const handleRowSelection = (ids) =>{
        setSelection(ids);
      }

    const addCommClick = (event)=>{
        event.stopPropagation();
        console.log("ADD COMM")
        const actualScreen = "/addcommunication/"+ Number(customer.id);
        dispatch(navigationLoading())
        navigate(actualScreen,{replace: true});
        dispatch(navigationSuccess(actualScreen))
    }

    const Columns = () => {
        const { t } = useTranslation();
        return(
            [
                { field: 'id', hide: true, headerName: t("Id"), width: 20 },
                { field: 'readed', type:"boolean", headerName: t("readed"), width:10},
                { field: 'answered', type:"boolean", headerName: t("answered"), width:10},
                { field: 'direction', headerName: "", width:10, renderCell: RenderDirection},
                { field: 'date', headerName: t("date"), width: 250},
                { field: 'type', headerName: t("Type"), width: 80 },
                { field: 'duration', headerName: t("Duration"), width: 80 },
                { field: 'subject', headerName: t("Subject"), width: 120},
                { field: 'notes', headerName: t("Notes"), width: 275},
                { field: 'follow', headerName: t("Follow"), hide: true,  width: 110},
                {
                    field: 'actions',
                    type: 'actions',
                    headerName: t("actions"),
                    width: 80,
                    sortable: false,
                    getActions: (params) => [
                    
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label={t("editcontact")}
                            showInMenu
                            onClick={(event) => {
                            //EditComunications(params.id);
                            event.stopPropagation();
                        }}
                        />,
                        <GridActionsCellItem
                            icon={<ContentCopyIcon />}
                            label={t("duplicatecontact")}
                            showInMenu
                            onClick={(event) => {
                                //DuplicateComunications(params.id);
                                event.stopPropagation();
                            }}
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label={t("deletecontact")}
                            showInMenu
                            onClick={(event) => {
                            //DeleteComunications(params.id);
                            event.stopPropagation();
                        }}
                        />,
                        <GridActionsCellItem
                            icon={<LocalPrintshopIcon />}
                            label={t("printcontact")}
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
        id: row.id, 
        customerId: row.customerId,
        date: getDateFromISOTime(row.date, locale),
        type: row.type,
        direction: row.direction,
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
                    <Button fullWidth onClick={addCommClick} size="small" startIcon={<PersonAddAlt1Icon />}>{t("addcommunication")} </Button>
                    </Grid>
                    <Grid item xs={12} sm={9} md={9}>
                        <IndianRedButton onClick={((event)=>{event.stopPropagation(); setModeForFilter("notreaded")})} size="small" sx={{mr:1}}>{t("notreaded")}  </IndianRedButton>
                        <YellowButton onClick={((event)=>{event.stopPropagation(); setModeForFilter("notanswered")})}  size="small" sx={{mr:1}}>{t("notanswered")} </YellowButton>
                        <GainsboroButton onClick={((event)=>{event.stopPropagation(); setModeForFilter("useranswer")})}  size="small" sx={{mr:1}}>{t("useranswer")} </GainsboroButton>
                        <Button onClick={((event)=>{event.stopPropagation(); setModeForFilter("seeall")})} size="small" sx={{mr:1}}>{t("seeall")} </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
            )
        
    }

    const rowClassName = (params)=>{
        if(params.row.readed && params.row.answered && params.row.direction==="send")return "done";
        if(!params.row.readed && !params.row.aswered && params.row.direction==="send" ) return "notreaded";
        if(params.row.readed && !params.row.answered && params.row.direction==="send") return "notanswered"
        if(params.row.direction==="receive") return "answer"
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
                <Typography variant="h5" component="h1" align='left' sx={{ flexGrow: 1, mb:1 }}>{t("communications")}</Typography>
                <CustomerToolBar />
                <DataGrid
                    rows={rows}
                    columns={Columns()}
                    density="compact"
                    checkboxSelection
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
                    {select.length>0?<ConversationComponent locale={locale} select={GetRowById(rows,select[select.length-1])} />:<></>}
              </Paper>
            </Grid>
        </React.Fragment>
    )
}