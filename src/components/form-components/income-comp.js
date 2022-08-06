import * as React from 'react';
import Title from '../Title';
import { twoDigitsDateOptions } from '../../utils/date-utils';
import { Box } from '@mui/system';
import { Container, Tooltip } from '@mui/material';
import { LocalTextForDataGrid } from '../../utils/mui-custom-utils';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { locale } from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import i18next from 'i18next';
import _ from 'underscore';


export default function Income(props) {
  const localization = props.locale;
  const data = props.data;
  const income = _.filter(data,function(inc){if(inc.income >0){return inc}});
  locale(localization);

  const editHistory = (params) =>{
    //edit history row.id
  }

  const rows = income.map((row) => 
    (
      {
        id: row.id, 
        customer:row.customerName,
        date: new Date(row.date).toLocaleDateString(localization, twoDigitsDateOptions),
        duration: row.duration + " m.",
        service: row.service, 
        debts: row.debts + " €",
        income: row.income + " €",
        status:i18next.t(row.status),
        closed: new Date(row.closed).toLocaleDateString(localization, twoDigitsDateOptions)
        
      }
    )
  );

  
  const Columns = () => {
  
    return(
      [
        { field: 'id', headerName: i18next.t("Id"), width: 20 },
        { field: 'income', headerName:i18next.t("income"), width:70 },
        { field: 'customer', headerName:i18next.t("Customer"), width:200 },
        { field: 'date', headerName: i18next.t("date"), width: 120},
        { field: 'service', headerName:i18next.t("service"), width:80 },
        { field: 'duration', headerName:i18next.t("duration"), width:80 }, 
        { field: 'closed', headerName:i18next.t("closed"), width:120},
        {
          field: 'actions',
          type: 'actions',
          headerName: "",
          width: 20,
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
          ],
        },
      ]
    )
  } 

  return (
    <React.Fragment>
      <Title>{i18next.t("incomes")}</Title>
  
    <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%', mt:2,
    
    '& .income': {
      backgroundColor: 'darkgreen',
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
          if (params.field === 'income') {
                return 'income';
          }else{
            if (params.field === 'customer'){
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