import { Button, Card, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { getNewServicesId, getServices, getServicesRealized } from '../../utils/dataFetch-utils';
import { useTranslation } from 'react-i18next';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ServicesForm() {

    const { t } = useTranslation();
    const servicesList = getServices();


    const SeeServices = (props) =>{
        const _id = props.currentTarget.name;
        
    }

    const NewService = (event) =>{
        console.log(event)
        const _id = event;
      
    }
    
    return (
        <React.Fragment>
           <p> {t("users")}</p>
        <Button onClick ={(e)=>{
            e.stopPropagation();
            NewService(getNewServicesId())}}>{t("addservice")
        }
        </Button>
        <Box >       
            <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12} sm={12} marginTop={3}>
           
               {servicesList.map((service, id)=>(
                
                   <Card key={id} sx={{ display: 'flex', width: '100%', mb: 2 }}>
                      <Grid container  direction="row" justifyContent="flex-start" alignItems="center">
                           <Typography variant="h6" align='left' sx={{ ml: 2, width: 65}}>{t("id")}: {service.id.toString()}.</Typography>
                           <Typography variant="h6" align='left' sx={{ ml: 2, width:280}}>{t("service")}: {service.serviceName}.</Typography>
                           <Typography variant="h6" align='left' sx={{ ml: 2 }}>{t("orientativeprice")}: {service.priceXHour} €</Typography>
                           <IconButton name={service.id} sx={{ ml: 4 }} onClick={SeeServices}>
                               <RemoveRedEyeIcon />
                           </IconButton>
                           <IconButton sx={{ mr: 2 }}>
                               <DeleteForeverIcon />
                           </IconButton>
                           <Typography variant="h6" align='left' sx={{ ml: 2, width: 300 }}> {t("performed")}: {getServicesRealized(service.id)} </Typography>
                       </Grid>
                   </Card>
               ))}
               
                    
                </Grid>
            </Grid>
        </Box>

        </React.Fragment>
    )
}