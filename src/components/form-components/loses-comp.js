import * as React from 'react';
import Title from '../Title';
import { twoDigitsDateOptions } from '../../utils/date-utils';
import { Box } from '@mui/system';
import { Container, Tooltip } from '@mui/material';
import { LocalTextForDataGrid } from '../../utils/mui-custom-utils';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { locale } from 'moment';
import i18next from 'i18next';
import _ from 'underscore';


//ICONS
import EditIcon from '@mui/icons-material/Edit';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import CampaignIcon from '@mui/icons-material/Campaign';

export default function Loses(props) {
  const localization = props.locale;
  locale(localization);
  const data = props.data;
  const loses = _.filter(data,function(inc){if(inc.debts >0){return inc}});

  const editHistory = (params) =>{

  }
  const closeDebt = (params) =>{
    
  }
  const sendRequest = (params) =>{
    
  }

  const rows = loses.map((row) => 
    (
      {
        id: row.id, 
        customerName: row.customerName,
        date: new Date(row.date).toLocaleDateString(localization, twoDigitsDateOptions),
        duration: row.duration + " m.",
        service: row.service, 
        price: row.price,
        income: row.income,
        loses: row.debts,
        closed: new Date(row.closed).toLocaleDateString(localization, twoDigitsDateOptions)
        
      }
    )
  );

  const Columns = () => {
  
    return(
      [
        { field: 'id', headerName: i18next.t("Id"), width: 20 },
        { field: 'price',headerName: i18next.t("price"), width: 20 },
        { field: 'loses', headerName:i18next.t("debt"), width:70 },
        { field: 'customerName', headerName:i18next.t("Customer"), width:200 },
        { field: 'date', headerName: i18next.t("date"), width: 120},
        { field: 'service', headerName:i18next.t("service"), width:80 },
        { field: 'duration', headerName:i18next.t("duration"), width:80 }, 
        {
          field: 'actions',
          type: 'actions',
          headerName: "",
          width: 150,
          sortable: false,
          getActions: (params) => [
            <GridActionsCellItem
            icon={<Tooltip title={i18next.t("editappointment")}><EditIcon /></Tooltip>}
            label={i18next.t("edit")}
            
            onClick={(event) => {
              editHistory(params);
              event.stopPropagation();
          }}
          />,
          
          <GridActionsCellItem
              icon={<Tooltip title={i18next.t("close")}><PointOfSaleIcon /></Tooltip>}
              label={i18next.t("close")}
              
              onClick={(event) => {
                closeDebt(params);
                event.stopPropagation();
            }}
            />,
            <GridActionsCellItem
              icon={<Tooltip title={i18next.t("sendRequest")}><CampaignIcon /></Tooltip>}
              label={i18next.t("sendRequest")}
              
              onClick={(event) => {
                sendRequest(params);
                event.stopPropagation();
            }}
            />,
          ],
        },
      ]
    )
  } 

  return (
    <React.Fragment>
      <Title>{i18next.t("loses")}</Title>
    
    
    <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%', mt:2, 

    '& .debts': {
      backgroundColor: 'rosybrown',
      color: 'white',
      fontWeight: '600',
    },
    '& .name-bold': {
      fontWeight: '600',
    },
  }}>
    <Container sx={{height:320}}>
    <DataGrid
        rows={rows}
        columns={Columns()}
        autoHeight={false}
        checkboxSelection ={false}
        rowsPerPageOptions={[5,10,25,50,100]}
        rowsPerPage ={10}    
        //onSelectionModelChange={handleRowSelection}
        localeText={LocalTextForDataGrid()}
        getCellClassName={(params) => {
          if (params.field === 'loses') {
                return 'debts';
          }else{
            if (params.field === 'customerName'){
              return 'name-bold'
            }
            else{
            return '';
            }
          }
        }}
      /> 
     </Container>
    </Box>
                
    </React.Fragment>
  );
}