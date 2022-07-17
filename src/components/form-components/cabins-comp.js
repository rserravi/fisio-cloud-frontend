import * as React from 'react';
import { GetCabins, getNewCabinId, getServicesByCabin } from '../../utils/dataFetch-utils';
import { useTranslation } from 'react-i18next';
import { Button, Card, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function CabinsForm() {
    const { t } = useTranslation();
    const cabinsList = GetCabins();

    const NewCabin = (event) =>{

        const _id = getNewCabinId();
        console.log("CREANT CONSULTORI", _id);
      
    }

    const SeeServices = (event)=>{

    }

    return (
        <React.Fragment>
           <p> {t("cabins")}</p>
        <Button onClick ={(e)=>{
            e.stopPropagation();
            NewCabin(getNewCabinId())}}>{t("addcabin")
        }
        </Button>
        <Box >       
            <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12} sm={12} marginTop={3}>
           
               {cabinsList.map((cabin, id)=>(
                
                   <Card key={id} sx={{ display: 'flex', width: '100%', mb: 2 }}>
                      <Grid container  direction="row" justifyContent="flex-start" alignItems="center">
                           <Typography variant="h6" align='left' sx={{ ml: 2, width: 65}}>{t("id")}: {cabin.id.toString()}.</Typography>
                           <Typography variant="h6" align='left' sx={{ ml: 2, width:280}}>{t("cabin")}:<b> {cabin.localization}</b>.</Typography>
                           <IconButton name={cabin.id} sx={{ ml: 4 }} onClick={SeeServices}>
                               <RemoveRedEyeIcon />
                           </IconButton>
                           <IconButton sx={{ mr: 2 }}>
                               <DeleteForeverIcon />
                           </IconButton>
                           <Typography variant="h6" align='left' sx={{ ml: 2, width: 300 }}> {t("performed")}: {getServicesByCabin(cabin.id)} </Typography>
                       </Grid>
                   </Card>
               ))}
               
                    
                </Grid>
            </Grid>
        </Box>

        </React.Fragment>
    )
}