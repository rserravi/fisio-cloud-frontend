import * as React from 'react';
import { getServicesByCabin } from '../../utils/dataFetch-utils';
import { useTranslation } from 'react-i18next';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { addCabins, deleteCabins, getCabins } from '../../api/cabins.api';
import { getCabinIdInHistory } from '../../api/history.api';


export default function CabinsForm() {
    const { t } = useTranslation();
    const [firstLoad, setFirstLoad] = React.useState(true)
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [deleteId, setDeleteID]= React.useState("");

    const handleDialogClickOpen = (event) => {
        event.stopPropagation();
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
        "cabinName":"",
        "description":"",
    }
    ]

    const initNewServData = 
        {
            "id":"",
            "cabinName":"",
            "description":"",
        }
    

    const [newCabinForSub, setNewCabinsForSub]= React.useState(initNewServData);
    const [cabinsList, setCabinsList] = React.useState(initData);

     React.useEffect(() => {
        if(firstLoad){
            getCabins().then(data =>{
                setCabinsList(data.result);
                setFirstLoad(false);
            })
        }
    },[firstLoad]) 

   
    const handleDialogSubmit = (event) => {
        event.stopPropagation();
        addCabins(newCabinForSub).then(data =>{
                    setDialogOpen(false);
                    setFirstLoad(true)   
            })
        
    };

    const deleteCabin = (event) =>{
        event.stopPropagation()

        deleteCabins(deleteId).then(data =>{
            setDeleteDialogOpen(false);
            setFirstLoad(true)
        })
    }

    const valueOnChange = (event)=>{
        event.stopPropagation();
        console.log(event.target.value)
        setNewCabinsForSub({...newCabinForSub,[event.target.name]:event.target.value})
    }

    return (
        <React.Fragment>
             <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{t("addcabin")}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {t("definecabin")}
                </DialogContentText>
                <TextField
                    margin="dense"
                    id="cabinName"
                    name="cabinName"
                    label={t("cabinName")}
                    onChange={valueOnChange}
                    type="text"
                    fullWidth
                    variant="standard"
                    focused
                />
                <TextField
                    margin="dense"
                    id="description"
                    name="description"
                    label={t("description")}
                    onChange={valueOnChange}
                    type="text"
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
                <DialogTitle>{t("deletecabin")}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {t("areyousureyouwanttodelete")}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteDialogClose}>{t("cancel")}</Button>
                    <Button onClick={deleteCabin}>{t("delete")}</Button>
                </DialogActions>
            </Dialog>
           <p> {t("cabins")}</p>
        <Button onClick ={(e)=>{
            e.stopPropagation();
            handleDialogClickOpen(e)}}>{t("addcabin")
        }
        </Button>
        <Box >       
            <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12} sm={12} marginTop={3}>
           
               {cabinsList.map((cabin, id)=>(
                
                   <Card key={id} sx={{ display: 'flex', width: '100%', mb: 2 }}>
                      <Grid container  direction="row" justifyContent="flex-start" alignItems="center">
                           <Typography variant="h6" align='left' sx={{ ml: 2, width: 350}}>{t("id")}: {cabin._id.toString()}.</Typography>
                           <Typography variant="h6" align='left' sx={{ ml: 2, width:280}}>{t("cabin")}:<b> {cabin.cabinName}</b>.</Typography>
                           <Typography variant="h6" align='left' sx={{ ml: 2, width:280}}>{t("description")}:<b> {cabin.description}</b>.</Typography>
                           <IconButton sx={{ mk: 4 }} onClick={(event)=>{
                                setDeleteID(cabin._id); 
                                handleDeleteDialogOpen(event)
                            }}>
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