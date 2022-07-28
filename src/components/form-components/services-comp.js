import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { getServicesRealized } from '../../utils/dataFetch-utils';
import { useTranslation } from 'react-i18next';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { addServices, deleteServices, getServices } from '../../api/services.api';

export default function ServicesForm() {

    const { t } = useTranslation();
    const [firstLoad, setFirstLoad] = React.useState(true)
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [deleteId, setDeleteID]= React.useState("");

    
    const handleDialogClickOpen = (event) => {
        
        setDialogOpen(true);
      };
    
    const handleDialogClose = (event) => {
        event.stopPropagation();
        setDialogOpen(false);
    };
    
    const deleteDialogClose=(event)=>{
        event.stopPropagation();
        setDeleteDialogOpen(false)
    }

    const handleDeleteDialogOpen=(event)=>{
        event.stopPropagation();
        setDeleteDialogOpen(true)
    }

    const initData =[
        {
            "_id":1,
            "serviceName":"",
            "priceXHour":"",
        }
    ]

    const initNewServData = 
        {
            "id":"",
            "serviceName":"",
            "priceXHour":50,
        }
    

    const [newServiceForSub, setNewServiceForSub]= React.useState(initNewServData);
    const [servicesList, setServicesList] = React.useState(initData);

     React.useEffect(() => {
        if(firstLoad){
            getServices().then(data =>{
                setServicesList(data.result);
                setFirstLoad(false);
            })
        }
    },[firstLoad]) 

   
    const handleDialogSubmit = (event) => {
        event.stopPropagation();
        addServices(newServiceForSub).then(data =>{
                    setDialogOpen(false);
                    setFirstLoad(true)   
            })
        
    };

    const deleteService = (event) =>{
        event.stopPropagation()
        deleteServices(deleteId).then(data =>{
            setDeleteDialogOpen(false);
            setFirstLoad(true)
        })
    }

    const valueOnChange = (event)=>{
        event.stopPropagation();
        setNewServiceForSub({...newServiceForSub,[event.target.name]:event.target.value})
    }
    
    return (
        <React.Fragment>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{t("addservice")}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {t("defineService")}
                </DialogContentText>
                <TextField
                    margin="dense"
                    id="serviceName"
                    name="serviceName"
                    label={t("serviceName")}
                    onChange={valueOnChange}
                    type="text"
                    fullWidth
                    variant="standard"
                    focused
                />
                <TextField
                    margin="dense"
                    id="priceXHour"
                    name="priceXHour"
                    label={t("priceXHour")}
                    onChange={valueOnChange}
                    type="number"
                    fullWidth
                    variant="standard"
                    focused
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>{t("cancel")}</Button>
                    <Button onClick={handleDialogSubmit}>{t("add")}</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={deleteDialogOpen} onClose={deleteDialogClose}>
                <DialogTitle>{t("deleteservice")}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {t("areyousureyouwanttodelete")}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteDialogClose}>{t("cancel")}</Button>
                    <Button onClick={deleteService}>{t("delete")}</Button>
                </DialogActions>
            </Dialog>
           <h3> {t("users")}</h3>
        <Button onClick ={(e)=>{
            e.stopPropagation();
            handleDialogClickOpen(e)}}>{t("addservice")}
        </Button>
        <Box >       
            <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12} sm={12} marginTop={3}>
           
               {servicesList.map((service, id)=>(
                
                   <Card key={id} sx={{ display: 'flex', width: '100%', mb: 2 }}>
                      <Grid container  direction="row" justifyContent="flex-start" alignItems="center">
                           <Typography variant="h6" align='left' sx={{ ml: 2, width: 330}}>{t("id")}: {service._id.toString()}.</Typography>
                           <Typography variant="h6" align='left' sx={{ ml: 2, width:280}}>{t("service")}:<b> {service.serviceName}</b>.</Typography>
                           <Typography variant="h6" align='left' sx={{ ml: 2 }}>{t("orientativeprice")}: {service.priceXHour} €</Typography>
                           <IconButton sx={{ ml: 4 }} onClick={(event)=>{
                                setDeleteID(service._id); 
                                handleDeleteDialogOpen(event)
                            }}>
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